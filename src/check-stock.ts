import mongoose from "mongoose";
import { ProductModel, ProductVariantModel } from "./modules/product/product.model";
import { BranchInventoryModel } from "./modules/branchinventory/branchinventory.model";
import { config } from "./config/config";

async function main() {
  await mongoose.connect(config.mongoDB as string);
  console.log("Connected to database.");

  const products = await ProductModel.find().lean();
  console.log(`Found ${products.length} products total.`);

  for (const product of products) {
    const variants = await ProductVariantModel.find({ productId: product._id }).lean();
    const productInventories = await BranchInventoryModel.find({ productId: product._id }).lean();
    
    console.log(`\nProduct: ${product.name} (hasVariants: ${product.hasVariants})`);
    console.log(`  - SKU: ${product.sku}`);
    console.log(`  - ID: ${product._id}`);
    console.log(`  - Variants count: ${variants.length}`);
    for (const v of variants) {
      const vInv = productInventories.filter(inv => inv.variantId?.toString() === v._id.toString());
      const vStock = vInv.reduce((sum, item) => sum + item.stock, 0);
      console.log(`    * Variant ID: ${v._id} (isDefault: ${v.isDefault}) - Calculated Stock: ${vStock}`);
    }
    console.log(`  - Total Branch Inventories: ${productInventories.length}`);
    for (const inv of productInventories) {
      console.log(`    * Branch: ${inv.branchId} - Stock: ${inv.stock}`);
    }
  }

  await mongoose.disconnect();
}

main().catch(console.error);
