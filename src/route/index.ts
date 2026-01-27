import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoute } from "../modules/auth/auth.route";
import { auditLogsRouter } from "../modules/auditLogs/auditLog.route";

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
    path: "/audit-logs",
    route: auditLogsRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
