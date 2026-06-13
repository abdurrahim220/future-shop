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
import auth from "../../middleware/auth";
import { userRole } from "../../interface/Role";

const router = Router();
const categoriesRepository = new CategoriesRepository();
const categoriesService = new CategoriesService(categoriesRepository);
const categoriesController = new CategoriesController(categoriesService);

// Public routes
router.get(
  "/",
  zodValidate(categoriesQueryZodSchema),
  categoriesController.getAllCategoriess,
);
router.get("/:id", categoriesController.getCategoriesById);

// Protected routes (Seller / Admin only)
router.post(
  "/",
  auth(userRole.seller, userRole.admin),
  upload.single("icon"),
  zodValidate(createCategoriesZodSchema),
  categoriesController.createCategories,
);
router.put(
  "/:id",
  auth(userRole.seller, userRole.admin),
  upload.single("icon"),
  zodValidate(updateCategoriesZodSchema),
  categoriesController.updateCategories,
);
router.delete(
  "/:id",
  auth(userRole.seller, userRole.admin),
  categoriesController.deleteCategories,
);

export const CategoriesRoutes = router;
