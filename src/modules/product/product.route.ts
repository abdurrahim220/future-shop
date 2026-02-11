import { Router } from "express";
import ProductController from "./product.controller";
import ProductService from "./product.services";
import ProductRepository from "./product.repository";
import zodValidate from "../../middleware/zodValidate";
import { createProductSchema } from "./product.zod";

const router = Router();

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

router.post(
  "/",
  zodValidate(createProductSchema),
  productController.createProduct,
);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put(
  "/:id",
  zodValidate(upda),
  productController.updateProduct,
);
router.delete("/:id", productController.deleteProduct);

export const ProductRoutes = router;
