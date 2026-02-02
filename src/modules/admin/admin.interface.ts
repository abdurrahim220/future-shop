import { Role } from "../../interface/Role";

export interface IAdminUserRole {
  userId: string;
  role: Role;
  sellerRequest?: string;
}
