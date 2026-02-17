# Database Design For E-commerce Mongodb

## 🧩(Admin + Seller + Customer)

- User Table ✅

```
_id (PK)
role: "admin" | "seller" | "customer"
name
email
phone
password
profileImage
status: "active" | "blocked"
createdAt
updatedAt
```
- Address Table ✅
```
first address
second address
contact number
```

- Seller Table ✅

```
Seller
--------
_id (PK)
userId (FK User)
shopName
logo
tradeLicense
address
commissionPercentage
status
createdAt
updatedAt
```

- SELLER Table BRANCHES (Multi Branch) ✅

```
_id (PK)
sellerId (FK Seller)
branchName
branchCode
type: "store" | "warehouse"
phonenpm
address
city
state
status
createdAt
updatedAt
```

## 🛍️ PRODUCT SYSTEM

- CATEGORIES (Tree Support) ✅

```
_id (PK)
name
slug
parentId (self FK)
icon
isActive
createdAt
updatedAt
```

- BRANDS ✅

```
_id (PK)
name
slug
logo
isActive
createdAt
updatedAt
```


Attribute ✅
---------
_id
name: "Color"
slug: "color"
type: "image" | "text" | "number"
isActive


AttributeValue ✅
---------------
_id
attributeId: Color
value: "Red"
hexCode?: "#FF0000"
image?: null   // base / default image (optional)
sortOrder
isActive


- PRODUCTS ✅

```
_id (PK)
sellerId
categoryId
brandId
name
slug
sku
stock
description
images[]
isVariants (boolean)
variants:[
  {
    _id (PK)
    sku
    purchasePrice
    salePrice
    images[]
    stock (optional fallback)
    attributes: { size: "M", color: "Red" }
    isDefault
    createdAt
    updatedAt
  }
]
status: "active" | "inactive" | "pending"
rating
reviewCount
salesCount
createdAt
updatedAt
```

## 📦 INVENTORY & STOCK (Branch Based)

- BRANCH INVENTORY ⚠️ IMPORTANT ✅

```
_id (PK)
branchId
productId
variantId
stock
reorderLevel
updatedAt
```

- STOCK MOVEMENT (Stock Ledger) ✅

```
_id (PK)
branchId
productId
variantId
type: "online_order" | "pos_sale" | "return" | "adjustment" | "transfer_in" | "transfer_out"
quantity
referenceId
createdAt

```

- STOCK TRANSFER (Optional but Professional)

```
StockTransfer ✅
---------------
_id
sellerId
fromBranchId
toBranchId
status: "pending" | "completed"
items: [
  {
    productId
    variantId
    quantity
  }
]
createdAt
updatedAt


## 🛒 CART ✅

```
Cart
-------
_id
userId
items: [
  {
    productId
    variantId
    quantity
    price
  }
]
updatedAt

```

## ❤️ WISHLIST ✅

```
Wishlist
-----------
_id
userId
productId
createdAt

```

⭐ REVIEWS

``` 
Review
--------
_id
productId
userId
rating
comment
images[]
status
createdAt
updatedAt

```

## 🧾 ORDERS SYSTEM

- 1️⃣1️⃣ ORDERS ✅

```
Order
-------
_id
customerId
productId
totalAmount
status: "pending" | "shipped" | "delivered" | "cancelled"
paymentStatus :"paid"|"unpaid"
deliveryStatus:"home"|"cod"
createdAt
updatedAt
```

- 1️⃣2️⃣ ORDER ITEMS/subOrder // visable for seller ✅
```
OrderItem 
------------
_id
orderId
productId
variantId
sellerId
branchId
price
quantity
subtotal
```

1️⃣4️⃣ SHIPPING

```
Shipping
-----------
_id
orderId
address
city
country
trackingId
status
createdAt
```

🏬 POS SYSTEM

- 1️⃣5️⃣ POS SALE

```
POS_Sale
-----------
_id
branchId
sellerId
cashierUserId
totalAmount
paymentMethod
createdAt
```

1️⃣6️⃣ POS SALE ITEMS

```
POS_SaleItem
---------------
_id
posSaleId
productId
variantId
quantity
price
subtotal
```

## 🎟️ OFFERS / COUPONS / CAMPAIGNS ✅

```
Offer
--------
_id
type: "product" | "category" | "brand"
discountType: "percentage" | "fixed"
discountValue
startDate
endDate
status

```

- 1️⃣8️⃣ OFFER TARGET
```
OfferTarget
-------------
_id
offerId
productId?
categoryId?
brandId?
```

- 1️⃣9️⃣ COUPONS ✅
```
Coupon
---------
_id
code
discountType
discountValue
maxDiscount
minPurchaseAmount
usageLimit
usedCount
validFrom
validTo
status
```

- 2️⃣0️⃣ COMBO OFFERS
```
ComboOffer ✅
------------
_id
title
discountType
discountValue
products: [ { productId, quantityRequired } ]
startDate
endDate
```

## 🏠 HOMEPAGE & MARKETING
- 2️⃣1️⃣ HOME SECTIONS
```
HomeSection
--------------
_id
title
type: "best_sellers" | "featured" | "new_arrivals" | "top_brands"
dataType: "products" | "brands" | "categories"
items: []
priority
isActive
```

- 2️⃣2️⃣ BANNERS ✅

```
Banner
---------
_id
title
image
redirectType
redirectId
position
priority
isActive
```

- 2️⃣3️⃣ CAMPAIGN / EVENT

```
Campaign ✅
-----------
_id
title
description
banner
startDate
endDate
status

```

## 📊 BUSINESS SYSTEM ✅
- 2️⃣4️⃣ SELLER WALLET
```
SellerWallet
--------------
sellerId
balance
updatedAt


Payout
--------
_id
sellerId
amount
status
createdAt

```

- 2️⃣5️⃣ ANALYTICS
```
Analytics_ProductSales
------------------------
productId
totalSold
totalRevenue
updatedAt

```

- 2️⃣6️⃣ AUDIT LOG ✅
```
AuditLog
----------
_id
userId
action
entityType
entityId
oldValue
newValue
createdAt
```


AdminNotification ✅
------------------
_id
type: "seller_request"
referenceId (sellerId)
message
isRead
createdAt



StockMovement ✅
--------------
_id
branchId
sellerId
productId
variantId
type:
  "initial"
| "online_order"
| "pos_sale"
| "return"
| "adjustment"
| "transfer_in"
| "transfer_out"
quantity
referenceId
createdAt
