import { Router } from "express";
import AddressController from "./address.controller";
import AddressService from "./address.services";
import AddressRepository from "./address.repository";
import zodValidate from "../../middleware/zodValidate";
import { createAddressZodSchema, updateAddressZodSchema } from "./address.zod";

const router = Router();

const addressRepository = new AddressRepository();
const addressService = new AddressService(addressRepository);
const addressController = new AddressController(addressService);

router.post(
  "/",
  zodValidate(createAddressZodSchema),
  addressController.createAddress,
);
router.get("/", addressController.getAllAddresss);
router.get("/:id", addressController.getAddressById);
router.put(
  "/:id",
  zodValidate(updateAddressZodSchema),
  addressController.updateAddress,
);
router.delete("/:id", addressController.deleteAddress);

export const AddressRoutes = router;
