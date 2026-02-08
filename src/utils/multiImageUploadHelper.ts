import { uploadToCloudinary, deleteFromCloudinary } from "./ cloudinaryHelper";

interface IImageSet {
  small?: string;
  medium?: string;
  large?: string;
  original?: string;
}

interface ImageUploadResult {
  images: IImageSet;
  publicId: string;
}

interface MultiImageUploadResult {
  logo?: ImageUploadResult;
  banner?: ImageUploadResult;
  tradeLicense?: ImageUploadResult;
}

interface ImageBuffers {
  logo?: Buffer | undefined;
  banner?: Buffer | undefined;
  tradeLicense?: Buffer | undefined;
}

/**
 * Upload multiple images to Cloudinary
 * @param buffers - Object containing buffers for logo, banner, and/or tradeLicense
 * @param folder - Cloudinary folder name (default: "uploads")
 * @returns Object with upload results for each provided image
 */
export const uploadMultipleImages = async (
  buffers: ImageBuffers,
  folder = "uploads",
): Promise<MultiImageUploadResult> => {
  const result: MultiImageUploadResult = {};

  // Upload logo if provided
  if (buffers.logo) {
    const { images, public_id } = await uploadToCloudinary(
      buffers.logo,
      `${folder}/logos`,
    );
    result.logo = { images, publicId: public_id };
  }

  // Upload banner if provided
  if (buffers.banner) {
    const { images, public_id } = await uploadToCloudinary(
      buffers.banner,
      `${folder}/banners`,
    );
    result.banner = { images, publicId: public_id };
  }

  // Upload trade license if provided
  if (buffers.tradeLicense) {
    const { images, public_id } = await uploadToCloudinary(
      buffers.tradeLicense,
      `${folder}/trade-licenses`,
    );
    result.tradeLicense = { images, publicId: public_id };
  }

  return result;
};

/**
 * Delete multiple images from Cloudinary
 * @param publicIds - Object containing public IDs for logo, banner, and/or tradeLicense
 */
export const deleteMultipleImages = async (publicIds: {
  logoPublicId?: string | undefined;
  bannerPublicId?: string | undefined;
  tradeLicensePublicId?: string | undefined;
}): Promise<void> => {
  const deletionPromises: Promise<void>[] = [];

  if (publicIds.logoPublicId) {
    deletionPromises.push(deleteFromCloudinary(publicIds.logoPublicId));
  }

  if (publicIds.bannerPublicId) {
    deletionPromises.push(deleteFromCloudinary(publicIds.bannerPublicId));
  }

  if (publicIds.tradeLicensePublicId) {
    deletionPromises.push(deleteFromCloudinary(publicIds.tradeLicensePublicId));
  }

  // Execute all deletions in parallel
  await Promise.all(deletionPromises);
};
