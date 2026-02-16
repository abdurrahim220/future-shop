import { ICampaign } from "./campaign.interface";
import { CampaignModel } from "./campaign.model";

class CampaignRepository {
  async findAllCampaigns() {
    return CampaignModel.find();
  }

  async createCampaign(data: ICampaign) {
    return CampaignModel.create(data);
  }

  async findCampaignById(id: string) {
    return CampaignModel.findById(id);
  }

  async updateCampaign(id: string, data: Partial<ICampaign>) {
    return CampaignModel.updateOne({ _id: id }, data);
  }

  async deleteCampaign(id: string) {
    return CampaignModel.deleteOne({ _id: id });
  }
}

export default CampaignRepository;