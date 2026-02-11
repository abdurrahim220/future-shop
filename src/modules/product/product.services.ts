import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { IProduct } from "./product.interface";
import ProductRepository from "./product.repository";

class ProductService {
  constructor(private productRepo: ProductRepository) {}

  async createProduct(data: IProduct) {
    return this.productRepo.createProduct(data);
  }

  async findAllProducts() {
    return this.productRepo.findAllProducts();
  }

  async findProductById(id: string) {
    if (!id) {
      throw new AppError("Enter a valid product Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.productRepo.findProductById(id);
  }

  async updateProduct(id: string, data: Partial<IProduct>) {
    if (!id) {
      throw new AppError("Enter a valid product Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.productRepo.updateProduct(id, data);
  }

  async deleteProduct(id: string) {
    return this.productRepo.deleteProduct(id);
  }
}

export default ProductService;
