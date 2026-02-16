import { ICart } from "./cart.interface";
import { CartModel } from "./cart.model";

class CartRepository {
  async findAllCarts() {
    return CartModel.find();
  }

  async createCart(data: ICart) {
    return CartModel.create(data);
  }

  async findCartById(id: string) {
    return CartModel.findById(id);
  }

  async updateCart(id: string, data: Partial<ICart>) {
    return CartModel.updateOne({ _id: id }, data);
  }

  async deleteCart(id: string) {
    return CartModel.deleteOne({ _id: id });
  }
}

export default CartRepository;
