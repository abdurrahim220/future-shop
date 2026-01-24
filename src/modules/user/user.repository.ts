import { Types } from "mongoose";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";
import { QueryBuilder } from "../../queryBuilder/QueryBuilder";

class UserRepository {
  async findAllUsers(query: Record<string, unknown>) {
    const qb = new QueryBuilder<IUser>(query)
      .search(["name", "email"])
      .filterBy(["role", "status", "isVerified"])
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
                password: 0,
                __v: 0,
              },
            },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
    ];

    const result = await UserModel.aggregate(pipeline);

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

  createUser(data: IUser) {
    return UserModel.create(data);
  }

  findUserByOtp(otp: number) {
    return UserModel.findOne({ otp });
  }

  verifyUserOtp(userId: Types.ObjectId) {
    return UserModel.updateOne(
      { _id: userId },
      {
        $set: {
          isVerified: true,
        },
        $unset: {
          otp: " ",
          otpExpires: " ",
        },
      },
    );
  }

  findUserById(id: string) {
    return UserModel.findById(id);
  }

  updateUser(id: string, data: IUser) {
    return UserModel.updateOne({ _id: id }, data);
  }
  changeUserPassword(userId: string, newPassword: string) {
    return UserModel.updateOne(
      { _id: userId },
      {
        password: newPassword,
        passwordChangedAt: new Date(),
      },
    );
  }

  deleteUser(id: string) {
    return UserModel.deleteOne({ _id: id });
  }
}

export default UserRepository;
