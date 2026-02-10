import { SellerRequestStatus } from "../../interface/allstatus";
import { Role } from "../../interface/Role";

export interface IAdminUserRole {
  userId: string;
  role: Role;
  sellerRequest?: string;
}

export interface IUpdateSellerRequest {
  sellerId: string;
  sellerRequest: SellerRequestStatus;
}
