import { Router } from "express";
import SellerController from "./seller.controller";
import SellerService from "./seller.services";
import SellerRepository from "./seller.repository";
import zodValidate from "../../middleware/zodValidate";
import {
  createSellerZodSchema,
  updateSellerZodSchema,
  sellerZodQuery,
} from "./seller.zod";
import auth from "../../middleware/auth";
import upload from "../../middleware/uploadMiddleware";
import { userRole } from "../../interface/Role";

const router = Router();
const sellerRepository = new SellerRepository();
const sellerService = new SellerService(sellerRepository);
const sellerController = new SellerController(sellerService);

router.post(
  "/request",
  auth(userRole.customer, userRole.seller, userRole.admin),
  sellerController.requestForSeller,
);
router.post(
  "/",
  auth(userRole.seller, userRole.admin),
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
    { name: "tradeLicense", maxCount: 1 },
  ]),
  zodValidate(createSellerZodSchema),
  sellerController.createSeller,
);
router.get(
  "/",
  auth(userRole.admin, userRole.seller),
  zodValidate(sellerZodQuery),
  sellerController.getAllSellers,
);
router.get("/public/:id", sellerController.getPublicSellerById);
router.get(
  "/:id",
  auth(userRole.admin, userRole.seller),
  sellerController.getSellerById,
);
router.put(
  "/:id",
  auth(userRole.admin, userRole.seller),
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
    { name: "tradeLicense", maxCount: 1 },
  ]),
  zodValidate(updateSellerZodSchema),
  sellerController.updateSeller,
);
router.delete("/:id", auth(userRole.admin), sellerController.deleteSeller);

export const SellerRoutes = router;
