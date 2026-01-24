import { Router } from "express";
import { AuthService } from "./auth.services";
import { AuthController } from "./auth.controller";
const router = Router();

const authService = new AuthService();
const authController = new AuthController(authService);

router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);

export const authRoute = router;
