import { Router } from "express";
import PayoutController from "./payout.controller";
import PayoutService from "./payout.services";
import PayoutRepository from "./payout.repository";
import zodValidate from "../../middleware/zodValidate";
import { createPayoutZodSchema, updatePayoutZodSchema } from "./payout.zod";

const router = Router();

const payoutRepository = new PayoutRepository();
const payoutService = new PayoutService(payoutRepository);
const payoutController = new PayoutController(payoutService);

router.post(
  "/",
  zodValidate(createPayoutZodSchema),
  payoutController.createPayout,
);
router.get("/", payoutController.getAllPayouts);
router.get("/:id", payoutController.getPayoutById);
router.put(
  "/:id",
  zodValidate(updatePayoutZodSchema),
  payoutController.updatePayout,
);
router.delete("/:id", payoutController.deletePayout);

export const PayoutRoutes = router;
