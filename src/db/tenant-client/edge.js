
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/edge.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.StaffScalarFieldEnum = {
  id: 'id',
  email: 'email',
  passwordHash: 'passwordHash',
  fullName: 'fullName',
  role: 'role',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.CategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  image: 'image',
  sortOrder: 'sortOrder',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.ExtraScalarFieldEnum = {
  id: 'id',
  name: 'name',
  image: 'image',
  price: 'price',
  suppPrice: 'suppPrice',
  outOfStock: 'outOfStock',
  visible: 'visible',
  sortOrder: 'sortOrder',
  createdAt: 'createdAt'
};

exports.Prisma.CompositionTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  label: 'label',
  message: 'message',
  min: 'min',
  max: 'max',
  payment: 'payment',
  selection: 'selection',
  mode: 'mode',
  isActive: 'isActive',
  sortOrder: 'sortOrder',
  createdAt: 'createdAt'
};

exports.Prisma.CompositionTypeExtraScalarFieldEnum = {
  compositionTypeId: 'compositionTypeId',
  extraId: 'extraId',
  position: 'position'
};

exports.Prisma.ProductCompositionScalarFieldEnum = {
  productId: 'productId',
  compositionTypeId: 'compositionTypeId',
  sortOrder: 'sortOrder'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  categoryId: 'categoryId',
  name: 'name',
  description: 'description',
  image: 'image',
  kind: 'kind',
  price: 'price',
  formulePrice: 'formulePrice',
  taxRateBps: 'taxRateBps',
  modifiers: 'modifiers',
  isActive: 'isActive',
  outOfStock: 'outOfStock',
  sortOrder: 'sortOrder',
  discountValue: 'discountValue',
  originalPrice: 'originalPrice',
  discountStartDate: 'discountStartDate',
  discountEndDate: 'discountEndDate',
  createdAt: 'createdAt'
};

