import { IWishlist } from "./wishlist.interface";
import { WishlistModel } from "./wishlist.model";

class WishlistRepository {
  async findAllWishlists() {
    return WishlistModel.find();
  }

  async createWishlist(data: IWishlist) {
    return WishlistModel.create(data);
  }

  async findWishlistById(id: string) {
    return WishlistModel.findById(id);
  }

  async updateWishlist(id: string, data: Partial<IWishlist>) {
    return WishlistModel.updateOne({ _id: id }, data);
  }

  async deleteWishlist(id: string) {
    return WishlistModel.deleteOne({ _id: id });
  }
}

export default WishlistRepository;
