import { Router } from "express";
import SubOrderController from "./suborder.controller";
import SubOrderService from "./suborder.services";
import SubOrderRepository from "./suborder.repository";
import zodValidate from "../../middleware/zodValidate";
import {
  createSubOrderZodSchema,
  updateSubOrderZodSchema,
} from "./suborder.zod";

const router = Router();

const suborderRepository = new SubOrderRepository();
const suborderService = new SubOrderService(suborderRepository);
const suborderController = new SubOrderController(suborderService);

router.post(
  "/",
  zodValidate(createSubOrderZodSchema),
  suborderController.createSubOrder,
);
router.get("/", suborderController.getAllSubOrders);
router.get("/:id", suborderController.getSubOrderById);
router.put(
  "/:id",
  zodValidate(updateSubOrderZodSchema),
  suborderController.updateSubOrder,
);
router.delete("/:id", suborderController.deleteSubOrder);

export const SubOrderRoutes = router;
