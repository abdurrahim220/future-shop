import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoute } from "../modules/auth/auth.route";
import { auditLogsRouter } from "../modules/auditLogs/auditLog.route";
import { adminRoutes } from "../modules/admin/admin.route";
import { SellerWalletRoutes } from "../modules/sellerwallet/sellerwallet.route";
import { PayoutRoutes } from "../modules/payout/payout.route";
import { BranchesRoutes } from "../modules/branches/branches.route";
import { AddressRoutes } from "../modules/address/address.route";
import { SellerRoutes } from "../modules/seller/seller.route";
import { BrandsRoutes } from "../modules/brands/brands.route";
import { CategoriesRoutes } from "../modules/categories/categories.route";
import { StockMovementRoutes } from "../modules/stockmovement/stockmovement.route";
import { BranchInventoryRoutes } from "../modules/branchinventory/branchinventory.route";
import { ProductRoutes } from "../modules/product/product.route";
import { StockTransferRoutes } from "../modules/stocktransfer/stocktransfer.route";

// Newly registered modules to resolve admin integration
import { AttributeRoutes } from "../modules/attribute/attribute.route";
import { AttributeValueRoutes } from "../modules/attributevalue/attributevalue.route";
import { CampaignRoutes } from "../modules/campaign/campaign.route";
import { ComboOffersRoutes } from "../modules/combooffers/combooffers.route";
import { CuponsRoutes } from "../modules/cupons/cupons.route";
import { NotificationsRoutes } from "../modules/notifications/notifications.route";
import { OrderRoutes } from "../modules/order/order.route";
import { SubOrderRoutes } from "../modules/suborder/suborder.route";
import { ReviewsRoutes } from "../modules/reviews/reviews.route";
import { WishlistRoutes } from "../modules/wishlist/wishlist.route";
import { CartRoutes } from "../modules/cart/cart.route";
import { BkashRoutes } from "../modules/bkash/bkash.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/admin",
    route: adminRoutes,
  },
  {
    path: "/audit-logs",
    route: auditLogsRouter,
  },
  {
    path: "/seller",
    route: SellerRoutes,
  },
  {
    path: "/seller-wallet",
    route: SellerWalletRoutes,
  },
  {
    path: "/payout",
    route: PayoutRoutes,
  },
  {
    path: "/branches",
    route: BranchesRoutes,
  },
  {
    path: "/address",
    route: AddressRoutes,
  },
  {
    path: "/brands",
    route: BrandsRoutes,
  },
  {
    path: "/categories",
    route: CategoriesRoutes,
  },
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/product",
    route: ProductRoutes,
  },
  {
    path: "/branch-inventory",
    route: BranchInventoryRoutes,
  },
  {
    path: "/stock-movement",
    route: StockMovementRoutes,
  },
  {
    path: "/stockmovement",
    route: StockMovementRoutes,
  },
  {
    path: "/stock-transfer",
    route: StockTransferRoutes,
  },
  {
    path: "/stocktransfer",
    route: StockTransferRoutes,
  },
  {
    path: "/branchinventory",
    route: BranchInventoryRoutes,
  },
  // Mount new routes
  {
    path: "/attribute",
    route: AttributeRoutes,
  },
  {
    path: "/attributevalue",
    route: AttributeValueRoutes,
  },
  {
    path: "/campaign",
    route: CampaignRoutes,
  },
  {
    path: "/combooffers",
    route: ComboOffersRoutes,
  },
  {
    path: "/cupons",
    route: CuponsRoutes,
  },
  {
    path: "/notifications",
    route: NotificationsRoutes,
  },
  {
    path: "/order",
    route: OrderRoutes,
  },
  {
    path: "/suborder",
    route: SubOrderRoutes,
  },
  {
    path: "/reviews",
    route: ReviewsRoutes,
  },
  {
    path: "/wishlist",
    route: WishlistRoutes,
  },
  {
    path: "/cart",
    route: CartRoutes,
  },
  {
    path: "/bkash",
    route: BkashRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
