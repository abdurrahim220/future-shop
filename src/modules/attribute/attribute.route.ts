import { Router } from "express";
import AttributeController from "./attribute.controller";
import AttributeService from "./attribute.services";
import AttributeRepository from "./attribute.repository";
import zodValidate from "../../middleware/zodValidate";
import {
  createAttributeZodSchema,
  updateAttributeZodSchema,
} from "./attribute.zod";
import auth from "../../middleware/auth";
import { userRole } from "../../interface/Role";

const router = Router();

const attributeRepository = new AttributeRepository();
const attributeService = new AttributeService(attributeRepository);
const attributeController = new AttributeController(attributeService);

router.post(
  "/",
  auth(userRole.seller, userRole.admin),
  zodValidate(createAttributeZodSchema),
  attributeController.createAttribute,
);
router.get("/", attributeController.getAllAttributes);
router.get("/:id", attributeController.getAttributeById);
router.put(
  "/:id",
  auth(userRole.seller, userRole.admin),
  zodValidate(updateAttributeZodSchema),
  attributeController.updateAttribute,
);
router.delete("/:id", auth(userRole.seller, userRole.admin), attributeController.deleteAttribute);

export const AttributeRoutes = router;
