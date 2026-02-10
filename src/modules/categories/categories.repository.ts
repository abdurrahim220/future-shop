import { QueryBuilder } from "../../queryBuilder/QueryBuilder";
import { ICategories } from "./categories.interface";
import { CategoriesModel } from "./categories.model";

class CategoriesRepository {
  async findAllCategoriess(query: Record<string, unknown>) {
    const qb = new QueryBuilder<ICategories>(query)
      .search(["name", "slug"])
      .filterBy(["isActive", "isFeatured"])
      .sortBy()
      .paginate();
    const { filter, sort, skip, limit, meta } = qb.build();

    const pipeline = [
      {
        $match: filter,
      },
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
    const result = await CategoriesModel.aggregate(pipeline);
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

  async createCategories(data: ICategories) {
    return CategoriesModel.create(data);
  }

  async findCategoriesById(id: string) {
    return CategoriesModel.findById(id);
  }

  async updateCategories(id: string, data: Partial<ICategories>) {
    return CategoriesModel.updateOne({ _id: id }, data);
  }

  async deleteCategories(id: string) {
    return CategoriesModel.deleteOne({ _id: id });
  }
}

export default CategoriesRepository;
