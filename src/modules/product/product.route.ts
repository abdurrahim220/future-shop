import { Router } from "express";
import zodValidate from "../../middleware/zodValidate";
import {
  bulkCreateVariantsSchema,
  createProductSchema,
  createVariantSchema,
  updateProductSchema,
} from "./product.zod";
import productController from "./product.controller";
import auth from "../../middleware/auth";
import { userRole } from "../../interface/Role";

const router = Router();

// Public routes
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

// Protected routes (Seller only)
router.post(
  "/",
  auth(userRole.seller, userRole.admin),
  zodValidate(createProductSchema),
  productController.createProduct,
);

router.put(
  "/:id",
  auth(userRole.seller, userRole.admin),
  zodValidate(updateProductSchema),
  productController.updateProduct,
);

router.post(
  "/:productId/variants",
  auth(userRole.seller, userRole.admin),
  zodValidate(createVariantSchema),
  productController.createVariant,
);

router.post(
  "/:productId/variants/bulk",
  auth(userRole.seller, userRole.admin),
  zodValidate(bulkCreateVariantsSchema),
  productController.bulkCreateVariants,
);

router.put(
  "/:productId/variants/:variantId",
  auth(userRole.seller, userRole.admin),
  productController.updateVariant,
);

export const ProductRoutes = router;
