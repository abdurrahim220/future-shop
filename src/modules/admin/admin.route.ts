import { Router } from "express";
import AdminController from "./admin.controller";
import AdminService from "./admin.services";
import UserRepository from "../user/user.repository";
import { userRole } from "../../interface/Role";
import auth from "../../middleware/auth";
import zodValidate from "../../middleware/zodValidate";
import { AdminValidation } from "./admin.zod";
import SellerRepository from "../seller/seller.repository";

const router = Router();

const userRepository = new UserRepository();
const sellerRepository = new SellerRepository();
const adminService = new AdminService(userRepository, sellerRepository);
const adminController = new AdminController(adminService);

router.use(auth(userRole.admin));

router.get(
  "/",
  zodValidate(AdminValidation.getAllUsersSchema),
  adminController.getAllUsers,
);
router.patch(
  "/change-role",
  zodValidate(AdminValidation.changeUserRoleZodSchema),
  adminController.changeUserRole,
);
router.patch(
  "/update-seller-request",
  zodValidate(AdminValidation.updateSellerRequestZodSchema),
  adminController.updateSellerRequest,
);
router.patch("/block-user/:userId", adminController.blockUser);
router.patch("/unblock-user/:userId", adminController.unblockUser);
router.patch("/restore-user/:userId", adminController.restoreUser);
router.delete("/delete-user/:userId", adminController.deleteUser);

export const adminRoutes = router;
