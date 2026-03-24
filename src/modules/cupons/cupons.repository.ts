import { PipelineStage } from "mongoose";
import { QueryBuilder } from "../../queryBuilder/QueryBuilder";
import { ICupons } from "./cupons.interface";
import { CuponsModel } from "./cupons.model";

class CuponsRepository {
  async findAllCuponss(query: Record<string, unknown>) {
    const qb = new QueryBuilder<ICupons>(query)
      .search(["code"])
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

    const result = await CuponsModel.aggregate(
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

  async createCupons(data: ICupons) {
    return CuponsModel.create(data);
  }

  async findCuponsById(id: string) {
    return CuponsModel.findById(id);
  }

  async updateCupons(id: string, data: Partial<ICupons>) {
    return CuponsModel.updateOne({ _id: id }, data);
  }

  async deleteCupons(id: string) {
    return CuponsModel.deleteOne({ _id: id });
  }
}

export default CuponsRepository;
