import { ProductModel, ProductVariantModel } from "./product.model";
import { IProduct, IProductVariant } from "./product.interface";

export class ProductRepository {
  createProduct(payload: IProduct) {
    return ProductModel.create(payload);
  }

  findById(id: string) {
    return ProductModel.findById(id);
  }

  createVariant(payload: IProductVariant) {
    return ProductVariantModel.create(payload);
  }

  findVariants(productId: string) {
    return ProductVariantModel.find({ productId });
  }
}
