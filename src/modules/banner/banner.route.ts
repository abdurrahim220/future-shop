import { Router } from "express";
import BannerController from "./banner.controller";
import BannerService from "./banner.services";
import BannerRepository from "./banner.repository";
import zodValidate from "../../middleware/zodValidate";
import { createBannerZodSchema, updateBannerZodSchema } from "./banner.zod";
import upload from "../../middleware/uploadMiddleware";

const router = Router();

const bannerRepository = new BannerRepository();
const bannerService = new BannerService(bannerRepository);
const bannerController = new BannerController(bannerService);

router.post("/", upload.single("image"), zodValidate(createBannerZodSchema), bannerController.createBanner);
router.get("/", bannerController.getAllBanners);
router.get("/:id", bannerController.getBannerById);
router.put("/:id", upload.single("image"), zodValidate(updateBannerZodSchema), bannerController.updateBanner);
router.delete("/:id", bannerController.deleteBanner);

export const BannerRoutes = router;