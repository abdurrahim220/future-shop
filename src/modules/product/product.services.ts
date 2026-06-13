import mongoose, { Types } from "mongoose";
import slugify from "slugify";
import { CategoriesModel } from "../categories/categories.model";
import { BrandsModel } from "../brands/brands.model";
import { QueryBuilder } from "../../queryBuilder/QueryBuilder";
import { ProductRepository } from "./product.repository";
import { ProductModel, ProductVariantModel } from "./product.model";
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
import { generateSku } from "../../utils/generateSku";

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
        sku: generateSku(), // Generate simple unique SKU
        slug: slugify(payload.name, { lower: true, strict: true }),
        hasVariants: payload.hasVariants,
        attributeIds: payload.hasVariants
          ? (payload.attributeIds?.map((id) => new Types.ObjectId(id)) ?? [])
          : [],
        status: "active",
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
            sku: generateSku(),
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

  async findAllProducts(query: Record<string, unknown>, sellerId?: string) {
    const qb = new QueryBuilder<IProduct>(query)
      .search(["name", "description"])
      .filterBy(["categoryId", "brandId", "status"]);

    const { filter } = qb.build();

    // Default status to active for storefront client queries (which don't pass status)
    if (!filter.status && !sellerId) {
      filter.status = "active";
    }

    if (sellerId) {
      filter.sellerId = new Types.ObjectId(sellerId);
    }

    // Convert string categoryId or brandId to ObjectId if they exist (supporting slugs as well)
    if (filter.categoryId && typeof filter.categoryId === "string") {
      if (mongoose.Types.ObjectId.isValid(filter.categoryId)) {
        filter.categoryId = new Types.ObjectId(filter.categoryId);
      } else {
        const cat = await CategoriesModel.findOne({ slug: filter.categoryId }).lean();
        if (cat) {
          filter.categoryId = cat._id;
        } else {
          // Fallback dummy ObjectId to prevent empty string matching all products
          filter.categoryId = new Types.ObjectId();
        }
      }
    }
    if (filter.brandId && typeof filter.brandId === "string") {
      if (mongoose.Types.ObjectId.isValid(filter.brandId)) {
        filter.brandId = new Types.ObjectId(filter.brandId);
      } else {
        const brand = await BrandsModel.findOne({ slug: filter.brandId }).lean();
        if (brand) {
          filter.brandId = brand._id;
        } else {
          filter.brandId = new Types.ObjectId();
        }
      }
    }

    const minPrice = Number(query.minPrice);
    const maxPrice = Number(query.maxPrice);

    const products = await ProductModel.find(filter)
      .populate("categoryId")
      .populate("brandId")
      .populate("sellerId")
      .lean();

    let productsWithVariants = await Promise.all(
      products.map(async (product) => {
        const variants = await ProductVariantModel.find({
          productId: product._id,
        }).lean();
        const images = Array.from(
          new Set(variants.flatMap((v) => v.images || [])),
        );
        return {
          ...product,
          variants,
          images,
        };
      }),
    );

    // Apply price range filtering on variants in memory
    if (!Number.isNaN(minPrice) || !Number.isNaN(maxPrice)) {
      productsWithVariants = productsWithVariants.filter((product) => {
        return product.variants.some((v) => {
          let matches = true;
          if (!Number.isNaN(minPrice) && v.salePrice < minPrice) matches = false;
          if (!Number.isNaN(maxPrice) && v.salePrice > maxPrice) matches = false;
          return matches;
        });
      });
    }

    // Sort by price or default to newest
    const sortField = typeof query.sort === "string" ? query.sort : "-createdAt";
    if (sortField === "salePrice") {
      productsWithVariants.sort((a, b) => {
        const aPrice = a.variants.find((v) => v.isDefault)?.salePrice || a.variants[0]?.salePrice || 0;
        const bPrice = b.variants.find((v) => v.isDefault)?.salePrice || b.variants[0]?.salePrice || 0;
        return aPrice - bPrice;
      });
    } else if (sortField === "-salePrice") {
      productsWithVariants.sort((a, b) => {
        const aPrice = a.variants.find((v) => v.isDefault)?.salePrice || a.variants[0]?.salePrice || 0;
        const bPrice = b.variants.find((v) => v.isDefault)?.salePrice || b.variants[0]?.salePrice || 0;
        return bPrice - aPrice;
      });
    } else if (sortField === "-createdAt") {
      productsWithVariants.sort((a, b) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bTime - aTime;
      });
    }

    // Paginate in memory
    const page = typeof query.page === "string" && Number(query.page) > 0 ? Number(query.page) : 1;
    const limit = typeof query.limit === "string" && Number(query.limit) > 0 ? Number(query.limit) : 20;
    const skip = (page - 1) * limit;

    const items = productsWithVariants.slice(skip, skip + limit);
    const total = productsWithVariants.length;

    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPage: Math.ceil(total / limit),
      },
    };
  }

  async findProductById(productId: string) {
    const product = await ProductModel.findById(productId)
      .populate("categoryId")
      .populate("brandId")
      .populate("sellerId")
      .lean();
    if (!product) {
      throw new AppError("Product not found", HTTP_STATUS.NOT_FOUND);
    }
    const variants = await ProductVariantModel.find({
      productId: product._id,
    }).lean();
    const images = Array.from(new Set(variants.flatMap((v) => v.images || [])));
    return {
      ...product,
      variants,
      images,
    };
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
        sku: generateSku(),
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
        sku: generateSku(),
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

  async updateVariant(
    productId: string,
    variantId: string,
    sellerId: string,
    payload: Partial<IProductVariant>,
  ) {
    const product = await this.repo.findByIdAndSeller(productId, sellerId);
    if (!product) {
      throw new AppError(
        "Product not found or unauthorized",
        HTTP_STATUS.NOT_FOUND,
      );
    }
    const updated = await this.repo.updateVariant(variantId, payload);
    if (!updated) {
      throw new AppError("Variant not found", HTTP_STATUS.NOT_FOUND);
    }
    return updated;
  }
}
