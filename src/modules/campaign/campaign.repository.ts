import { PipelineStage } from "mongoose";
import { QueryBuilder } from "../../queryBuilder/QueryBuilder";
import { ICampaign } from "./campaign.interface";
import { CampaignModel } from "./campaign.model";

class CampaignRepository {
  async findAllCampaigns(query: Record<string, unknown>) {
    const qb = new QueryBuilder<ICampaign>(query)
      .search(["title", "slug"])
      .filterBy(["status"])
      .sortBy()
      .paginate();

    const { filter, sort, skip, limit, meta } = qb.build();

    const pipeline = [
      { $match: filter },
      {
        $facet: {
          data: [
            { $sort: sort },
            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                __v: 0,
              },
            },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
    ];

    const result = await CampaignModel.aggregate(
      pipeline as unknown as PipelineStage[],
    );
    const items = result[0]?.data ?? [];
    const total = result[0]?.totalCount[0]?.count ?? 0;

    return {
      items,
      meta: {
        ...meta,
        total,
        totalPages: Math.ceil(total / meta.limit),
      },
    };
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
