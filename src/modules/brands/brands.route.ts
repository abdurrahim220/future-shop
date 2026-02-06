import { Router } from "express";
import BrandsController from "./brands.controller";
import BrandsService from "./brands.services";
import BrandsRepository from "./brands.repository";
import zodValidate from "../../middleware/zodValidate";
import { createBrandsZodSchema, updateBrandsZodSchema } from "./brands.zod";

const router = Router();

const brandsRepository = new BrandsRepository();
const brandsService = new BrandsService(brandsRepository);
const brandsController = new BrandsController(brandsService);

router.post(
  "/",
  zodValidate(createBrandsZodSchema),
  brandsController.createBrands,
);
router.get("/", brandsController.getAllBrandss);
router.get("/:id", brandsController.getBrandsById);
router.put(
  "/:id",
  zodValidate(updateBrandsZodSchema),
  brandsController.updateBrands,
);
router.delete("/:id", brandsController.deleteBrands);

export const BrandsRoutes = router;
