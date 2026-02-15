import { Router } from "express";
import StockTransferController from "./stocktransfer.controller";
import StockTransferService from "./stocktransfer.services";
import StockTransferRepository from "./stocktransfer.repository";
import zodValidate from "../../middleware/zodValidate";
import {
  createStockTransferZodSchema,
  updateStockTransferZodSchema,
} from "./stocktransfer.zod";

const router = Router();

const stocktransferRepository = new StockTransferRepository();
const stocktransferService = new StockTransferService(stocktransferRepository);
const stocktransferController = new StockTransferController(
  stocktransferService,
);

router.post(
  "/",
  zodValidate(createStockTransferZodSchema),
  stocktransferController.createStockTransfer,
);
router.get("/", stocktransferController.getAllStockTransfers);
router.get("/:id", stocktransferController.getStockTransferById);
router.put(
  "/:id",
  zodValidate(updateStockTransferZodSchema),
  stocktransferController.updateStockTransfer,
);
router.delete("/:id", stocktransferController.deleteStockTransfer);

export const StockTransferRoutes = router;
