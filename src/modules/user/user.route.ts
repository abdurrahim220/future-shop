import { Router } from "express";
import UserController from "./user.controller";
import UserService from "./user.services";
import UserRepository from "./user.repository";
import zodValidate from "../../middleware/zodValidate";
import { UserValidation } from "./user.zod";
import auth from "../../middleware/auth";
import { userRole } from "../../interface/Role";

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post(
  "/",
  zodValidate(UserValidation.createUserZodSchema),
  userController.createUser,
);

router.get(
  "/",
  zodValidate(UserValidation.getAllUsersSchema),
  userController.getAllUsers,
);
router.get("/:id", userController.getUserById);
router.put(
  "/",
  zodValidate(UserValidation.updateUserZodSchema),
  auth(userRole.admin, userRole.seller, userRole.customer),
  userController.updateUser,
);
router.patch(
  "/verify-otp",
  zodValidate(UserValidation.verifyUserOtpZodSchema),
  userController.verifyUserOtp,
);
router.patch(
  "/change-password/:id",
  zodValidate(UserValidation.changePasswordZodSchema),
  userController.updateUserPassword,
);
router.delete("/:id", userController.deleteUser);

export const userRoutes = router;