exports.Prisma.RestaurantTableScalarFieldEnum = {
  id: 'id',
  name: 'name',
  zone: 'zone',
  sortOrder: 'sortOrder',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.CashierSessionScalarFieldEnum = {
  id: 'id',
  staffId: 'staffId',
  openedAt: 'openedAt',
  closedAt: 'closedAt',
  openingFloatCents: 'openingFloatCents',
  closingNote: 'closingNote'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  status: 'status',
  tableId: 'tableId',
  staffId: 'staffId',
  sessionId: 'sessionId',
  subtotalCents: 'subtotalCents',
  taxCents: 'taxCents',
  totalCents: 'totalCents',
  idempotencyKey: 'idempotencyKey',
  customerName: 'customerName',
  customerEmail: 'customerEmail',
  commandNumber: 'commandNumber',
  currency: 'currency',
  pack: 'pack',
  paymentMethod: 'paymentMethod',
  orderDiscountValue: 'orderDiscountValue',
  logoPath: 'logoPath',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OrderLineScalarFieldEnum = {
  id: 'id',
  orderId: 'orderId',
  productId: 'productId',
  quantity: 'quantity',
  unitPriceCents: 'unitPriceCents',
  lineTotalCents: 'lineTotalCents',
  taxCents: 'taxCents',
  modifiersSnapshot: 'modifiersSnapshot',
  compositionSnapshot: 'compositionSnapshot',
  note: 'note'
};

exports.Prisma.SettingScalarFieldEnum = {
  key: 'key',
  value: 'value',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.StaffRole = exports.$Enums.StaffRole = {
  owner: 'owner',
  manager: 'manager',
  cashier: 'cashier'
};

exports.CompositionSlotMode = exports.$Enums.CompositionSlotMode = {
  extras: 'extras',
  products: 'products'
};

exports.ProductKind = exports.$Enums.ProductKind = {
  simple: 'simple',
  composed: 'composed'
};

exports.OrderStatus = exports.$Enums.OrderStatus = {
  draft: 'draft',
  active: 'active',
  completed: 'completed',
  canceled: 'canceled'
};

exports.Prisma.ModelName = {
  Staff: 'Staff',
  Category: 'Category',
  Extra: 'Extra',
  CompositionType: 'CompositionType',
  CompositionTypeExtra: 'CompositionTypeExtra',
  ProductComposition: 'ProductComposition',
  Product: 'Product',
  RestaurantTable: 'RestaurantTable',
  CashierSession: 'CashierSession',
  Order: 'Order',
  OrderLine: 'OrderLine',
  Setting: 'Setting'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "D:\\Projects\\maklaGo\\backend\\src\\db\\tenant-client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "D:\\Projects\\maklaGo\\backend\\prisma\\tenant\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../../../prisma/tenant",
  "clientVersion": "5.22.0",
  "engineVersion": "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "TENANT_DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider = \"prisma-client-js\"\n  output   = \"../../src/db/tenant-client\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"TENANT_DATABASE_URL\")\n}\n\nenum StaffRole {\n  owner\n  manager\n  cashier\n}\n\nenum OrderStatus {\n  draft\n  active\n  completed\n  canceled\n}\n\n/// simple = cart line with optional JSON modifiers. composed = steps per `ProductComposition` + extras.\nenum ProductKind {\n  simple\n  composed\n}\n\n/// extras = type lists selectable extras. products = nested products (future).\nenum CompositionSlotMode {\n  extras\n  products\n}\n\nmodel Staff {\n  id           String           @id @default(uuid())\n  email        String           @unique\n  passwordHash String           @map(\"password_hash\")\n  fullName     String           @map(\"full_name\")\n  role         StaffRole        @default(cashier)\n  isActive     Boolean          @default(true) @map(\"is_active\")\n  createdAt    DateTime         @default(now()) @map(\"created_at\")\n  sessions     CashierSession[]\n  orders       Order[]\n\n  @@map(\"staff\")\n}\n\nmodel Category {\n  id        String    @id @default(uuid())\n  name      String\n  image     String?\n  sortOrder Int       @default(0) @map(\"sort_order\")\n  isActive  Boolean   @default(true) @map(\"is_active\")\n  products  Product[]\n  createdAt DateTime  @default(now()) @map(\"created_at\")\n\n  @@map(\"categories\")\n}\n\n/// Extra add-on (legacy Mongo name `Ingrediant`). Linked to composition types via join table.\nmodel Extra {\n  id         String                 @id @default(uuid())\n  name       String\n  image      String?\n  /// Paid add-on cents when parent type has `payment: true` (Mongo `price`).\n  price      Int                    @default(0) @map(\"price_cents\")\n  /// Supplement cents when `payment: false` (Mongo `suppPrice`).\n  suppPrice  Int                    @default(0) @map(\"supp_price_cents\")\n  outOfStock Boolean                @default(false) @map(\"out_of_stock\")\n  visible    Boolean                @default(true)\n  sortOrder  Int                    @default(0) @map(\"sort_order\")\n  typeLinks  CompositionTypeExtra[]\n  createdAt  DateTime               @default(now()) @map(\"created_at\")\n\n  @@map(\"extras\")\n}\n\n/// Composition step (Mongo `Type`): e.g. \"Sauce\", min/max, payment vs supp price behavior.\nmodel CompositionType {\n  id           String                 @id @default(uuid())\n  name         String\n  label        String\n  message      String?\n  min          Int                    @default(0)\n  max          Int                    @default(1)\n  /// When true, extra `price` applies; when false, `suppPrice` applies.\n  payment      Boolean                @default(false)\n  selection    Boolean                @default(false)\n  mode         CompositionSlotMode    @default(extras)\n  isActive     Boolean                @default(true) @map(\"is_active\")\n  sortOrder    Int                    @default(0) @map(\"sort_order\")\n  extras       CompositionTypeExtra[]\n  productSteps ProductComposition[]\n  createdAt    DateTime               @default(now()) @map(\"created_at\")\n\n  @@map(\"composition_types\")\n}\n\nmodel CompositionTypeExtra {\n  compositionTypeId String          @map(\"composition_type_id\")\n  extraId           String          @map(\"extra_id\")\n  position          Int             @default(0)\n  compositionType   CompositionType @relation(fields: [compositionTypeId], references: [id], onDelete: Cascade)\n  extra             Extra           @relation(fields: [extraId], references: [id], onDelete: Cascade)\n\n  @@id([compositionTypeId, extraId])\n  @@map(\"composition_type_extras\")\n}\n\nmodel ProductComposition {\n  productId         String          @map(\"product_id\")\n  compositionTypeId String          @map(\"composition_type_id\")\n  sortOrder         Int             @default(0) @map(\"sort_order\")\n  product           Product         @relation(fields: [productId], references: [id], onDelete: Cascade)\n  compositionType   CompositionType @relation(fields: [compositionTypeId], references: [id], onDelete: Restrict)\n\n  @@id([productId, compositionTypeId])\n  @@unique([productId, sortOrder])\n  @@map(\"product_compositions\")\n}\n\n/// Sellable product (Mongo `Product`). Money stored as integer **cents** in DB; Prisma field `price` maps to `price_cents`.\nmodel Product {\n  id                String               @id @default(uuid())\n  categoryId        String               @map(\"category_id\")\n  category          Category             @relation(fields: [categoryId], references: [id], onDelete: Restrict)\n  name              String\n  description       String?\n  image             String?\n  /// simple = sold as one item with optional `modifiers` JSON. composed = built from composition steps (`ProductComposition` → extra picks per step).\n  kind              ProductKind          @default(simple)\n  /// Base unit price in cents (Mongo field name `price`; DB column `price_cents`).\n  price             Int                  @map(\"price_cents\")\n  /// Mongo `formulePrice` — stored as cents; business meaning is yours (combo / formula surcharge).\n  formulePrice      Int                  @default(0) @map(\"formule_price\")\n  taxRateBps        Int?                 @map(\"tax_rate_bps\")\n  /// Simple extras JSON (Mongo-style modifiers); DB column remains `modifiers_json`.\n  modifiers         Json?                @map(\"modifiers_json\")\n  isActive          Boolean              @default(true) @map(\"is_active\")\n  outOfStock        Boolean              @default(false) @map(\"out_of_stock\")\n  sortOrder         Int                  @default(0) @map(\"sort_order\")\n  discountValue     Int                  @default(0) @map(\"discount_value\")\n  originalPrice     Int?                 @map(\"original_price\")\n  discountStartDate DateTime?            @map(\"discount_start_date\")\n  discountEndDate   DateTime?            @map(\"discount_end_date\")\n  compositions      ProductComposition[]\n  orderLines        OrderLine[]\n  createdAt         DateTime             @default(now()) @map(\"created_at\")\n\n  @@map(\"products\")\n}\n\nmodel RestaurantTable {\n  id        String   @id @default(uuid())\n  name      String\n  zone      String?\n  sortOrder Int      @default(0) @map(\"sort_order\")\n  isActive  Boolean  @default(true) @map(\"is_active\")\n  orders    Order[]\n  createdAt DateTime @default(now()) @map(\"created_at\")\n\n  @@map(\"restaurant_tables\")\n}\n\nmodel CashierSession {\n  id                String    @id @default(uuid())\n  staffId           String    @map(\"staff_id\")\n  staff             Staff     @relation(fields: [staffId], references: [id], onDelete: Restrict)\n  openedAt          DateTime  @default(now()) @map(\"opened_at\")\n  closedAt          DateTime? @map(\"closed_at\")\n  openingFloatCents Int       @default(0) @map(\"opening_float_cents\")\n  closingNote       String?   @map(\"closing_note\")\n  orders            Order[]\n\n  @@map(\"cashier_sessions\")\n}\n\n/// Order / command (replaces Mongo `History` conceptually — use table `orders`).\nmodel Order {\n  id                 String           @id @default(uuid())\n  status             OrderStatus      @default(draft)\n  tableId            String?          @map(\"table_id\")\n  table              RestaurantTable? @relation(fields: [tableId], references: [id], onDelete: SetNull)\n  staffId            String?          @map(\"staff_id\")\n  staff              Staff?           @relation(fields: [staffId], references: [id], onDelete: SetNull)\n  sessionId          String?          @map(\"session_id\")\n  session            CashierSession?  @relation(fields: [sessionId], references: [id], onDelete: SetNull)\n  subtotalCents      Int              @default(0) @map(\"subtotal_cents\")\n  taxCents           Int              @default(0) @map(\"tax_cents\")\n  totalCents         Int              @default(0) @map(\"total_cents\")\n  idempotencyKey     String?          @unique @map(\"idempotency_key\")\n  /// Mongo History-style metadata (optional for cashier flow).\n  customerName       String?          @map(\"customer_name\")\n  customerEmail      String?          @map(\"customer_email\")\n  commandNumber      Int?             @map(\"command_number\")\n  currency           String?\n  pack               Json?\n  paymentMethod      Json?            @map(\"payment_method\")\n  orderDiscountValue Int              @default(0) @map(\"order_discount_value\")\n  logoPath           String?          @map(\"logo_path\")\n  lines              OrderLine[]\n  createdAt          DateTime         @default(now()) @map(\"created_at\")\n  updatedAt          DateTime         @default(now()) @updatedAt @map(\"updated_at\")\n\n  @@index([status, createdAt])\n  @@index([sessionId])\n  @@map(\"orders\")\n}\n\nmodel OrderLine {\n  id                  String  @id @default(uuid())\n  orderId             String  @map(\"order_id\")\n  order               Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)\n  productId           String  @map(\"product_id\")\n  product             Product @relation(fields: [productId], references: [id], onDelete: Restrict)\n  quantity            Int\n  unitPriceCents      Int     @map(\"unit_price_cents\")\n  lineTotalCents      Int     @map(\"line_total_cents\")\n  taxCents            Int     @default(0) @map(\"tax_cents\")\n  modifiersSnapshot   Json?   @map(\"modifiers_snapshot\")\n  compositionSnapshot Json?   @map(\"composition_snapshot\")\n  note                String?\n\n  @@map(\"order_lines\")\n}\n\nmodel Setting {\n  key       String   @id\n  value     Json\n  updatedAt DateTime @default(now()) @updatedAt @map(\"updated_at\")\n\n  @@map(\"settings\")\n}\n",
  "inlineSchemaHash": "4f4422990203802178b2a742ecdc8a1e5ac141daa5abfb26d205cc6c5ca988b8",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Staff\":{\"dbName\":\"staff\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"passwordHash\",\"dbName\":\"password_hash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fullName\",\"dbName\":\"full_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"StaffRole\",\"default\":\"cashier\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"dbName\":\"is_active\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sessions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CashierSession\",\"relationName\":\"CashierSessionToStaff\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"orders\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Order\",\"relationName\":\"OrderToStaff\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Category\":{\"dbName\":\"categories\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sortOrder\",\"dbName\":\"sort_order\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"dbName\":\"is_active\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"products\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Product\",\"relationName\":\"CategoryToProduct\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Extra\":{\"dbName\":\"extras\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"price\",\"dbName\":\"price_cents\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Paid add-on cents when parent type has `payment: true` (Mongo `price`).\"},{\"name\":\"suppPrice\",\"dbName\":\"supp_price_cents\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Supplement cents when `payment: false` (Mongo `suppPrice`).\"},{\"name\":\"outOfStock\",\"dbName\":\"out_of_stock\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"visible\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sortOrder\",\"dbName\":\"sort_order\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"typeLinks\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CompositionTypeExtra\",\"relationName\":\"CompositionTypeExtraToExtra\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"Extra add-on (legacy Mongo name `Ingrediant`). Linked to composition types via join table.\"},\"CompositionType\":{\"dbName\":\"composition_types\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"label\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"message\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"min\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"max\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payment\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"When true, extra `price` applies; when false, `suppPrice` applies.\"},{\"name\":\"selection\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mode\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"CompositionSlotMode\",\"default\":\"extras\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"dbName\":\"is_active\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sortOrder\",\"dbName\":\"sort_order\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"extras\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CompositionTypeExtra\",\"relationName\":\"CompositionTypeToCompositionTypeExtra\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"productSteps\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProductComposition\",\"relationName\":\"CompositionTypeToProductComposition\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"Composition step (Mongo `Type`): e.g. \\\"Sauce\\\", min/max, payment vs supp price behavior.\"},\"CompositionTypeExtra\":{\"dbName\":\"composition_type_extras\",\"fields\":[{\"name\":\"compositionTypeId\",\"dbName\":\"composition_type_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"extraId\",\"dbName\":\"extra_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"position\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"compositionType\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CompositionType\",\"relationName\":\"CompositionTypeToCompositionTypeExtra\",\"relationFromFields\":[\"compositionTypeId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"extra\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Extra\",\"relationName\":\"CompositionTypeExtraToExtra\",\"relationFromFields\":[\"extraId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"compositionTypeId\",\"extraId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ProductComposition\":{\"dbName\":\"product_compositions\",\"fields\":[{\"name\":\"productId\",\"dbName\":\"product_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"compositionTypeId\",\"dbName\":\"composition_type_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sortOrder\",\"dbName\":\"sort_order\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"product\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Product\",\"relationName\":\"ProductToProductComposition\",\"relationFromFields\":[\"productId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"compositionType\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CompositionType\",\"relationName\":\"CompositionTypeToProductComposition\",\"relationFromFields\":[\"compositionTypeId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Restrict\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"productId\",\"compositionTypeId\"]},\"uniqueFields\":[[\"productId\",\"sortOrder\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"productId\",\"sortOrder\"]}],\"isGenerated\":false},\"Product\":{\"dbName\":\"products\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"categoryId\",\"dbName\":\"category_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Category\",\"relationName\":\"CategoryToProduct\",\"relationFromFields\":[\"categoryId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Restrict\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"kind\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"ProductKind\",\"default\":\"simple\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"simple = sold as one item with optional `modifiers` JSON. composed = built from composition steps (`ProductComposition` → extra picks per step).\"},{\"name\":\"price\",\"dbName\":\"price_cents\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Base unit price in cents (Mongo field name `price`; DB column `price_cents`).\"},{\"name\":\"formulePrice\",\"dbName\":\"formule_price\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Mongo `formulePrice` — stored as cents; business meaning is yours (combo / formula surcharge).\"},{\"name\":\"taxRateBps\",\"dbName\":\"tax_rate_bps\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"modifiers\",\"dbName\":\"modifiers_json\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Simple extras JSON (Mongo-style modifiers); DB column remains `modifiers_json`.\"},{\"name\":\"isActive\",\"dbName\":\"is_active\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"outOfStock\",\"dbName\":\"out_of_stock\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sortOrder\",\"dbName\":\"sort_order\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"discountValue\",\"dbName\":\"discount_value\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"originalPrice\",\"dbName\":\"original_price\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"discountStartDate\",\"dbName\":\"discount_start_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"discountEndDate\",\"dbName\":\"discount_end_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"compositions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProductComposition\",\"relationName\":\"ProductToProductComposition\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"orderLines\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"OrderLine\",\"relationName\":\"OrderLineToProduct\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"Sellable product (Mongo `Product`). Money stored as integer **cents** in DB; Prisma field `price` maps to `price_cents`.\"},\"RestaurantTable\":{\"dbName\":\"restaurant_tables\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"zone\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sortOrder\",\"dbName\":\"sort_order\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"dbName\":\"is_active\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"orders\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Order\",\"relationName\":\"OrderToRestaurantTable\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"CashierSession\":{\"dbName\":\"cashier_sessions\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"staffId\",\"dbName\":\"staff_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"staff\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Staff\",\"relationName\":\"CashierSessionToStaff\",\"relationFromFields\":[\"staffId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Restrict\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"openedAt\",\"dbName\":\"opened_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"closedAt\",\"dbName\":\"closed_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"openingFloatCents\",\"dbName\":\"opening_float_cents\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"closingNote\",\"dbName\":\"closing_note\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"orders\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Order\",\"relationName\":\"CashierSessionToOrder\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Order\":{\"dbName\":\"orders\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"OrderStatus\",\"default\":\"draft\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tableId\",\"dbName\":\"table_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"table\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RestaurantTable\",\"relationName\":\"OrderToRestaurantTable\",\"relationFromFields\":[\"tableId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"staffId\",\"dbName\":\"staff_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"staff\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Staff\",\"relationName\":\"OrderToStaff\",\"relationFromFields\":[\"staffId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sessionId\",\"dbName\":\"session_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"session\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CashierSession\",\"relationName\":\"CashierSessionToOrder\",\"relationFromFields\":[\"sessionId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"subtotalCents\",\"dbName\":\"subtotal_cents\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"taxCents\",\"dbName\":\"tax_cents\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalCents\",\"dbName\":\"total_cents\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"idempotencyKey\",\"dbName\":\"idempotency_key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"customerName\",\"dbName\":\"customer_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Mongo History-style metadata (optional for cashier flow).\"},{\"name\":\"customerEmail\",\"dbName\":\"customer_email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"commandNumber\",\"dbName\":\"command_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currency\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pack\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"paymentMethod\",\"dbName\":\"payment_method\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"orderDiscountValue\",\"dbName\":\"order_discount_value\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"logoPath\",\"dbName\":\"logo_path\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lines\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"OrderLine\",\"relationName\":\"OrderToOrderLine\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"Order / command (replaces Mongo `History` conceptually — use table `orders`).\"},\"OrderLine\":{\"dbName\":\"order_lines\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"orderId\",\"dbName\":\"order_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"order\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Order\",\"relationName\":\"OrderToOrderLine\",\"relationFromFields\":[\"orderId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"productId\",\"dbName\":\"product_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"product\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Product\",\"relationName\":\"OrderLineToProduct\",\"relationFromFields\":[\"productId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Restrict\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quantity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"unitPriceCents\",\"dbName\":\"unit_price_cents\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lineTotalCents\",\"dbName\":\"line_total_cents\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"taxCents\",\"dbName\":\"tax_cents\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"modifiersSnapshot\",\"dbName\":\"modifiers_snapshot\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"compositionSnapshot\",\"dbName\":\"composition_snapshot\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"note\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Setting\":{\"dbName\":\"settings\",\"fields\":[{\"name\":\"key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"value\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"StaffRole\":{\"values\":[{\"name\":\"owner\",\"dbName\":null},{\"name\":\"manager\",\"dbName\":null},{\"name\":\"cashier\",\"dbName\":null}],\"dbName\":null},\"OrderStatus\":{\"values\":[{\"name\":\"draft\",\"dbName\":null},{\"name\":\"active\",\"dbName\":null},{\"name\":\"completed\",\"dbName\":null},{\"name\":\"canceled\",\"dbName\":null}],\"dbName\":null},\"ProductKind\":{\"values\":[{\"name\":\"simple\",\"dbName\":null},{\"name\":\"composed\",\"dbName\":null}],\"dbName\":null,\"documentation\":\"simple = cart line with optional JSON modifiers. composed = steps per `ProductComposition` + extras.\"},\"CompositionSlotMode\":{\"values\":[{\"name\":\"extras\",\"dbName\":null},{\"name\":\"products\",\"dbName\":null}],\"dbName\":null,\"documentation\":\"extras = type lists selectable extras. products = nested products (future).\"}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    TENANT_DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['TENANT_DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.TENANT_DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

