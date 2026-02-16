import { Router } from "express";
import OrderController from "./order.controller";
import OrderService from "./order.services";
import OrderRepository from "./order.repository";
import zodValidate from "../../middleware/zodValidate";
import { createOrderZodSchema, updateOrderZodSchema } from "./order.zod";

const router = Router();

const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);

router.post(
  "/",
  zodValidate(createOrderZodSchema),
  orderController.createOrder,
);
router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.put(
  "/:id",
  zodValidate(updateOrderZodSchema),
  orderController.updateOrder,
);
router.delete("/:id", orderController.deleteOrder);

export const OrderRoutes = router;
