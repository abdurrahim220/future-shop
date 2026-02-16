import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { ICart } from "./cart.interface";
import CartRepository from "./cart.repository";

class CartService {
  constructor(private cartRepo: CartRepository) {}

  async createCart(data: ICart) {
    return this.cartRepo.createCart(data);
  }

  async findAllCarts() {
    return this.cartRepo.findAllCarts();
  }

  async findCartById(id: string) {
    if (!id) {
      throw new AppError("Enter a valid cart Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.cartRepo.findCartById(id);
  }

  async updateCart(id: string, data: Partial<ICart>) {
    if (!id) {
      throw new AppError("Enter a valid cart Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.cartRepo.updateCart(id, data);
  }

  async deleteCart(id: string) {
    return this.cartRepo.deleteCart(id);
  }
}

export default CartService;
