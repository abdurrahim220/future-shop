import { Router } from "express";
import BkashController from "./bkash.controller";
import BkashService from "./bkash.services";
import BkashRepository from "./bkash.repository";
import auth from "../../middleware/auth";
import { userRole } from "../../interface/Role";

const router = Router();

const bkashRepository = new BkashRepository();
const bkashService = new BkashService(bkashRepository);
const bkashController = new BkashController(bkashService);

router.post("/create", auth(userRole.customer), bkashController.createPayment);
router.get("/callback", bkashController.callbackPayment);

export const BkashRoutes = router;
