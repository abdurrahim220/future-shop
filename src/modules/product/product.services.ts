import mongoose, { Types } from "mongoose";
import slugify from "slugify";
import { ProductRepository } from "./product.repository";
import {
  BulkVariantCreationPayload,
  CreateProductPayload,
  CreateVariantPayload,
  IProduct,
  IProductVariant,
  UpdateProductPayload,
} from "./product.interface";
import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { generateVariantsFromCombinations } from "./product.variant.generator";

export class ProductService {
  private repo = new ProductRepository();

  async createProduct(sellerId: string, payload: CreateProductPayload) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const productPayload: IProduct = {
        sellerId: new Types.ObjectId(sellerId),
        categoryId: new Types.ObjectId(payload.categoryId),
        brandId: new Types.ObjectId(payload.brandId),
        name: payload.name,
        sku: `P-${Date.now()}-${Math.floor(Math.random() * 1000)}`, // Generate simple unique SKU
        slug: slugify(payload.name, { lower: true, strict: true }),
        hasVariants: payload.hasVariants,
        attributeIds: payload.hasVariants
          ? (payload.attributeIds?.map((id) => new Types.ObjectId(id)) ?? [])
          : [],
        status: "draft",
      };

      if (payload.description) {
        productPayload.description = payload.description;
      }

      const [createdProduct] = await this.repo.createProduct(
        productPayload,
        session,
      );

      if (!createdProduct) {
        throw new AppError(
          "Failed to create product",
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
        );
      }

      // If simple product → create default variant
      if (!payload.hasVariants) {
        await this.repo.createVariant(
          {
            productId: createdProduct._id,
            sku: `SKU-${Date.now()}`,
            purchasePrice: 0,
            salePrice: 0,
            images: [],
            attributeValues: [],
            isDefault: true,
            status: "active",
            variantKey: "DEFAULT", // auto-generated anyway
          },
          session,
        );
      }

      await session.commitTransaction();
      session.endSession();

      return createdProduct;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async findAllProducts(sellerId?: string) {
    const filter: Record<string, unknown> = {};
    if (sellerId) {
      filter.sellerId = new Types.ObjectId(sellerId);
    }
    return this.repo.findAllProducts(filter);
  }

  async findProductById(productId: string) {
    const product = await this.repo.findById(productId);
    if (!product) {
      throw new AppError("Product not found", HTTP_STATUS.NOT_FOUND);
    }
    return product;
  }

  async createVariant(
    productId: string,
    sellerId: string,
    payload: CreateVariantPayload,
  ) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const product = await this.repo.findByIdAndSeller(
        productId,
        sellerId,
        session,
      );

      if (!product) {
        throw new AppError(
          "Product not found or unauthorized",
          HTTP_STATUS.NOT_FOUND,
        );
      }

      if (!product.hasVariants) {
        throw new AppError(
          "Cannot add variant to non-variant product",
          HTTP_STATUS.BAD_REQUEST,
        );
      }

      const variantPayload: IProductVariant = {
        productId: new Types.ObjectId(productId),
        sku: payload.sku,
        purchasePrice: payload.purchasePrice,
        salePrice: payload.salePrice,
        images: payload.images,
        attributeValues: payload.attributeValues.map((v) => ({
          attributeId: new Types.ObjectId(v.attributeId),
          attributeValueId: new Types.ObjectId(v.attributeValueId),
        })),
        isDefault: payload.isDefault ?? false,
        status: "active",
        variantKey: "", // will auto-generate in pre-hook
      };

      const [createdVariant] = await this.repo.createVariant(
        variantPayload,
        session,
      );

      await session.commitTransaction();
      session.endSession();

      return createdVariant;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async bulkCreateVariants(
    productId: string,
    sellerId: string,
    payload: BulkVariantCreationPayload,
  ) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const product = await this.repo.findByIdAndSeller(
        productId,
        sellerId,
        session,
      );

      if (!product) {
        throw new AppError(
          "Product not found or unauthorized",
          HTTP_STATUS.NOT_FOUND,
        );
      }

      const variantsData = generateVariantsFromCombinations(
        productId,
        payload.combinations,
      );

      const variantsToCreate: IProductVariant[] = variantsData.map((v) => ({
        productId: v.productId,
        sku: `SKU-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        purchasePrice: payload.basePrice,
        salePrice: payload.baseSalePrice,
        images: [], // Can be updated later
        attributeValues: v.attributeValues,
        isDefault: false,
        variantKey: v.variantKey,
        status: "active",
      }));

      // Check for existing variants to avoid duplicates
      const existingKeys = (await this.repo.findVariantKeys(
        productId,
      )) as unknown as {
        variantKey: string;
      }[];
      const existingKeySet = new Set(existingKeys.map((k) => k.variantKey));

      const newVariants = variantsToCreate.filter(
        (v) => !existingKeySet.has(v.variantKey),
      );

      if (newVariants.length === 0) {
        throw new AppError(
          "All provided variant combinations already exist",
          HTTP_STATUS.BAD_REQUEST,
        );
      }

      const createdVariants = await this.repo.bulkCreateVariants(
        newVariants,
        session,
      );

      await session.commitTransaction();
      session.endSession();

      return createdVariants;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async updateProduct(
    productId: string,
    sellerId: string,
    payload: UpdateProductPayload,
  ) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const product = await this.repo.findByIdAndSeller(
        productId,
        sellerId,
        session,
      );

      if (!product) {
        throw new AppError(
          "Product not found or unauthorized",
          HTTP_STATUS.NOT_FOUND,
        );
      }

      const updateData: Partial<IProduct> = {};

      // Basic fields
      if (payload.name) {
        updateData.name = payload.name;
        updateData.slug = slugify(payload.name, {
          lower: true,
          strict: true,
        });
      }

      if (payload.description) {
        updateData.description = payload.description;
      }

      if (payload.categoryId) {
        updateData.categoryId = new Types.ObjectId(payload.categoryId);
      }

      if (payload.brandId) {
        updateData.brandId = new Types.ObjectId(payload.brandId);
      }

      // Handle hasVariants transitions
      if (payload.hasVariants !== undefined) {
        // false → true
        if (!product.hasVariants && payload.hasVariants === true) {
          await this.repo.deleteDefaultVariants(productId, session);
        }

        // true → false
        if (product.hasVariants && payload.hasVariants === false) {
          const variantCount = await this.repo.countVariants(
            productId,
            session,
          );

          if (variantCount > 1) {
            throw new AppError(
              "Cannot disable variants when multiple variants exist",
              HTTP_STATUS.BAD_REQUEST,
            );
          }
        }

        updateData.hasVariants = payload.hasVariants;
      }

      if (
        payload.attributeIds &&
        (payload.hasVariants ?? product.hasVariants)
      ) {
        updateData.attributeIds = payload.attributeIds.map(
          (id) => new Types.ObjectId(id),
        );
      }

      const updatedProduct = await this.repo.updateProduct(
        productId,
        updateData,
        session,
      );

      await session.commitTransaction();
      session.endSession();

      return updatedProduct;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}
