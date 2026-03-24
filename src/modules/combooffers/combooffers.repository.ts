import { PipelineStage } from "mongoose";
import { QueryBuilder } from "../../queryBuilder/QueryBuilder";
import { IComboOffers } from "./combooffers.interface";
import { ComboOffersModel } from "./combooffers.model";

class ComboOffersRepository {
  async findAllComboOfferss(query: Record<string, unknown>) {
    const qb = new QueryBuilder<IComboOffers>(query)
      .search(["title"])
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

    const result = await ComboOffersModel.aggregate(
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

  async createComboOffers(data: IComboOffers) {
    return ComboOffersModel.create(data);
  }

  async findComboOffersById(id: string) {
    return ComboOffersModel.findById(id);
  }

  async updateComboOffers(id: string, data: Partial<IComboOffers>) {
    return ComboOffersModel.updateOne({ _id: id }, data);
  }

  async deleteComboOffers(id: string) {
    return ComboOffersModel.deleteOne({ _id: id });
  }
}

export default ComboOffersRepository;
