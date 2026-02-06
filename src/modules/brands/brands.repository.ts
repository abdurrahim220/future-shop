import { QueryBuilder } from "../../queryBuilder/QueryBuilder";
import { IBrands } from "./brands.interface";
import { BrandsModel } from "./brands.model";

class BrandsRepository {
  async findAllBrands(query: Record<string, unknown>) {
    const qb = new QueryBuilder<IBrands>(query)
      .search(["name"])
      .filterBy(["isActive"])
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
    const result = await BrandsModel.aggregate(pipeline);
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

  async createBrands(data: IBrands) {
    return BrandsModel.create(data);
  }

  async findBrandsById(id: string) {
    return BrandsModel.findById(id);
  }

  async updateBrands(id: string, data: Partial<IBrands>) {
    return BrandsModel.updateOne({ _id: id }, data);
  }

  async deleteBrands(id: string) {
    return BrandsModel.deleteOne({ _id: id });
  }
}

export default BrandsRepository;
