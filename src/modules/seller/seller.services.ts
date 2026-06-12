import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import {
  uploadMultipleImages,
  deleteMultipleImages,
} from "../../utils/multiImageUploadHelper";
import { UserModel } from "../user/user.model";
import { ISeller } from "./seller.interface";
import SellerRepository from "./seller.repository";

interface SellerImageBuffers {
  logo?: Buffer | undefined;
  banner?: Buffer | undefined;
  tradeLicense?: Buffer | undefined;
  [key: string]: Buffer | undefined;
}

class SellerService {
  constructor(private sellerRepo: SellerRepository) {}

  async requestForSeller(userId: string) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }
    if (user.role !== "customer") {
      throw new AppError("User is not a customer", HTTP_STATUS.BAD_REQUEST);
    }
    if (user.sellerRequest === "approved") {
      throw new AppError("User is already a seller", HTTP_STATUS.BAD_REQUEST);
    }
    if (user.sellerRequest === "pending") {
      throw new AppError(
        "User is already requested for seller",
        HTTP_STATUS.BAD_REQUEST,
      );
    }
    if (user.sellerRequest === "rejected") {
      throw new AppError(
        "User is rejected for seller",
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    return UserModel.updateOne(
      { _id: userId },
      { $set: { sellerRequest: "pending" } },
    );
  }

  async createSeller(
    data: ISeller,
    imageBuffers: SellerImageBuffers,
    userId: string,
  ) {
    // Upload all provided images
    const uploadResults = await uploadMultipleImages(imageBuffers, "sellers");

    // Assign uploaded images to seller data
    if (uploadResults.logo) {
      data.logo = uploadResults.logo.images;
      data.logoPublicId = uploadResults.logo.publicId;
    }

    if (uploadResults.banner) {
      data.banner = uploadResults.banner.images;
      data.bannerPublicId = uploadResults.banner.publicId;
    }

    if (uploadResults.tradeLicense) {
      data.tradeLicense = uploadResults.tradeLicense.images;
      data.tradeLicensePublicId = uploadResults.tradeLicense.publicId;
    }
    data.userId = userId;

    return this.sellerRepo.createSeller(data);
  }

  async findAllSellers(query: Record<string, unknown>) {
    return this.sellerRepo.findAllSellers(query);
  }

  async findSellerById(id: string) {
    if (!id) {
      throw new AppError("Enter a valid seller Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.sellerRepo.findSellerById(id);
  }

  async findPublicSellerById(id: string) {
    if (!id) {
      throw new AppError("Enter a valid seller Id", HTTP_STATUS.NOT_FOUND);
    }
    const seller = await this.sellerRepo.findSellerById(id);
    if (!seller) {
      throw new AppError("Seller not found", HTTP_STATUS.NOT_FOUND);
    }
    return {
      _id: seller._id,
      shopName: seller.shopName,
      logo: seller.logo,
      banner: seller.banner,
      createdAt: seller.createdAt,
    };
  }

  async updateSeller(
    id: string,
    data: Partial<ISeller>,
    imageBuffers?: SellerImageBuffers,
  ) {
    if (!id) {
      throw new AppError("Enter a valid seller Id", HTTP_STATUS.NOT_FOUND);
    }

    const existingSeller = await this.sellerRepo.findSellerById(id);
    if (!existingSeller) {
      throw new AppError("Seller not found", HTTP_STATUS.NOT_FOUND);
    }

    // Handle image updates if buffers are provided
    if (imageBuffers) {
      const uploadResults = await uploadMultipleImages(imageBuffers, "sellers");

      // Update logo if provided
      if (uploadResults.logo) {
        // Delete old logo if exists
        if (existingSeller.logoPublicId) {
          await deleteMultipleImages({ id: existingSeller.logoPublicId });
        }
        data.logo = uploadResults.logo.images;
        data.logoPublicId = uploadResults.logo.publicId;
      }

      // Update banner if provided
      if (uploadResults.banner) {
        // Delete old banner if exists
        if (existingSeller.bannerPublicId) {
          await deleteMultipleImages({ id: existingSeller.bannerPublicId });
        }
        data.banner = uploadResults.banner.images;
        data.bannerPublicId = uploadResults.banner.publicId;
      }

      // Update trade license if provided
      if (uploadResults.tradeLicense) {
        // Delete old trade license if exists
        if (existingSeller.tradeLicensePublicId) {
          await deleteMultipleImages({
            id: existingSeller.tradeLicensePublicId,
          });
        }
        data.tradeLicense = uploadResults.tradeLicense.images;
        data.tradeLicensePublicId = uploadResults.tradeLicense.publicId;
      }
    }

    return this.sellerRepo.updateSeller(id, data);
  }

  async deleteSeller(id: string) {
    if (!id) {
      throw new AppError("Enter a valid seller Id", HTTP_STATUS.NOT_FOUND);
    }

    const existingSeller = await this.sellerRepo.findSellerById(id);
    if (!existingSeller) {
      throw new AppError("Seller not found", HTTP_STATUS.NOT_FOUND);
    }

    // Delete all images from Cloudinary
    await deleteMultipleImages({
      logo: existingSeller.logoPublicId,
      banner: existingSeller.bannerPublicId,
      tradeLicense: existingSeller.tradeLicensePublicId,
    });

    return this.sellerRepo.deleteSeller(id);
  }
}

export default SellerService;
