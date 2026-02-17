import { Router } from "express";
import ReviewsController from "./reviews.controller";
import ReviewsService from "./reviews.services";
import ReviewsRepository from "./reviews.repository";
import zodValidate from "../../middleware/zodValidate";
import { createReviewsZodSchema, updateReviewsZodSchema } from "./reviews.zod";
import upload from "../../middleware/uploadMiddleware";

const router = Router();

const reviewsRepository = new ReviewsRepository();
const reviewsService = new ReviewsService(reviewsRepository);
const reviewsController = new ReviewsController(reviewsService);

router.post(
  "/",
  upload.array("images", 5),
  zodValidate(createReviewsZodSchema),
  reviewsController.createReviews,
);
router.get("/", reviewsController.getAllReviewss);
router.get("/:id", reviewsController.getReviewsById);
router.put(
  "/:id",
  upload.array("images", 5),
  zodValidate(updateReviewsZodSchema),
  reviewsController.updateReviews,
);
router.delete("/:id", reviewsController.deleteReviews);

export const ReviewsRoutes = router;
