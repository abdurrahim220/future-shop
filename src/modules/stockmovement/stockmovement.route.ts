import { Router } from "express";
import StockMovementController from "./stockmovement.controller";
import StockMovementService from "./stockmovement.services";
import StockMovementRepository from "./stockmovement.repository";
import zodValidate from "../../middleware/zodValidate";
import {
  createStockMovementZodSchema,
  updateStockMovementZodSchema,
} from "./stockmovement.zod";

const router = Router();

const stockmovementRepository = new StockMovementRepository();
const stockmovementService = new StockMovementService(stockmovementRepository);
const stockmovementController = new StockMovementController(
  stockmovementService,
);

router.post(
  "/",
  zodValidate(createStockMovementZodSchema),
  stockmovementController.createStockMovement,
);
router.get("/", stockmovementController.getAllStockMovements);
router.get("/:id", stockmovementController.getStockMovementById);
router.put(
  "/:id",
  zodValidate(updateStockMovementZodSchema),
  stockmovementController.updateStockMovement,
);
router.delete("/:id", stockmovementController.deleteStockMovement);

export const StockMovementRoutes = router;
