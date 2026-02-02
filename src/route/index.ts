import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoute } from "../modules/auth/auth.route";
import { auditLogsRouter } from "../modules/auditLogs/auditLog.route";
import { adminRoutes } from "../modules/admin/admin.route";
import { SellerWalletRoutes } from "../modules/sellerwallet/sellerwallet.route";

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
    path: "/seller-wallet",
    route: SellerWalletRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
