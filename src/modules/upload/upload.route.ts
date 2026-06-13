import { Router } from "express";
import upload from "../../middleware/uploadMiddleware";
import { uploadToCloudinary } from "../../utils/ cloudinaryHelper";
import sendResponse from "../../utils/sendResponse";
import { HTTP_STATUS } from "../../errors/httpStatus";
import asyncHandler from "../../utils/catchAsync";

const router = Router();

router.post(
  "/",
  upload.array("files", 10),
  asyncHandler(async (req, res) => {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return sendResponse(res, {
        statusCode: HTTP_STATUS.BAD_REQUEST,
        success: false,
        message: "No files uploaded",
        data: [],
      });
    }

    const uploadPromises = files.map((file) =>
      uploadToCloudinary(file.buffer, "products"),
    );
    const results = await Promise.all(uploadPromises);
    const urls = results.map((r) => r.images.original);

    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Files uploaded successfully",
      data: urls,
    });
  }),
);

export const UploadRoutes = router;
