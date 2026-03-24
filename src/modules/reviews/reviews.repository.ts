import { IReviews } from "./reviews.interface";
import { ReviewsModel } from "./reviews.model";

class ReviewsRepository {
  async findAllReviewss() {
    return ReviewsModel.find();
  }

  async createReviews(data: IReviews) {
    return ReviewsModel.create(data);
  }

  async findReviewsById(id: string) {
    return ReviewsModel.findById(id);
  }

  async updateReviews(id: string, data: Partial<IReviews>) {
    return ReviewsModel.updateOne({ _id: id }, data);
  }

  async deleteReviews(id: string) {
    return ReviewsModel.deleteOne({ _id: id });
  }
}

export default ReviewsRepository;
