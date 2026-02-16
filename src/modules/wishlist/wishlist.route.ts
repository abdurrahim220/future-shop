import { Router } from "express";
import WishlistController from "./wishlist.controller";
import WishlistService from "./wishlist.services";
import WishlistRepository from "./wishlist.repository";
import zodValidate from "../../middleware/zodValidate";
import {
  createWishlistZodSchema,
  updateWishlistZodSchema,
} from "./wishlist.zod";
import auth from "../../middleware/auth";
import { userRole } from "../../interface/Role";

const router = Router();

const wishlistRepository = new WishlistRepository();
const wishlistService = new WishlistService(wishlistRepository);
const wishlistController = new WishlistController(wishlistService);

router.use(auth(userRole.customer, userRole.admin, userRole.seller));
router.post(
  "/",
  zodValidate(createWishlistZodSchema),
  wishlistController.createWishlist,
);
router.get("/", wishlistController.getAllWishlists);
router.get("/:id", wishlistController.getWishlistById);
router.put(
  "/:id",
  zodValidate(updateWishlistZodSchema),
  wishlistController.updateWishlist,
);
router.delete("/:id", wishlistController.deleteWishlist);

export const WishlistRoutes = router;
