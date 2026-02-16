import { Router } from "express";
import ComboOffersController from "./combooffers.controller";
import ComboOffersService from "./combooffers.services";
import ComboOffersRepository from "./combooffers.repository";
import zodValidate from "../../middleware/zodValidate";
import { createComboOffersZodSchema, updateComboOffersZodSchema } from "./combooffers.zod";

const router = Router();

const combooffersRepository = new ComboOffersRepository();
const combooffersService = new ComboOffersService(combooffersRepository);
const combooffersController = new ComboOffersController(combooffersService);

router.post("/", zodValidate(createComboOffersZodSchema), combooffersController.createComboOffers);
router.get("/", combooffersController.getAllComboOfferss);
router.get("/:id", combooffersController.getComboOffersById);
router.put("/:id", zodValidate(updateComboOffersZodSchema), combooffersController.updateComboOffers);
router.delete("/:id", combooffersController.deleteComboOffers);

export const ComboOffersRoutes = router;