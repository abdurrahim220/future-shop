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
  [key: string]: ImageUploadResult | undefined;
}

interface ImageBuffers {
  [key: string]: Buffer | undefined;
}

/**
 * Upload multiple images to Cloudinary
 * @param buffers - Object containing buffers for various image types
 * @param folder - Cloudinary folder name (default: "uploads")
 * @returns Object with upload results for each provided image
 */
export const uploadMultipleImages = async (
  buffers: ImageBuffers,
  folder = "uploads",
): Promise<MultiImageUploadResult> => {
  const result: MultiImageUploadResult = {};

  const uploadPromises = Object.entries(buffers).map(async ([key, buffer]) => {
    if (buffer) {
      const { images, public_id } = await uploadToCloudinary(
        buffer,
        `${folder}/${key}s`, // e.g., "sellers/logos", "sellers/banners"
      );
      result[key] = { images, publicId: public_id };
    }
  });

  await Promise.all(uploadPromises);
  return result;
};

/**
 * Delete multiple images from Cloudinary
 * @param publicIds - Object containing public IDs for various image types
 */
export const deleteMultipleImages = async (publicIds: {
  [key: string]: string | undefined;
}): Promise<void> => {
  const deletionPromises = Object.values(publicIds)
    .filter((id): id is string => !!id)
    .map((id) => deleteFromCloudinary(id));

  // Execute all deletions in parallel
  await Promise.all(deletionPromises);
};
