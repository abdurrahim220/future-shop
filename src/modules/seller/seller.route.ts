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
router.use(auth(userRole.seller));
const sellerRepository = new SellerRepository();
const sellerService = new SellerService(sellerRepository);
const sellerController = new SellerController(sellerService);

router.post("/request", sellerController.requestForSeller);
router.post(
  "/",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
    { name: "tradeLicense", maxCount: 1 },
  ]),
  zodValidate(createSellerZodSchema),
  sellerController.createSeller,
);
router.get("/", zodValidate(sellerZodQuery), sellerController.getAllSellers);
router.get("/:id", sellerController.getSellerById);
router.put(
  "/:id",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
    { name: "tradeLicense", maxCount: 1 },
  ]),
  zodValidate(updateSellerZodSchema),
  sellerController.updateSeller,
);
router.delete("/:id", sellerController.deleteSeller);

export const SellerRoutes = router;
