import { Router } from "express";
import SellerController from "./seller.controller";
import SellerService from "./seller.services";
import SellerRepository from "./seller.repository";
import zodValidate from "../../middleware/zodValidate";
import { createSellerZodSchema, updateSellerZodSchema } from "./seller.zod";

const router = Router();

const sellerRepository = new SellerRepository();
const sellerService = new SellerService(sellerRepository);
const sellerController = new SellerController(sellerService);

router.post(
  "/",
  zodValidate(createSellerZodSchema),
  sellerController.createSeller,
);
router.get("/", sellerController.getAllSellers);
router.get("/:id", sellerController.getSellerById);
router.put(
  "/:id",
  zodValidate(updateSellerZodSchema),
  sellerController.updateSeller,
);
router.delete("/:id", sellerController.deleteSeller);

export const SellerRoutes = router;
