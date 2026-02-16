export enum stockMovementEnum {
  initial = "initial",
  online_order = "online_order",
  pos_sale = "pos_sale",
  return = "return",
  adjustment = "adjustment",
  transfer_in = "transfer_in",
  transfer_out = "transfer_out",
}

export enum stockTransferStatusEnum {
  pending = "pending",
  approved = "approved",
  rejected = "rejected",
}

export enum orderStatusEnum {
  pending = "pending",
  shipped = "shipped",
  delivered = "delivered",
  cancelled = "cancelled",
}

export enum paymentStatusEnum {
  paid = "paid",
  unpaid = "unpaid",
}

export enum deliveryTypeEnum {
  home = "home",
  cod = "cod",
  storePickup = "storePickup",
}


export enum mainStatusEnum {
  pending = "pending",
  active = "active",
  inactive = "inactive",
}
