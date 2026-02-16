import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { IWishlist } from "./wishlist.interface";
import WishlistRepository from "./wishlist.repository";

class WishlistService {
  constructor(private wishlistRepo: WishlistRepository) {}

  async createWishlist(data: IWishlist) {
    return this.wishlistRepo.createWishlist(data);
  }

  async findAllWishlists() {
    return this.wishlistRepo.findAllWishlists();
  }

  async findWishlistById(id: string) {
    if (!id) {
      throw new AppError("Enter a valid wishlist Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.wishlistRepo.findWishlistById(id);
  }

  async updateWishlist(id: string, data: Partial<IWishlist>) {
    if (!id) {
      throw new AppError("Enter a valid wishlist Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.wishlistRepo.updateWishlist(id, data);
  }

  async deleteWishlist(id: string) {
    return this.wishlistRepo.deleteWishlist(id);
  }
}

export default WishlistService;
