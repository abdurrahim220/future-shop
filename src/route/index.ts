import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoute } from "../modules/auth/auth.route";
import { auditLogsRouter } from "../modules/auditLogs/auditLog.route";
import { adminRoutes } from "../modules/admin/admin.route";
import { SellerWalletRoutes } from "../modules/sellerwallet/sellerwallet.route";
import { PayoutRoutes } from "../modules/payout/payout.route";
import { BranchesRoutes } from "../modules/branches/branches.route";
import { AddressRoutes } from "../modules/address/address.route";
import { SellerRoutes } from "../modules/seller/seller.route";
import { BrandsRoutes } from "../modules/brands/brands.route";
import { CategoriesRoutes } from "../modules/categories/categories.route";
import { StockMovementRoutes } from "../modules/stockmovement/stockmovement.route";
import { BranchInventoryRoutes } from "../modules/branchinventory/branchinventory.route";
import { ProductRoutes } from "../modules/product/product.route";
import { StockTransferRoutes } from "../modules/stocktransfer/stocktransfer.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/admin",
    route: adminRoutes,
  },
  {
    path: "/audit-logs",
    route: auditLogsRouter,
  },
  {
    path: "/seller",
    route: SellerRoutes,
  },
  {
    path: "/seller-wallet",
    route: SellerWalletRoutes,
  },
  {
    path: "/payout",
    route: PayoutRoutes,
  },
  {
    path: "/branches",
    route: BranchesRoutes,
  },
  {
    path: "/address",
    route: AddressRoutes,
  },
  {
    path: "/brands",
    route: BrandsRoutes,
  },
  {
    path: "/categories",
    route: CategoriesRoutes,
  },
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/branch-inventory",
    route: BranchInventoryRoutes,
  },
  {
    path: "/stock-movement",
    route: StockMovementRoutes,
  },
  {
    path: "/stock-transfer",
    route: StockTransferRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
