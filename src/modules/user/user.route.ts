import { Router } from "express";
import UserController from "./user.controller";
import UserService from "./user.services";
import UserRepository from "./user.repository";
import zodValidate from "../../middleware/zodValidate";
import { UserValidation } from "./user.zod";

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post(
  "/",
  zodValidate(UserValidation.createUserZodSchema),
  userController.createUser,
);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put(
  "/:id",
  zodValidate(UserValidation.updateUserZodSchema),
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
