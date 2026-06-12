import { BkashTokenModel } from "./bkash.model";

class BkashRepository {
  async findValidToken() {
    // Find a token whose expiration time is greater than the current time
    return BkashTokenModel.findOne({ expiresAt: { $gt: new Date() } });
  }

  async saveToken(token: string, expiresAt: Date) {
    return BkashTokenModel.create({ token, expiresAt });
  }
}

export default BkashRepository;
