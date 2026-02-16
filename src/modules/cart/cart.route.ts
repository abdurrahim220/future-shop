import { Router } from "express";
import CartController from "./cart.controller";
import CartService from "./cart.services";
import CartRepository from "./cart.repository";
import zodValidate from "../../middleware/zodValidate";
import { createCartZodSchema, updateCartZodSchema } from "./cart.zod";
import auth from "../../middleware/auth";
import { userRole } from "../../interface/Role";

const router = Router();

const cartRepository = new CartRepository();
const cartService = new CartService(cartRepository);
const cartController = new CartController(cartService);

router.use(auth(userRole.customer,userRole.admin,userRole.seller))
router.post("/", zodValidate(createCartZodSchema), cartController.createCart);
router.get("/", cartController.getAllCarts);
router.get("/:id", cartController.getCartById);
router.put("/:id", zodValidate(updateCartZodSchema), cartController.updateCart);
router.delete("/:id", cartController.deleteCart);

export const CartRoutes = router;
