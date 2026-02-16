import { Router } from "express";
import CampaignController from "./campaign.controller";
import CampaignService from "./campaign.services";
import CampaignRepository from "./campaign.repository";
import zodValidate from "../../middleware/zodValidate";
import { createCampaignZodSchema, updateCampaignZodSchema } from "./campaign.zod";

const router = Router();

const campaignRepository = new CampaignRepository();
const campaignService = new CampaignService(campaignRepository);
const campaignController = new CampaignController(campaignService);

router.post("/", zodValidate(createCampaignZodSchema), campaignController.createCampaign);
router.get("/", campaignController.getAllCampaigns);
router.get("/:id", campaignController.getCampaignById);
router.put("/:id", zodValidate(updateCampaignZodSchema), campaignController.updateCampaign);
router.delete("/:id", campaignController.deleteCampaign);

export const CampaignRoutes = router;