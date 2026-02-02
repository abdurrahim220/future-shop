import { Router } from "express";
import BranchesController from "./branches.controller";
import BranchesService from "./branches.services";
import BranchesRepository from "./branches.repository";
import zodValidate from "../../middleware/zodValidate";
import {
  createBranchesZodSchema,
  updateBranchesZodSchema,
} from "./branches.zod";

const router = Router();

const branchesRepository = new BranchesRepository();
const branchesService = new BranchesService(branchesRepository);
const branchesController = new BranchesController(branchesService);

router.post(
  "/",
  zodValidate(createBranchesZodSchema),
  branchesController.createBranches,
);
router.get("/", branchesController.getAllBranchess);
router.get("/:id", branchesController.getBranchesById);
router.put(
  "/:id",
  zodValidate(updateBranchesZodSchema),
  branchesController.updateBranches,
);
router.delete("/:id", branchesController.deleteBranches);

export const BranchesRoutes = router;
