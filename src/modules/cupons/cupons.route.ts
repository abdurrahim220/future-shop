import { Router } from "express";
import CuponsController from "./cupons.controller";
import CuponsService from "./cupons.services";
import CuponsRepository from "./cupons.repository";
import zodValidate from "../../middleware/zodValidate";
import { createCuponsZodSchema, updateCuponsZodSchema } from "./cupons.zod";

const router = Router();

const cuponsRepository = new CuponsRepository();
const cuponsService = new CuponsService(cuponsRepository);
const cuponsController = new CuponsController(cuponsService);

router.post(
  "/",
  zodValidate(createCuponsZodSchema),
  cuponsController.createCupons,
);
router.get("/", cuponsController.getAllCuponss);
router.get("/:id", cuponsController.getCuponsById);
router.put(
  "/:id",
  zodValidate(updateCuponsZodSchema),
  cuponsController.updateCupons,
);
router.delete("/:id", cuponsController.deleteCupons);

export const CuponsRoutes = router;
