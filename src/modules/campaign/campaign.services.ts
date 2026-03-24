import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { ICampaign } from "./campaign.interface";
import CampaignRepository from "./campaign.repository";

class CampaignService {
  constructor(private campaignRepo: CampaignRepository) {}

  async createCampaign(data: ICampaign) {
    return this.campaignRepo.createCampaign(data);
  }

  async findAllCampaigns(query: Record<string, unknown>) {
    return this.campaignRepo.findAllCampaigns(query);
  }

  async findCampaignById(id: string) {
    if (!id) {
      throw new AppError("Enter a valid campaign Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.campaignRepo.findCampaignById(id);
  }

  async updateCampaign(id: string, data: Partial<ICampaign>) {
    if (!id) {
      throw new AppError("Enter a valid campaign Id", HTTP_STATUS.NOT_FOUND);
    }
    return this.campaignRepo.updateCampaign(id, data);
  }

  async deleteCampaign(id: string) {
    return this.campaignRepo.deleteCampaign(id);
  }
}

export default CampaignService;
