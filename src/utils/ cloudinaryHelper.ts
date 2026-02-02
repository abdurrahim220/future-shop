import { Readable } from "stream";
import cloudinaryConfig from "../services/cloudinary";
import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";

interface CloudinaryUploadResult {
  images: {
    small: string;
    medium: string;
    large: string;
    original: string;
  };
  public_id: string;
}

export const uploadToCloudinary = async (
  buffer: Buffer,
  folder = "uploads",
): Promise<CloudinaryUploadResult> => {
  if (!buffer) {
    throw new Error("File buffer is required");
  }

  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinaryConfig.uploader.upload_stream(
      { folder },
      (
        error: UploadApiErrorResponse | undefined,
        result: UploadApiResponse | undefined,
      ) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Cloudinary upload failed"));
        resolve(result);
      },
    );

    Readable.from(buffer).pipe(stream);
  });

  if (!result.secure_url || !result.public_id) {
    throw new Error("Invalid Cloudinary response");
  }

  const uploadIndex = result.secure_url.indexOf("/upload/");
  if (uploadIndex === -1) {
    throw new Error("Invalid Cloudinary URL format");
  }

  const baseUrl = result.secure_url.substring(0, uploadIndex + 8);
  const imagePath = result.secure_url.substring(uploadIndex + 8);

  const images = {
    small: `${baseUrl}w_200/${imagePath}`,
    medium: `${baseUrl}w_600/${imagePath}`,
    large: `${baseUrl}w_1200/${imagePath}`,
    original: result.secure_url,
  };

  return {
    images,
    public_id: result.public_id,
  };
};

export const deleteFromCloudinary = async (publicId?: string) => {
  if (!publicId) return;

  try {
    await cloudinaryConfig.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary deletion failed:", error);
  }
};
