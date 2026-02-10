import { Router } from "express";
import CategoriesController from "./categories.controller";
import CategoriesService from "./categories.services";
import CategoriesRepository from "./categories.repository";
import zodValidate from "../../middleware/zodValidate";
import {
  categoriesQueryZodSchema,
  createCategoriesZodSchema,
  updateCategoriesZodSchema,
} from "./categories.zod";
import upload from "../../middleware/uploadMiddleware";

const router = Router();

const categoriesRepository = new CategoriesRepository();
const categoriesService = new CategoriesService(categoriesRepository);
const categoriesController = new CategoriesController(categoriesService);

router.post(
  "/",
  upload.single("icon"),
  zodValidate(createCategoriesZodSchema),
  categoriesController.createCategories,
);
router.get(
  "/",
  zodValidate(categoriesQueryZodSchema),
  categoriesController.getAllCategoriess,
);
router.get("/:id", categoriesController.getCategoriesById);
router.put(
  "/:id",
  upload.single("icon"),
  zodValidate(updateCategoriesZodSchema),
  categoriesController.updateCategories,
);
router.delete("/:id", categoriesController.deleteCategories);

export const CategoriesRoutes = router;
