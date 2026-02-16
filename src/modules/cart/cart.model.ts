import { Schema, model } from "mongoose";
import { ICart, ICartItem } from "./cart.interface";


const cartItemSchema = new Schema<ICartItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: false,
    },
    variantId: {
      type: Schema.Types.ObjectId,
      ref: "Variant",
      required: false,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);
const cartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [cartItemSchema],
      required: true,
    },
  },
  { timestamps: true },
);

export const CartModel = model<ICart>("Cart", cartSchema);
