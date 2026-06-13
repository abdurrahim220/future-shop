import { Router } from "express";
import BrandsController from "./brands.controller";
import BrandsService from "./brands.services";
import BrandsRepository from "./brands.repository";
import zodValidate from "../../middleware/zodValidate";
import {
  brandSearchZodSchema,
  createBrandsZodSchema,
  updateBrandsZodSchema,
} from "./brands.zod";
import upload from "../../middleware/uploadMiddleware";
import auth from "../../middleware/auth";
import { userRole } from "../../interface/Role";

const router = Router();

const brandsRepository = new BrandsRepository();
const brandsService = new BrandsService(brandsRepository);
const brandsController = new BrandsController(brandsService);

router.post(
  "/",
  auth(userRole.seller, userRole.admin),
  upload.single("logo"),
  zodValidate(createBrandsZodSchema),
  brandsController.createBrands,
);
router.get(
  "/",
  zodValidate(brandSearchZodSchema),
  brandsController.getAllBrands,
);
router.get("/:id", brandsController.getBrandsById);
router.put(
  "/:id",
  auth(userRole.seller, userRole.admin),
  upload.single("logo"),
  zodValidate(updateBrandsZodSchema),
  brandsController.updateBrands,
);
router.delete("/:id", auth(userRole.seller, userRole.admin), brandsController.deleteBrands);

export const BrandsRoutes = router;
