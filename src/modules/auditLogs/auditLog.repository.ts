import { QueryBuilder } from "../../queryBuilder/QueryBuilder";
import { IAuditLog } from "./auditLog.interface";
import { AuditLogModel } from "./auditLog.model";

class AuditLogRepository {
  async findAllUsers(query: Record<string, unknown>) {
    const qb = new QueryBuilder<IAuditLog>(query)
      .search(["performedByRole", "action"])
      .filterBy(["entityType"])
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
            {
              $sort: sort,
            },
            {
              $skip: skip,
            },
            {
              $limit: limit,
            },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
    ];

    const result = await AuditLogModel.aggregate(pipeline);

    const item = result[0]?.data ?? [];
    const total = result[0]?.totalCount[0]?.count ?? 0;
    return {
      item,
      meta: {
        ...meta,
        total,
        totalPages: Math.ceil(total / meta.limit),
      },
    };
  }
}

export default AuditLogRepository;
