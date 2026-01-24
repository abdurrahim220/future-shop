import type { QueryFilter } from "mongoose";

type QueryParams = Record<string, unknown>;
type SortOrder = 1 | -1;

interface BuildResult<T> {
  filter: QueryFilter<T>;
  sort: Record<string, SortOrder>;
  skip: number;
  limit: number;
  meta: {
    page: number;
    limit: number;
  };
}

export class QueryBuilder<T> {
  private readonly query: QueryParams;
  private filter: QueryFilter<T> = {};
  private sort: Record<string, SortOrder> = { createdAt: -1 };
  private page = 1;
  private limit = 20;

  constructor(query: QueryParams) {
    this.query = query;
  }

  /**
   * Case-insensitive search across multiple fields
   */
  search(fields: (keyof T)[]): this {
    const search = this.query.search;

    if (typeof search === "string" && search.trim()) {
      const orConditions = fields.map((field) => ({
        [field]: { $regex: search, $options: "i" },
      }));

      this.filter = {
        ...this.filter,
        $or: orConditions,
      } as QueryFilter<T>;
    }

    return this;
  }

  /**
   * Exact-match filtering (whitelisted fields only)
   */
  filterBy(allowedFields: (keyof T)[]): this {
    Object.entries(this.query).forEach(([key, value]) => {
      if (allowedFields.includes(key as keyof T) && value !== undefined) {
        this.filter = {
          ...this.filter,
          [key]: value,
        } as QueryFilter<T>;
      }
    });

    return this;
  }

  /**
   * Date range filtering (ISO strings)
   * Example:
   * ?createdAtFrom=2026-01-01
   * &createdAtTo=2026-01-31
   */
  dateRange(field: keyof T): this {
    const from = this.query[`${String(field)}From`];
    const to = this.query[`${String(field)}To`];

    const range: Record<string, Date> = {};

    if (typeof from === "string") {
      const fromDate = new Date(from);
      if (!Number.isNaN(fromDate.getTime())) {
        range.$gte = fromDate;
      }
    }

    if (typeof to === "string") {
      const toDate = new Date(to);
      if (!Number.isNaN(toDate.getTime())) {
        range.$lte = toDate;
      }
    }

    if (Object.keys(range).length > 0) {
      this.filter = {
        ...this.filter,
        [field]: range,
      } as QueryFilter<T>;
    }

    return this;
  }

  /**
   * Sorting logic
   */
  sortBy(defaultSort: Record<string, SortOrder> = { createdAt: -1 }): this {
    const sortBy = this.query.sortBy;
    const sortOrder = this.query.sortOrder;

    if (typeof sortBy === "string") {
      this.sort = {
        [sortBy]: sortOrder === "asc" ? 1 : -1,
      };
    } else {
      this.sort = defaultSort;
    }

    return this;
  }

  /**
   * Pagination logic
   */
  paginate(defaultLimit = 20): this {
    const page = this.query.page;
    const limit = this.query.limit;

    this.page = typeof page === "string" && Number(page) > 0 ? Number(page) : 1;

    this.limit =
      typeof limit === "string" && Number(limit) > 0
        ? Number(limit)
        : defaultLimit;

    return this;
  }

  /**
   * Final output
   */
  build(): BuildResult<T> {
    const skip = (this.page - 1) * this.limit;

    return {
      filter: this.filter,
      sort: this.sort,
      skip,
      limit: this.limit,
      meta: {
        page: this.page,
        limit: this.limit,
      },
    };
  }
}
