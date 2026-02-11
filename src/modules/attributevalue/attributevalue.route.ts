import { Router } from "express";
import AttributeValueController from "./attributevalue.controller";
import AttributeValueService from "./attributevalue.services";
import AttributeValueRepository from "./attributevalue.repository";
import zodValidate from "../../middleware/zodValidate";
import {
  createAttributeValueZodSchema,
  updateAttributeValueZodSchema,
} from "./attributevalue.zod";

const router = Router();

const attributevalueRepository = new AttributeValueRepository();
const attributevalueService = new AttributeValueService(
  attributevalueRepository,
);
const attributevalueController = new AttributeValueController(
  attributevalueService,
);

router.post(
  "/",
  zodValidate(createAttributeValueZodSchema),
  attributevalueController.createAttributeValue,
);
router.get("/", attributevalueController.getAllAttributeValues);
router.get("/:id", attributevalueController.getAttributeValueById);
router.put(
  "/:id",
  zodValidate(updateAttributeValueZodSchema),
  attributevalueController.updateAttributeValue,
);
router.delete("/:id", attributevalueController.deleteAttributeValue);

export const AttributeValueRoutes = router;
