import { ClientSession } from "mongoose";
import { ProductModel, ProductVariantModel } from "./product.model";
import { IProduct, IProductVariant } from "./product.interface";

export class ProductRepository {
  createProduct(payload: IProduct, session?: ClientSession) {
    const options = session ? { session } : undefined;
    return ProductModel.create([payload], options);
  }

  findById(productId: string, session?: ClientSession) {
    const options = session ? { session } : undefined;
    return ProductModel.findById(productId, null, options);
  }

  findByIdAndSeller(
    productId: string,
    sellerId: string,
    session?: ClientSession,
  ) {
    const options = session ? { session } : undefined;
    return ProductModel.findOne({ _id: productId, sellerId }, null, options);
  }

  findAllProducts(filter: Record<string, unknown> = {}) {
    return ProductModel.find(filter).sort({ createdAt: -1 });
  }

  updateProduct(
    productId: string,
    updateData: Partial<IProduct>,
    session?: ClientSession,
  ) {
    const options = session ? { new: true, session } : { new: true };
    return ProductModel.findByIdAndUpdate(productId, updateData, options);
  }

  createVariant(payload: IProductVariant, session?: ClientSession) {
    const options = session ? { session } : undefined;
    return ProductVariantModel.create([payload], options);
  }

  bulkCreateVariants(variants: IProductVariant[], session?: ClientSession) {
    const options = session ? { session } : {};
    return ProductVariantModel.insertMany(variants, options);
  }

  deleteDefaultVariants(productId: string, session?: ClientSession) {
    const options = session ? { session } : undefined;
    return ProductVariantModel.deleteMany(
      { productId, isDefault: true },
      options,
    );
  }

  countVariants(productId: string, session?: ClientSession) {
    const options = session ? { session } : undefined;
    return ProductVariantModel.countDocuments({ productId }, options);
  }

  findVariantKeys(productId: string) {
    return ProductVariantModel.find({ productId }, { variantKey: 1 }).lean();
  }

  updateVariant(
    variantId: string,
    updateData: Partial<IProductVariant>,
    session?: ClientSession,
  ) {
    const options = session ? { new: true, session } : { new: true };
    return ProductVariantModel.findByIdAndUpdate(variantId, updateData, options);
  }
}
