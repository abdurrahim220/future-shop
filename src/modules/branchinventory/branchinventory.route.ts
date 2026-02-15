import { Router } from "express";
import BranchInventoryController from "./branchinventory.controller";
import BranchInventoryService from "./branchinventory.services";
import BranchInventoryRepository from "./branchinventory.repository";
import zodValidate from "../../middleware/zodValidate";
import {
  createBranchInventoryZodSchema,
  updateBranchInventoryZodSchema,
} from "./branchinventory.zod";

const router = Router();

const branchinventoryRepository = new BranchInventoryRepository();
const branchinventoryService = new BranchInventoryService(
  branchinventoryRepository,
);
const branchinventoryController = new BranchInventoryController(
  branchinventoryService,
);

router.post(
  "/",
  zodValidate(createBranchInventoryZodSchema),
  branchinventoryController.createBranchInventory,
);
router.get("/", branchinventoryController.getAllBranchInventorys);
router.get("/:id", branchinventoryController.getBranchInventoryById);
router.put(
  "/:id",
  zodValidate(updateBranchInventoryZodSchema),
  branchinventoryController.updateBranchInventory,
);
router.delete("/:id", branchinventoryController.deleteBranchInventory);

export const BranchInventoryRoutes = router;
