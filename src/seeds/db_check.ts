import mongoose from "mongoose";
import { CampaignModel } from "../modules/campaign/campaign.model";
import { CuponsModel } from "../modules/cupons/cupons.model";
import { ProductModel, ProductVariantModel } from "../modules/product/product.model";
import { CategoriesModel } from "../modules/categories/categories.model";
import { BrandsModel } from "../modules/brands/brands.model";
import { SellerModel } from "../modules/seller/seller.model";
import { UserModel } from "../modules/user/user.model";
import { mainStatusEnum } from "../interface/enums";

const MONGO_URL = "mongodb+srv://test:123456test@cluster0.hncbqqn.mongodb.net/future-shop2?retryWrites=true&w=majority";

async function run() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGO_URL);
  console.log("Connected.");

  // 1. Seed Seller / User
  let sellerUser = await UserModel.findOne({ email: "seller@test.com" });
  if (!sellerUser) {
    sellerUser = await UserModel.create({
      name: "Test Seller",
      email: "seller@test.com",
      phone: "1234567890",
      password: "password123",
      role: "seller",
      status: "active",
      isVerified: true,
    });
    console.log("Seeded seller user.");
  }

  let seller = await SellerModel.findOne({ userId: sellerUser._id });
  if (!seller) {
    seller = await SellerModel.create({
      userId: sellerUser._id,
      shopName: "Future Tech Store",
      logo: {
        original: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
      },
      banner: {
        original: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
      },
      status: "approved",
    });
    console.log("Seeded seller profile.");
  }

  // 2. Seed Category
  let category = await CategoriesModel.findOne({ name: "Electronics" });
  if (!category) {
    category = await CategoriesModel.create({
      name: "Electronics",
      slug: "electronics",
      isActive: true,
      isFeatured: true,
    });
    console.log("Seeded category: Electronics.");
  }

  // 3. Seed Brand
  let brand = await BrandsModel.findOne({ name: "Apple" });
  if (!brand) {
    brand = await BrandsModel.create({
      name: "Apple",
      slug: "apple",
      logo: {
        original: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=200",
      },
      public_id: "brand_apple_logo",
      isActive: true,
    });
    console.log("Seeded brand: Apple.");
  }

  // 4. Seed Products
  let p1 = await ProductModel.findOne({ name: "iPhone 16 Pro" });
  if (!p1) {
    p1 = await ProductModel.create({
      sellerId: seller._id,
      categoryId: category._id,
      brandId: brand._id,
      name: "iPhone 16 Pro",
      sku: "IPHONE16PRO-TEST",
      slug: "iphone-16-pro",
      description: "Experience the ultimate iPhone 16 Pro with spatial video and advanced performance.",
      hasVariants: true,
      status: "active",
    });
    console.log("Seeded Product 1: iPhone 16 Pro.");

    // Seed default variant
    await ProductVariantModel.create({
      productId: p1._id,
      sku: "IPHONE16PRO-VAR-DEFAULT",
      purchasePrice: 140000,
      salePrice: 130000,
      images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600"],
      attributeValues: [],
      isDefault: true,
      variantKey: "default",
      status: "active",
    });
    console.log("Seeded default variant for iPhone 16 Pro.");
  }

  let p2 = await ProductModel.findOne({ name: "iPad Air" });
  if (!p2) {
    p2 = await ProductModel.create({
      sellerId: seller._id,
      categoryId: category._id,
      brandId: brand._id,
      name: "iPad Air",
      sku: "IPADAIR-TEST",
      slug: "ipad-air",
      description: "The sleek and powerful iPad Air with M2 chip.",
      hasVariants: true,
      status: "active",
    });
    console.log("Seeded Product 2: iPad Air.");

    // Seed default variant
    await ProductVariantModel.create({
      productId: p2._id,
      sku: "IPADAIR-VAR-DEFAULT",
      purchasePrice: 70000,
      salePrice: 65000,
      images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600"],
      attributeValues: [],
      isDefault: true,
      variantKey: "default",
      status: "active",
    });
    console.log("Seeded default variant for iPad Air.");
  }

  // 5. Seed Coupons
  let c1 = await CuponsModel.findOne({ code: "SAVE20" });
  if (!c1) {
    c1 = await CuponsModel.create({
      code: "SAVE20",
      discountType: "percentage",
      discountValue: 20,
      maxDiscount: 1000,
      minPurchaseAmount: 500,
      usageLimit: 100,
      usedCount: 0,
      validFrom: new Date(),
      validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      status: mainStatusEnum.active,
    });
    console.log("Seeded coupon: SAVE20.");
  }

  let c2 = await CuponsModel.findOne({ code: "FLAT500" });
  if (!c2) {
    c2 = await CuponsModel.create({
      code: "FLAT500",
      discountType: "fixed",
      discountValue: 500,
      maxDiscount: 500,
      minPurchaseAmount: 2000,
      usageLimit: 100,
      usedCount: 0,
      validFrom: new Date(),
      validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      status: mainStatusEnum.active,
    });
    console.log("Seeded coupon: FLAT500.");
  }

  // 6. Seed Campaigns
  let camp = await CampaignModel.findOne({ title: "Summer Campaign 2026" });
  if (!camp) {
    camp = await CampaignModel.create({
      title: "Summer Campaign 2026",
      slug: "summer-campaign-2026",
      description: "Huge discounts on selected Apple devices during our exclusive Summer Campaign event!",
      bannerImg: {
        original: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
        small: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
        medium: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
        large: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200"
      },
      products: [p1._id], // Product 1 is part of the campaign!
      categories: [],
      brands: [],
      startDate: new Date(),
      endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
      status: mainStatusEnum.active,
    });
    console.log("Seeded campaign: Summer Campaign 2026 with iPhone 16 Pro.");
  }

  // Double check all products are active
  await ProductModel.updateMany({}, { status: "active" });

  console.log("All seeds complete.");
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB.");
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
