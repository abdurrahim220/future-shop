import { Router } from "express";
import AttributeController from "./attribute.controller";
import AttributeService from "./attribute.services";
import AttributeRepository from "./attribute.repository";
import zodValidate from "../../middleware/zodValidate";
import {
  createAttributeZodSchema,
  updateAttributeZodSchema,
} from "./attribute.zod";

const router = Router();

const attributeRepository = new AttributeRepository();
const attributeService = new AttributeService(attributeRepository);
const attributeController = new AttributeController(attributeService);

router.post(
  "/",
  zodValidate(createAttributeZodSchema),
  attributeController.createAttribute,
);
router.get("/", attributeController.getAllAttributes);
router.get("/:id", attributeController.getAttributeById);
router.put(
  "/:id",
  zodValidate(updateAttributeZodSchema),
  attributeController.updateAttribute,
);
router.delete("/:id", attributeController.deleteAttribute);

export const AttributeRoutes = router;
