import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { IReviews } from "./reviews.interface";
import ReviewsRepository from "./reviews.repository";

class ReviewsService {
  constructor(private reviewsRepo: ReviewsRepository) {}

  async createReviews(data: IReviews) {
    return this.reviewsRepo.createReviews(data);
  }

  async findAllReviewss() {
    return this.reviewsRepo.findAllReviewss();
  }

  async findReviewsById(id: string) {
    if (!id) {
      throw new AppError("Enter a valid reviews Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.reviewsRepo.findReviewsById(id);
  }

  async updateReviews(id: string, data: Partial<IReviews>) {
    if (!id) {
      throw new AppError("Enter a valid reviews Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.reviewsRepo.updateReviews(id, data);
  }

  async deleteReviews(id: string) {
    return this.reviewsRepo.deleteReviews(id);
  }
}

export default ReviewsService;