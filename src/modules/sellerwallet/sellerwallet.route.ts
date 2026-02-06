import { Router } from "express";
import SellerWalletController from "./sellerwallet.controller";
import SellerWalletService from "./sellerwallet.services";
import SellerWalletRepository from "./sellerwallet.repository";
import zodValidate from "../../middleware/zodValidate";
import { createSellerWalletZodSchema } from "./sellerwallet.zod";

const router = Router();

const sellerwalletRepository = new SellerWalletRepository();
const sellerwalletService = new SellerWalletService(sellerwalletRepository);
const sellerwalletController = new SellerWalletController(sellerwalletService);

router.post(
  "/",
  zodValidate(createSellerWalletZodSchema),
  sellerwalletController.createSellerWallet,
);
router.get("/", sellerwalletController.getAllSellerWallets);
router.get("/:id", sellerwalletController.getSellerWalletById);
router.put("/:id", sellerwalletController.updateSellerWallet);
router.delete("/:id", sellerwalletController.deleteSellerWallet);

export const SellerWalletRoutes = router;
