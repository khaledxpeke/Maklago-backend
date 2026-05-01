
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Staff
 * 
 */
export type Staff = $Result.DefaultSelection<Prisma.$StaffPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Extra
 * Extra add-on (legacy Mongo name `Ingrediant`). Linked to composition types via join table.
 */
export type Extra = $Result.DefaultSelection<Prisma.$ExtraPayload>
/**
 * Model CompositionType
 * Composition step (Mongo `Type`): e.g. "Sauce", min/max, payment vs supp price behavior.
 */
export type CompositionType = $Result.DefaultSelection<Prisma.$CompositionTypePayload>
/**
 * Model CompositionTypeExtra
 * 
 */
export type CompositionTypeExtra = $Result.DefaultSelection<Prisma.$CompositionTypeExtraPayload>
/**
 * Model ProductComposition
 * 
 */
export type ProductComposition = $Result.DefaultSelection<Prisma.$ProductCompositionPayload>
/**
 * Model Product
 * Sellable product (Mongo `Product`). Money stored as integer **cents** in DB; Prisma field `price` maps to `price_cents`.
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model RestaurantTable
 * 
 */
export type RestaurantTable = $Result.DefaultSelection<Prisma.$RestaurantTablePayload>
/**
 * Model CashierSession
 * 
 */
export type CashierSession = $Result.DefaultSelection<Prisma.$CashierSessionPayload>
/**
 * Model Order
 * Order / command (replaces Mongo `History` conceptually — use table `orders`).
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model OrderLine
 * 
 */
export type OrderLine = $Result.DefaultSelection<Prisma.$OrderLinePayload>
/**
 * Model Setting
 * 
 */
export type Setting = $Result.DefaultSelection<Prisma.$SettingPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const StaffRole: {
  owner: 'owner',
  manager: 'manager',
  cashier: 'cashier'
};

export type StaffRole = (typeof StaffRole)[keyof typeof StaffRole]


export const CompositionSlotMode: {
  extras: 'extras',
  products: 'products'
};

export type CompositionSlotMode = (typeof CompositionSlotMode)[keyof typeof CompositionSlotMode]


export const ProductKind: {
  simple: 'simple',
  composed: 'composed'
};

export type ProductKind = (typeof ProductKind)[keyof typeof ProductKind]


export const OrderStatus: {
  draft: 'draft',
  active: 'active',
  completed: 'completed',
  canceled: 'canceled'
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]

}

export type StaffRole = $Enums.StaffRole

export const StaffRole: typeof $Enums.StaffRole

export type CompositionSlotMode = $Enums.CompositionSlotMode

export const CompositionSlotMode: typeof $Enums.CompositionSlotMode

export type ProductKind = $Enums.ProductKind

export const ProductKind: typeof $Enums.ProductKind

export type OrderStatus = $Enums.OrderStatus

export const OrderStatus: typeof $Enums.OrderStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Staff
 * const staff = await prisma.staff.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Staff
   * const staff = await prisma.staff.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.staff`: Exposes CRUD operations for the **Staff** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Staff
    * const staff = await prisma.staff.findMany()
    * ```
    */
  get staff(): Prisma.StaffDelegate<ExtArgs>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs>;

  /**
   * `prisma.extra`: Exposes CRUD operations for the **Extra** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Extras
    * const extras = await prisma.extra.findMany()
    * ```
    */
  get extra(): Prisma.ExtraDelegate<ExtArgs>;

  /**
   * `prisma.compositionType`: Exposes CRUD operations for the **CompositionType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CompositionTypes
    * const compositionTypes = await prisma.compositionType.findMany()
    * ```
    */
  get compositionType(): Prisma.CompositionTypeDelegate<ExtArgs>;

  /**
   * `prisma.compositionTypeExtra`: Exposes CRUD operations for the **CompositionTypeExtra** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CompositionTypeExtras
    * const compositionTypeExtras = await prisma.compositionTypeExtra.findMany()
    * ```
    */
  get compositionTypeExtra(): Prisma.CompositionTypeExtraDelegate<ExtArgs>;

  /**
   * `prisma.productComposition`: Exposes CRUD operations for the **ProductComposition** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductCompositions
    * const productCompositions = await prisma.productComposition.findMany()
    * ```
    */
  get productComposition(): Prisma.ProductCompositionDelegate<ExtArgs>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs>;

  /**
   * `prisma.restaurantTable`: Exposes CRUD operations for the **RestaurantTable** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RestaurantTables
    * const restaurantTables = await prisma.restaurantTable.findMany()
    * ```
    */
  get restaurantTable(): Prisma.RestaurantTableDelegate<ExtArgs>;

  /**
   * `prisma.cashierSession`: Exposes CRUD operations for the **CashierSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CashierSessions
    * const cashierSessions = await prisma.cashierSession.findMany()
    * ```
    */
  get cashierSession(): Prisma.CashierSessionDelegate<ExtArgs>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs>;

  /**
   * `prisma.orderLine`: Exposes CRUD operations for the **OrderLine** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderLines
    * const orderLines = await prisma.orderLine.findMany()
    * ```
    */
  get orderLine(): Prisma.OrderLineDelegate<ExtArgs>;

  /**
   * `prisma.setting`: Exposes CRUD operations for the **Setting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Settings
    * const settings = await prisma.setting.findMany()
    * ```
    */
  get setting(): Prisma.SettingDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "staff" | "category" | "extra" | "compositionType" | "compositionTypeExtra" | "productComposition" | "product" | "restaurantTable" | "cashierSession" | "order" | "orderLine" | "setting"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Staff: {
        payload: Prisma.$StaffPayload<ExtArgs>
        fields: Prisma.StaffFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StaffFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StaffFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          findFirst: {
            args: Prisma.StaffFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StaffFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          findMany: {
            args: Prisma.StaffFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>[]
          }
          create: {
            args: Prisma.StaffCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          createMany: {
            args: Prisma.StaffCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StaffCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>[]
          }
          delete: {
            args: Prisma.StaffDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          update: {
            args: Prisma.StaffUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          deleteMany: {
            args: Prisma.StaffDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StaffUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StaffUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          aggregate: {
            args: Prisma.StaffAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStaff>
          }
          groupBy: {
            args: Prisma.StaffGroupByArgs<ExtArgs>
            result: $Utils.Optional<StaffGroupByOutputType>[]
          }
          count: {
            args: Prisma.StaffCountArgs<ExtArgs>
            result: $Utils.Optional<StaffCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Extra: {
        payload: Prisma.$ExtraPayload<ExtArgs>
        fields: Prisma.ExtraFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExtraFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtraPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExtraFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtraPayload>
          }
          findFirst: {
            args: Prisma.ExtraFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtraPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExtraFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtraPayload>
          }
          findMany: {
            args: Prisma.ExtraFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtraPayload>[]
          }
          create: {
            args: Prisma.ExtraCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtraPayload>
          }
          createMany: {
            args: Prisma.ExtraCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExtraCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtraPayload>[]
          }
          delete: {
            args: Prisma.ExtraDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtraPayload>
          }
          update: {
            args: Prisma.ExtraUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtraPayload>
          }
          deleteMany: {
            args: Prisma.ExtraDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExtraUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExtraUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtraPayload>
          }
          aggregate: {
            args: Prisma.ExtraAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExtra>
          }
          groupBy: {
            args: Prisma.ExtraGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExtraGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExtraCountArgs<ExtArgs>
            result: $Utils.Optional<ExtraCountAggregateOutputType> | number
          }
        }
      }
      CompositionType: {
        payload: Prisma.$CompositionTypePayload<ExtArgs>
        fields: Prisma.CompositionTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompositionTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompositionTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompositionTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompositionTypePayload>
          }
          findFirst: {
            args: Prisma.CompositionTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompositionTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompositionTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompositionTypePayload>
          }
          findMany: {
            args: Prisma.CompositionTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompositionTypePayload>[]
          }
          create: {
            args: Prisma.CompositionTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompositionTypePayload>
          }
          createMany: {
            args: Prisma.CompositionTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompositionTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompositionTypePayload>[]
          }
          delete: {
            args: Prisma.CompositionTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompositionTypePayload>
          }
          update: {
            args: Prisma.CompositionTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompositionTypePayload>
          }
          deleteMany: {
            args: Prisma.CompositionTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompositionTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CompositionTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompositionTypePayload>
          }
          aggregate: {
            args: Prisma.CompositionTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompositionType>
          }
          groupBy: {
            args: Prisma.CompositionTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompositionTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompositionTypeCountArgs<ExtArgs>
            result: $Utils.Optional<CompositionTypeCountAggregateOutputType> | number
          }
        }
      }
      CompositionTypeExtra: {
        payload: Prisma.$CompositionTypeExtraPayload<ExtArgs>
        fields: Prisma.CompositionTypeExtraFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompositionTypeExtraFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompositionTypeExtraPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompositionTypeExtraFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompositionTypeExtraPayload>
          }
          findFirst: {
            args: Prisma.CompositionTypeExtraFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompositionTypeExtraPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompositionTypeExtraFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompositionTypeExtraPayload>
          }
          findMany: {
            args: Prisma.CompositionTypeExtraFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompositionTypeExtraPayload>[]
          }
          create: {
            args: Prisma.CompositionTypeExtraCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompositionTypeExtraPayload>
          }
          createMany: {
            args: Prisma.CompositionTypeExtraCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompositionTypeExtraCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompositionTypeExtraPayload>[]
          }
          delete: {
            args: Prisma.CompositionTypeExtraDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompositionTypeExtraPayload>
          }
          update: {
            args: Prisma.CompositionTypeExtraUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompositionTypeExtraPayload>
          }
          deleteMany: {
            args: Prisma.CompositionTypeExtraDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompositionTypeExtraUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CompositionTypeExtraUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompositionTypeExtraPayload>
          }
          aggregate: {
            args: Prisma.CompositionTypeExtraAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompositionTypeExtra>
          }
          groupBy: {
            args: Prisma.CompositionTypeExtraGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompositionTypeExtraGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompositionTypeExtraCountArgs<ExtArgs>
            result: $Utils.Optional<CompositionTypeExtraCountAggregateOutputType> | number
          }
        }
      }
      ProductComposition: {
        payload: Prisma.$ProductCompositionPayload<ExtArgs>
        fields: Prisma.ProductCompositionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductCompositionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCompositionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductCompositionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCompositionPayload>
          }
          findFirst: {
            args: Prisma.ProductCompositionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCompositionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductCompositionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCompositionPayload>
          }
          findMany: {
            args: Prisma.ProductCompositionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCompositionPayload>[]
          }
          create: {
            args: Prisma.ProductCompositionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCompositionPayload>
          }
          createMany: {
            args: Prisma.ProductCompositionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCompositionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCompositionPayload>[]
          }
          delete: {
            args: Prisma.ProductCompositionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCompositionPayload>
          }
          update: {
            args: Prisma.ProductCompositionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCompositionPayload>
          }
          deleteMany: {
            args: Prisma.ProductCompositionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductCompositionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductCompositionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCompositionPayload>
          }
          aggregate: {
            args: Prisma.ProductCompositionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductComposition>
          }
          groupBy: {
            args: Prisma.ProductCompositionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductCompositionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCompositionCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCompositionCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      RestaurantTable: {
        payload: Prisma.$RestaurantTablePayload<ExtArgs>
        fields: Prisma.RestaurantTableFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RestaurantTableFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantTablePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RestaurantTableFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantTablePayload>
          }
          findFirst: {
            args: Prisma.RestaurantTableFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantTablePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RestaurantTableFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantTablePayload>
          }
          findMany: {
            args: Prisma.RestaurantTableFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantTablePayload>[]
          }
          create: {
            args: Prisma.RestaurantTableCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantTablePayload>
          }
          createMany: {
            args: Prisma.RestaurantTableCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RestaurantTableCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantTablePayload>[]
          }
          delete: {
            args: Prisma.RestaurantTableDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantTablePayload>
          }
          update: {
            args: Prisma.RestaurantTableUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantTablePayload>
          }
          deleteMany: {
            args: Prisma.RestaurantTableDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RestaurantTableUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RestaurantTableUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantTablePayload>
          }
          aggregate: {
            args: Prisma.RestaurantTableAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRestaurantTable>
          }
          groupBy: {
            args: Prisma.RestaurantTableGroupByArgs<ExtArgs>
            result: $Utils.Optional<RestaurantTableGroupByOutputType>[]
          }
          count: {
            args: Prisma.RestaurantTableCountArgs<ExtArgs>
            result: $Utils.Optional<RestaurantTableCountAggregateOutputType> | number
          }
        }
      }
      CashierSession: {
        payload: Prisma.$CashierSessionPayload<ExtArgs>
        fields: Prisma.CashierSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CashierSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CashierSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierSessionPayload>
          }
          findFirst: {
            args: Prisma.CashierSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CashierSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierSessionPayload>
          }
          findMany: {
            args: Prisma.CashierSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierSessionPayload>[]
          }
          create: {
            args: Prisma.CashierSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierSessionPayload>
          }
          createMany: {
            args: Prisma.CashierSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CashierSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierSessionPayload>[]
          }
          delete: {
            args: Prisma.CashierSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierSessionPayload>
          }
          update: {
            args: Prisma.CashierSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierSessionPayload>
          }
          deleteMany: {
            args: Prisma.CashierSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CashierSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CashierSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierSessionPayload>
          }
          aggregate: {
            args: Prisma.CashierSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCashierSession>
          }
          groupBy: {
            args: Prisma.CashierSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<CashierSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.CashierSessionCountArgs<ExtArgs>
            result: $Utils.Optional<CashierSessionCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      OrderLine: {
        payload: Prisma.$OrderLinePayload<ExtArgs>
        fields: Prisma.OrderLineFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderLineFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderLinePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderLineFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderLinePayload>
          }
          findFirst: {
            args: Prisma.OrderLineFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderLinePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderLineFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderLinePayload>
          }
          findMany: {
            args: Prisma.OrderLineFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderLinePayload>[]
          }
          create: {
            args: Prisma.OrderLineCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderLinePayload>
          }
          createMany: {
            args: Prisma.OrderLineCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderLineCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderLinePayload>[]
          }
          delete: {
            args: Prisma.OrderLineDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderLinePayload>
          }
          update: {
            args: Prisma.OrderLineUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderLinePayload>
          }
          deleteMany: {
            args: Prisma.OrderLineDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderLineUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrderLineUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderLinePayload>
          }
          aggregate: {
            args: Prisma.OrderLineAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderLine>
          }
          groupBy: {
            args: Prisma.OrderLineGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderLineGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderLineCountArgs<ExtArgs>
            result: $Utils.Optional<OrderLineCountAggregateOutputType> | number
          }
        }
      }
      Setting: {
        payload: Prisma.$SettingPayload<ExtArgs>
        fields: Prisma.SettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SettingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SettingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          findFirst: {
            args: Prisma.SettingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SettingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          findMany: {
            args: Prisma.SettingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>[]
          }
          create: {
            args: Prisma.SettingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          createMany: {
            args: Prisma.SettingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SettingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>[]
          }
          delete: {
            args: Prisma.SettingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          update: {
            args: Prisma.SettingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          deleteMany: {
            args: Prisma.SettingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SettingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SettingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          aggregate: {
            args: Prisma.SettingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSetting>
          }
          groupBy: {
            args: Prisma.SettingGroupByArgs<ExtArgs>
            result: $Utils.Optional<SettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.SettingCountArgs<ExtArgs>
            result: $Utils.Optional<SettingCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type StaffCountOutputType
   */

  export type StaffCountOutputType = {
    sessions: number
    orders: number
  }

  export type StaffCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | StaffCountOutputTypeCountSessionsArgs
    orders?: boolean | StaffCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * StaffCountOutputType without action
   */
  export type StaffCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffCountOutputType
     */
    select?: StaffCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StaffCountOutputType without action
   */
  export type StaffCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CashierSessionWhereInput
  }

  /**
   * StaffCountOutputType without action
   */
  export type StaffCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    products: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | CategoryCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }


  /**
   * Count Type ExtraCountOutputType
   */

  export type ExtraCountOutputType = {
    typeLinks: number
  }

  export type ExtraCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    typeLinks?: boolean | ExtraCountOutputTypeCountTypeLinksArgs
  }

  // Custom InputTypes
  /**
   * ExtraCountOutputType without action
   */
  export type ExtraCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExtraCountOutputType
     */
    select?: ExtraCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ExtraCountOutputType without action
   */
  export type ExtraCountOutputTypeCountTypeLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompositionTypeExtraWhereInput
  }


  /**
   * Count Type CompositionTypeCountOutputType
   */

  export type CompositionTypeCountOutputType = {
    extras: number
    productSteps: number
  }

  export type CompositionTypeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    extras?: boolean | CompositionTypeCountOutputTypeCountExtrasArgs
    productSteps?: boolean | CompositionTypeCountOutputTypeCountProductStepsArgs
  }

  // Custom InputTypes
  /**
   * CompositionTypeCountOutputType without action
   */
  export type CompositionTypeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompositionTypeCountOutputType
     */
    select?: CompositionTypeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompositionTypeCountOutputType without action
   */
  export type CompositionTypeCountOutputTypeCountExtrasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompositionTypeExtraWhereInput
  }

  /**
   * CompositionTypeCountOutputType without action
   */
  export type CompositionTypeCountOutputTypeCountProductStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductCompositionWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    compositions: number
    orderLines: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    compositions?: boolean | ProductCountOutputTypeCountCompositionsArgs
    orderLines?: boolean | ProductCountOutputTypeCountOrderLinesArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountCompositionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductCompositionWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountOrderLinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderLineWhereInput
  }


  /**
   * Count Type RestaurantTableCountOutputType
   */

  export type RestaurantTableCountOutputType = {
    orders: number
  }

  export type RestaurantTableCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | RestaurantTableCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * RestaurantTableCountOutputType without action
   */
  export type RestaurantTableCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantTableCountOutputType
     */
    select?: RestaurantTableCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RestaurantTableCountOutputType without action
   */
  export type RestaurantTableCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }


  /**
   * Count Type CashierSessionCountOutputType
   */

  export type CashierSessionCountOutputType = {
    orders: number
  }

  export type CashierSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | CashierSessionCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * CashierSessionCountOutputType without action
   */
  export type CashierSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierSessionCountOutputType
     */
    select?: CashierSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CashierSessionCountOutputType without action
   */
  export type CashierSessionCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }


  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    lines: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lines?: boolean | OrderCountOutputTypeCountLinesArgs
  }

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountLinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderLineWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Staff
   */

  export type AggregateStaff = {
    _count: StaffCountAggregateOutputType | null
    _min: StaffMinAggregateOutputType | null
    _max: StaffMaxAggregateOutputType | null
  }

  export type StaffMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    fullName: string | null
    role: $Enums.StaffRole | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type StaffMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    fullName: string | null
    role: $Enums.StaffRole | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type StaffCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    fullName: number
    role: number
    isActive: number
    createdAt: number
    _all: number
  }


  export type StaffMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    fullName?: true
    role?: true
    isActive?: true
    createdAt?: true
  }

  export type StaffMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    fullName?: true
    role?: true
    isActive?: true
    createdAt?: true
  }

  export type StaffCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    fullName?: true
    role?: true
    isActive?: true
    createdAt?: true
    _all?: true
  }

  export type StaffAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Staff to aggregate.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Staff
    **/
    _count?: true | StaffCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StaffMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StaffMaxAggregateInputType
  }

  export type GetStaffAggregateType<T extends StaffAggregateArgs> = {
        [P in keyof T & keyof AggregateStaff]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStaff[P]>
      : GetScalarType<T[P], AggregateStaff[P]>
  }




  export type StaffGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffWhereInput
    orderBy?: StaffOrderByWithAggregationInput | StaffOrderByWithAggregationInput[]
    by: StaffScalarFieldEnum[] | StaffScalarFieldEnum
    having?: StaffScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StaffCountAggregateInputType | true
    _min?: StaffMinAggregateInputType
    _max?: StaffMaxAggregateInputType
  }

  export type StaffGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    fullName: string
    role: $Enums.StaffRole
    isActive: boolean
    createdAt: Date
    _count: StaffCountAggregateOutputType | null
    _min: StaffMinAggregateOutputType | null
    _max: StaffMaxAggregateOutputType | null
  }

  type GetStaffGroupByPayload<T extends StaffGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StaffGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StaffGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StaffGroupByOutputType[P]>
            : GetScalarType<T[P], StaffGroupByOutputType[P]>
        }
      >
    >


  export type StaffSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    sessions?: boolean | Staff$sessionsArgs<ExtArgs>
    orders?: boolean | Staff$ordersArgs<ExtArgs>
    _count?: boolean | StaffCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staff"]>

  export type StaffSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["staff"]>

  export type StaffSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
  }

  export type StaffInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | Staff$sessionsArgs<ExtArgs>
    orders?: boolean | Staff$ordersArgs<ExtArgs>
    _count?: boolean | StaffCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StaffIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StaffPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Staff"
    objects: {
      sessions: Prisma.$CashierSessionPayload<ExtArgs>[]
      orders: Prisma.$OrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      fullName: string
      role: $Enums.StaffRole
      isActive: boolean
      createdAt: Date
    }, ExtArgs["result"]["staff"]>
    composites: {}
  }

  type StaffGetPayload<S extends boolean | null | undefined | StaffDefaultArgs> = $Result.GetResult<Prisma.$StaffPayload, S>

  type StaffCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StaffFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StaffCountAggregateInputType | true
    }

  export interface StaffDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Staff'], meta: { name: 'Staff' } }
    /**
     * Find zero or one Staff that matches the filter.
     * @param {StaffFindUniqueArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StaffFindUniqueArgs>(args: SelectSubset<T, StaffFindUniqueArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Staff that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StaffFindUniqueOrThrowArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StaffFindUniqueOrThrowArgs>(args: SelectSubset<T, StaffFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Staff that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffFindFirstArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StaffFindFirstArgs>(args?: SelectSubset<T, StaffFindFirstArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Staff that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffFindFirstOrThrowArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StaffFindFirstOrThrowArgs>(args?: SelectSubset<T, StaffFindFirstOrThrowArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Staff that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Staff
     * const staff = await prisma.staff.findMany()
     * 
     * // Get first 10 Staff
     * const staff = await prisma.staff.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const staffWithIdOnly = await prisma.staff.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StaffFindManyArgs>(args?: SelectSubset<T, StaffFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Staff.
     * @param {StaffCreateArgs} args - Arguments to create a Staff.
     * @example
     * // Create one Staff
     * const Staff = await prisma.staff.create({
     *   data: {
     *     // ... data to create a Staff
     *   }
     * })
     * 
     */
    create<T extends StaffCreateArgs>(args: SelectSubset<T, StaffCreateArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Staff.
     * @param {StaffCreateManyArgs} args - Arguments to create many Staff.
     * @example
     * // Create many Staff
     * const staff = await prisma.staff.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StaffCreateManyArgs>(args?: SelectSubset<T, StaffCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Staff and returns the data saved in the database.
     * @param {StaffCreateManyAndReturnArgs} args - Arguments to create many Staff.
     * @example
     * // Create many Staff
     * const staff = await prisma.staff.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Staff and only return the `id`
     * const staffWithIdOnly = await prisma.staff.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StaffCreateManyAndReturnArgs>(args?: SelectSubset<T, StaffCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Staff.
     * @param {StaffDeleteArgs} args - Arguments to delete one Staff.
     * @example
     * // Delete one Staff
     * const Staff = await prisma.staff.delete({
     *   where: {
     *     // ... filter to delete one Staff
     *   }
     * })
     * 
     */
    delete<T extends StaffDeleteArgs>(args: SelectSubset<T, StaffDeleteArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Staff.
     * @param {StaffUpdateArgs} args - Arguments to update one Staff.
     * @example
     * // Update one Staff
     * const staff = await prisma.staff.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StaffUpdateArgs>(args: SelectSubset<T, StaffUpdateArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Staff.
     * @param {StaffDeleteManyArgs} args - Arguments to filter Staff to delete.
     * @example
     * // Delete a few Staff
     * const { count } = await prisma.staff.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StaffDeleteManyArgs>(args?: SelectSubset<T, StaffDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Staff
     * const staff = await prisma.staff.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StaffUpdateManyArgs>(args: SelectSubset<T, StaffUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Staff.
     * @param {StaffUpsertArgs} args - Arguments to update or create a Staff.
     * @example
     * // Update or create a Staff
     * const staff = await prisma.staff.upsert({
     *   create: {
     *     // ... data to create a Staff
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Staff we want to update
     *   }
     * })
     */
    upsert<T extends StaffUpsertArgs>(args: SelectSubset<T, StaffUpsertArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffCountArgs} args - Arguments to filter Staff to count.
     * @example
     * // Count the number of Staff
     * const count = await prisma.staff.count({
     *   where: {
     *     // ... the filter for the Staff we want to count
     *   }
     * })
    **/
    count<T extends StaffCountArgs>(
      args?: Subset<T, StaffCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StaffCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StaffAggregateArgs>(args: Subset<T, StaffAggregateArgs>): Prisma.PrismaPromise<GetStaffAggregateType<T>>

    /**
     * Group by Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StaffGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StaffGroupByArgs['orderBy'] }
        : { orderBy?: StaffGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StaffGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStaffGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Staff model
   */
  readonly fields: StaffFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Staff.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StaffClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends Staff$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, Staff$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CashierSessionPayload<ExtArgs>, T, "findMany"> | Null>
    orders<T extends Staff$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Staff$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Staff model
   */ 
  interface StaffFieldRefs {
    readonly id: FieldRef<"Staff", 'String'>
    readonly email: FieldRef<"Staff", 'String'>
    readonly passwordHash: FieldRef<"Staff", 'String'>
    readonly fullName: FieldRef<"Staff", 'String'>
    readonly role: FieldRef<"Staff", 'StaffRole'>
    readonly isActive: FieldRef<"Staff", 'Boolean'>
    readonly createdAt: FieldRef<"Staff", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Staff findUnique
   */
  export type StaffFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff findUniqueOrThrow
   */
  export type StaffFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff findFirst
   */
  export type StaffFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Staff.
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Staff.
     */
    distinct?: StaffScalarFieldEnum | StaffScalarFieldEnum[]
  }

  /**
   * Staff findFirstOrThrow
   */
  export type StaffFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Staff.
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Staff.
     */
    distinct?: StaffScalarFieldEnum | StaffScalarFieldEnum[]
  }

  /**
   * Staff findMany
   */
  export type StaffFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Staff.
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    distinct?: StaffScalarFieldEnum | StaffScalarFieldEnum[]
  }

  /**
   * Staff create
   */
  export type StaffCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * The data needed to create a Staff.
     */
    data: XOR<StaffCreateInput, StaffUncheckedCreateInput>
  }

  /**
   * Staff createMany
   */
  export type StaffCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Staff.
     */
    data: StaffCreateManyInput | StaffCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Staff createManyAndReturn
   */
  export type StaffCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Staff.
     */
    data: StaffCreateManyInput | StaffCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Staff update
   */
  export type StaffUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * The data needed to update a Staff.
     */
    data: XOR<StaffUpdateInput, StaffUncheckedUpdateInput>
    /**
     * Choose, which Staff to update.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff updateMany
   */
  export type StaffUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Staff.
     */
    data: XOR<StaffUpdateManyMutationInput, StaffUncheckedUpdateManyInput>
    /**
     * Filter which Staff to update
     */
    where?: StaffWhereInput
  }

  /**
   * Staff upsert
   */
  export type StaffUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * The filter to search for the Staff to update in case it exists.
     */
    where: StaffWhereUniqueInput
    /**
     * In case the Staff found by the `where` argument doesn't exist, create a new Staff with this data.
     */
    create: XOR<StaffCreateInput, StaffUncheckedCreateInput>
    /**
     * In case the Staff was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StaffUpdateInput, StaffUncheckedUpdateInput>
  }

  /**
   * Staff delete
   */
  export type StaffDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter which Staff to delete.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff deleteMany
   */
  export type StaffDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Staff to delete
     */
    where?: StaffWhereInput
  }

  /**
   * Staff.sessions
   */
  export type Staff$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierSession
     */
    select?: CashierSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierSessionInclude<ExtArgs> | null
    where?: CashierSessionWhereInput
    orderBy?: CashierSessionOrderByWithRelationInput | CashierSessionOrderByWithRelationInput[]
    cursor?: CashierSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CashierSessionScalarFieldEnum | CashierSessionScalarFieldEnum[]
  }

  /**
   * Staff.orders
   */
  export type Staff$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Staff without action
   */
  export type StaffDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    sortOrder: number | null
  }

  export type CategorySumAggregateOutputType = {
    sortOrder: number | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    image: string | null
    sortOrder: number | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    image: string | null
    sortOrder: number | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    image: number
    sortOrder: number
    isActive: number
    createdAt: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    sortOrder?: true
  }

  export type CategorySumAggregateInputType = {
    sortOrder?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    image?: true
    sortOrder?: true
    isActive?: true
    createdAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    image?: true
    sortOrder?: true
    isActive?: true
    createdAt?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    image?: true
    sortOrder?: true
    isActive?: true
    createdAt?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _avg?: CategoryAvgAggregateInputType
    _sum?: CategorySumAggregateInputType
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    name: string
    image: string | null
    sortOrder: number
    isActive: boolean
    createdAt: Date
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    image?: boolean
    sortOrder?: boolean
    isActive?: boolean
    createdAt?: boolean
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    image?: boolean
    sortOrder?: boolean
    isActive?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    image?: boolean
    sortOrder?: boolean
    isActive?: boolean
    createdAt?: boolean
  }

  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      products: Prisma.$ProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      image: string | null
      sortOrder: number
      isActive: boolean
      createdAt: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    products<T extends Category$productsArgs<ExtArgs> = {}>(args?: Subset<T, Category$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */ 
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly image: FieldRef<"Category", 'String'>
    readonly sortOrder: FieldRef<"Category", 'Int'>
    readonly isActive: FieldRef<"Category", 'Boolean'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
  }

  /**
   * Category.products
   */
  export type Category$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Extra
   */

  export type AggregateExtra = {
    _count: ExtraCountAggregateOutputType | null
    _avg: ExtraAvgAggregateOutputType | null
    _sum: ExtraSumAggregateOutputType | null
    _min: ExtraMinAggregateOutputType | null
    _max: ExtraMaxAggregateOutputType | null
  }

  export type ExtraAvgAggregateOutputType = {
    price: number | null
    suppPrice: number | null
    sortOrder: number | null
  }

  export type ExtraSumAggregateOutputType = {
    price: number | null
    suppPrice: number | null
    sortOrder: number | null
  }

  export type ExtraMinAggregateOutputType = {
    id: string | null
    name: string | null
    image: string | null
    price: number | null
    suppPrice: number | null
    outOfStock: boolean | null
    visible: boolean | null
    sortOrder: number | null
    createdAt: Date | null
  }

  export type ExtraMaxAggregateOutputType = {
    id: string | null
    name: string | null
    image: string | null
    price: number | null
    suppPrice: number | null
    outOfStock: boolean | null
    visible: boolean | null
    sortOrder: number | null
    createdAt: Date | null
  }

  export type ExtraCountAggregateOutputType = {
    id: number
    name: number
    image: number
    price: number
    suppPrice: number
    outOfStock: number
    visible: number
    sortOrder: number
    createdAt: number
    _all: number
  }


  export type ExtraAvgAggregateInputType = {
    price?: true
    suppPrice?: true
    sortOrder?: true
  }

  export type ExtraSumAggregateInputType = {
    price?: true
    suppPrice?: true
    sortOrder?: true
  }

  export type ExtraMinAggregateInputType = {
    id?: true
    name?: true
    image?: true
    price?: true
    suppPrice?: true
    outOfStock?: true
    visible?: true
    sortOrder?: true
    createdAt?: true
  }

  export type ExtraMaxAggregateInputType = {
    id?: true
    name?: true
    image?: true
    price?: true
    suppPrice?: true
    outOfStock?: true
    visible?: true
    sortOrder?: true
    createdAt?: true
  }

  export type ExtraCountAggregateInputType = {
    id?: true
    name?: true
    image?: true
    price?: true
    suppPrice?: true
    outOfStock?: true
    visible?: true
    sortOrder?: true
    createdAt?: true
    _all?: true
  }

  export type ExtraAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Extra to aggregate.
     */
    where?: ExtraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Extras to fetch.
     */
    orderBy?: ExtraOrderByWithRelationInput | ExtraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExtraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Extras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Extras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Extras
    **/
    _count?: true | ExtraCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExtraAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExtraSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExtraMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExtraMaxAggregateInputType
  }

  export type GetExtraAggregateType<T extends ExtraAggregateArgs> = {
        [P in keyof T & keyof AggregateExtra]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExtra[P]>
      : GetScalarType<T[P], AggregateExtra[P]>
  }




  export type ExtraGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExtraWhereInput
    orderBy?: ExtraOrderByWithAggregationInput | ExtraOrderByWithAggregationInput[]
    by: ExtraScalarFieldEnum[] | ExtraScalarFieldEnum
    having?: ExtraScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExtraCountAggregateInputType | true
    _avg?: ExtraAvgAggregateInputType
    _sum?: ExtraSumAggregateInputType
    _min?: ExtraMinAggregateInputType
    _max?: ExtraMaxAggregateInputType
  }

  export type ExtraGroupByOutputType = {
    id: string
    name: string
    image: string | null
    price: number
    suppPrice: number
    outOfStock: boolean
    visible: boolean
    sortOrder: number
    createdAt: Date
    _count: ExtraCountAggregateOutputType | null
    _avg: ExtraAvgAggregateOutputType | null
    _sum: ExtraSumAggregateOutputType | null
    _min: ExtraMinAggregateOutputType | null
    _max: ExtraMaxAggregateOutputType | null
  }

  type GetExtraGroupByPayload<T extends ExtraGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExtraGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExtraGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExtraGroupByOutputType[P]>
            : GetScalarType<T[P], ExtraGroupByOutputType[P]>
        }
      >
    >


  export type ExtraSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    image?: boolean
    price?: boolean
    suppPrice?: boolean
    outOfStock?: boolean
    visible?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    typeLinks?: boolean | Extra$typeLinksArgs<ExtArgs>
    _count?: boolean | ExtraCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["extra"]>

  export type ExtraSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    image?: boolean
    price?: boolean
    suppPrice?: boolean
    outOfStock?: boolean
    visible?: boolean
    sortOrder?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["extra"]>

  export type ExtraSelectScalar = {
    id?: boolean
    name?: boolean
    image?: boolean
    price?: boolean
    suppPrice?: boolean
    outOfStock?: boolean
    visible?: boolean
    sortOrder?: boolean
    createdAt?: boolean
  }

  export type ExtraInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    typeLinks?: boolean | Extra$typeLinksArgs<ExtArgs>
    _count?: boolean | ExtraCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ExtraIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ExtraPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Extra"
    objects: {
      typeLinks: Prisma.$CompositionTypeExtraPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      image: string | null
      /**
       * Paid add-on cents when parent type has `payment: true` (Mongo `price`).
       */
      price: number
      /**
       * Supplement cents when `payment: false` (Mongo `suppPrice`).
       */
      suppPrice: number
      outOfStock: boolean
      visible: boolean
      sortOrder: number
      createdAt: Date
    }, ExtArgs["result"]["extra"]>
    composites: {}
  }

  type ExtraGetPayload<S extends boolean | null | undefined | ExtraDefaultArgs> = $Result.GetResult<Prisma.$ExtraPayload, S>

  type ExtraCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ExtraFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ExtraCountAggregateInputType | true
    }

  export interface ExtraDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Extra'], meta: { name: 'Extra' } }
    /**
     * Find zero or one Extra that matches the filter.
     * @param {ExtraFindUniqueArgs} args - Arguments to find a Extra
     * @example
     * // Get one Extra
     * const extra = await prisma.extra.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExtraFindUniqueArgs>(args: SelectSubset<T, ExtraFindUniqueArgs<ExtArgs>>): Prisma__ExtraClient<$Result.GetResult<Prisma.$ExtraPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Extra that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ExtraFindUniqueOrThrowArgs} args - Arguments to find a Extra
     * @example
     * // Get one Extra
     * const extra = await prisma.extra.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExtraFindUniqueOrThrowArgs>(args: SelectSubset<T, ExtraFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExtraClient<$Result.GetResult<Prisma.$ExtraPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Extra that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExtraFindFirstArgs} args - Arguments to find a Extra
     * @example
     * // Get one Extra
     * const extra = await prisma.extra.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExtraFindFirstArgs>(args?: SelectSubset<T, ExtraFindFirstArgs<ExtArgs>>): Prisma__ExtraClient<$Result.GetResult<Prisma.$ExtraPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Extra that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExtraFindFirstOrThrowArgs} args - Arguments to find a Extra
     * @example
     * // Get one Extra
     * const extra = await prisma.extra.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExtraFindFirstOrThrowArgs>(args?: SelectSubset<T, ExtraFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExtraClient<$Result.GetResult<Prisma.$ExtraPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Extras that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExtraFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Extras
     * const extras = await prisma.extra.findMany()
     * 
     * // Get first 10 Extras
     * const extras = await prisma.extra.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const extraWithIdOnly = await prisma.extra.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExtraFindManyArgs>(args?: SelectSubset<T, ExtraFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExtraPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Extra.
     * @param {ExtraCreateArgs} args - Arguments to create a Extra.
     * @example
     * // Create one Extra
     * const Extra = await prisma.extra.create({
     *   data: {
     *     // ... data to create a Extra
     *   }
     * })
     * 
     */
    create<T extends ExtraCreateArgs>(args: SelectSubset<T, ExtraCreateArgs<ExtArgs>>): Prisma__ExtraClient<$Result.GetResult<Prisma.$ExtraPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Extras.
     * @param {ExtraCreateManyArgs} args - Arguments to create many Extras.
     * @example
     * // Create many Extras
     * const extra = await prisma.extra.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExtraCreateManyArgs>(args?: SelectSubset<T, ExtraCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Extras and returns the data saved in the database.
     * @param {ExtraCreateManyAndReturnArgs} args - Arguments to create many Extras.
     * @example
     * // Create many Extras
     * const extra = await prisma.extra.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Extras and only return the `id`
     * const extraWithIdOnly = await prisma.extra.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExtraCreateManyAndReturnArgs>(args?: SelectSubset<T, ExtraCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExtraPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Extra.
     * @param {ExtraDeleteArgs} args - Arguments to delete one Extra.
     * @example
     * // Delete one Extra
     * const Extra = await prisma.extra.delete({
     *   where: {
     *     // ... filter to delete one Extra
     *   }
     * })
     * 
     */
    delete<T extends ExtraDeleteArgs>(args: SelectSubset<T, ExtraDeleteArgs<ExtArgs>>): Prisma__ExtraClient<$Result.GetResult<Prisma.$ExtraPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Extra.
     * @param {ExtraUpdateArgs} args - Arguments to update one Extra.
     * @example
     * // Update one Extra
     * const extra = await prisma.extra.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExtraUpdateArgs>(args: SelectSubset<T, ExtraUpdateArgs<ExtArgs>>): Prisma__ExtraClient<$Result.GetResult<Prisma.$ExtraPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Extras.
     * @param {ExtraDeleteManyArgs} args - Arguments to filter Extras to delete.
     * @example
     * // Delete a few Extras
     * const { count } = await prisma.extra.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExtraDeleteManyArgs>(args?: SelectSubset<T, ExtraDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Extras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExtraUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Extras
     * const extra = await prisma.extra.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExtraUpdateManyArgs>(args: SelectSubset<T, ExtraUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Extra.
     * @param {ExtraUpsertArgs} args - Arguments to update or create a Extra.
     * @example
     * // Update or create a Extra
     * const extra = await prisma.extra.upsert({
     *   create: {
     *     // ... data to create a Extra
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Extra we want to update
     *   }
     * })
     */
    upsert<T extends ExtraUpsertArgs>(args: SelectSubset<T, ExtraUpsertArgs<ExtArgs>>): Prisma__ExtraClient<$Result.GetResult<Prisma.$ExtraPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Extras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExtraCountArgs} args - Arguments to filter Extras to count.
     * @example
     * // Count the number of Extras
     * const count = await prisma.extra.count({
     *   where: {
     *     // ... the filter for the Extras we want to count
     *   }
     * })
    **/
    count<T extends ExtraCountArgs>(
      args?: Subset<T, ExtraCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExtraCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Extra.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExtraAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExtraAggregateArgs>(args: Subset<T, ExtraAggregateArgs>): Prisma.PrismaPromise<GetExtraAggregateType<T>>

    /**
     * Group by Extra.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExtraGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExtraGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExtraGroupByArgs['orderBy'] }
        : { orderBy?: ExtraGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExtraGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExtraGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Extra model
   */
  readonly fields: ExtraFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Extra.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExtraClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    typeLinks<T extends Extra$typeLinksArgs<ExtArgs> = {}>(args?: Subset<T, Extra$typeLinksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompositionTypeExtraPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Extra model
   */ 
  interface ExtraFieldRefs {
    readonly id: FieldRef<"Extra", 'String'>
    readonly name: FieldRef<"Extra", 'String'>
    readonly image: FieldRef<"Extra", 'String'>
    readonly price: FieldRef<"Extra", 'Int'>
    readonly suppPrice: FieldRef<"Extra", 'Int'>
    readonly outOfStock: FieldRef<"Extra", 'Boolean'>
    readonly visible: FieldRef<"Extra", 'Boolean'>
    readonly sortOrder: FieldRef<"Extra", 'Int'>
    readonly createdAt: FieldRef<"Extra", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Extra findUnique
   */
  export type ExtraFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Extra
     */
    select?: ExtraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtraInclude<ExtArgs> | null
    /**
     * Filter, which Extra to fetch.
     */
    where: ExtraWhereUniqueInput
  }

  /**
   * Extra findUniqueOrThrow
   */
  export type ExtraFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Extra
     */
    select?: ExtraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtraInclude<ExtArgs> | null
    /**
     * Filter, which Extra to fetch.
     */
    where: ExtraWhereUniqueInput
  }

  /**
   * Extra findFirst
   */
  export type ExtraFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Extra
     */
    select?: ExtraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtraInclude<ExtArgs> | null
    /**
     * Filter, which Extra to fetch.
     */
    where?: ExtraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Extras to fetch.
     */
    orderBy?: ExtraOrderByWithRelationInput | ExtraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Extras.
     */
    cursor?: ExtraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Extras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Extras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Extras.
     */
    distinct?: ExtraScalarFieldEnum | ExtraScalarFieldEnum[]
  }

  /**
   * Extra findFirstOrThrow
   */
  export type ExtraFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Extra
     */
    select?: ExtraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtraInclude<ExtArgs> | null
    /**
     * Filter, which Extra to fetch.
     */
    where?: ExtraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Extras to fetch.
     */
    orderBy?: ExtraOrderByWithRelationInput | ExtraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Extras.
     */
    cursor?: ExtraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Extras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Extras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Extras.
     */
    distinct?: ExtraScalarFieldEnum | ExtraScalarFieldEnum[]
  }

  /**
   * Extra findMany
   */
  export type ExtraFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Extra
     */
    select?: ExtraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtraInclude<ExtArgs> | null
    /**
     * Filter, which Extras to fetch.
     */
    where?: ExtraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Extras to fetch.
     */
    orderBy?: ExtraOrderByWithRelationInput | ExtraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Extras.
     */
    cursor?: ExtraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Extras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Extras.
     */
    skip?: number
    distinct?: ExtraScalarFieldEnum | ExtraScalarFieldEnum[]
  }

  /**
   * Extra create
   */
  export type ExtraCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Extra
     */
    select?: ExtraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtraInclude<ExtArgs> | null
    /**
     * The data needed to create a Extra.
     */
    data: XOR<ExtraCreateInput, ExtraUncheckedCreateInput>
  }

  /**
   * Extra createMany
   */
  export type ExtraCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Extras.
     */
    data: ExtraCreateManyInput | ExtraCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Extra createManyAndReturn
   */
  export type ExtraCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Extra
     */
    select?: ExtraSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Extras.
     */
    data: ExtraCreateManyInput | ExtraCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Extra update
   */
  export type ExtraUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Extra
     */
    select?: ExtraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtraInclude<ExtArgs> | null
    /**
     * The data needed to update a Extra.
     */
    data: XOR<ExtraUpdateInput, ExtraUncheckedUpdateInput>
    /**
     * Choose, which Extra to update.
     */
    where: ExtraWhereUniqueInput
  }

  /**
   * Extra updateMany
   */
  export type ExtraUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Extras.
     */
    data: XOR<ExtraUpdateManyMutationInput, ExtraUncheckedUpdateManyInput>
    /**
     * Filter which Extras to update
     */
    where?: ExtraWhereInput
  }

  /**
   * Extra upsert
   */
  export type ExtraUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Extra
     */
    select?: ExtraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtraInclude<ExtArgs> | null
    /**
     * The filter to search for the Extra to update in case it exists.
     */
    where: ExtraWhereUniqueInput
    /**
     * In case the Extra found by the `where` argument doesn't exist, create a new Extra with this data.
     */
    create: XOR<ExtraCreateInput, ExtraUncheckedCreateInput>
    /**
     * In case the Extra was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExtraUpdateInput, ExtraUncheckedUpdateInput>
  }

  /**
   * Extra delete
   */
  export type ExtraDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Extra
     */
    select?: ExtraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtraInclude<ExtArgs> | null
    /**
     * Filter which Extra to delete.
     */
    where: ExtraWhereUniqueInput
  }

  /**
   * Extra deleteMany
   */
  export type ExtraDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Extras to delete
     */
    where?: ExtraWhereInput
  }

  /**
   * Extra.typeLinks
   */
  export type Extra$typeLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompositionTypeExtra
     */
    select?: CompositionTypeExtraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompositionTypeExtraInclude<ExtArgs> | null
    where?: CompositionTypeExtraWhereInput
    orderBy?: CompositionTypeExtraOrderByWithRelationInput | CompositionTypeExtraOrderByWithRelationInput[]
    cursor?: CompositionTypeExtraWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CompositionTypeExtraScalarFieldEnum | CompositionTypeExtraScalarFieldEnum[]
  }

  /**
   * Extra without action
   */
  export type ExtraDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Extra
     */
    select?: ExtraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtraInclude<ExtArgs> | null
  }


  /**
   * Model CompositionType
   */

  export type AggregateCompositionType = {
    _count: CompositionTypeCountAggregateOutputType | null
    _avg: CompositionTypeAvgAggregateOutputType | null
    _sum: CompositionTypeSumAggregateOutputType | null
    _min: CompositionTypeMinAggregateOutputType | null
    _max: CompositionTypeMaxAggregateOutputType | null
  }

  export type CompositionTypeAvgAggregateOutputType = {
    min: number | null
    max: number | null
    sortOrder: number | null
  }

  export type CompositionTypeSumAggregateOutputType = {
    min: number | null
    max: number | null
    sortOrder: number | null
  }

  export type CompositionTypeMinAggregateOutputType = {
    id: string | null
    name: string | null
    label: string | null
    message: string | null
    min: number | null
    max: number | null
    payment: boolean | null
    selection: boolean | null
    mode: $Enums.CompositionSlotMode | null
    isActive: boolean | null
    sortOrder: number | null
    createdAt: Date | null
  }

  export type CompositionTypeMaxAggregateOutputType = {
    id: string | null
    name: string | null
    label: string | null
    message: string | null
    min: number | null
    max: number | null
    payment: boolean | null
    selection: boolean | null
    mode: $Enums.CompositionSlotMode | null
    isActive: boolean | null
    sortOrder: number | null
    createdAt: Date | null
  }

  export type CompositionTypeCountAggregateOutputType = {
    id: number
    name: number
    label: number
    message: number
    min: number
    max: number
    payment: number
    selection: number
    mode: number
    isActive: number
    sortOrder: number
    createdAt: number
    _all: number
  }


  export type CompositionTypeAvgAggregateInputType = {
    min?: true
    max?: true
    sortOrder?: true
  }

  export type CompositionTypeSumAggregateInputType = {
    min?: true
    max?: true
    sortOrder?: true
  }

  export type CompositionTypeMinAggregateInputType = {
    id?: true
    name?: true
    label?: true
    message?: true
    min?: true
    max?: true
    payment?: true
    selection?: true
    mode?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
  }

  export type CompositionTypeMaxAggregateInputType = {
    id?: true
    name?: true
    label?: true
    message?: true
    min?: true
    max?: true
    payment?: true
    selection?: true
    mode?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
  }

  export type CompositionTypeCountAggregateInputType = {
    id?: true
    name?: true
    label?: true
    message?: true
    min?: true
    max?: true
    payment?: true
    selection?: true
    mode?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
    _all?: true
  }

  export type CompositionTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompositionType to aggregate.
     */
    where?: CompositionTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompositionTypes to fetch.
     */
    orderBy?: CompositionTypeOrderByWithRelationInput | CompositionTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompositionTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompositionTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompositionTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CompositionTypes
    **/
    _count?: true | CompositionTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompositionTypeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompositionTypeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompositionTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompositionTypeMaxAggregateInputType
  }

  export type GetCompositionTypeAggregateType<T extends CompositionTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateCompositionType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompositionType[P]>
      : GetScalarType<T[P], AggregateCompositionType[P]>
  }




  export type CompositionTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompositionTypeWhereInput
    orderBy?: CompositionTypeOrderByWithAggregationInput | CompositionTypeOrderByWithAggregationInput[]
    by: CompositionTypeScalarFieldEnum[] | CompositionTypeScalarFieldEnum
    having?: CompositionTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompositionTypeCountAggregateInputType | true
    _avg?: CompositionTypeAvgAggregateInputType
    _sum?: CompositionTypeSumAggregateInputType
    _min?: CompositionTypeMinAggregateInputType
    _max?: CompositionTypeMaxAggregateInputType
  }

  export type CompositionTypeGroupByOutputType = {
    id: string
    name: string
    label: string
    message: string | null
    min: number
    max: number
    payment: boolean
    selection: boolean
    mode: $Enums.CompositionSlotMode
    isActive: boolean
    sortOrder: number
    createdAt: Date
    _count: CompositionTypeCountAggregateOutputType | null
    _avg: CompositionTypeAvgAggregateOutputType | null
    _sum: CompositionTypeSumAggregateOutputType | null
    _min: CompositionTypeMinAggregateOutputType | null
    _max: CompositionTypeMaxAggregateOutputType | null
  }

  type GetCompositionTypeGroupByPayload<T extends CompositionTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompositionTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompositionTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompositionTypeGroupByOutputType[P]>
            : GetScalarType<T[P], CompositionTypeGroupByOutputType[P]>
        }
      >
    >


  export type CompositionTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    label?: boolean
    message?: boolean
    min?: boolean
    max?: boolean
    payment?: boolean
    selection?: boolean
    mode?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    extras?: boolean | CompositionType$extrasArgs<ExtArgs>
    productSteps?: boolean | CompositionType$productStepsArgs<ExtArgs>
    _count?: boolean | CompositionTypeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["compositionType"]>

  export type CompositionTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    label?: boolean
    message?: boolean
    min?: boolean
    max?: boolean
    payment?: boolean
    selection?: boolean
    mode?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["compositionType"]>

  export type CompositionTypeSelectScalar = {
    id?: boolean
    name?: boolean
    label?: boolean
    message?: boolean
    min?: boolean
    max?: boolean
    payment?: boolean
    selection?: boolean
    mode?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
  }

  export type CompositionTypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    extras?: boolean | CompositionType$extrasArgs<ExtArgs>
    productSteps?: boolean | CompositionType$productStepsArgs<ExtArgs>
    _count?: boolean | CompositionTypeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CompositionTypeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CompositionTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CompositionType"
    objects: {
      extras: Prisma.$CompositionTypeExtraPayload<ExtArgs>[]
      productSteps: Prisma.$ProductCompositionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      label: string
      message: string | null
      min: number
      max: number
      /**
       * When true, extra `price` applies; when false, `suppPrice` applies.
       */
      payment: boolean
      selection: boolean
      mode: $Enums.CompositionSlotMode
      isActive: boolean
      sortOrder: number
      createdAt: Date
    }, ExtArgs["result"]["compositionType"]>
    composites: {}
  }

  type CompositionTypeGetPayload<S extends boolean | null | undefined | CompositionTypeDefaultArgs> = $Result.GetResult<Prisma.$CompositionTypePayload, S>

  type CompositionTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CompositionTypeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CompositionTypeCountAggregateInputType | true
    }

  export interface CompositionTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CompositionType'], meta: { name: 'CompositionType' } }
    /**
     * Find zero or one CompositionType that matches the filter.
     * @param {CompositionTypeFindUniqueArgs} args - Arguments to find a CompositionType
     * @example
     * // Get one CompositionType
     * const compositionType = await prisma.compositionType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompositionTypeFindUniqueArgs>(args: SelectSubset<T, CompositionTypeFindUniqueArgs<ExtArgs>>): Prisma__CompositionTypeClient<$Result.GetResult<Prisma.$CompositionTypePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CompositionType that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CompositionTypeFindUniqueOrThrowArgs} args - Arguments to find a CompositionType
     * @example
     * // Get one CompositionType
     * const compositionType = await prisma.compositionType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompositionTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, CompositionTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompositionTypeClient<$Result.GetResult<Prisma.$CompositionTypePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CompositionType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompositionTypeFindFirstArgs} args - Arguments to find a CompositionType
     * @example
     * // Get one CompositionType
     * const compositionType = await prisma.compositionType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompositionTypeFindFirstArgs>(args?: SelectSubset<T, CompositionTypeFindFirstArgs<ExtArgs>>): Prisma__CompositionTypeClient<$Result.GetResult<Prisma.$CompositionTypePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CompositionType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompositionTypeFindFirstOrThrowArgs} args - Arguments to find a CompositionType
     * @example
     * // Get one CompositionType
     * const compositionType = await prisma.compositionType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompositionTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, CompositionTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompositionTypeClient<$Result.GetResult<Prisma.$CompositionTypePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CompositionTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompositionTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CompositionTypes
     * const compositionTypes = await prisma.compositionType.findMany()
     * 
     * // Get first 10 CompositionTypes
     * const compositionTypes = await prisma.compositionType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const compositionTypeWithIdOnly = await prisma.compositionType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompositionTypeFindManyArgs>(args?: SelectSubset<T, CompositionTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompositionTypePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CompositionType.
     * @param {CompositionTypeCreateArgs} args - Arguments to create a CompositionType.
     * @example
     * // Create one CompositionType
     * const CompositionType = await prisma.compositionType.create({
     *   data: {
     *     // ... data to create a CompositionType
     *   }
     * })
     * 
     */
    create<T extends CompositionTypeCreateArgs>(args: SelectSubset<T, CompositionTypeCreateArgs<ExtArgs>>): Prisma__CompositionTypeClient<$Result.GetResult<Prisma.$CompositionTypePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CompositionTypes.
     * @param {CompositionTypeCreateManyArgs} args - Arguments to create many CompositionTypes.
     * @example
     * // Create many CompositionTypes
     * const compositionType = await prisma.compositionType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompositionTypeCreateManyArgs>(args?: SelectSubset<T, CompositionTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CompositionTypes and returns the data saved in the database.
     * @param {CompositionTypeCreateManyAndReturnArgs} args - Arguments to create many CompositionTypes.
     * @example
     * // Create many CompositionTypes
     * const compositionType = await prisma.compositionType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CompositionTypes and only return the `id`
     * const compositionTypeWithIdOnly = await prisma.compositionType.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompositionTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, CompositionTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompositionTypePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CompositionType.
     * @param {CompositionTypeDeleteArgs} args - Arguments to delete one CompositionType.
     * @example
     * // Delete one CompositionType
     * const CompositionType = await prisma.compositionType.delete({
     *   where: {
     *     // ... filter to delete one CompositionType
     *   }
     * })
     * 
     */
    delete<T extends CompositionTypeDeleteArgs>(args: SelectSubset<T, CompositionTypeDeleteArgs<ExtArgs>>): Prisma__CompositionTypeClient<$Result.GetResult<Prisma.$CompositionTypePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CompositionType.
     * @param {CompositionTypeUpdateArgs} args - Arguments to update one CompositionType.
     * @example
     * // Update one CompositionType
     * const compositionType = await prisma.compositionType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompositionTypeUpdateArgs>(args: SelectSubset<T, CompositionTypeUpdateArgs<ExtArgs>>): Prisma__CompositionTypeClient<$Result.GetResult<Prisma.$CompositionTypePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CompositionTypes.
     * @param {CompositionTypeDeleteManyArgs} args - Arguments to filter CompositionTypes to delete.
     * @example
     * // Delete a few CompositionTypes
     * const { count } = await prisma.compositionType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompositionTypeDeleteManyArgs>(args?: SelectSubset<T, CompositionTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompositionTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompositionTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CompositionTypes
     * const compositionType = await prisma.compositionType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompositionTypeUpdateManyArgs>(args: SelectSubset<T, CompositionTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CompositionType.
     * @param {CompositionTypeUpsertArgs} args - Arguments to update or create a CompositionType.
     * @example
     * // Update or create a CompositionType
     * const compositionType = await prisma.compositionType.upsert({
     *   create: {
     *     // ... data to create a CompositionType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CompositionType we want to update
     *   }
     * })
     */
    upsert<T extends CompositionTypeUpsertArgs>(args: SelectSubset<T, CompositionTypeUpsertArgs<ExtArgs>>): Prisma__CompositionTypeClient<$Result.GetResult<Prisma.$CompositionTypePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CompositionTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompositionTypeCountArgs} args - Arguments to filter CompositionTypes to count.
     * @example
     * // Count the number of CompositionTypes
     * const count = await prisma.compositionType.count({
     *   where: {
     *     // ... the filter for the CompositionTypes we want to count
     *   }
     * })
    **/
    count<T extends CompositionTypeCountArgs>(
      args?: Subset<T, CompositionTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompositionTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CompositionType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompositionTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompositionTypeAggregateArgs>(args: Subset<T, CompositionTypeAggregateArgs>): Prisma.PrismaPromise<GetCompositionTypeAggregateType<T>>

    /**
     * Group by CompositionType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompositionTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompositionTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompositionTypeGroupByArgs['orderBy'] }
        : { orderBy?: CompositionTypeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompositionTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompositionTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CompositionType model
   */
  readonly fields: CompositionTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CompositionType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompositionTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    extras<T extends CompositionType$extrasArgs<ExtArgs> = {}>(args?: Subset<T, CompositionType$extrasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompositionTypeExtraPayload<ExtArgs>, T, "findMany"> | Null>
    productSteps<T extends CompositionType$productStepsArgs<ExtArgs> = {}>(args?: Subset<T, CompositionType$productStepsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductCompositionPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CompositionType model
   */ 
  interface CompositionTypeFieldRefs {
    readonly id: FieldRef<"CompositionType", 'String'>
    readonly name: FieldRef<"CompositionType", 'String'>
    readonly label: FieldRef<"CompositionType", 'String'>
    readonly message: FieldRef<"CompositionType", 'String'>
    readonly min: FieldRef<"CompositionType", 'Int'>
    readonly max: FieldRef<"CompositionType", 'Int'>
    readonly payment: FieldRef<"CompositionType", 'Boolean'>
    readonly selection: FieldRef<"CompositionType", 'Boolean'>
    readonly mode: FieldRef<"CompositionType", 'CompositionSlotMode'>
    readonly isActive: FieldRef<"CompositionType", 'Boolean'>
    readonly sortOrder: FieldRef<"CompositionType", 'Int'>
    readonly createdAt: FieldRef<"CompositionType", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CompositionType findUnique
   */
  export type CompositionTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompositionType
     */
    select?: CompositionTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompositionTypeInclude<ExtArgs> | null
    /**
     * Filter, which CompositionType to fetch.
     */
    where: CompositionTypeWhereUniqueInput
  }

  /**
   * CompositionType findUniqueOrThrow
   */
  export type CompositionTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompositionType
     */
    select?: CompositionTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompositionTypeInclude<ExtArgs> | null
    /**
     * Filter, which CompositionType to fetch.
     */
    where: CompositionTypeWhereUniqueInput
  }

  /**
   * CompositionType findFirst
   */
  export type CompositionTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompositionType
     */
    select?: CompositionTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompositionTypeInclude<ExtArgs> | null
    /**
     * Filter, which CompositionType to fetch.
     */
    where?: CompositionTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompositionTypes to fetch.
     */
    orderBy?: CompositionTypeOrderByWithRelationInput | CompositionTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompositionTypes.
     */
    cursor?: CompositionTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompositionTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompositionTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompositionTypes.
     */
    distinct?: CompositionTypeScalarFieldEnum | CompositionTypeScalarFieldEnum[]
  }

  /**
   * CompositionType findFirstOrThrow
   */
  export type CompositionTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompositionType
     */
    select?: CompositionTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompositionTypeInclude<ExtArgs> | null
    /**
     * Filter, which CompositionType to fetch.
     */
    where?: CompositionTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompositionTypes to fetch.
     */
    orderBy?: CompositionTypeOrderByWithRelationInput | CompositionTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompositionTypes.
     */
    cursor?: CompositionTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompositionTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompositionTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompositionTypes.
     */
    distinct?: CompositionTypeScalarFieldEnum | CompositionTypeScalarFieldEnum[]
  }

  /**
   * CompositionType findMany
   */
  export type CompositionTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompositionType
     */
    select?: CompositionTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompositionTypeInclude<ExtArgs> | null
    /**
     * Filter, which CompositionTypes to fetch.
     */
    where?: CompositionTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompositionTypes to fetch.
     */
    orderBy?: CompositionTypeOrderByWithRelationInput | CompositionTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CompositionTypes.
     */
    cursor?: CompositionTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompositionTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompositionTypes.
     */
    skip?: number
    distinct?: CompositionTypeScalarFieldEnum | CompositionTypeScalarFieldEnum[]
  }

  /**
   * CompositionType create
   */
  export type CompositionTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompositionType
     */
    select?: CompositionTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompositionTypeInclude<ExtArgs> | null
    /**
     * The data needed to create a CompositionType.
     */
    data: XOR<CompositionTypeCreateInput, CompositionTypeUncheckedCreateInput>
  }

  /**
   * CompositionType createMany
   */
  export type CompositionTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CompositionTypes.
     */
    data: CompositionTypeCreateManyInput | CompositionTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CompositionType createManyAndReturn
   */
  export type CompositionTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompositionType
     */
    select?: CompositionTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CompositionTypes.
     */
    data: CompositionTypeCreateManyInput | CompositionTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CompositionType update
   */
  export type CompositionTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompositionType
     */
    select?: CompositionTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompositionTypeInclude<ExtArgs> | null
    /**
     * The data needed to update a CompositionType.
     */
    data: XOR<CompositionTypeUpdateInput, CompositionTypeUncheckedUpdateInput>
    /**
     * Choose, which CompositionType to update.
     */
    where: CompositionTypeWhereUniqueInput
  }

  /**
   * CompositionType updateMany
   */
  export type CompositionTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CompositionTypes.
     */
    data: XOR<CompositionTypeUpdateManyMutationInput, CompositionTypeUncheckedUpdateManyInput>
    /**
     * Filter which CompositionTypes to update
     */
    where?: CompositionTypeWhereInput
  }

  /**
   * CompositionType upsert
   */
  export type CompositionTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompositionType
     */
    select?: CompositionTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompositionTypeInclude<ExtArgs> | null
    /**
     * The filter to search for the CompositionType to update in case it exists.
     */
    where: CompositionTypeWhereUniqueInput
    /**
     * In case the CompositionType found by the `where` argument doesn't exist, create a new CompositionType with this data.
     */
    create: XOR<CompositionTypeCreateInput, CompositionTypeUncheckedCreateInput>
    /**
     * In case the CompositionType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompositionTypeUpdateInput, CompositionTypeUncheckedUpdateInput>
  }

  /**
   * CompositionType delete
   */
  export type CompositionTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompositionType
     */
    select?: CompositionTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompositionTypeInclude<ExtArgs> | null
    /**
     * Filter which CompositionType to delete.
     */
    where: CompositionTypeWhereUniqueInput
  }

  /**
   * CompositionType deleteMany
   */
  export type CompositionTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompositionTypes to delete
     */
    where?: CompositionTypeWhereInput
  }

  /**
   * CompositionType.extras
   */
  export type CompositionType$extrasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompositionTypeExtra
     */
    select?: CompositionTypeExtraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompositionTypeExtraInclude<ExtArgs> | null
    where?: CompositionTypeExtraWhereInput
    orderBy?: CompositionTypeExtraOrderByWithRelationInput | CompositionTypeExtraOrderByWithRelationInput[]
    cursor?: CompositionTypeExtraWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CompositionTypeExtraScalarFieldEnum | CompositionTypeExtraScalarFieldEnum[]
  }

  /**
   * CompositionType.productSteps
   */
  export type CompositionType$productStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductComposition
     */
    select?: ProductCompositionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCompositionInclude<ExtArgs> | null
    where?: ProductCompositionWhereInput
    orderBy?: ProductCompositionOrderByWithRelationInput | ProductCompositionOrderByWithRelationInput[]
    cursor?: ProductCompositionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductCompositionScalarFieldEnum | ProductCompositionScalarFieldEnum[]
  }

  /**
   * CompositionType without action
   */
  export type CompositionTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompositionType
     */
    select?: CompositionTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompositionTypeInclude<ExtArgs> | null
  }


  /**
   * Model CompositionTypeExtra
   */

  export type AggregateCompositionTypeExtra = {
    _count: CompositionTypeExtraCountAggregateOutputType | null
    _avg: CompositionTypeExtraAvgAggregateOutputType | null
    _sum: CompositionTypeExtraSumAggregateOutputType | null
    _min: CompositionTypeExtraMinAggregateOutputType | null
    _max: CompositionTypeExtraMaxAggregateOutputType | null
  }

  export type CompositionTypeExtraAvgAggregateOutputType = {
    position: number | null
  }

  export type CompositionTypeExtraSumAggregateOutputType = {
    position: number | null
  }

  export type CompositionTypeExtraMinAggregateOutputType = {
    compositionTypeId: string | null
    extraId: string | null
    position: number | null
  }

  export type CompositionTypeExtraMaxAggregateOutputType = {
    compositionTypeId: string | null
    extraId: string | null
    position: number | null
  }

  export type CompositionTypeExtraCountAggregateOutputType = {
    compositionTypeId: number
    extraId: number
    position: number
    _all: number
  }


  export type CompositionTypeExtraAvgAggregateInputType = {
    position?: true
  }

  export type CompositionTypeExtraSumAggregateInputType = {
    position?: true
  }

  export type CompositionTypeExtraMinAggregateInputType = {
    compositionTypeId?: true
    extraId?: true
    position?: true
  }

  export type CompositionTypeExtraMaxAggregateInputType = {
    compositionTypeId?: true
    extraId?: true
    position?: true
  }

  export type CompositionTypeExtraCountAggregateInputType = {
    compositionTypeId?: true
    extraId?: true
    position?: true
    _all?: true
  }

  export type CompositionTypeExtraAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompositionTypeExtra to aggregate.
     */
    where?: CompositionTypeExtraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompositionTypeExtras to fetch.
     */
    orderBy?: CompositionTypeExtraOrderByWithRelationInput | CompositionTypeExtraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompositionTypeExtraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompositionTypeExtras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompositionTypeExtras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CompositionTypeExtras
    **/
    _count?: true | CompositionTypeExtraCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompositionTypeExtraAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompositionTypeExtraSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompositionTypeExtraMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompositionTypeExtraMaxAggregateInputType
  }

  export type GetCompositionTypeExtraAggregateType<T extends CompositionTypeExtraAggregateArgs> = {
        [P in keyof T & keyof AggregateCompositionTypeExtra]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompositionTypeExtra[P]>
      : GetScalarType<T[P], AggregateCompositionTypeExtra[P]>
  }




  export type CompositionTypeExtraGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompositionTypeExtraWhereInput
    orderBy?: CompositionTypeExtraOrderByWithAggregationInput | CompositionTypeExtraOrderByWithAggregationInput[]
    by: CompositionTypeExtraScalarFieldEnum[] | CompositionTypeExtraScalarFieldEnum
    having?: CompositionTypeExtraScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompositionTypeExtraCountAggregateInputType | true
    _avg?: CompositionTypeExtraAvgAggregateInputType
    _sum?: CompositionTypeExtraSumAggregateInputType
    _min?: CompositionTypeExtraMinAggregateInputType
    _max?: CompositionTypeExtraMaxAggregateInputType
  }

  export type CompositionTypeExtraGroupByOutputType = {
    compositionTypeId: string
    extraId: string
    position: number
    _count: CompositionTypeExtraCountAggregateOutputType | null
    _avg: CompositionTypeExtraAvgAggregateOutputType | null
    _sum: CompositionTypeExtraSumAggregateOutputType | null
    _min: CompositionTypeExtraMinAggregateOutputType | null
    _max: CompositionTypeExtraMaxAggregateOutputType | null
  }

  type GetCompositionTypeExtraGroupByPayload<T extends CompositionTypeExtraGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompositionTypeExtraGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompositionTypeExtraGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompositionTypeExtraGroupByOutputType[P]>
            : GetScalarType<T[P], CompositionTypeExtraGroupByOutputType[P]>
        }
      >
    >


  export type CompositionTypeExtraSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    compositionTypeId?: boolean
    extraId?: boolean
    position?: boolean
    compositionType?: boolean | CompositionTypeDefaultArgs<ExtArgs>
    extra?: boolean | ExtraDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["compositionTypeExtra"]>

  export type CompositionTypeExtraSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    compositionTypeId?: boolean
    extraId?: boolean
    position?: boolean
    compositionType?: boolean | CompositionTypeDefaultArgs<ExtArgs>
    extra?: boolean | ExtraDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["compositionTypeExtra"]>

  export type CompositionTypeExtraSelectScalar = {
    compositionTypeId?: boolean
    extraId?: boolean
    position?: boolean
  }

  export type CompositionTypeExtraInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    compositionType?: boolean | CompositionTypeDefaultArgs<ExtArgs>
    extra?: boolean | ExtraDefaultArgs<ExtArgs>
  }
  export type CompositionTypeExtraIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    compositionType?: boolean | CompositionTypeDefaultArgs<ExtArgs>
    extra?: boolean | ExtraDefaultArgs<ExtArgs>
  }

  export type $CompositionTypeExtraPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CompositionTypeExtra"
    objects: {
      compositionType: Prisma.$CompositionTypePayload<ExtArgs>
      extra: Prisma.$ExtraPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      compositionTypeId: string
      extraId: string
      position: number
    }, ExtArgs["result"]["compositionTypeExtra"]>
    composites: {}
  }

  type CompositionTypeExtraGetPayload<S extends boolean | null | undefined | CompositionTypeExtraDefaultArgs> = $Result.GetResult<Prisma.$CompositionTypeExtraPayload, S>

  type CompositionTypeExtraCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CompositionTypeExtraFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CompositionTypeExtraCountAggregateInputType | true
    }

  export interface CompositionTypeExtraDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CompositionTypeExtra'], meta: { name: 'CompositionTypeExtra' } }
    /**
     * Find zero or one CompositionTypeExtra that matches the filter.
     * @param {CompositionTypeExtraFindUniqueArgs} args - Arguments to find a CompositionTypeExtra
     * @example
     * // Get one CompositionTypeExtra
     * const compositionTypeExtra = await prisma.compositionTypeExtra.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompositionTypeExtraFindUniqueArgs>(args: SelectSubset<T, CompositionTypeExtraFindUniqueArgs<ExtArgs>>): Prisma__CompositionTypeExtraClient<$Result.GetResult<Prisma.$CompositionTypeExtraPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CompositionTypeExtra that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CompositionTypeExtraFindUniqueOrThrowArgs} args - Arguments to find a CompositionTypeExtra
     * @example
     * // Get one CompositionTypeExtra
     * const compositionTypeExtra = await prisma.compositionTypeExtra.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompositionTypeExtraFindUniqueOrThrowArgs>(args: SelectSubset<T, CompositionTypeExtraFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompositionTypeExtraClient<$Result.GetResult<Prisma.$CompositionTypeExtraPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CompositionTypeExtra that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompositionTypeExtraFindFirstArgs} args - Arguments to find a CompositionTypeExtra
     * @example
     * // Get one CompositionTypeExtra
     * const compositionTypeExtra = await prisma.compositionTypeExtra.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompositionTypeExtraFindFirstArgs>(args?: SelectSubset<T, CompositionTypeExtraFindFirstArgs<ExtArgs>>): Prisma__CompositionTypeExtraClient<$Result.GetResult<Prisma.$CompositionTypeExtraPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CompositionTypeExtra that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompositionTypeExtraFindFirstOrThrowArgs} args - Arguments to find a CompositionTypeExtra
     * @example
     * // Get one CompositionTypeExtra
     * const compositionTypeExtra = await prisma.compositionTypeExtra.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompositionTypeExtraFindFirstOrThrowArgs>(args?: SelectSubset<T, CompositionTypeExtraFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompositionTypeExtraClient<$Result.GetResult<Prisma.$CompositionTypeExtraPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CompositionTypeExtras that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompositionTypeExtraFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CompositionTypeExtras
     * const compositionTypeExtras = await prisma.compositionTypeExtra.findMany()
     * 
     * // Get first 10 CompositionTypeExtras
     * const compositionTypeExtras = await prisma.compositionTypeExtra.findMany({ take: 10 })
     * 
     * // Only select the `compositionTypeId`
     * const compositionTypeExtraWithCompositionTypeIdOnly = await prisma.compositionTypeExtra.findMany({ select: { compositionTypeId: true } })
     * 
     */
    findMany<T extends CompositionTypeExtraFindManyArgs>(args?: SelectSubset<T, CompositionTypeExtraFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompositionTypeExtraPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CompositionTypeExtra.
     * @param {CompositionTypeExtraCreateArgs} args - Arguments to create a CompositionTypeExtra.
     * @example
     * // Create one CompositionTypeExtra
     * const CompositionTypeExtra = await prisma.compositionTypeExtra.create({
     *   data: {
     *     // ... data to create a CompositionTypeExtra
     *   }
     * })
     * 
     */
    create<T extends CompositionTypeExtraCreateArgs>(args: SelectSubset<T, CompositionTypeExtraCreateArgs<ExtArgs>>): Prisma__CompositionTypeExtraClient<$Result.GetResult<Prisma.$CompositionTypeExtraPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CompositionTypeExtras.
     * @param {CompositionTypeExtraCreateManyArgs} args - Arguments to create many CompositionTypeExtras.
     * @example
     * // Create many CompositionTypeExtras
     * const compositionTypeExtra = await prisma.compositionTypeExtra.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompositionTypeExtraCreateManyArgs>(args?: SelectSubset<T, CompositionTypeExtraCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CompositionTypeExtras and returns the data saved in the database.
     * @param {CompositionTypeExtraCreateManyAndReturnArgs} args - Arguments to create many CompositionTypeExtras.
     * @example
     * // Create many CompositionTypeExtras
     * const compositionTypeExtra = await prisma.compositionTypeExtra.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CompositionTypeExtras and only return the `compositionTypeId`
     * const compositionTypeExtraWithCompositionTypeIdOnly = await prisma.compositionTypeExtra.createManyAndReturn({ 
     *   select: { compositionTypeId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompositionTypeExtraCreateManyAndReturnArgs>(args?: SelectSubset<T, CompositionTypeExtraCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompositionTypeExtraPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CompositionTypeExtra.
     * @param {CompositionTypeExtraDeleteArgs} args - Arguments to delete one CompositionTypeExtra.
     * @example
     * // Delete one CompositionTypeExtra
     * const CompositionTypeExtra = await prisma.compositionTypeExtra.delete({
     *   where: {
     *     // ... filter to delete one CompositionTypeExtra
     *   }
     * })
     * 
     */
    delete<T extends CompositionTypeExtraDeleteArgs>(args: SelectSubset<T, CompositionTypeExtraDeleteArgs<ExtArgs>>): Prisma__CompositionTypeExtraClient<$Result.GetResult<Prisma.$CompositionTypeExtraPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CompositionTypeExtra.
     * @param {CompositionTypeExtraUpdateArgs} args - Arguments to update one CompositionTypeExtra.
     * @example
     * // Update one CompositionTypeExtra
     * const compositionTypeExtra = await prisma.compositionTypeExtra.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompositionTypeExtraUpdateArgs>(args: SelectSubset<T, CompositionTypeExtraUpdateArgs<ExtArgs>>): Prisma__CompositionTypeExtraClient<$Result.GetResult<Prisma.$CompositionTypeExtraPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CompositionTypeExtras.
     * @param {CompositionTypeExtraDeleteManyArgs} args - Arguments to filter CompositionTypeExtras to delete.
     * @example
     * // Delete a few CompositionTypeExtras
     * const { count } = await prisma.compositionTypeExtra.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompositionTypeExtraDeleteManyArgs>(args?: SelectSubset<T, CompositionTypeExtraDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompositionTypeExtras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompositionTypeExtraUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CompositionTypeExtras
     * const compositionTypeExtra = await prisma.compositionTypeExtra.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompositionTypeExtraUpdateManyArgs>(args: SelectSubset<T, CompositionTypeExtraUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CompositionTypeExtra.
     * @param {CompositionTypeExtraUpsertArgs} args - Arguments to update or create a CompositionTypeExtra.
     * @example
     * // Update or create a CompositionTypeExtra
     * const compositionTypeExtra = await prisma.compositionTypeExtra.upsert({
     *   create: {
     *     // ... data to create a CompositionTypeExtra
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CompositionTypeExtra we want to update
     *   }
     * })
     */
    upsert<T extends CompositionTypeExtraUpsertArgs>(args: SelectSubset<T, CompositionTypeExtraUpsertArgs<ExtArgs>>): Prisma__CompositionTypeExtraClient<$Result.GetResult<Prisma.$CompositionTypeExtraPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CompositionTypeExtras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompositionTypeExtraCountArgs} args - Arguments to filter CompositionTypeExtras to count.
     * @example
     * // Count the number of CompositionTypeExtras
     * const count = await prisma.compositionTypeExtra.count({
     *   where: {
     *     // ... the filter for the CompositionTypeExtras we want to count
     *   }
     * })
    **/
    count<T extends CompositionTypeExtraCountArgs>(
      args?: Subset<T, CompositionTypeExtraCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompositionTypeExtraCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CompositionTypeExtra.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompositionTypeExtraAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompositionTypeExtraAggregateArgs>(args: Subset<T, CompositionTypeExtraAggregateArgs>): Prisma.PrismaPromise<GetCompositionTypeExtraAggregateType<T>>

    /**
     * Group by CompositionTypeExtra.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompositionTypeExtraGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompositionTypeExtraGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompositionTypeExtraGroupByArgs['orderBy'] }
        : { orderBy?: CompositionTypeExtraGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompositionTypeExtraGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompositionTypeExtraGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CompositionTypeExtra model
   */
  readonly fields: CompositionTypeExtraFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CompositionTypeExtra.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompositionTypeExtraClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    compositionType<T extends CompositionTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompositionTypeDefaultArgs<ExtArgs>>): Prisma__CompositionTypeClient<$Result.GetResult<Prisma.$CompositionTypePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    extra<T extends ExtraDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExtraDefaultArgs<ExtArgs>>): Prisma__ExtraClient<$Result.GetResult<Prisma.$ExtraPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CompositionTypeExtra model
   */ 
  interface CompositionTypeExtraFieldRefs {
    readonly compositionTypeId: FieldRef<"CompositionTypeExtra", 'String'>
    readonly extraId: FieldRef<"CompositionTypeExtra", 'String'>
    readonly position: FieldRef<"CompositionTypeExtra", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * CompositionTypeExtra findUnique
   */
  export type CompositionTypeExtraFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompositionTypeExtra
     */
    select?: CompositionTypeExtraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompositionTypeExtraInclude<ExtArgs> | null
    /**
     * Filter, which CompositionTypeExtra to fetch.
     */
    where: CompositionTypeExtraWhereUniqueInput
  }

  /**
   * CompositionTypeExtra findUniqueOrThrow
   */
  export type CompositionTypeExtraFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompositionTypeExtra
     */
    select?: CompositionTypeExtraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompositionTypeExtraInclude<ExtArgs> | null
    /**
     * Filter, which CompositionTypeExtra to fetch.
     */
    where: CompositionTypeExtraWhereUniqueInput
  }

  /**
   * CompositionTypeExtra findFirst
   */
  export type CompositionTypeExtraFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompositionTypeExtra
     */
    select?: CompositionTypeExtraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompositionTypeExtraInclude<ExtArgs> | null
    /**
     * Filter, which CompositionTypeExtra to fetch.
     */
    where?: CompositionTypeExtraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompositionTypeExtras to fetch.
     */
    orderBy?: CompositionTypeExtraOrderByWithRelationInput | CompositionTypeExtraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompositionTypeExtras.
     */
    cursor?: CompositionTypeExtraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompositionTypeExtras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompositionTypeExtras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompositionTypeExtras.
     */
    distinct?: CompositionTypeExtraScalarFieldEnum | CompositionTypeExtraScalarFieldEnum[]
  }

  /**
   * CompositionTypeExtra findFirstOrThrow
   */
  export type CompositionTypeExtraFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompositionTypeExtra
     */
    select?: CompositionTypeExtraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompositionTypeExtraInclude<ExtArgs> | null
    /**
     * Filter, which CompositionTypeExtra to fetch.
     */
    where?: CompositionTypeExtraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompositionTypeExtras to fetch.
     */
    orderBy?: CompositionTypeExtraOrderByWithRelationInput | CompositionTypeExtraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompositionTypeExtras.
     */
    cursor?: CompositionTypeExtraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompositionTypeExtras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompositionTypeExtras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompositionTypeExtras.
     */
    distinct?: CompositionTypeExtraScalarFieldEnum | CompositionTypeExtraScalarFieldEnum[]
  }

  /**
   * CompositionTypeExtra findMany
   */
  export type CompositionTypeExtraFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompositionTypeExtra
     */
    select?: CompositionTypeExtraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompositionTypeExtraInclude<ExtArgs> | null
    /**
     * Filter, which CompositionTypeExtras to fetch.
     */
    where?: CompositionTypeExtraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompositionTypeExtras to fetch.
     */
    orderBy?: CompositionTypeExtraOrderByWithRelationInput | CompositionTypeExtraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CompositionTypeExtras.
     */
    cursor?: CompositionTypeExtraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompositionTypeExtras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompositionTypeExtras.
     */
    skip?: number
    distinct?: CompositionTypeExtraScalarFieldEnum | CompositionTypeExtraScalarFieldEnum[]
  }

  /**
   * CompositionTypeExtra create
   */
  export type CompositionTypeExtraCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompositionTypeExtra
     */
    select?: CompositionTypeExtraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompositionTypeExtraInclude<ExtArgs> | null
    /**
     * The data needed to create a CompositionTypeExtra.
     */
    data: XOR<CompositionTypeExtraCreateInput, CompositionTypeExtraUncheckedCreateInput>
  }

  /**
   * CompositionTypeExtra createMany
   */
  export type CompositionTypeExtraCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CompositionTypeExtras.
     */
    data: CompositionTypeExtraCreateManyInput | CompositionTypeExtraCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CompositionTypeExtra createManyAndReturn
   */
  export type CompositionTypeExtraCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompositionTypeExtra
     */
    select?: CompositionTypeExtraSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CompositionTypeExtras.
     */
    data: CompositionTypeExtraCreateManyInput | CompositionTypeExtraCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompositionTypeExtraIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CompositionTypeExtra update
   */
  export type CompositionTypeExtraUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompositionTypeExtra
     */
    select?: CompositionTypeExtraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompositionTypeExtraInclude<ExtArgs> | null
    /**
     * The data needed to update a CompositionTypeExtra.
     */
    data: XOR<CompositionTypeExtraUpdateInput, CompositionTypeExtraUncheckedUpdateInput>
    /**
     * Choose, which CompositionTypeExtra to update.
     */
    where: CompositionTypeExtraWhereUniqueInput
  }

  /**
   * CompositionTypeExtra updateMany
   */
  export type CompositionTypeExtraUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CompositionTypeExtras.
     */
    data: XOR<CompositionTypeExtraUpdateManyMutationInput, CompositionTypeExtraUncheckedUpdateManyInput>
    /**
     * Filter which CompositionTypeExtras to update
     */
    where?: CompositionTypeExtraWhereInput
  }

  /**
   * CompositionTypeExtra upsert
   */
  export type CompositionTypeExtraUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompositionTypeExtra
     */
    select?: CompositionTypeExtraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompositionTypeExtraInclude<ExtArgs> | null
    /**
     * The filter to search for the CompositionTypeExtra to update in case it exists.
     */
    where: CompositionTypeExtraWhereUniqueInput
    /**
     * In case the CompositionTypeExtra found by the `where` argument doesn't exist, create a new CompositionTypeExtra with this data.
     */
    create: XOR<CompositionTypeExtraCreateInput, CompositionTypeExtraUncheckedCreateInput>
    /**
     * In case the CompositionTypeExtra was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompositionTypeExtraUpdateInput, CompositionTypeExtraUncheckedUpdateInput>
  }

  /**
   * CompositionTypeExtra delete
   */
  export type CompositionTypeExtraDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompositionTypeExtra
     */
    select?: CompositionTypeExtraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompositionTypeExtraInclude<ExtArgs> | null
    /**
     * Filter which CompositionTypeExtra to delete.
     */
    where: CompositionTypeExtraWhereUniqueInput
  }

  /**
   * CompositionTypeExtra deleteMany
   */
  export type CompositionTypeExtraDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompositionTypeExtras to delete
     */
    where?: CompositionTypeExtraWhereInput
  }

  /**
   * CompositionTypeExtra without action
   */
  export type CompositionTypeExtraDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompositionTypeExtra
     */
    select?: CompositionTypeExtraSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompositionTypeExtraInclude<ExtArgs> | null
  }


  /**
   * Model ProductComposition
   */

  export type AggregateProductComposition = {
    _count: ProductCompositionCountAggregateOutputType | null
    _avg: ProductCompositionAvgAggregateOutputType | null
    _sum: ProductCompositionSumAggregateOutputType | null
    _min: ProductCompositionMinAggregateOutputType | null
    _max: ProductCompositionMaxAggregateOutputType | null
  }

  export type ProductCompositionAvgAggregateOutputType = {
    sortOrder: number | null
  }

  export type ProductCompositionSumAggregateOutputType = {
    sortOrder: number | null
  }

  export type ProductCompositionMinAggregateOutputType = {
    productId: string | null
    compositionTypeId: string | null
    sortOrder: number | null
  }

  export type ProductCompositionMaxAggregateOutputType = {
    productId: string | null
    compositionTypeId: string | null
    sortOrder: number | null
  }

  export type ProductCompositionCountAggregateOutputType = {
    productId: number
    compositionTypeId: number
    sortOrder: number
    _all: number
  }


  export type ProductCompositionAvgAggregateInputType = {
    sortOrder?: true
  }

  export type ProductCompositionSumAggregateInputType = {
    sortOrder?: true
  }

  export type ProductCompositionMinAggregateInputType = {
    productId?: true
    compositionTypeId?: true
    sortOrder?: true
  }

  export type ProductCompositionMaxAggregateInputType = {
    productId?: true
    compositionTypeId?: true
    sortOrder?: true
  }

  export type ProductCompositionCountAggregateInputType = {
    productId?: true
    compositionTypeId?: true
    sortOrder?: true
    _all?: true
  }

  export type ProductCompositionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductComposition to aggregate.
     */
    where?: ProductCompositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductCompositions to fetch.
     */
    orderBy?: ProductCompositionOrderByWithRelationInput | ProductCompositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductCompositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductCompositions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductCompositions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductCompositions
    **/
    _count?: true | ProductCompositionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductCompositionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductCompositionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductCompositionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductCompositionMaxAggregateInputType
  }

  export type GetProductCompositionAggregateType<T extends ProductCompositionAggregateArgs> = {
        [P in keyof T & keyof AggregateProductComposition]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductComposition[P]>
      : GetScalarType<T[P], AggregateProductComposition[P]>
  }




  export type ProductCompositionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductCompositionWhereInput
    orderBy?: ProductCompositionOrderByWithAggregationInput | ProductCompositionOrderByWithAggregationInput[]
    by: ProductCompositionScalarFieldEnum[] | ProductCompositionScalarFieldEnum
    having?: ProductCompositionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCompositionCountAggregateInputType | true
    _avg?: ProductCompositionAvgAggregateInputType
    _sum?: ProductCompositionSumAggregateInputType
    _min?: ProductCompositionMinAggregateInputType
    _max?: ProductCompositionMaxAggregateInputType
  }

  export type ProductCompositionGroupByOutputType = {
    productId: string
    compositionTypeId: string
    sortOrder: number
    _count: ProductCompositionCountAggregateOutputType | null
    _avg: ProductCompositionAvgAggregateOutputType | null
    _sum: ProductCompositionSumAggregateOutputType | null
    _min: ProductCompositionMinAggregateOutputType | null
    _max: ProductCompositionMaxAggregateOutputType | null
  }

  type GetProductCompositionGroupByPayload<T extends ProductCompositionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductCompositionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductCompositionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductCompositionGroupByOutputType[P]>
            : GetScalarType<T[P], ProductCompositionGroupByOutputType[P]>
        }
      >
    >


  export type ProductCompositionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    productId?: boolean
    compositionTypeId?: boolean
    sortOrder?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    compositionType?: boolean | CompositionTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productComposition"]>

  export type ProductCompositionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    productId?: boolean
    compositionTypeId?: boolean
    sortOrder?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    compositionType?: boolean | CompositionTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productComposition"]>

  export type ProductCompositionSelectScalar = {
    productId?: boolean
    compositionTypeId?: boolean
    sortOrder?: boolean
  }

  export type ProductCompositionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    compositionType?: boolean | CompositionTypeDefaultArgs<ExtArgs>
  }
  export type ProductCompositionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    compositionType?: boolean | CompositionTypeDefaultArgs<ExtArgs>
  }

  export type $ProductCompositionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductComposition"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      compositionType: Prisma.$CompositionTypePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      productId: string
      compositionTypeId: string
      sortOrder: number
    }, ExtArgs["result"]["productComposition"]>
    composites: {}
  }

  type ProductCompositionGetPayload<S extends boolean | null | undefined | ProductCompositionDefaultArgs> = $Result.GetResult<Prisma.$ProductCompositionPayload, S>

  type ProductCompositionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductCompositionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductCompositionCountAggregateInputType | true
    }

  export interface ProductCompositionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductComposition'], meta: { name: 'ProductComposition' } }
    /**
     * Find zero or one ProductComposition that matches the filter.
     * @param {ProductCompositionFindUniqueArgs} args - Arguments to find a ProductComposition
     * @example
     * // Get one ProductComposition
     * const productComposition = await prisma.productComposition.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductCompositionFindUniqueArgs>(args: SelectSubset<T, ProductCompositionFindUniqueArgs<ExtArgs>>): Prisma__ProductCompositionClient<$Result.GetResult<Prisma.$ProductCompositionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ProductComposition that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductCompositionFindUniqueOrThrowArgs} args - Arguments to find a ProductComposition
     * @example
     * // Get one ProductComposition
     * const productComposition = await prisma.productComposition.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductCompositionFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductCompositionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductCompositionClient<$Result.GetResult<Prisma.$ProductCompositionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ProductComposition that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCompositionFindFirstArgs} args - Arguments to find a ProductComposition
     * @example
     * // Get one ProductComposition
     * const productComposition = await prisma.productComposition.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductCompositionFindFirstArgs>(args?: SelectSubset<T, ProductCompositionFindFirstArgs<ExtArgs>>): Prisma__ProductCompositionClient<$Result.GetResult<Prisma.$ProductCompositionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ProductComposition that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCompositionFindFirstOrThrowArgs} args - Arguments to find a ProductComposition
     * @example
     * // Get one ProductComposition
     * const productComposition = await prisma.productComposition.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductCompositionFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductCompositionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductCompositionClient<$Result.GetResult<Prisma.$ProductCompositionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ProductCompositions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCompositionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductCompositions
     * const productCompositions = await prisma.productComposition.findMany()
     * 
     * // Get first 10 ProductCompositions
     * const productCompositions = await prisma.productComposition.findMany({ take: 10 })
     * 
     * // Only select the `productId`
     * const productCompositionWithProductIdOnly = await prisma.productComposition.findMany({ select: { productId: true } })
     * 
     */
    findMany<T extends ProductCompositionFindManyArgs>(args?: SelectSubset<T, ProductCompositionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductCompositionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ProductComposition.
     * @param {ProductCompositionCreateArgs} args - Arguments to create a ProductComposition.
     * @example
     * // Create one ProductComposition
     * const ProductComposition = await prisma.productComposition.create({
     *   data: {
     *     // ... data to create a ProductComposition
     *   }
     * })
     * 
     */
    create<T extends ProductCompositionCreateArgs>(args: SelectSubset<T, ProductCompositionCreateArgs<ExtArgs>>): Prisma__ProductCompositionClient<$Result.GetResult<Prisma.$ProductCompositionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ProductCompositions.
     * @param {ProductCompositionCreateManyArgs} args - Arguments to create many ProductCompositions.
     * @example
     * // Create many ProductCompositions
     * const productComposition = await prisma.productComposition.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCompositionCreateManyArgs>(args?: SelectSubset<T, ProductCompositionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductCompositions and returns the data saved in the database.
     * @param {ProductCompositionCreateManyAndReturnArgs} args - Arguments to create many ProductCompositions.
     * @example
     * // Create many ProductCompositions
     * const productComposition = await prisma.productComposition.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductCompositions and only return the `productId`
     * const productCompositionWithProductIdOnly = await prisma.productComposition.createManyAndReturn({ 
     *   select: { productId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCompositionCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCompositionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductCompositionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ProductComposition.
     * @param {ProductCompositionDeleteArgs} args - Arguments to delete one ProductComposition.
     * @example
     * // Delete one ProductComposition
     * const ProductComposition = await prisma.productComposition.delete({
     *   where: {
     *     // ... filter to delete one ProductComposition
     *   }
     * })
     * 
     */
    delete<T extends ProductCompositionDeleteArgs>(args: SelectSubset<T, ProductCompositionDeleteArgs<ExtArgs>>): Prisma__ProductCompositionClient<$Result.GetResult<Prisma.$ProductCompositionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ProductComposition.
     * @param {ProductCompositionUpdateArgs} args - Arguments to update one ProductComposition.
     * @example
     * // Update one ProductComposition
     * const productComposition = await prisma.productComposition.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductCompositionUpdateArgs>(args: SelectSubset<T, ProductCompositionUpdateArgs<ExtArgs>>): Prisma__ProductCompositionClient<$Result.GetResult<Prisma.$ProductCompositionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ProductCompositions.
     * @param {ProductCompositionDeleteManyArgs} args - Arguments to filter ProductCompositions to delete.
     * @example
     * // Delete a few ProductCompositions
     * const { count } = await prisma.productComposition.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductCompositionDeleteManyArgs>(args?: SelectSubset<T, ProductCompositionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductCompositions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCompositionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductCompositions
     * const productComposition = await prisma.productComposition.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductCompositionUpdateManyArgs>(args: SelectSubset<T, ProductCompositionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProductComposition.
     * @param {ProductCompositionUpsertArgs} args - Arguments to update or create a ProductComposition.
     * @example
     * // Update or create a ProductComposition
     * const productComposition = await prisma.productComposition.upsert({
     *   create: {
     *     // ... data to create a ProductComposition
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductComposition we want to update
     *   }
     * })
     */
    upsert<T extends ProductCompositionUpsertArgs>(args: SelectSubset<T, ProductCompositionUpsertArgs<ExtArgs>>): Prisma__ProductCompositionClient<$Result.GetResult<Prisma.$ProductCompositionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ProductCompositions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCompositionCountArgs} args - Arguments to filter ProductCompositions to count.
     * @example
     * // Count the number of ProductCompositions
     * const count = await prisma.productComposition.count({
     *   where: {
     *     // ... the filter for the ProductCompositions we want to count
     *   }
     * })
    **/
    count<T extends ProductCompositionCountArgs>(
      args?: Subset<T, ProductCompositionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCompositionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductComposition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCompositionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductCompositionAggregateArgs>(args: Subset<T, ProductCompositionAggregateArgs>): Prisma.PrismaPromise<GetProductCompositionAggregateType<T>>

    /**
     * Group by ProductComposition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCompositionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductCompositionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductCompositionGroupByArgs['orderBy'] }
        : { orderBy?: ProductCompositionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductCompositionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductCompositionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductComposition model
   */
  readonly fields: ProductCompositionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductComposition.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductCompositionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    compositionType<T extends CompositionTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompositionTypeDefaultArgs<ExtArgs>>): Prisma__CompositionTypeClient<$Result.GetResult<Prisma.$CompositionTypePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductComposition model
   */ 
  interface ProductCompositionFieldRefs {
    readonly productId: FieldRef<"ProductComposition", 'String'>
    readonly compositionTypeId: FieldRef<"ProductComposition", 'String'>
    readonly sortOrder: FieldRef<"ProductComposition", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ProductComposition findUnique
   */
  export type ProductCompositionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductComposition
     */
    select?: ProductCompositionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCompositionInclude<ExtArgs> | null
    /**
     * Filter, which ProductComposition to fetch.
     */
    where: ProductCompositionWhereUniqueInput
  }

  /**
   * ProductComposition findUniqueOrThrow
   */
  export type ProductCompositionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductComposition
     */
    select?: ProductCompositionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCompositionInclude<ExtArgs> | null
    /**
     * Filter, which ProductComposition to fetch.
     */
    where: ProductCompositionWhereUniqueInput
  }

  /**
   * ProductComposition findFirst
   */
  export type ProductCompositionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductComposition
     */
    select?: ProductCompositionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCompositionInclude<ExtArgs> | null
    /**
     * Filter, which ProductComposition to fetch.
     */
    where?: ProductCompositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductCompositions to fetch.
     */
    orderBy?: ProductCompositionOrderByWithRelationInput | ProductCompositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductCompositions.
     */
    cursor?: ProductCompositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductCompositions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductCompositions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductCompositions.
     */
    distinct?: ProductCompositionScalarFieldEnum | ProductCompositionScalarFieldEnum[]
  }

  /**
   * ProductComposition findFirstOrThrow
   */
  export type ProductCompositionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductComposition
     */
    select?: ProductCompositionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCompositionInclude<ExtArgs> | null
    /**
     * Filter, which ProductComposition to fetch.
     */
    where?: ProductCompositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductCompositions to fetch.
     */
    orderBy?: ProductCompositionOrderByWithRelationInput | ProductCompositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductCompositions.
     */
    cursor?: ProductCompositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductCompositions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductCompositions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductCompositions.
     */
    distinct?: ProductCompositionScalarFieldEnum | ProductCompositionScalarFieldEnum[]
  }

  /**
   * ProductComposition findMany
   */
  export type ProductCompositionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductComposition
     */
    select?: ProductCompositionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCompositionInclude<ExtArgs> | null
    /**
     * Filter, which ProductCompositions to fetch.
     */
    where?: ProductCompositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductCompositions to fetch.
     */
    orderBy?: ProductCompositionOrderByWithRelationInput | ProductCompositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductCompositions.
     */
    cursor?: ProductCompositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductCompositions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductCompositions.
     */
    skip?: number
    distinct?: ProductCompositionScalarFieldEnum | ProductCompositionScalarFieldEnum[]
  }

  /**
   * ProductComposition create
   */
  export type ProductCompositionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductComposition
     */
    select?: ProductCompositionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCompositionInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductComposition.
     */
    data: XOR<ProductCompositionCreateInput, ProductCompositionUncheckedCreateInput>
  }

  /**
   * ProductComposition createMany
   */
  export type ProductCompositionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductCompositions.
     */
    data: ProductCompositionCreateManyInput | ProductCompositionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductComposition createManyAndReturn
   */
  export type ProductCompositionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductComposition
     */
    select?: ProductCompositionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ProductCompositions.
     */
    data: ProductCompositionCreateManyInput | ProductCompositionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCompositionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductComposition update
   */
  export type ProductCompositionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductComposition
     */
    select?: ProductCompositionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCompositionInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductComposition.
     */
    data: XOR<ProductCompositionUpdateInput, ProductCompositionUncheckedUpdateInput>
    /**
     * Choose, which ProductComposition to update.
     */
    where: ProductCompositionWhereUniqueInput
  }

  /**
   * ProductComposition updateMany
   */
  export type ProductCompositionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductCompositions.
     */
    data: XOR<ProductCompositionUpdateManyMutationInput, ProductCompositionUncheckedUpdateManyInput>
    /**
     * Filter which ProductCompositions to update
     */
    where?: ProductCompositionWhereInput
  }

  /**
   * ProductComposition upsert
   */
  export type ProductCompositionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductComposition
     */
    select?: ProductCompositionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCompositionInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductComposition to update in case it exists.
     */
    where: ProductCompositionWhereUniqueInput
    /**
     * In case the ProductComposition found by the `where` argument doesn't exist, create a new ProductComposition with this data.
     */
    create: XOR<ProductCompositionCreateInput, ProductCompositionUncheckedCreateInput>
    /**
     * In case the ProductComposition was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductCompositionUpdateInput, ProductCompositionUncheckedUpdateInput>
  }

  /**
   * ProductComposition delete
   */
  export type ProductCompositionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductComposition
     */
    select?: ProductCompositionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCompositionInclude<ExtArgs> | null
    /**
     * Filter which ProductComposition to delete.
     */
    where: ProductCompositionWhereUniqueInput
  }

  /**
   * ProductComposition deleteMany
   */
  export type ProductCompositionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductCompositions to delete
     */
    where?: ProductCompositionWhereInput
  }

  /**
   * ProductComposition without action
   */
  export type ProductCompositionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductComposition
     */
    select?: ProductCompositionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCompositionInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    price: number | null
    formulePrice: number | null
    taxRateBps: number | null
    sortOrder: number | null
    discountValue: number | null
    originalPrice: number | null
  }

  export type ProductSumAggregateOutputType = {
    price: number | null
    formulePrice: number | null
    taxRateBps: number | null
    sortOrder: number | null
    discountValue: number | null
    originalPrice: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    categoryId: string | null
    name: string | null
    description: string | null
    image: string | null
    kind: $Enums.ProductKind | null
    price: number | null
    formulePrice: number | null
    taxRateBps: number | null
    isActive: boolean | null
    outOfStock: boolean | null
    sortOrder: number | null
    discountValue: number | null
    originalPrice: number | null
    discountStartDate: Date | null
    discountEndDate: Date | null
    createdAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    categoryId: string | null
    name: string | null
    description: string | null
    image: string | null
    kind: $Enums.ProductKind | null
    price: number | null
    formulePrice: number | null
    taxRateBps: number | null
    isActive: boolean | null
    outOfStock: boolean | null
    sortOrder: number | null
    discountValue: number | null
    originalPrice: number | null
    discountStartDate: Date | null
    discountEndDate: Date | null
    createdAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    categoryId: number
    name: number
    description: number
    image: number
    kind: number
    price: number
    formulePrice: number
    taxRateBps: number
    modifiers: number
    isActive: number
    outOfStock: number
    sortOrder: number
    discountValue: number
    originalPrice: number
    discountStartDate: number
    discountEndDate: number
    createdAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    price?: true
    formulePrice?: true
    taxRateBps?: true
    sortOrder?: true
    discountValue?: true
    originalPrice?: true
  }

  export type ProductSumAggregateInputType = {
    price?: true
    formulePrice?: true
    taxRateBps?: true
    sortOrder?: true
    discountValue?: true
    originalPrice?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    categoryId?: true
    name?: true
    description?: true
    image?: true
    kind?: true
    price?: true
    formulePrice?: true
    taxRateBps?: true
    isActive?: true
    outOfStock?: true
    sortOrder?: true
    discountValue?: true
    originalPrice?: true
    discountStartDate?: true
    discountEndDate?: true
    createdAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    categoryId?: true
    name?: true
    description?: true
    image?: true
    kind?: true
    price?: true
    formulePrice?: true
    taxRateBps?: true
    isActive?: true
    outOfStock?: true
    sortOrder?: true
    discountValue?: true
    originalPrice?: true
    discountStartDate?: true
    discountEndDate?: true
    createdAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    categoryId?: true
    name?: true
    description?: true
    image?: true
    kind?: true
    price?: true
    formulePrice?: true
    taxRateBps?: true
    modifiers?: true
    isActive?: true
    outOfStock?: true
    sortOrder?: true
    discountValue?: true
    originalPrice?: true
    discountStartDate?: true
    discountEndDate?: true
    createdAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    categoryId: string
    name: string
    description: string | null
    image: string | null
    kind: $Enums.ProductKind
    price: number
    formulePrice: number
    taxRateBps: number | null
    modifiers: JsonValue | null
    isActive: boolean
    outOfStock: boolean
    sortOrder: number
    discountValue: number
    originalPrice: number | null
    discountStartDate: Date | null
    discountEndDate: Date | null
    createdAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    categoryId?: boolean
    name?: boolean
    description?: boolean
    image?: boolean
    kind?: boolean
    price?: boolean
    formulePrice?: boolean
    taxRateBps?: boolean
    modifiers?: boolean
    isActive?: boolean
    outOfStock?: boolean
    sortOrder?: boolean
    discountValue?: boolean
    originalPrice?: boolean
    discountStartDate?: boolean
    discountEndDate?: boolean
    createdAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    compositions?: boolean | Product$compositionsArgs<ExtArgs>
    orderLines?: boolean | Product$orderLinesArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    categoryId?: boolean
    name?: boolean
    description?: boolean
    image?: boolean
    kind?: boolean
    price?: boolean
    formulePrice?: boolean
    taxRateBps?: boolean
    modifiers?: boolean
    isActive?: boolean
    outOfStock?: boolean
    sortOrder?: boolean
    discountValue?: boolean
    originalPrice?: boolean
    discountStartDate?: boolean
    discountEndDate?: boolean
    createdAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    categoryId?: boolean
    name?: boolean
    description?: boolean
    image?: boolean
    kind?: boolean
    price?: boolean
    formulePrice?: boolean
    taxRateBps?: boolean
    modifiers?: boolean
    isActive?: boolean
    outOfStock?: boolean
    sortOrder?: boolean
    discountValue?: boolean
    originalPrice?: boolean
    discountStartDate?: boolean
    discountEndDate?: boolean
    createdAt?: boolean
  }

  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    compositions?: boolean | Product$compositionsArgs<ExtArgs>
    orderLines?: boolean | Product$orderLinesArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs>
      compositions: Prisma.$ProductCompositionPayload<ExtArgs>[]
      orderLines: Prisma.$OrderLinePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      categoryId: string
      name: string
      description: string | null
      image: string | null
      /**
       * simple = sold as one item with optional `modifiers` JSON. composed = built from composition steps (`ProductComposition` → extra picks per step).
       */
      kind: $Enums.ProductKind
      /**
       * Base unit price in cents (Mongo field name `price`; DB column `price_cents`).
       */
      price: number
      /**
       * Mongo `formulePrice` — stored as cents; business meaning is yours (combo / formula surcharge).
       */
      formulePrice: number
      taxRateBps: number | null
      /**
       * Simple extras JSON (Mongo-style modifiers); DB column remains `modifiers_json`.
       */
      modifiers: Prisma.JsonValue | null
      isActive: boolean
      outOfStock: boolean
      sortOrder: number
      discountValue: number
      originalPrice: number | null
      discountStartDate: Date | null
      discountEndDate: Date | null
      createdAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    compositions<T extends Product$compositionsArgs<ExtArgs> = {}>(args?: Subset<T, Product$compositionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductCompositionPayload<ExtArgs>, T, "findMany"> | Null>
    orderLines<T extends Product$orderLinesArgs<ExtArgs> = {}>(args?: Subset<T, Product$orderLinesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderLinePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */ 
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly categoryId: FieldRef<"Product", 'String'>
    readonly name: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly image: FieldRef<"Product", 'String'>
    readonly kind: FieldRef<"Product", 'ProductKind'>
    readonly price: FieldRef<"Product", 'Int'>
    readonly formulePrice: FieldRef<"Product", 'Int'>
    readonly taxRateBps: FieldRef<"Product", 'Int'>
    readonly modifiers: FieldRef<"Product", 'Json'>
    readonly isActive: FieldRef<"Product", 'Boolean'>
    readonly outOfStock: FieldRef<"Product", 'Boolean'>
    readonly sortOrder: FieldRef<"Product", 'Int'>
    readonly discountValue: FieldRef<"Product", 'Int'>
    readonly originalPrice: FieldRef<"Product", 'Int'>
    readonly discountStartDate: FieldRef<"Product", 'DateTime'>
    readonly discountEndDate: FieldRef<"Product", 'DateTime'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
  }

  /**
   * Product.compositions
   */
  export type Product$compositionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductComposition
     */
    select?: ProductCompositionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCompositionInclude<ExtArgs> | null
    where?: ProductCompositionWhereInput
    orderBy?: ProductCompositionOrderByWithRelationInput | ProductCompositionOrderByWithRelationInput[]
    cursor?: ProductCompositionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductCompositionScalarFieldEnum | ProductCompositionScalarFieldEnum[]
  }

  /**
   * Product.orderLines
   */
  export type Product$orderLinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderLine
     */
    select?: OrderLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderLineInclude<ExtArgs> | null
    where?: OrderLineWhereInput
    orderBy?: OrderLineOrderByWithRelationInput | OrderLineOrderByWithRelationInput[]
    cursor?: OrderLineWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderLineScalarFieldEnum | OrderLineScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model RestaurantTable
   */

  export type AggregateRestaurantTable = {
    _count: RestaurantTableCountAggregateOutputType | null
    _avg: RestaurantTableAvgAggregateOutputType | null
    _sum: RestaurantTableSumAggregateOutputType | null
    _min: RestaurantTableMinAggregateOutputType | null
    _max: RestaurantTableMaxAggregateOutputType | null
  }

  export type RestaurantTableAvgAggregateOutputType = {
    sortOrder: number | null
  }

  export type RestaurantTableSumAggregateOutputType = {
    sortOrder: number | null
  }

  export type RestaurantTableMinAggregateOutputType = {
    id: string | null
    name: string | null
    zone: string | null
    sortOrder: number | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type RestaurantTableMaxAggregateOutputType = {
    id: string | null
    name: string | null
    zone: string | null
    sortOrder: number | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type RestaurantTableCountAggregateOutputType = {
    id: number
    name: number
    zone: number
    sortOrder: number
    isActive: number
    createdAt: number
    _all: number
  }


  export type RestaurantTableAvgAggregateInputType = {
    sortOrder?: true
  }

  export type RestaurantTableSumAggregateInputType = {
    sortOrder?: true
  }

  export type RestaurantTableMinAggregateInputType = {
    id?: true
    name?: true
    zone?: true
    sortOrder?: true
    isActive?: true
    createdAt?: true
  }

  export type RestaurantTableMaxAggregateInputType = {
    id?: true
    name?: true
    zone?: true
    sortOrder?: true
    isActive?: true
    createdAt?: true
  }

  export type RestaurantTableCountAggregateInputType = {
    id?: true
    name?: true
    zone?: true
    sortOrder?: true
    isActive?: true
    createdAt?: true
    _all?: true
  }

  export type RestaurantTableAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RestaurantTable to aggregate.
     */
    where?: RestaurantTableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RestaurantTables to fetch.
     */
    orderBy?: RestaurantTableOrderByWithRelationInput | RestaurantTableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RestaurantTableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RestaurantTables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RestaurantTables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RestaurantTables
    **/
    _count?: true | RestaurantTableCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RestaurantTableAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RestaurantTableSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RestaurantTableMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RestaurantTableMaxAggregateInputType
  }

  export type GetRestaurantTableAggregateType<T extends RestaurantTableAggregateArgs> = {
        [P in keyof T & keyof AggregateRestaurantTable]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRestaurantTable[P]>
      : GetScalarType<T[P], AggregateRestaurantTable[P]>
  }




  export type RestaurantTableGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RestaurantTableWhereInput
    orderBy?: RestaurantTableOrderByWithAggregationInput | RestaurantTableOrderByWithAggregationInput[]
    by: RestaurantTableScalarFieldEnum[] | RestaurantTableScalarFieldEnum
    having?: RestaurantTableScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RestaurantTableCountAggregateInputType | true
    _avg?: RestaurantTableAvgAggregateInputType
    _sum?: RestaurantTableSumAggregateInputType
    _min?: RestaurantTableMinAggregateInputType
    _max?: RestaurantTableMaxAggregateInputType
  }

  export type RestaurantTableGroupByOutputType = {
    id: string
    name: string
    zone: string | null
    sortOrder: number
    isActive: boolean
    createdAt: Date
    _count: RestaurantTableCountAggregateOutputType | null
    _avg: RestaurantTableAvgAggregateOutputType | null
    _sum: RestaurantTableSumAggregateOutputType | null
    _min: RestaurantTableMinAggregateOutputType | null
    _max: RestaurantTableMaxAggregateOutputType | null
  }

  type GetRestaurantTableGroupByPayload<T extends RestaurantTableGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RestaurantTableGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RestaurantTableGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RestaurantTableGroupByOutputType[P]>
            : GetScalarType<T[P], RestaurantTableGroupByOutputType[P]>
        }
      >
    >


  export type RestaurantTableSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    zone?: boolean
    sortOrder?: boolean
    isActive?: boolean
    createdAt?: boolean
    orders?: boolean | RestaurantTable$ordersArgs<ExtArgs>
    _count?: boolean | RestaurantTableCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["restaurantTable"]>

  export type RestaurantTableSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    zone?: boolean
    sortOrder?: boolean
    isActive?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["restaurantTable"]>

  export type RestaurantTableSelectScalar = {
    id?: boolean
    name?: boolean
    zone?: boolean
    sortOrder?: boolean
    isActive?: boolean
    createdAt?: boolean
  }

  export type RestaurantTableInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | RestaurantTable$ordersArgs<ExtArgs>
    _count?: boolean | RestaurantTableCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RestaurantTableIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RestaurantTablePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RestaurantTable"
    objects: {
      orders: Prisma.$OrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      zone: string | null
      sortOrder: number
      isActive: boolean
      createdAt: Date
    }, ExtArgs["result"]["restaurantTable"]>
    composites: {}
  }

  type RestaurantTableGetPayload<S extends boolean | null | undefined | RestaurantTableDefaultArgs> = $Result.GetResult<Prisma.$RestaurantTablePayload, S>

  type RestaurantTableCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RestaurantTableFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RestaurantTableCountAggregateInputType | true
    }

  export interface RestaurantTableDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RestaurantTable'], meta: { name: 'RestaurantTable' } }
    /**
     * Find zero or one RestaurantTable that matches the filter.
     * @param {RestaurantTableFindUniqueArgs} args - Arguments to find a RestaurantTable
     * @example
     * // Get one RestaurantTable
     * const restaurantTable = await prisma.restaurantTable.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RestaurantTableFindUniqueArgs>(args: SelectSubset<T, RestaurantTableFindUniqueArgs<ExtArgs>>): Prisma__RestaurantTableClient<$Result.GetResult<Prisma.$RestaurantTablePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RestaurantTable that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RestaurantTableFindUniqueOrThrowArgs} args - Arguments to find a RestaurantTable
     * @example
     * // Get one RestaurantTable
     * const restaurantTable = await prisma.restaurantTable.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RestaurantTableFindUniqueOrThrowArgs>(args: SelectSubset<T, RestaurantTableFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RestaurantTableClient<$Result.GetResult<Prisma.$RestaurantTablePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RestaurantTable that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantTableFindFirstArgs} args - Arguments to find a RestaurantTable
     * @example
     * // Get one RestaurantTable
     * const restaurantTable = await prisma.restaurantTable.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RestaurantTableFindFirstArgs>(args?: SelectSubset<T, RestaurantTableFindFirstArgs<ExtArgs>>): Prisma__RestaurantTableClient<$Result.GetResult<Prisma.$RestaurantTablePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RestaurantTable that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantTableFindFirstOrThrowArgs} args - Arguments to find a RestaurantTable
     * @example
     * // Get one RestaurantTable
     * const restaurantTable = await prisma.restaurantTable.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RestaurantTableFindFirstOrThrowArgs>(args?: SelectSubset<T, RestaurantTableFindFirstOrThrowArgs<ExtArgs>>): Prisma__RestaurantTableClient<$Result.GetResult<Prisma.$RestaurantTablePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RestaurantTables that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantTableFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RestaurantTables
     * const restaurantTables = await prisma.restaurantTable.findMany()
     * 
     * // Get first 10 RestaurantTables
     * const restaurantTables = await prisma.restaurantTable.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const restaurantTableWithIdOnly = await prisma.restaurantTable.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RestaurantTableFindManyArgs>(args?: SelectSubset<T, RestaurantTableFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestaurantTablePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RestaurantTable.
     * @param {RestaurantTableCreateArgs} args - Arguments to create a RestaurantTable.
     * @example
     * // Create one RestaurantTable
     * const RestaurantTable = await prisma.restaurantTable.create({
     *   data: {
     *     // ... data to create a RestaurantTable
     *   }
     * })
     * 
     */
    create<T extends RestaurantTableCreateArgs>(args: SelectSubset<T, RestaurantTableCreateArgs<ExtArgs>>): Prisma__RestaurantTableClient<$Result.GetResult<Prisma.$RestaurantTablePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RestaurantTables.
     * @param {RestaurantTableCreateManyArgs} args - Arguments to create many RestaurantTables.
     * @example
     * // Create many RestaurantTables
     * const restaurantTable = await prisma.restaurantTable.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RestaurantTableCreateManyArgs>(args?: SelectSubset<T, RestaurantTableCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RestaurantTables and returns the data saved in the database.
     * @param {RestaurantTableCreateManyAndReturnArgs} args - Arguments to create many RestaurantTables.
     * @example
     * // Create many RestaurantTables
     * const restaurantTable = await prisma.restaurantTable.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RestaurantTables and only return the `id`
     * const restaurantTableWithIdOnly = await prisma.restaurantTable.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RestaurantTableCreateManyAndReturnArgs>(args?: SelectSubset<T, RestaurantTableCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestaurantTablePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RestaurantTable.
     * @param {RestaurantTableDeleteArgs} args - Arguments to delete one RestaurantTable.
     * @example
     * // Delete one RestaurantTable
     * const RestaurantTable = await prisma.restaurantTable.delete({
     *   where: {
     *     // ... filter to delete one RestaurantTable
     *   }
     * })
     * 
     */
    delete<T extends RestaurantTableDeleteArgs>(args: SelectSubset<T, RestaurantTableDeleteArgs<ExtArgs>>): Prisma__RestaurantTableClient<$Result.GetResult<Prisma.$RestaurantTablePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RestaurantTable.
     * @param {RestaurantTableUpdateArgs} args - Arguments to update one RestaurantTable.
     * @example
     * // Update one RestaurantTable
     * const restaurantTable = await prisma.restaurantTable.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RestaurantTableUpdateArgs>(args: SelectSubset<T, RestaurantTableUpdateArgs<ExtArgs>>): Prisma__RestaurantTableClient<$Result.GetResult<Prisma.$RestaurantTablePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RestaurantTables.
     * @param {RestaurantTableDeleteManyArgs} args - Arguments to filter RestaurantTables to delete.
     * @example
     * // Delete a few RestaurantTables
     * const { count } = await prisma.restaurantTable.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RestaurantTableDeleteManyArgs>(args?: SelectSubset<T, RestaurantTableDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RestaurantTables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantTableUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RestaurantTables
     * const restaurantTable = await prisma.restaurantTable.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RestaurantTableUpdateManyArgs>(args: SelectSubset<T, RestaurantTableUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RestaurantTable.
     * @param {RestaurantTableUpsertArgs} args - Arguments to update or create a RestaurantTable.
     * @example
     * // Update or create a RestaurantTable
     * const restaurantTable = await prisma.restaurantTable.upsert({
     *   create: {
     *     // ... data to create a RestaurantTable
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RestaurantTable we want to update
     *   }
     * })
     */
    upsert<T extends RestaurantTableUpsertArgs>(args: SelectSubset<T, RestaurantTableUpsertArgs<ExtArgs>>): Prisma__RestaurantTableClient<$Result.GetResult<Prisma.$RestaurantTablePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RestaurantTables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantTableCountArgs} args - Arguments to filter RestaurantTables to count.
     * @example
     * // Count the number of RestaurantTables
     * const count = await prisma.restaurantTable.count({
     *   where: {
     *     // ... the filter for the RestaurantTables we want to count
     *   }
     * })
    **/
    count<T extends RestaurantTableCountArgs>(
      args?: Subset<T, RestaurantTableCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RestaurantTableCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RestaurantTable.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantTableAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RestaurantTableAggregateArgs>(args: Subset<T, RestaurantTableAggregateArgs>): Prisma.PrismaPromise<GetRestaurantTableAggregateType<T>>

    /**
     * Group by RestaurantTable.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantTableGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RestaurantTableGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RestaurantTableGroupByArgs['orderBy'] }
        : { orderBy?: RestaurantTableGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RestaurantTableGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRestaurantTableGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RestaurantTable model
   */
  readonly fields: RestaurantTableFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RestaurantTable.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RestaurantTableClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    orders<T extends RestaurantTable$ordersArgs<ExtArgs> = {}>(args?: Subset<T, RestaurantTable$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RestaurantTable model
   */ 
  interface RestaurantTableFieldRefs {
    readonly id: FieldRef<"RestaurantTable", 'String'>
    readonly name: FieldRef<"RestaurantTable", 'String'>
    readonly zone: FieldRef<"RestaurantTable", 'String'>
    readonly sortOrder: FieldRef<"RestaurantTable", 'Int'>
    readonly isActive: FieldRef<"RestaurantTable", 'Boolean'>
    readonly createdAt: FieldRef<"RestaurantTable", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RestaurantTable findUnique
   */
  export type RestaurantTableFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantTable
     */
    select?: RestaurantTableSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantTableInclude<ExtArgs> | null
    /**
     * Filter, which RestaurantTable to fetch.
     */
    where: RestaurantTableWhereUniqueInput
  }

  /**
   * RestaurantTable findUniqueOrThrow
   */
  export type RestaurantTableFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantTable
     */
    select?: RestaurantTableSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantTableInclude<ExtArgs> | null
    /**
     * Filter, which RestaurantTable to fetch.
     */
    where: RestaurantTableWhereUniqueInput
  }

  /**
   * RestaurantTable findFirst
   */
  export type RestaurantTableFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantTable
     */
    select?: RestaurantTableSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantTableInclude<ExtArgs> | null
    /**
     * Filter, which RestaurantTable to fetch.
     */
    where?: RestaurantTableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RestaurantTables to fetch.
     */
    orderBy?: RestaurantTableOrderByWithRelationInput | RestaurantTableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RestaurantTables.
     */
    cursor?: RestaurantTableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RestaurantTables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RestaurantTables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RestaurantTables.
     */
    distinct?: RestaurantTableScalarFieldEnum | RestaurantTableScalarFieldEnum[]
  }

  /**
   * RestaurantTable findFirstOrThrow
   */
  export type RestaurantTableFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantTable
     */
    select?: RestaurantTableSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantTableInclude<ExtArgs> | null
    /**
     * Filter, which RestaurantTable to fetch.
     */
    where?: RestaurantTableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RestaurantTables to fetch.
     */
    orderBy?: RestaurantTableOrderByWithRelationInput | RestaurantTableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RestaurantTables.
     */
    cursor?: RestaurantTableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RestaurantTables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RestaurantTables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RestaurantTables.
     */
    distinct?: RestaurantTableScalarFieldEnum | RestaurantTableScalarFieldEnum[]
  }

  /**
   * RestaurantTable findMany
   */
  export type RestaurantTableFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantTable
     */
    select?: RestaurantTableSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantTableInclude<ExtArgs> | null
    /**
     * Filter, which RestaurantTables to fetch.
     */
    where?: RestaurantTableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RestaurantTables to fetch.
     */
    orderBy?: RestaurantTableOrderByWithRelationInput | RestaurantTableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RestaurantTables.
     */
    cursor?: RestaurantTableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RestaurantTables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RestaurantTables.
     */
    skip?: number
    distinct?: RestaurantTableScalarFieldEnum | RestaurantTableScalarFieldEnum[]
  }

  /**
   * RestaurantTable create
   */
  export type RestaurantTableCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantTable
     */
    select?: RestaurantTableSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantTableInclude<ExtArgs> | null
    /**
     * The data needed to create a RestaurantTable.
     */
    data: XOR<RestaurantTableCreateInput, RestaurantTableUncheckedCreateInput>
  }

  /**
   * RestaurantTable createMany
   */
  export type RestaurantTableCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RestaurantTables.
     */
    data: RestaurantTableCreateManyInput | RestaurantTableCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RestaurantTable createManyAndReturn
   */
  export type RestaurantTableCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantTable
     */
    select?: RestaurantTableSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RestaurantTables.
     */
    data: RestaurantTableCreateManyInput | RestaurantTableCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RestaurantTable update
   */
  export type RestaurantTableUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantTable
     */
    select?: RestaurantTableSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantTableInclude<ExtArgs> | null
    /**
     * The data needed to update a RestaurantTable.
     */
    data: XOR<RestaurantTableUpdateInput, RestaurantTableUncheckedUpdateInput>
    /**
     * Choose, which RestaurantTable to update.
     */
    where: RestaurantTableWhereUniqueInput
  }

  /**
   * RestaurantTable updateMany
   */
  export type RestaurantTableUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RestaurantTables.
     */
    data: XOR<RestaurantTableUpdateManyMutationInput, RestaurantTableUncheckedUpdateManyInput>
    /**
     * Filter which RestaurantTables to update
     */
    where?: RestaurantTableWhereInput
  }

  /**
   * RestaurantTable upsert
   */
  export type RestaurantTableUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantTable
     */
    select?: RestaurantTableSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantTableInclude<ExtArgs> | null
    /**
     * The filter to search for the RestaurantTable to update in case it exists.
     */
    where: RestaurantTableWhereUniqueInput
    /**
     * In case the RestaurantTable found by the `where` argument doesn't exist, create a new RestaurantTable with this data.
     */
    create: XOR<RestaurantTableCreateInput, RestaurantTableUncheckedCreateInput>
    /**
     * In case the RestaurantTable was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RestaurantTableUpdateInput, RestaurantTableUncheckedUpdateInput>
  }

  /**
   * RestaurantTable delete
   */
  export type RestaurantTableDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantTable
     */
    select?: RestaurantTableSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantTableInclude<ExtArgs> | null
    /**
     * Filter which RestaurantTable to delete.
     */
    where: RestaurantTableWhereUniqueInput
  }

  /**
   * RestaurantTable deleteMany
   */
  export type RestaurantTableDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RestaurantTables to delete
     */
    where?: RestaurantTableWhereInput
  }

  /**
   * RestaurantTable.orders
   */
  export type RestaurantTable$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * RestaurantTable without action
   */
  export type RestaurantTableDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantTable
     */
    select?: RestaurantTableSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantTableInclude<ExtArgs> | null
  }


  /**
   * Model CashierSession
   */

  export type AggregateCashierSession = {
    _count: CashierSessionCountAggregateOutputType | null
    _avg: CashierSessionAvgAggregateOutputType | null
    _sum: CashierSessionSumAggregateOutputType | null
    _min: CashierSessionMinAggregateOutputType | null
    _max: CashierSessionMaxAggregateOutputType | null
  }

  export type CashierSessionAvgAggregateOutputType = {
    openingFloatCents: number | null
  }

  export type CashierSessionSumAggregateOutputType = {
    openingFloatCents: number | null
  }

  export type CashierSessionMinAggregateOutputType = {
    id: string | null
    staffId: string | null
    openedAt: Date | null
    closedAt: Date | null
    openingFloatCents: number | null
    closingNote: string | null
  }

  export type CashierSessionMaxAggregateOutputType = {
    id: string | null
    staffId: string | null
    openedAt: Date | null
    closedAt: Date | null
    openingFloatCents: number | null
    closingNote: string | null
  }

  export type CashierSessionCountAggregateOutputType = {
    id: number
    staffId: number
    openedAt: number
    closedAt: number
    openingFloatCents: number
    closingNote: number
    _all: number
  }


  export type CashierSessionAvgAggregateInputType = {
    openingFloatCents?: true
  }

  export type CashierSessionSumAggregateInputType = {
    openingFloatCents?: true
  }

  export type CashierSessionMinAggregateInputType = {
    id?: true
    staffId?: true
    openedAt?: true
    closedAt?: true
    openingFloatCents?: true
    closingNote?: true
  }

  export type CashierSessionMaxAggregateInputType = {
    id?: true
    staffId?: true
    openedAt?: true
    closedAt?: true
    openingFloatCents?: true
    closingNote?: true
  }

  export type CashierSessionCountAggregateInputType = {
    id?: true
    staffId?: true
    openedAt?: true
    closedAt?: true
    openingFloatCents?: true
    closingNote?: true
    _all?: true
  }

  export type CashierSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CashierSession to aggregate.
     */
    where?: CashierSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CashierSessions to fetch.
     */
    orderBy?: CashierSessionOrderByWithRelationInput | CashierSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CashierSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CashierSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CashierSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CashierSessions
    **/
    _count?: true | CashierSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CashierSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CashierSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CashierSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CashierSessionMaxAggregateInputType
  }

  export type GetCashierSessionAggregateType<T extends CashierSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateCashierSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCashierSession[P]>
      : GetScalarType<T[P], AggregateCashierSession[P]>
  }




  export type CashierSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CashierSessionWhereInput
    orderBy?: CashierSessionOrderByWithAggregationInput | CashierSessionOrderByWithAggregationInput[]
    by: CashierSessionScalarFieldEnum[] | CashierSessionScalarFieldEnum
    having?: CashierSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CashierSessionCountAggregateInputType | true
    _avg?: CashierSessionAvgAggregateInputType
    _sum?: CashierSessionSumAggregateInputType
    _min?: CashierSessionMinAggregateInputType
    _max?: CashierSessionMaxAggregateInputType
  }

  export type CashierSessionGroupByOutputType = {
    id: string
    staffId: string
    openedAt: Date
    closedAt: Date | null
    openingFloatCents: number
    closingNote: string | null
    _count: CashierSessionCountAggregateOutputType | null
    _avg: CashierSessionAvgAggregateOutputType | null
    _sum: CashierSessionSumAggregateOutputType | null
    _min: CashierSessionMinAggregateOutputType | null
    _max: CashierSessionMaxAggregateOutputType | null
  }

  type GetCashierSessionGroupByPayload<T extends CashierSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CashierSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CashierSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CashierSessionGroupByOutputType[P]>
            : GetScalarType<T[P], CashierSessionGroupByOutputType[P]>
        }
      >
    >


  export type CashierSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    staffId?: boolean
    openedAt?: boolean
    closedAt?: boolean
    openingFloatCents?: boolean
    closingNote?: boolean
    staff?: boolean | StaffDefaultArgs<ExtArgs>
    orders?: boolean | CashierSession$ordersArgs<ExtArgs>
    _count?: boolean | CashierSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cashierSession"]>

  export type CashierSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    staffId?: boolean
    openedAt?: boolean
    closedAt?: boolean
    openingFloatCents?: boolean
    closingNote?: boolean
    staff?: boolean | StaffDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cashierSession"]>

  export type CashierSessionSelectScalar = {
    id?: boolean
    staffId?: boolean
    openedAt?: boolean
    closedAt?: boolean
    openingFloatCents?: boolean
    closingNote?: boolean
  }

  export type CashierSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    staff?: boolean | StaffDefaultArgs<ExtArgs>
    orders?: boolean | CashierSession$ordersArgs<ExtArgs>
    _count?: boolean | CashierSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CashierSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    staff?: boolean | StaffDefaultArgs<ExtArgs>
  }

  export type $CashierSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CashierSession"
    objects: {
      staff: Prisma.$StaffPayload<ExtArgs>
      orders: Prisma.$OrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      staffId: string
      openedAt: Date
      closedAt: Date | null
      openingFloatCents: number
      closingNote: string | null
    }, ExtArgs["result"]["cashierSession"]>
    composites: {}
  }

  type CashierSessionGetPayload<S extends boolean | null | undefined | CashierSessionDefaultArgs> = $Result.GetResult<Prisma.$CashierSessionPayload, S>

  type CashierSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CashierSessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CashierSessionCountAggregateInputType | true
    }

  export interface CashierSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CashierSession'], meta: { name: 'CashierSession' } }
    /**
     * Find zero or one CashierSession that matches the filter.
     * @param {CashierSessionFindUniqueArgs} args - Arguments to find a CashierSession
     * @example
     * // Get one CashierSession
     * const cashierSession = await prisma.cashierSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CashierSessionFindUniqueArgs>(args: SelectSubset<T, CashierSessionFindUniqueArgs<ExtArgs>>): Prisma__CashierSessionClient<$Result.GetResult<Prisma.$CashierSessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CashierSession that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CashierSessionFindUniqueOrThrowArgs} args - Arguments to find a CashierSession
     * @example
     * // Get one CashierSession
     * const cashierSession = await prisma.cashierSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CashierSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, CashierSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CashierSessionClient<$Result.GetResult<Prisma.$CashierSessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CashierSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashierSessionFindFirstArgs} args - Arguments to find a CashierSession
     * @example
     * // Get one CashierSession
     * const cashierSession = await prisma.cashierSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CashierSessionFindFirstArgs>(args?: SelectSubset<T, CashierSessionFindFirstArgs<ExtArgs>>): Prisma__CashierSessionClient<$Result.GetResult<Prisma.$CashierSessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CashierSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashierSessionFindFirstOrThrowArgs} args - Arguments to find a CashierSession
     * @example
     * // Get one CashierSession
     * const cashierSession = await prisma.cashierSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CashierSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, CashierSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__CashierSessionClient<$Result.GetResult<Prisma.$CashierSessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CashierSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashierSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CashierSessions
     * const cashierSessions = await prisma.cashierSession.findMany()
     * 
     * // Get first 10 CashierSessions
     * const cashierSessions = await prisma.cashierSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cashierSessionWithIdOnly = await prisma.cashierSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CashierSessionFindManyArgs>(args?: SelectSubset<T, CashierSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CashierSessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CashierSession.
     * @param {CashierSessionCreateArgs} args - Arguments to create a CashierSession.
     * @example
     * // Create one CashierSession
     * const CashierSession = await prisma.cashierSession.create({
     *   data: {
     *     // ... data to create a CashierSession
     *   }
     * })
     * 
     */
    create<T extends CashierSessionCreateArgs>(args: SelectSubset<T, CashierSessionCreateArgs<ExtArgs>>): Prisma__CashierSessionClient<$Result.GetResult<Prisma.$CashierSessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CashierSessions.
     * @param {CashierSessionCreateManyArgs} args - Arguments to create many CashierSessions.
     * @example
     * // Create many CashierSessions
     * const cashierSession = await prisma.cashierSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CashierSessionCreateManyArgs>(args?: SelectSubset<T, CashierSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CashierSessions and returns the data saved in the database.
     * @param {CashierSessionCreateManyAndReturnArgs} args - Arguments to create many CashierSessions.
     * @example
     * // Create many CashierSessions
     * const cashierSession = await prisma.cashierSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CashierSessions and only return the `id`
     * const cashierSessionWithIdOnly = await prisma.cashierSession.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CashierSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, CashierSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CashierSessionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CashierSession.
     * @param {CashierSessionDeleteArgs} args - Arguments to delete one CashierSession.
     * @example
     * // Delete one CashierSession
     * const CashierSession = await prisma.cashierSession.delete({
     *   where: {
     *     // ... filter to delete one CashierSession
     *   }
     * })
     * 
     */
    delete<T extends CashierSessionDeleteArgs>(args: SelectSubset<T, CashierSessionDeleteArgs<ExtArgs>>): Prisma__CashierSessionClient<$Result.GetResult<Prisma.$CashierSessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CashierSession.
     * @param {CashierSessionUpdateArgs} args - Arguments to update one CashierSession.
     * @example
     * // Update one CashierSession
     * const cashierSession = await prisma.cashierSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CashierSessionUpdateArgs>(args: SelectSubset<T, CashierSessionUpdateArgs<ExtArgs>>): Prisma__CashierSessionClient<$Result.GetResult<Prisma.$CashierSessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CashierSessions.
     * @param {CashierSessionDeleteManyArgs} args - Arguments to filter CashierSessions to delete.
     * @example
     * // Delete a few CashierSessions
     * const { count } = await prisma.cashierSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CashierSessionDeleteManyArgs>(args?: SelectSubset<T, CashierSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CashierSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashierSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CashierSessions
     * const cashierSession = await prisma.cashierSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CashierSessionUpdateManyArgs>(args: SelectSubset<T, CashierSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CashierSession.
     * @param {CashierSessionUpsertArgs} args - Arguments to update or create a CashierSession.
     * @example
     * // Update or create a CashierSession
     * const cashierSession = await prisma.cashierSession.upsert({
     *   create: {
     *     // ... data to create a CashierSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CashierSession we want to update
     *   }
     * })
     */
    upsert<T extends CashierSessionUpsertArgs>(args: SelectSubset<T, CashierSessionUpsertArgs<ExtArgs>>): Prisma__CashierSessionClient<$Result.GetResult<Prisma.$CashierSessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CashierSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashierSessionCountArgs} args - Arguments to filter CashierSessions to count.
     * @example
     * // Count the number of CashierSessions
     * const count = await prisma.cashierSession.count({
     *   where: {
     *     // ... the filter for the CashierSessions we want to count
     *   }
     * })
    **/
    count<T extends CashierSessionCountArgs>(
      args?: Subset<T, CashierSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CashierSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CashierSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashierSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CashierSessionAggregateArgs>(args: Subset<T, CashierSessionAggregateArgs>): Prisma.PrismaPromise<GetCashierSessionAggregateType<T>>

    /**
     * Group by CashierSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashierSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CashierSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CashierSessionGroupByArgs['orderBy'] }
        : { orderBy?: CashierSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CashierSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCashierSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CashierSession model
   */
  readonly fields: CashierSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CashierSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CashierSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    staff<T extends StaffDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StaffDefaultArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    orders<T extends CashierSession$ordersArgs<ExtArgs> = {}>(args?: Subset<T, CashierSession$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CashierSession model
   */ 
  interface CashierSessionFieldRefs {
    readonly id: FieldRef<"CashierSession", 'String'>
    readonly staffId: FieldRef<"CashierSession", 'String'>
    readonly openedAt: FieldRef<"CashierSession", 'DateTime'>
    readonly closedAt: FieldRef<"CashierSession", 'DateTime'>
    readonly openingFloatCents: FieldRef<"CashierSession", 'Int'>
    readonly closingNote: FieldRef<"CashierSession", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CashierSession findUnique
   */
  export type CashierSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierSession
     */
    select?: CashierSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierSessionInclude<ExtArgs> | null
    /**
     * Filter, which CashierSession to fetch.
     */
    where: CashierSessionWhereUniqueInput
  }

  /**
   * CashierSession findUniqueOrThrow
   */
  export type CashierSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierSession
     */
    select?: CashierSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierSessionInclude<ExtArgs> | null
    /**
     * Filter, which CashierSession to fetch.
     */
    where: CashierSessionWhereUniqueInput
  }

  /**
   * CashierSession findFirst
   */
  export type CashierSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierSession
     */
    select?: CashierSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierSessionInclude<ExtArgs> | null
    /**
     * Filter, which CashierSession to fetch.
     */
    where?: CashierSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CashierSessions to fetch.
     */
    orderBy?: CashierSessionOrderByWithRelationInput | CashierSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CashierSessions.
     */
    cursor?: CashierSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CashierSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CashierSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CashierSessions.
     */
    distinct?: CashierSessionScalarFieldEnum | CashierSessionScalarFieldEnum[]
  }

  /**
   * CashierSession findFirstOrThrow
   */
  export type CashierSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierSession
     */
    select?: CashierSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierSessionInclude<ExtArgs> | null
    /**
     * Filter, which CashierSession to fetch.
     */
    where?: CashierSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CashierSessions to fetch.
     */
    orderBy?: CashierSessionOrderByWithRelationInput | CashierSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CashierSessions.
     */
    cursor?: CashierSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CashierSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CashierSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CashierSessions.
     */
    distinct?: CashierSessionScalarFieldEnum | CashierSessionScalarFieldEnum[]
  }

  /**
   * CashierSession findMany
   */
  export type CashierSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierSession
     */
    select?: CashierSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierSessionInclude<ExtArgs> | null
    /**
     * Filter, which CashierSessions to fetch.
     */
    where?: CashierSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CashierSessions to fetch.
     */
    orderBy?: CashierSessionOrderByWithRelationInput | CashierSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CashierSessions.
     */
    cursor?: CashierSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CashierSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CashierSessions.
     */
    skip?: number
    distinct?: CashierSessionScalarFieldEnum | CashierSessionScalarFieldEnum[]
  }

  /**
   * CashierSession create
   */
  export type CashierSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierSession
     */
    select?: CashierSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a CashierSession.
     */
    data: XOR<CashierSessionCreateInput, CashierSessionUncheckedCreateInput>
  }

  /**
   * CashierSession createMany
   */
  export type CashierSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CashierSessions.
     */
    data: CashierSessionCreateManyInput | CashierSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CashierSession createManyAndReturn
   */
  export type CashierSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierSession
     */
    select?: CashierSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CashierSessions.
     */
    data: CashierSessionCreateManyInput | CashierSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CashierSession update
   */
  export type CashierSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierSession
     */
    select?: CashierSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a CashierSession.
     */
    data: XOR<CashierSessionUpdateInput, CashierSessionUncheckedUpdateInput>
    /**
     * Choose, which CashierSession to update.
     */
    where: CashierSessionWhereUniqueInput
  }

  /**
   * CashierSession updateMany
   */
  export type CashierSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CashierSessions.
     */
    data: XOR<CashierSessionUpdateManyMutationInput, CashierSessionUncheckedUpdateManyInput>
    /**
     * Filter which CashierSessions to update
     */
    where?: CashierSessionWhereInput
  }

  /**
   * CashierSession upsert
   */
  export type CashierSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierSession
     */
    select?: CashierSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the CashierSession to update in case it exists.
     */
    where: CashierSessionWhereUniqueInput
    /**
     * In case the CashierSession found by the `where` argument doesn't exist, create a new CashierSession with this data.
     */
    create: XOR<CashierSessionCreateInput, CashierSessionUncheckedCreateInput>
    /**
     * In case the CashierSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CashierSessionUpdateInput, CashierSessionUncheckedUpdateInput>
  }

  /**
   * CashierSession delete
   */
  export type CashierSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierSession
     */
    select?: CashierSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierSessionInclude<ExtArgs> | null
    /**
     * Filter which CashierSession to delete.
     */
    where: CashierSessionWhereUniqueInput
  }

  /**
   * CashierSession deleteMany
   */
  export type CashierSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CashierSessions to delete
     */
    where?: CashierSessionWhereInput
  }

  /**
   * CashierSession.orders
   */
  export type CashierSession$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * CashierSession without action
   */
  export type CashierSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierSession
     */
    select?: CashierSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierSessionInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    subtotalCents: number | null
    taxCents: number | null
    totalCents: number | null
    commandNumber: number | null
    orderDiscountValue: number | null
  }

  export type OrderSumAggregateOutputType = {
    subtotalCents: number | null
    taxCents: number | null
    totalCents: number | null
    commandNumber: number | null
    orderDiscountValue: number | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    status: $Enums.OrderStatus | null
    tableId: string | null
    staffId: string | null
    sessionId: string | null
    subtotalCents: number | null
    taxCents: number | null
    totalCents: number | null
    idempotencyKey: string | null
    customerName: string | null
    customerEmail: string | null
    commandNumber: number | null
    currency: string | null
    orderDiscountValue: number | null
    logoPath: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    status: $Enums.OrderStatus | null
    tableId: string | null
    staffId: string | null
    sessionId: string | null
    subtotalCents: number | null
    taxCents: number | null
    totalCents: number | null
    idempotencyKey: string | null
    customerName: string | null
    customerEmail: string | null
    commandNumber: number | null
    currency: string | null
    orderDiscountValue: number | null
    logoPath: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    status: number
    tableId: number
    staffId: number
    sessionId: number
    subtotalCents: number
    taxCents: number
    totalCents: number
    idempotencyKey: number
    customerName: number
    customerEmail: number
    commandNumber: number
    currency: number
    pack: number
    paymentMethod: number
    orderDiscountValue: number
    logoPath: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    subtotalCents?: true
    taxCents?: true
    totalCents?: true
    commandNumber?: true
    orderDiscountValue?: true
  }

  export type OrderSumAggregateInputType = {
    subtotalCents?: true
    taxCents?: true
    totalCents?: true
    commandNumber?: true
    orderDiscountValue?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    status?: true
    tableId?: true
    staffId?: true
    sessionId?: true
    subtotalCents?: true
    taxCents?: true
    totalCents?: true
    idempotencyKey?: true
    customerName?: true
    customerEmail?: true
    commandNumber?: true
    currency?: true
    orderDiscountValue?: true
    logoPath?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    status?: true
    tableId?: true
    staffId?: true
    sessionId?: true
    subtotalCents?: true
    taxCents?: true
    totalCents?: true
    idempotencyKey?: true
    customerName?: true
    customerEmail?: true
    commandNumber?: true
    currency?: true
    orderDiscountValue?: true
    logoPath?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    status?: true
    tableId?: true
    staffId?: true
    sessionId?: true
    subtotalCents?: true
    taxCents?: true
    totalCents?: true
    idempotencyKey?: true
    customerName?: true
    customerEmail?: true
    commandNumber?: true
    currency?: true
    pack?: true
    paymentMethod?: true
    orderDiscountValue?: true
    logoPath?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: string
    status: $Enums.OrderStatus
    tableId: string | null
    staffId: string | null
    sessionId: string | null
    subtotalCents: number
    taxCents: number
    totalCents: number
    idempotencyKey: string | null
    customerName: string | null
    customerEmail: string | null
    commandNumber: number | null
    currency: string | null
    pack: JsonValue | null
    paymentMethod: JsonValue | null
    orderDiscountValue: number
    logoPath: string | null
    createdAt: Date
    updatedAt: Date
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    tableId?: boolean
    staffId?: boolean
    sessionId?: boolean
    subtotalCents?: boolean
    taxCents?: boolean
    totalCents?: boolean
    idempotencyKey?: boolean
    customerName?: boolean
    customerEmail?: boolean
    commandNumber?: boolean
    currency?: boolean
    pack?: boolean
    paymentMethod?: boolean
    orderDiscountValue?: boolean
    logoPath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    table?: boolean | Order$tableArgs<ExtArgs>
    staff?: boolean | Order$staffArgs<ExtArgs>
    session?: boolean | Order$sessionArgs<ExtArgs>
    lines?: boolean | Order$linesArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    tableId?: boolean
    staffId?: boolean
    sessionId?: boolean
    subtotalCents?: boolean
    taxCents?: boolean
    totalCents?: boolean
    idempotencyKey?: boolean
    customerName?: boolean
    customerEmail?: boolean
    commandNumber?: boolean
    currency?: boolean
    pack?: boolean
    paymentMethod?: boolean
    orderDiscountValue?: boolean
    logoPath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    table?: boolean | Order$tableArgs<ExtArgs>
    staff?: boolean | Order$staffArgs<ExtArgs>
    session?: boolean | Order$sessionArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    id?: boolean
    status?: boolean
    tableId?: boolean
    staffId?: boolean
    sessionId?: boolean
    subtotalCents?: boolean
    taxCents?: boolean
    totalCents?: boolean
    idempotencyKey?: boolean
    customerName?: boolean
    customerEmail?: boolean
    commandNumber?: boolean
    currency?: boolean
    pack?: boolean
    paymentMethod?: boolean
    orderDiscountValue?: boolean
    logoPath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    table?: boolean | Order$tableArgs<ExtArgs>
    staff?: boolean | Order$staffArgs<ExtArgs>
    session?: boolean | Order$sessionArgs<ExtArgs>
    lines?: boolean | Order$linesArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    table?: boolean | Order$tableArgs<ExtArgs>
    staff?: boolean | Order$staffArgs<ExtArgs>
    session?: boolean | Order$sessionArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      table: Prisma.$RestaurantTablePayload<ExtArgs> | null
      staff: Prisma.$StaffPayload<ExtArgs> | null
      session: Prisma.$CashierSessionPayload<ExtArgs> | null
      lines: Prisma.$OrderLinePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      status: $Enums.OrderStatus
      tableId: string | null
      staffId: string | null
      sessionId: string | null
      subtotalCents: number
      taxCents: number
      totalCents: number
      idempotencyKey: string | null
      /**
       * Mongo History-style metadata (optional for cashier flow).
       */
      customerName: string | null
      customerEmail: string | null
      commandNumber: number | null
      currency: string | null
      pack: Prisma.JsonValue | null
      paymentMethod: Prisma.JsonValue | null
      orderDiscountValue: number
      logoPath: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    table<T extends Order$tableArgs<ExtArgs> = {}>(args?: Subset<T, Order$tableArgs<ExtArgs>>): Prisma__RestaurantTableClient<$Result.GetResult<Prisma.$RestaurantTablePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    staff<T extends Order$staffArgs<ExtArgs> = {}>(args?: Subset<T, Order$staffArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    session<T extends Order$sessionArgs<ExtArgs> = {}>(args?: Subset<T, Order$sessionArgs<ExtArgs>>): Prisma__CashierSessionClient<$Result.GetResult<Prisma.$CashierSessionPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    lines<T extends Order$linesArgs<ExtArgs> = {}>(args?: Subset<T, Order$linesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderLinePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Order model
   */ 
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'String'>
    readonly status: FieldRef<"Order", 'OrderStatus'>
    readonly tableId: FieldRef<"Order", 'String'>
    readonly staffId: FieldRef<"Order", 'String'>
    readonly sessionId: FieldRef<"Order", 'String'>
    readonly subtotalCents: FieldRef<"Order", 'Int'>
    readonly taxCents: FieldRef<"Order", 'Int'>
    readonly totalCents: FieldRef<"Order", 'Int'>
    readonly idempotencyKey: FieldRef<"Order", 'String'>
    readonly customerName: FieldRef<"Order", 'String'>
    readonly customerEmail: FieldRef<"Order", 'String'>
    readonly commandNumber: FieldRef<"Order", 'Int'>
    readonly currency: FieldRef<"Order", 'String'>
    readonly pack: FieldRef<"Order", 'Json'>
    readonly paymentMethod: FieldRef<"Order", 'Json'>
    readonly orderDiscountValue: FieldRef<"Order", 'Int'>
    readonly logoPath: FieldRef<"Order", 'String'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Order", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data?: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
  }

  /**
   * Order.table
   */
  export type Order$tableArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantTable
     */
    select?: RestaurantTableSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantTableInclude<ExtArgs> | null
    where?: RestaurantTableWhereInput
  }

  /**
   * Order.staff
   */
  export type Order$staffArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    where?: StaffWhereInput
  }

  /**
   * Order.session
   */
  export type Order$sessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierSession
     */
    select?: CashierSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierSessionInclude<ExtArgs> | null
    where?: CashierSessionWhereInput
  }

  /**
   * Order.lines
   */
  export type Order$linesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderLine
     */
    select?: OrderLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderLineInclude<ExtArgs> | null
    where?: OrderLineWhereInput
    orderBy?: OrderLineOrderByWithRelationInput | OrderLineOrderByWithRelationInput[]
    cursor?: OrderLineWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderLineScalarFieldEnum | OrderLineScalarFieldEnum[]
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model OrderLine
   */

  export type AggregateOrderLine = {
    _count: OrderLineCountAggregateOutputType | null
    _avg: OrderLineAvgAggregateOutputType | null
    _sum: OrderLineSumAggregateOutputType | null
    _min: OrderLineMinAggregateOutputType | null
    _max: OrderLineMaxAggregateOutputType | null
  }

  export type OrderLineAvgAggregateOutputType = {
    quantity: number | null
    unitPriceCents: number | null
    lineTotalCents: number | null
    taxCents: number | null
  }

  export type OrderLineSumAggregateOutputType = {
    quantity: number | null
    unitPriceCents: number | null
    lineTotalCents: number | null
    taxCents: number | null
  }

  export type OrderLineMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    productId: string | null
    quantity: number | null
    unitPriceCents: number | null
    lineTotalCents: number | null
    taxCents: number | null
    note: string | null
  }

  export type OrderLineMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    productId: string | null
    quantity: number | null
    unitPriceCents: number | null
    lineTotalCents: number | null
    taxCents: number | null
    note: string | null
  }

  export type OrderLineCountAggregateOutputType = {
    id: number
    orderId: number
    productId: number
    quantity: number
    unitPriceCents: number
    lineTotalCents: number
    taxCents: number
    modifiersSnapshot: number
    compositionSnapshot: number
    note: number
    _all: number
  }


  export type OrderLineAvgAggregateInputType = {
    quantity?: true
    unitPriceCents?: true
    lineTotalCents?: true
    taxCents?: true
  }

  export type OrderLineSumAggregateInputType = {
    quantity?: true
    unitPriceCents?: true
    lineTotalCents?: true
    taxCents?: true
  }

  export type OrderLineMinAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    quantity?: true
    unitPriceCents?: true
    lineTotalCents?: true
    taxCents?: true
    note?: true
  }

  export type OrderLineMaxAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    quantity?: true
    unitPriceCents?: true
    lineTotalCents?: true
    taxCents?: true
    note?: true
  }

  export type OrderLineCountAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    quantity?: true
    unitPriceCents?: true
    lineTotalCents?: true
    taxCents?: true
    modifiersSnapshot?: true
    compositionSnapshot?: true
    note?: true
    _all?: true
  }

  export type OrderLineAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderLine to aggregate.
     */
    where?: OrderLineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderLines to fetch.
     */
    orderBy?: OrderLineOrderByWithRelationInput | OrderLineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderLineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderLines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderLines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderLines
    **/
    _count?: true | OrderLineCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderLineAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderLineSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderLineMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderLineMaxAggregateInputType
  }

  export type GetOrderLineAggregateType<T extends OrderLineAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderLine]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderLine[P]>
      : GetScalarType<T[P], AggregateOrderLine[P]>
  }




  export type OrderLineGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderLineWhereInput
    orderBy?: OrderLineOrderByWithAggregationInput | OrderLineOrderByWithAggregationInput[]
    by: OrderLineScalarFieldEnum[] | OrderLineScalarFieldEnum
    having?: OrderLineScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderLineCountAggregateInputType | true
    _avg?: OrderLineAvgAggregateInputType
    _sum?: OrderLineSumAggregateInputType
    _min?: OrderLineMinAggregateInputType
    _max?: OrderLineMaxAggregateInputType
  }

  export type OrderLineGroupByOutputType = {
    id: string
    orderId: string
    productId: string
    quantity: number
    unitPriceCents: number
    lineTotalCents: number
    taxCents: number
    modifiersSnapshot: JsonValue | null
    compositionSnapshot: JsonValue | null
    note: string | null
    _count: OrderLineCountAggregateOutputType | null
    _avg: OrderLineAvgAggregateOutputType | null
    _sum: OrderLineSumAggregateOutputType | null
    _min: OrderLineMinAggregateOutputType | null
    _max: OrderLineMaxAggregateOutputType | null
  }

  type GetOrderLineGroupByPayload<T extends OrderLineGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderLineGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderLineGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderLineGroupByOutputType[P]>
            : GetScalarType<T[P], OrderLineGroupByOutputType[P]>
        }
      >
    >


  export type OrderLineSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    productId?: boolean
    quantity?: boolean
    unitPriceCents?: boolean
    lineTotalCents?: boolean
    taxCents?: boolean
    modifiersSnapshot?: boolean
    compositionSnapshot?: boolean
    note?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderLine"]>

  export type OrderLineSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    productId?: boolean
    quantity?: boolean
    unitPriceCents?: boolean
    lineTotalCents?: boolean
    taxCents?: boolean
    modifiersSnapshot?: boolean
    compositionSnapshot?: boolean
    note?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderLine"]>

  export type OrderLineSelectScalar = {
    id?: boolean
    orderId?: boolean
    productId?: boolean
    quantity?: boolean
    unitPriceCents?: boolean
    lineTotalCents?: boolean
    taxCents?: boolean
    modifiersSnapshot?: boolean
    compositionSnapshot?: boolean
    note?: boolean
  }

  export type OrderLineInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type OrderLineIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $OrderLinePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderLine"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      productId: string
      quantity: number
      unitPriceCents: number
      lineTotalCents: number
      taxCents: number
      modifiersSnapshot: Prisma.JsonValue | null
      compositionSnapshot: Prisma.JsonValue | null
      note: string | null
    }, ExtArgs["result"]["orderLine"]>
    composites: {}
  }

  type OrderLineGetPayload<S extends boolean | null | undefined | OrderLineDefaultArgs> = $Result.GetResult<Prisma.$OrderLinePayload, S>

  type OrderLineCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<OrderLineFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OrderLineCountAggregateInputType | true
    }

  export interface OrderLineDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderLine'], meta: { name: 'OrderLine' } }
    /**
     * Find zero or one OrderLine that matches the filter.
     * @param {OrderLineFindUniqueArgs} args - Arguments to find a OrderLine
     * @example
     * // Get one OrderLine
     * const orderLine = await prisma.orderLine.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderLineFindUniqueArgs>(args: SelectSubset<T, OrderLineFindUniqueArgs<ExtArgs>>): Prisma__OrderLineClient<$Result.GetResult<Prisma.$OrderLinePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one OrderLine that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {OrderLineFindUniqueOrThrowArgs} args - Arguments to find a OrderLine
     * @example
     * // Get one OrderLine
     * const orderLine = await prisma.orderLine.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderLineFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderLineFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderLineClient<$Result.GetResult<Prisma.$OrderLinePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first OrderLine that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderLineFindFirstArgs} args - Arguments to find a OrderLine
     * @example
     * // Get one OrderLine
     * const orderLine = await prisma.orderLine.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderLineFindFirstArgs>(args?: SelectSubset<T, OrderLineFindFirstArgs<ExtArgs>>): Prisma__OrderLineClient<$Result.GetResult<Prisma.$OrderLinePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first OrderLine that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderLineFindFirstOrThrowArgs} args - Arguments to find a OrderLine
     * @example
     * // Get one OrderLine
     * const orderLine = await prisma.orderLine.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderLineFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderLineFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderLineClient<$Result.GetResult<Prisma.$OrderLinePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more OrderLines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderLineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderLines
     * const orderLines = await prisma.orderLine.findMany()
     * 
     * // Get first 10 OrderLines
     * const orderLines = await prisma.orderLine.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderLineWithIdOnly = await prisma.orderLine.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderLineFindManyArgs>(args?: SelectSubset<T, OrderLineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderLinePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a OrderLine.
     * @param {OrderLineCreateArgs} args - Arguments to create a OrderLine.
     * @example
     * // Create one OrderLine
     * const OrderLine = await prisma.orderLine.create({
     *   data: {
     *     // ... data to create a OrderLine
     *   }
     * })
     * 
     */
    create<T extends OrderLineCreateArgs>(args: SelectSubset<T, OrderLineCreateArgs<ExtArgs>>): Prisma__OrderLineClient<$Result.GetResult<Prisma.$OrderLinePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many OrderLines.
     * @param {OrderLineCreateManyArgs} args - Arguments to create many OrderLines.
     * @example
     * // Create many OrderLines
     * const orderLine = await prisma.orderLine.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderLineCreateManyArgs>(args?: SelectSubset<T, OrderLineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderLines and returns the data saved in the database.
     * @param {OrderLineCreateManyAndReturnArgs} args - Arguments to create many OrderLines.
     * @example
     * // Create many OrderLines
     * const orderLine = await prisma.orderLine.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderLines and only return the `id`
     * const orderLineWithIdOnly = await prisma.orderLine.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderLineCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderLineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderLinePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a OrderLine.
     * @param {OrderLineDeleteArgs} args - Arguments to delete one OrderLine.
     * @example
     * // Delete one OrderLine
     * const OrderLine = await prisma.orderLine.delete({
     *   where: {
     *     // ... filter to delete one OrderLine
     *   }
     * })
     * 
     */
    delete<T extends OrderLineDeleteArgs>(args: SelectSubset<T, OrderLineDeleteArgs<ExtArgs>>): Prisma__OrderLineClient<$Result.GetResult<Prisma.$OrderLinePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one OrderLine.
     * @param {OrderLineUpdateArgs} args - Arguments to update one OrderLine.
     * @example
     * // Update one OrderLine
     * const orderLine = await prisma.orderLine.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderLineUpdateArgs>(args: SelectSubset<T, OrderLineUpdateArgs<ExtArgs>>): Prisma__OrderLineClient<$Result.GetResult<Prisma.$OrderLinePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more OrderLines.
     * @param {OrderLineDeleteManyArgs} args - Arguments to filter OrderLines to delete.
     * @example
     * // Delete a few OrderLines
     * const { count } = await prisma.orderLine.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderLineDeleteManyArgs>(args?: SelectSubset<T, OrderLineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderLines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderLineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderLines
     * const orderLine = await prisma.orderLine.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderLineUpdateManyArgs>(args: SelectSubset<T, OrderLineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OrderLine.
     * @param {OrderLineUpsertArgs} args - Arguments to update or create a OrderLine.
     * @example
     * // Update or create a OrderLine
     * const orderLine = await prisma.orderLine.upsert({
     *   create: {
     *     // ... data to create a OrderLine
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderLine we want to update
     *   }
     * })
     */
    upsert<T extends OrderLineUpsertArgs>(args: SelectSubset<T, OrderLineUpsertArgs<ExtArgs>>): Prisma__OrderLineClient<$Result.GetResult<Prisma.$OrderLinePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of OrderLines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderLineCountArgs} args - Arguments to filter OrderLines to count.
     * @example
     * // Count the number of OrderLines
     * const count = await prisma.orderLine.count({
     *   where: {
     *     // ... the filter for the OrderLines we want to count
     *   }
     * })
    **/
    count<T extends OrderLineCountArgs>(
      args?: Subset<T, OrderLineCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderLineCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderLine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderLineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderLineAggregateArgs>(args: Subset<T, OrderLineAggregateArgs>): Prisma.PrismaPromise<GetOrderLineAggregateType<T>>

    /**
     * Group by OrderLine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderLineGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderLineGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderLineGroupByArgs['orderBy'] }
        : { orderBy?: OrderLineGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderLineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderLineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderLine model
   */
  readonly fields: OrderLineFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderLine.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderLineClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrderLine model
   */ 
  interface OrderLineFieldRefs {
    readonly id: FieldRef<"OrderLine", 'String'>
    readonly orderId: FieldRef<"OrderLine", 'String'>
    readonly productId: FieldRef<"OrderLine", 'String'>
    readonly quantity: FieldRef<"OrderLine", 'Int'>
    readonly unitPriceCents: FieldRef<"OrderLine", 'Int'>
    readonly lineTotalCents: FieldRef<"OrderLine", 'Int'>
    readonly taxCents: FieldRef<"OrderLine", 'Int'>
    readonly modifiersSnapshot: FieldRef<"OrderLine", 'Json'>
    readonly compositionSnapshot: FieldRef<"OrderLine", 'Json'>
    readonly note: FieldRef<"OrderLine", 'String'>
  }
    

  // Custom InputTypes
  /**
   * OrderLine findUnique
   */
  export type OrderLineFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderLine
     */
    select?: OrderLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderLineInclude<ExtArgs> | null
    /**
     * Filter, which OrderLine to fetch.
     */
    where: OrderLineWhereUniqueInput
  }

  /**
   * OrderLine findUniqueOrThrow
   */
  export type OrderLineFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderLine
     */
    select?: OrderLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderLineInclude<ExtArgs> | null
    /**
     * Filter, which OrderLine to fetch.
     */
    where: OrderLineWhereUniqueInput
  }

  /**
   * OrderLine findFirst
   */
  export type OrderLineFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderLine
     */
    select?: OrderLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderLineInclude<ExtArgs> | null
    /**
     * Filter, which OrderLine to fetch.
     */
    where?: OrderLineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderLines to fetch.
     */
    orderBy?: OrderLineOrderByWithRelationInput | OrderLineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderLines.
     */
    cursor?: OrderLineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderLines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderLines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderLines.
     */
    distinct?: OrderLineScalarFieldEnum | OrderLineScalarFieldEnum[]
  }

  /**
   * OrderLine findFirstOrThrow
   */
  export type OrderLineFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderLine
     */
    select?: OrderLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderLineInclude<ExtArgs> | null
    /**
     * Filter, which OrderLine to fetch.
     */
    where?: OrderLineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderLines to fetch.
     */
    orderBy?: OrderLineOrderByWithRelationInput | OrderLineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderLines.
     */
    cursor?: OrderLineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderLines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderLines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderLines.
     */
    distinct?: OrderLineScalarFieldEnum | OrderLineScalarFieldEnum[]
  }

  /**
   * OrderLine findMany
   */
  export type OrderLineFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderLine
     */
    select?: OrderLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderLineInclude<ExtArgs> | null
    /**
     * Filter, which OrderLines to fetch.
     */
    where?: OrderLineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderLines to fetch.
     */
    orderBy?: OrderLineOrderByWithRelationInput | OrderLineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderLines.
     */
    cursor?: OrderLineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderLines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderLines.
     */
    skip?: number
    distinct?: OrderLineScalarFieldEnum | OrderLineScalarFieldEnum[]
  }

  /**
   * OrderLine create
   */
  export type OrderLineCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderLine
     */
    select?: OrderLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderLineInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderLine.
     */
    data: XOR<OrderLineCreateInput, OrderLineUncheckedCreateInput>
  }

  /**
   * OrderLine createMany
   */
  export type OrderLineCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderLines.
     */
    data: OrderLineCreateManyInput | OrderLineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderLine createManyAndReturn
   */
  export type OrderLineCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderLine
     */
    select?: OrderLineSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many OrderLines.
     */
    data: OrderLineCreateManyInput | OrderLineCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderLineIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderLine update
   */
  export type OrderLineUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderLine
     */
    select?: OrderLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderLineInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderLine.
     */
    data: XOR<OrderLineUpdateInput, OrderLineUncheckedUpdateInput>
    /**
     * Choose, which OrderLine to update.
     */
    where: OrderLineWhereUniqueInput
  }

  /**
   * OrderLine updateMany
   */
  export type OrderLineUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderLines.
     */
    data: XOR<OrderLineUpdateManyMutationInput, OrderLineUncheckedUpdateManyInput>
    /**
     * Filter which OrderLines to update
     */
    where?: OrderLineWhereInput
  }

  /**
   * OrderLine upsert
   */
  export type OrderLineUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderLine
     */
    select?: OrderLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderLineInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderLine to update in case it exists.
     */
    where: OrderLineWhereUniqueInput
    /**
     * In case the OrderLine found by the `where` argument doesn't exist, create a new OrderLine with this data.
     */
    create: XOR<OrderLineCreateInput, OrderLineUncheckedCreateInput>
    /**
     * In case the OrderLine was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderLineUpdateInput, OrderLineUncheckedUpdateInput>
  }

  /**
   * OrderLine delete
   */
  export type OrderLineDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderLine
     */
    select?: OrderLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderLineInclude<ExtArgs> | null
    /**
     * Filter which OrderLine to delete.
     */
    where: OrderLineWhereUniqueInput
  }

  /**
   * OrderLine deleteMany
   */
  export type OrderLineDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderLines to delete
     */
    where?: OrderLineWhereInput
  }

  /**
   * OrderLine without action
   */
  export type OrderLineDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderLine
     */
    select?: OrderLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderLineInclude<ExtArgs> | null
  }


  /**
   * Model Setting
   */

  export type AggregateSetting = {
    _count: SettingCountAggregateOutputType | null
    _min: SettingMinAggregateOutputType | null
    _max: SettingMaxAggregateOutputType | null
  }

  export type SettingMinAggregateOutputType = {
    key: string | null
    updatedAt: Date | null
  }

  export type SettingMaxAggregateOutputType = {
    key: string | null
    updatedAt: Date | null
  }

  export type SettingCountAggregateOutputType = {
    key: number
    value: number
    updatedAt: number
    _all: number
  }


  export type SettingMinAggregateInputType = {
    key?: true
    updatedAt?: true
  }

  export type SettingMaxAggregateInputType = {
    key?: true
    updatedAt?: true
  }

  export type SettingCountAggregateInputType = {
    key?: true
    value?: true
    updatedAt?: true
    _all?: true
  }

  export type SettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Setting to aggregate.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Settings
    **/
    _count?: true | SettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SettingMaxAggregateInputType
  }

  export type GetSettingAggregateType<T extends SettingAggregateArgs> = {
        [P in keyof T & keyof AggregateSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSetting[P]>
      : GetScalarType<T[P], AggregateSetting[P]>
  }




  export type SettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SettingWhereInput
    orderBy?: SettingOrderByWithAggregationInput | SettingOrderByWithAggregationInput[]
    by: SettingScalarFieldEnum[] | SettingScalarFieldEnum
    having?: SettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SettingCountAggregateInputType | true
    _min?: SettingMinAggregateInputType
    _max?: SettingMaxAggregateInputType
  }

  export type SettingGroupByOutputType = {
    key: string
    value: JsonValue
    updatedAt: Date
    _count: SettingCountAggregateOutputType | null
    _min: SettingMinAggregateOutputType | null
    _max: SettingMaxAggregateOutputType | null
  }

  type GetSettingGroupByPayload<T extends SettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SettingGroupByOutputType[P]>
            : GetScalarType<T[P], SettingGroupByOutputType[P]>
        }
      >
    >


  export type SettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["setting"]>

  export type SettingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["setting"]>

  export type SettingSelectScalar = {
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }


  export type $SettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Setting"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      key: string
      value: Prisma.JsonValue
      updatedAt: Date
    }, ExtArgs["result"]["setting"]>
    composites: {}
  }

  type SettingGetPayload<S extends boolean | null | undefined | SettingDefaultArgs> = $Result.GetResult<Prisma.$SettingPayload, S>

  type SettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SettingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SettingCountAggregateInputType | true
    }

  export interface SettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Setting'], meta: { name: 'Setting' } }
    /**
     * Find zero or one Setting that matches the filter.
     * @param {SettingFindUniqueArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SettingFindUniqueArgs>(args: SelectSubset<T, SettingFindUniqueArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Setting that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SettingFindUniqueOrThrowArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SettingFindUniqueOrThrowArgs>(args: SelectSubset<T, SettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Setting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingFindFirstArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SettingFindFirstArgs>(args?: SelectSubset<T, SettingFindFirstArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Setting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingFindFirstOrThrowArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SettingFindFirstOrThrowArgs>(args?: SelectSubset<T, SettingFindFirstOrThrowArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Settings
     * const settings = await prisma.setting.findMany()
     * 
     * // Get first 10 Settings
     * const settings = await prisma.setting.findMany({ take: 10 })
     * 
     * // Only select the `key`
     * const settingWithKeyOnly = await prisma.setting.findMany({ select: { key: true } })
     * 
     */
    findMany<T extends SettingFindManyArgs>(args?: SelectSubset<T, SettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Setting.
     * @param {SettingCreateArgs} args - Arguments to create a Setting.
     * @example
     * // Create one Setting
     * const Setting = await prisma.setting.create({
     *   data: {
     *     // ... data to create a Setting
     *   }
     * })
     * 
     */
    create<T extends SettingCreateArgs>(args: SelectSubset<T, SettingCreateArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Settings.
     * @param {SettingCreateManyArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const setting = await prisma.setting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SettingCreateManyArgs>(args?: SelectSubset<T, SettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Settings and returns the data saved in the database.
     * @param {SettingCreateManyAndReturnArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const setting = await prisma.setting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Settings and only return the `key`
     * const settingWithKeyOnly = await prisma.setting.createManyAndReturn({ 
     *   select: { key: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SettingCreateManyAndReturnArgs>(args?: SelectSubset<T, SettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Setting.
     * @param {SettingDeleteArgs} args - Arguments to delete one Setting.
     * @example
     * // Delete one Setting
     * const Setting = await prisma.setting.delete({
     *   where: {
     *     // ... filter to delete one Setting
     *   }
     * })
     * 
     */
    delete<T extends SettingDeleteArgs>(args: SelectSubset<T, SettingDeleteArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Setting.
     * @param {SettingUpdateArgs} args - Arguments to update one Setting.
     * @example
     * // Update one Setting
     * const setting = await prisma.setting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SettingUpdateArgs>(args: SelectSubset<T, SettingUpdateArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Settings.
     * @param {SettingDeleteManyArgs} args - Arguments to filter Settings to delete.
     * @example
     * // Delete a few Settings
     * const { count } = await prisma.setting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SettingDeleteManyArgs>(args?: SelectSubset<T, SettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Settings
     * const setting = await prisma.setting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SettingUpdateManyArgs>(args: SelectSubset<T, SettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Setting.
     * @param {SettingUpsertArgs} args - Arguments to update or create a Setting.
     * @example
     * // Update or create a Setting
     * const setting = await prisma.setting.upsert({
     *   create: {
     *     // ... data to create a Setting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Setting we want to update
     *   }
     * })
     */
    upsert<T extends SettingUpsertArgs>(args: SelectSubset<T, SettingUpsertArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingCountArgs} args - Arguments to filter Settings to count.
     * @example
     * // Count the number of Settings
     * const count = await prisma.setting.count({
     *   where: {
     *     // ... the filter for the Settings we want to count
     *   }
     * })
    **/
    count<T extends SettingCountArgs>(
      args?: Subset<T, SettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Setting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SettingAggregateArgs>(args: Subset<T, SettingAggregateArgs>): Prisma.PrismaPromise<GetSettingAggregateType<T>>

    /**
     * Group by Setting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SettingGroupByArgs['orderBy'] }
        : { orderBy?: SettingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Setting model
   */
  readonly fields: SettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Setting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Setting model
   */ 
  interface SettingFieldRefs {
    readonly key: FieldRef<"Setting", 'String'>
    readonly value: FieldRef<"Setting", 'Json'>
    readonly updatedAt: FieldRef<"Setting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Setting findUnique
   */
  export type SettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting findUniqueOrThrow
   */
  export type SettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting findFirst
   */
  export type SettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingScalarFieldEnum | SettingScalarFieldEnum[]
  }

  /**
   * Setting findFirstOrThrow
   */
  export type SettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingScalarFieldEnum | SettingScalarFieldEnum[]
  }

  /**
   * Setting findMany
   */
  export type SettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Settings.
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    distinct?: SettingScalarFieldEnum | SettingScalarFieldEnum[]
  }

  /**
   * Setting create
   */
  export type SettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * The data needed to create a Setting.
     */
    data: XOR<SettingCreateInput, SettingUncheckedCreateInput>
  }

  /**
   * Setting createMany
   */
  export type SettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Settings.
     */
    data: SettingCreateManyInput | SettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Setting createManyAndReturn
   */
  export type SettingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Settings.
     */
    data: SettingCreateManyInput | SettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Setting update
   */
  export type SettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * The data needed to update a Setting.
     */
    data: XOR<SettingUpdateInput, SettingUncheckedUpdateInput>
    /**
     * Choose, which Setting to update.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting updateMany
   */
  export type SettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Settings.
     */
    data: XOR<SettingUpdateManyMutationInput, SettingUncheckedUpdateManyInput>
    /**
     * Filter which Settings to update
     */
    where?: SettingWhereInput
  }

  /**
   * Setting upsert
   */
  export type SettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * The filter to search for the Setting to update in case it exists.
     */
    where: SettingWhereUniqueInput
    /**
     * In case the Setting found by the `where` argument doesn't exist, create a new Setting with this data.
     */
    create: XOR<SettingCreateInput, SettingUncheckedCreateInput>
    /**
     * In case the Setting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SettingUpdateInput, SettingUncheckedUpdateInput>
  }

  /**
   * Setting delete
   */
  export type SettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter which Setting to delete.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting deleteMany
   */
  export type SettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Settings to delete
     */
    where?: SettingWhereInput
  }

  /**
   * Setting without action
   */
  export type SettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const StaffScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    fullName: 'fullName',
    role: 'role',
    isActive: 'isActive',
    createdAt: 'createdAt'
  };

  export type StaffScalarFieldEnum = (typeof StaffScalarFieldEnum)[keyof typeof StaffScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    image: 'image',
    sortOrder: 'sortOrder',
    isActive: 'isActive',
    createdAt: 'createdAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const ExtraScalarFieldEnum: {
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

  export type ExtraScalarFieldEnum = (typeof ExtraScalarFieldEnum)[keyof typeof ExtraScalarFieldEnum]


  export const CompositionTypeScalarFieldEnum: {
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

  export type CompositionTypeScalarFieldEnum = (typeof CompositionTypeScalarFieldEnum)[keyof typeof CompositionTypeScalarFieldEnum]


  export const CompositionTypeExtraScalarFieldEnum: {
    compositionTypeId: 'compositionTypeId',
    extraId: 'extraId',
    position: 'position'
  };

  export type CompositionTypeExtraScalarFieldEnum = (typeof CompositionTypeExtraScalarFieldEnum)[keyof typeof CompositionTypeExtraScalarFieldEnum]


  export const ProductCompositionScalarFieldEnum: {
    productId: 'productId',
    compositionTypeId: 'compositionTypeId',
    sortOrder: 'sortOrder'
  };

  export type ProductCompositionScalarFieldEnum = (typeof ProductCompositionScalarFieldEnum)[keyof typeof ProductCompositionScalarFieldEnum]


  export const ProductScalarFieldEnum: {
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

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const RestaurantTableScalarFieldEnum: {
    id: 'id',
    name: 'name',
    zone: 'zone',
    sortOrder: 'sortOrder',
    isActive: 'isActive',
    createdAt: 'createdAt'
  };

  export type RestaurantTableScalarFieldEnum = (typeof RestaurantTableScalarFieldEnum)[keyof typeof RestaurantTableScalarFieldEnum]


  export const CashierSessionScalarFieldEnum: {
    id: 'id',
    staffId: 'staffId',
    openedAt: 'openedAt',
    closedAt: 'closedAt',
    openingFloatCents: 'openingFloatCents',
    closingNote: 'closingNote'
  };

  export type CashierSessionScalarFieldEnum = (typeof CashierSessionScalarFieldEnum)[keyof typeof CashierSessionScalarFieldEnum]


  export const OrderScalarFieldEnum: {
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

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const OrderLineScalarFieldEnum: {
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

  export type OrderLineScalarFieldEnum = (typeof OrderLineScalarFieldEnum)[keyof typeof OrderLineScalarFieldEnum]


  export const SettingScalarFieldEnum: {
    key: 'key',
    value: 'value',
    updatedAt: 'updatedAt'
  };

  export type SettingScalarFieldEnum = (typeof SettingScalarFieldEnum)[keyof typeof SettingScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'StaffRole'
   */
  export type EnumStaffRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StaffRole'>
    


  /**
   * Reference to a field of type 'StaffRole[]'
   */
  export type ListEnumStaffRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StaffRole[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'CompositionSlotMode'
   */
  export type EnumCompositionSlotModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CompositionSlotMode'>
    


  /**
   * Reference to a field of type 'CompositionSlotMode[]'
   */
  export type ListEnumCompositionSlotModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CompositionSlotMode[]'>
    


  /**
   * Reference to a field of type 'ProductKind'
   */
  export type EnumProductKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductKind'>
    


  /**
   * Reference to a field of type 'ProductKind[]'
   */
  export type ListEnumProductKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductKind[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>
    


  /**
   * Reference to a field of type 'OrderStatus[]'
   */
  export type ListEnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type StaffWhereInput = {
    AND?: StaffWhereInput | StaffWhereInput[]
    OR?: StaffWhereInput[]
    NOT?: StaffWhereInput | StaffWhereInput[]
    id?: StringFilter<"Staff"> | string
    email?: StringFilter<"Staff"> | string
    passwordHash?: StringFilter<"Staff"> | string
    fullName?: StringFilter<"Staff"> | string
    role?: EnumStaffRoleFilter<"Staff"> | $Enums.StaffRole
    isActive?: BoolFilter<"Staff"> | boolean
    createdAt?: DateTimeFilter<"Staff"> | Date | string
    sessions?: CashierSessionListRelationFilter
    orders?: OrderListRelationFilter
  }

  export type StaffOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    sessions?: CashierSessionOrderByRelationAggregateInput
    orders?: OrderOrderByRelationAggregateInput
  }

  export type StaffWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: StaffWhereInput | StaffWhereInput[]
    OR?: StaffWhereInput[]
    NOT?: StaffWhereInput | StaffWhereInput[]
    passwordHash?: StringFilter<"Staff"> | string
    fullName?: StringFilter<"Staff"> | string
    role?: EnumStaffRoleFilter<"Staff"> | $Enums.StaffRole
    isActive?: BoolFilter<"Staff"> | boolean
    createdAt?: DateTimeFilter<"Staff"> | Date | string
    sessions?: CashierSessionListRelationFilter
    orders?: OrderListRelationFilter
  }, "id" | "email">

  export type StaffOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    _count?: StaffCountOrderByAggregateInput
    _max?: StaffMaxOrderByAggregateInput
    _min?: StaffMinOrderByAggregateInput
  }

  export type StaffScalarWhereWithAggregatesInput = {
    AND?: StaffScalarWhereWithAggregatesInput | StaffScalarWhereWithAggregatesInput[]
    OR?: StaffScalarWhereWithAggregatesInput[]
    NOT?: StaffScalarWhereWithAggregatesInput | StaffScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Staff"> | string
    email?: StringWithAggregatesFilter<"Staff"> | string
    passwordHash?: StringWithAggregatesFilter<"Staff"> | string
    fullName?: StringWithAggregatesFilter<"Staff"> | string
    role?: EnumStaffRoleWithAggregatesFilter<"Staff"> | $Enums.StaffRole
    isActive?: BoolWithAggregatesFilter<"Staff"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Staff"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    image?: StringNullableFilter<"Category"> | string | null
    sortOrder?: IntFilter<"Category"> | number
    isActive?: BoolFilter<"Category"> | boolean
    createdAt?: DateTimeFilter<"Category"> | Date | string
    products?: ProductListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    image?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    products?: ProductOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    name?: StringFilter<"Category"> | string
    image?: StringNullableFilter<"Category"> | string | null
    sortOrder?: IntFilter<"Category"> | number
    isActive?: BoolFilter<"Category"> | boolean
    createdAt?: DateTimeFilter<"Category"> | Date | string
    products?: ProductListRelationFilter
  }, "id">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    image?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _avg?: CategoryAvgOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
    _sum?: CategorySumOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    image?: StringNullableWithAggregatesFilter<"Category"> | string | null
    sortOrder?: IntWithAggregatesFilter<"Category"> | number
    isActive?: BoolWithAggregatesFilter<"Category"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
  }

  export type ExtraWhereInput = {
    AND?: ExtraWhereInput | ExtraWhereInput[]
    OR?: ExtraWhereInput[]
    NOT?: ExtraWhereInput | ExtraWhereInput[]
    id?: StringFilter<"Extra"> | string
    name?: StringFilter<"Extra"> | string
    image?: StringNullableFilter<"Extra"> | string | null
    price?: IntFilter<"Extra"> | number
    suppPrice?: IntFilter<"Extra"> | number
    outOfStock?: BoolFilter<"Extra"> | boolean
    visible?: BoolFilter<"Extra"> | boolean
    sortOrder?: IntFilter<"Extra"> | number
    createdAt?: DateTimeFilter<"Extra"> | Date | string
    typeLinks?: CompositionTypeExtraListRelationFilter
  }

  export type ExtraOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    image?: SortOrderInput | SortOrder
    price?: SortOrder
    suppPrice?: SortOrder
    outOfStock?: SortOrder
    visible?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    typeLinks?: CompositionTypeExtraOrderByRelationAggregateInput
  }

  export type ExtraWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExtraWhereInput | ExtraWhereInput[]
    OR?: ExtraWhereInput[]
    NOT?: ExtraWhereInput | ExtraWhereInput[]
    name?: StringFilter<"Extra"> | string
    image?: StringNullableFilter<"Extra"> | string | null
    price?: IntFilter<"Extra"> | number
    suppPrice?: IntFilter<"Extra"> | number
    outOfStock?: BoolFilter<"Extra"> | boolean
    visible?: BoolFilter<"Extra"> | boolean
    sortOrder?: IntFilter<"Extra"> | number
    createdAt?: DateTimeFilter<"Extra"> | Date | string
    typeLinks?: CompositionTypeExtraListRelationFilter
  }, "id">

  export type ExtraOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    image?: SortOrderInput | SortOrder
    price?: SortOrder
    suppPrice?: SortOrder
    outOfStock?: SortOrder
    visible?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    _count?: ExtraCountOrderByAggregateInput
    _avg?: ExtraAvgOrderByAggregateInput
    _max?: ExtraMaxOrderByAggregateInput
    _min?: ExtraMinOrderByAggregateInput
    _sum?: ExtraSumOrderByAggregateInput
  }

  export type ExtraScalarWhereWithAggregatesInput = {
    AND?: ExtraScalarWhereWithAggregatesInput | ExtraScalarWhereWithAggregatesInput[]
    OR?: ExtraScalarWhereWithAggregatesInput[]
    NOT?: ExtraScalarWhereWithAggregatesInput | ExtraScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Extra"> | string
    name?: StringWithAggregatesFilter<"Extra"> | string
    image?: StringNullableWithAggregatesFilter<"Extra"> | string | null
    price?: IntWithAggregatesFilter<"Extra"> | number
    suppPrice?: IntWithAggregatesFilter<"Extra"> | number
    outOfStock?: BoolWithAggregatesFilter<"Extra"> | boolean
    visible?: BoolWithAggregatesFilter<"Extra"> | boolean
    sortOrder?: IntWithAggregatesFilter<"Extra"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Extra"> | Date | string
  }

  export type CompositionTypeWhereInput = {
    AND?: CompositionTypeWhereInput | CompositionTypeWhereInput[]
    OR?: CompositionTypeWhereInput[]
    NOT?: CompositionTypeWhereInput | CompositionTypeWhereInput[]
    id?: StringFilter<"CompositionType"> | string
    name?: StringFilter<"CompositionType"> | string
    label?: StringFilter<"CompositionType"> | string
    message?: StringNullableFilter<"CompositionType"> | string | null
    min?: IntFilter<"CompositionType"> | number
    max?: IntFilter<"CompositionType"> | number
    payment?: BoolFilter<"CompositionType"> | boolean
    selection?: BoolFilter<"CompositionType"> | boolean
    mode?: EnumCompositionSlotModeFilter<"CompositionType"> | $Enums.CompositionSlotMode
    isActive?: BoolFilter<"CompositionType"> | boolean
    sortOrder?: IntFilter<"CompositionType"> | number
    createdAt?: DateTimeFilter<"CompositionType"> | Date | string
    extras?: CompositionTypeExtraListRelationFilter
    productSteps?: ProductCompositionListRelationFilter
  }

  export type CompositionTypeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    label?: SortOrder
    message?: SortOrderInput | SortOrder
    min?: SortOrder
    max?: SortOrder
    payment?: SortOrder
    selection?: SortOrder
    mode?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    extras?: CompositionTypeExtraOrderByRelationAggregateInput
    productSteps?: ProductCompositionOrderByRelationAggregateInput
  }

  export type CompositionTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CompositionTypeWhereInput | CompositionTypeWhereInput[]
    OR?: CompositionTypeWhereInput[]
    NOT?: CompositionTypeWhereInput | CompositionTypeWhereInput[]
    name?: StringFilter<"CompositionType"> | string
    label?: StringFilter<"CompositionType"> | string
    message?: StringNullableFilter<"CompositionType"> | string | null
    min?: IntFilter<"CompositionType"> | number
    max?: IntFilter<"CompositionType"> | number
    payment?: BoolFilter<"CompositionType"> | boolean
    selection?: BoolFilter<"CompositionType"> | boolean
    mode?: EnumCompositionSlotModeFilter<"CompositionType"> | $Enums.CompositionSlotMode
    isActive?: BoolFilter<"CompositionType"> | boolean
    sortOrder?: IntFilter<"CompositionType"> | number
    createdAt?: DateTimeFilter<"CompositionType"> | Date | string
    extras?: CompositionTypeExtraListRelationFilter
    productSteps?: ProductCompositionListRelationFilter
  }, "id">

  export type CompositionTypeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    label?: SortOrder
    message?: SortOrderInput | SortOrder
    min?: SortOrder
    max?: SortOrder
    payment?: SortOrder
    selection?: SortOrder
    mode?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    _count?: CompositionTypeCountOrderByAggregateInput
    _avg?: CompositionTypeAvgOrderByAggregateInput
    _max?: CompositionTypeMaxOrderByAggregateInput
    _min?: CompositionTypeMinOrderByAggregateInput
    _sum?: CompositionTypeSumOrderByAggregateInput
  }

  export type CompositionTypeScalarWhereWithAggregatesInput = {
    AND?: CompositionTypeScalarWhereWithAggregatesInput | CompositionTypeScalarWhereWithAggregatesInput[]
    OR?: CompositionTypeScalarWhereWithAggregatesInput[]
    NOT?: CompositionTypeScalarWhereWithAggregatesInput | CompositionTypeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CompositionType"> | string
    name?: StringWithAggregatesFilter<"CompositionType"> | string
    label?: StringWithAggregatesFilter<"CompositionType"> | string
    message?: StringNullableWithAggregatesFilter<"CompositionType"> | string | null
    min?: IntWithAggregatesFilter<"CompositionType"> | number
    max?: IntWithAggregatesFilter<"CompositionType"> | number
    payment?: BoolWithAggregatesFilter<"CompositionType"> | boolean
    selection?: BoolWithAggregatesFilter<"CompositionType"> | boolean
    mode?: EnumCompositionSlotModeWithAggregatesFilter<"CompositionType"> | $Enums.CompositionSlotMode
    isActive?: BoolWithAggregatesFilter<"CompositionType"> | boolean
    sortOrder?: IntWithAggregatesFilter<"CompositionType"> | number
    createdAt?: DateTimeWithAggregatesFilter<"CompositionType"> | Date | string
  }

  export type CompositionTypeExtraWhereInput = {
    AND?: CompositionTypeExtraWhereInput | CompositionTypeExtraWhereInput[]
    OR?: CompositionTypeExtraWhereInput[]
    NOT?: CompositionTypeExtraWhereInput | CompositionTypeExtraWhereInput[]
    compositionTypeId?: StringFilter<"CompositionTypeExtra"> | string
    extraId?: StringFilter<"CompositionTypeExtra"> | string
    position?: IntFilter<"CompositionTypeExtra"> | number
    compositionType?: XOR<CompositionTypeRelationFilter, CompositionTypeWhereInput>
    extra?: XOR<ExtraRelationFilter, ExtraWhereInput>
  }

  export type CompositionTypeExtraOrderByWithRelationInput = {
    compositionTypeId?: SortOrder
    extraId?: SortOrder
    position?: SortOrder
    compositionType?: CompositionTypeOrderByWithRelationInput
    extra?: ExtraOrderByWithRelationInput
  }

  export type CompositionTypeExtraWhereUniqueInput = Prisma.AtLeast<{
    compositionTypeId_extraId?: CompositionTypeExtraCompositionTypeIdExtraIdCompoundUniqueInput
    AND?: CompositionTypeExtraWhereInput | CompositionTypeExtraWhereInput[]
    OR?: CompositionTypeExtraWhereInput[]
    NOT?: CompositionTypeExtraWhereInput | CompositionTypeExtraWhereInput[]
    compositionTypeId?: StringFilter<"CompositionTypeExtra"> | string
    extraId?: StringFilter<"CompositionTypeExtra"> | string
    position?: IntFilter<"CompositionTypeExtra"> | number
    compositionType?: XOR<CompositionTypeRelationFilter, CompositionTypeWhereInput>
    extra?: XOR<ExtraRelationFilter, ExtraWhereInput>
  }, "compositionTypeId_extraId">

  export type CompositionTypeExtraOrderByWithAggregationInput = {
    compositionTypeId?: SortOrder
    extraId?: SortOrder
    position?: SortOrder
    _count?: CompositionTypeExtraCountOrderByAggregateInput
    _avg?: CompositionTypeExtraAvgOrderByAggregateInput
    _max?: CompositionTypeExtraMaxOrderByAggregateInput
    _min?: CompositionTypeExtraMinOrderByAggregateInput
    _sum?: CompositionTypeExtraSumOrderByAggregateInput
  }

  export type CompositionTypeExtraScalarWhereWithAggregatesInput = {
    AND?: CompositionTypeExtraScalarWhereWithAggregatesInput | CompositionTypeExtraScalarWhereWithAggregatesInput[]
    OR?: CompositionTypeExtraScalarWhereWithAggregatesInput[]
    NOT?: CompositionTypeExtraScalarWhereWithAggregatesInput | CompositionTypeExtraScalarWhereWithAggregatesInput[]
    compositionTypeId?: StringWithAggregatesFilter<"CompositionTypeExtra"> | string
    extraId?: StringWithAggregatesFilter<"CompositionTypeExtra"> | string
    position?: IntWithAggregatesFilter<"CompositionTypeExtra"> | number
  }

  export type ProductCompositionWhereInput = {
    AND?: ProductCompositionWhereInput | ProductCompositionWhereInput[]
    OR?: ProductCompositionWhereInput[]
    NOT?: ProductCompositionWhereInput | ProductCompositionWhereInput[]
    productId?: StringFilter<"ProductComposition"> | string
    compositionTypeId?: StringFilter<"ProductComposition"> | string
    sortOrder?: IntFilter<"ProductComposition"> | number
    product?: XOR<ProductRelationFilter, ProductWhereInput>
    compositionType?: XOR<CompositionTypeRelationFilter, CompositionTypeWhereInput>
  }

  export type ProductCompositionOrderByWithRelationInput = {
    productId?: SortOrder
    compositionTypeId?: SortOrder
    sortOrder?: SortOrder
    product?: ProductOrderByWithRelationInput
    compositionType?: CompositionTypeOrderByWithRelationInput
  }

  export type ProductCompositionWhereUniqueInput = Prisma.AtLeast<{
    productId_sortOrder?: ProductCompositionProductIdSortOrderCompoundUniqueInput
    productId_compositionTypeId?: ProductCompositionProductIdCompositionTypeIdCompoundUniqueInput
    AND?: ProductCompositionWhereInput | ProductCompositionWhereInput[]
    OR?: ProductCompositionWhereInput[]
    NOT?: ProductCompositionWhereInput | ProductCompositionWhereInput[]
    productId?: StringFilter<"ProductComposition"> | string
    compositionTypeId?: StringFilter<"ProductComposition"> | string
    sortOrder?: IntFilter<"ProductComposition"> | number
    product?: XOR<ProductRelationFilter, ProductWhereInput>
    compositionType?: XOR<CompositionTypeRelationFilter, CompositionTypeWhereInput>
  }, "productId_compositionTypeId" | "productId_sortOrder">

  export type ProductCompositionOrderByWithAggregationInput = {
    productId?: SortOrder
    compositionTypeId?: SortOrder
    sortOrder?: SortOrder
    _count?: ProductCompositionCountOrderByAggregateInput
    _avg?: ProductCompositionAvgOrderByAggregateInput
    _max?: ProductCompositionMaxOrderByAggregateInput
    _min?: ProductCompositionMinOrderByAggregateInput
    _sum?: ProductCompositionSumOrderByAggregateInput
  }

  export type ProductCompositionScalarWhereWithAggregatesInput = {
    AND?: ProductCompositionScalarWhereWithAggregatesInput | ProductCompositionScalarWhereWithAggregatesInput[]
    OR?: ProductCompositionScalarWhereWithAggregatesInput[]
    NOT?: ProductCompositionScalarWhereWithAggregatesInput | ProductCompositionScalarWhereWithAggregatesInput[]
    productId?: StringWithAggregatesFilter<"ProductComposition"> | string
    compositionTypeId?: StringWithAggregatesFilter<"ProductComposition"> | string
    sortOrder?: IntWithAggregatesFilter<"ProductComposition"> | number
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    categoryId?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    image?: StringNullableFilter<"Product"> | string | null
    kind?: EnumProductKindFilter<"Product"> | $Enums.ProductKind
    price?: IntFilter<"Product"> | number
    formulePrice?: IntFilter<"Product"> | number
    taxRateBps?: IntNullableFilter<"Product"> | number | null
    modifiers?: JsonNullableFilter<"Product">
    isActive?: BoolFilter<"Product"> | boolean
    outOfStock?: BoolFilter<"Product"> | boolean
    sortOrder?: IntFilter<"Product"> | number
    discountValue?: IntFilter<"Product"> | number
    originalPrice?: IntNullableFilter<"Product"> | number | null
    discountStartDate?: DateTimeNullableFilter<"Product"> | Date | string | null
    discountEndDate?: DateTimeNullableFilter<"Product"> | Date | string | null
    createdAt?: DateTimeFilter<"Product"> | Date | string
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
    compositions?: ProductCompositionListRelationFilter
    orderLines?: OrderLineListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    kind?: SortOrder
    price?: SortOrder
    formulePrice?: SortOrder
    taxRateBps?: SortOrderInput | SortOrder
    modifiers?: SortOrderInput | SortOrder
    isActive?: SortOrder
    outOfStock?: SortOrder
    sortOrder?: SortOrder
    discountValue?: SortOrder
    originalPrice?: SortOrderInput | SortOrder
    discountStartDate?: SortOrderInput | SortOrder
    discountEndDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    category?: CategoryOrderByWithRelationInput
    compositions?: ProductCompositionOrderByRelationAggregateInput
    orderLines?: OrderLineOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    categoryId?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    image?: StringNullableFilter<"Product"> | string | null
    kind?: EnumProductKindFilter<"Product"> | $Enums.ProductKind
    price?: IntFilter<"Product"> | number
    formulePrice?: IntFilter<"Product"> | number
    taxRateBps?: IntNullableFilter<"Product"> | number | null
    modifiers?: JsonNullableFilter<"Product">
    isActive?: BoolFilter<"Product"> | boolean
    outOfStock?: BoolFilter<"Product"> | boolean
    sortOrder?: IntFilter<"Product"> | number
    discountValue?: IntFilter<"Product"> | number
    originalPrice?: IntNullableFilter<"Product"> | number | null
    discountStartDate?: DateTimeNullableFilter<"Product"> | Date | string | null
    discountEndDate?: DateTimeNullableFilter<"Product"> | Date | string | null
    createdAt?: DateTimeFilter<"Product"> | Date | string
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
    compositions?: ProductCompositionListRelationFilter
    orderLines?: OrderLineListRelationFilter
  }, "id">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    kind?: SortOrder
    price?: SortOrder
    formulePrice?: SortOrder
    taxRateBps?: SortOrderInput | SortOrder
    modifiers?: SortOrderInput | SortOrder
    isActive?: SortOrder
    outOfStock?: SortOrder
    sortOrder?: SortOrder
    discountValue?: SortOrder
    originalPrice?: SortOrderInput | SortOrder
    discountStartDate?: SortOrderInput | SortOrder
    discountEndDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    categoryId?: StringWithAggregatesFilter<"Product"> | string
    name?: StringWithAggregatesFilter<"Product"> | string
    description?: StringNullableWithAggregatesFilter<"Product"> | string | null
    image?: StringNullableWithAggregatesFilter<"Product"> | string | null
    kind?: EnumProductKindWithAggregatesFilter<"Product"> | $Enums.ProductKind
    price?: IntWithAggregatesFilter<"Product"> | number
    formulePrice?: IntWithAggregatesFilter<"Product"> | number
    taxRateBps?: IntNullableWithAggregatesFilter<"Product"> | number | null
    modifiers?: JsonNullableWithAggregatesFilter<"Product">
    isActive?: BoolWithAggregatesFilter<"Product"> | boolean
    outOfStock?: BoolWithAggregatesFilter<"Product"> | boolean
    sortOrder?: IntWithAggregatesFilter<"Product"> | number
    discountValue?: IntWithAggregatesFilter<"Product"> | number
    originalPrice?: IntNullableWithAggregatesFilter<"Product"> | number | null
    discountStartDate?: DateTimeNullableWithAggregatesFilter<"Product"> | Date | string | null
    discountEndDate?: DateTimeNullableWithAggregatesFilter<"Product"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type RestaurantTableWhereInput = {
    AND?: RestaurantTableWhereInput | RestaurantTableWhereInput[]
    OR?: RestaurantTableWhereInput[]
    NOT?: RestaurantTableWhereInput | RestaurantTableWhereInput[]
    id?: StringFilter<"RestaurantTable"> | string
    name?: StringFilter<"RestaurantTable"> | string
    zone?: StringNullableFilter<"RestaurantTable"> | string | null
    sortOrder?: IntFilter<"RestaurantTable"> | number
    isActive?: BoolFilter<"RestaurantTable"> | boolean
    createdAt?: DateTimeFilter<"RestaurantTable"> | Date | string
    orders?: OrderListRelationFilter
  }

  export type RestaurantTableOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    zone?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    orders?: OrderOrderByRelationAggregateInput
  }

  export type RestaurantTableWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RestaurantTableWhereInput | RestaurantTableWhereInput[]
    OR?: RestaurantTableWhereInput[]
    NOT?: RestaurantTableWhereInput | RestaurantTableWhereInput[]
    name?: StringFilter<"RestaurantTable"> | string
    zone?: StringNullableFilter<"RestaurantTable"> | string | null
    sortOrder?: IntFilter<"RestaurantTable"> | number
    isActive?: BoolFilter<"RestaurantTable"> | boolean
    createdAt?: DateTimeFilter<"RestaurantTable"> | Date | string
    orders?: OrderListRelationFilter
  }, "id">

  export type RestaurantTableOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    zone?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    _count?: RestaurantTableCountOrderByAggregateInput
    _avg?: RestaurantTableAvgOrderByAggregateInput
    _max?: RestaurantTableMaxOrderByAggregateInput
    _min?: RestaurantTableMinOrderByAggregateInput
    _sum?: RestaurantTableSumOrderByAggregateInput
  }

  export type RestaurantTableScalarWhereWithAggregatesInput = {
    AND?: RestaurantTableScalarWhereWithAggregatesInput | RestaurantTableScalarWhereWithAggregatesInput[]
    OR?: RestaurantTableScalarWhereWithAggregatesInput[]
    NOT?: RestaurantTableScalarWhereWithAggregatesInput | RestaurantTableScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RestaurantTable"> | string
    name?: StringWithAggregatesFilter<"RestaurantTable"> | string
    zone?: StringNullableWithAggregatesFilter<"RestaurantTable"> | string | null
    sortOrder?: IntWithAggregatesFilter<"RestaurantTable"> | number
    isActive?: BoolWithAggregatesFilter<"RestaurantTable"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"RestaurantTable"> | Date | string
  }

  export type CashierSessionWhereInput = {
    AND?: CashierSessionWhereInput | CashierSessionWhereInput[]
    OR?: CashierSessionWhereInput[]
    NOT?: CashierSessionWhereInput | CashierSessionWhereInput[]
    id?: StringFilter<"CashierSession"> | string
    staffId?: StringFilter<"CashierSession"> | string
    openedAt?: DateTimeFilter<"CashierSession"> | Date | string
    closedAt?: DateTimeNullableFilter<"CashierSession"> | Date | string | null
    openingFloatCents?: IntFilter<"CashierSession"> | number
    closingNote?: StringNullableFilter<"CashierSession"> | string | null
    staff?: XOR<StaffRelationFilter, StaffWhereInput>
    orders?: OrderListRelationFilter
  }

  export type CashierSessionOrderByWithRelationInput = {
    id?: SortOrder
    staffId?: SortOrder
    openedAt?: SortOrder
    closedAt?: SortOrderInput | SortOrder
    openingFloatCents?: SortOrder
    closingNote?: SortOrderInput | SortOrder
    staff?: StaffOrderByWithRelationInput
    orders?: OrderOrderByRelationAggregateInput
  }

  export type CashierSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CashierSessionWhereInput | CashierSessionWhereInput[]
    OR?: CashierSessionWhereInput[]
    NOT?: CashierSessionWhereInput | CashierSessionWhereInput[]
    staffId?: StringFilter<"CashierSession"> | string
    openedAt?: DateTimeFilter<"CashierSession"> | Date | string
    closedAt?: DateTimeNullableFilter<"CashierSession"> | Date | string | null
    openingFloatCents?: IntFilter<"CashierSession"> | number
    closingNote?: StringNullableFilter<"CashierSession"> | string | null
    staff?: XOR<StaffRelationFilter, StaffWhereInput>
    orders?: OrderListRelationFilter
  }, "id">

  export type CashierSessionOrderByWithAggregationInput = {
    id?: SortOrder
    staffId?: SortOrder
    openedAt?: SortOrder
    closedAt?: SortOrderInput | SortOrder
    openingFloatCents?: SortOrder
    closingNote?: SortOrderInput | SortOrder
    _count?: CashierSessionCountOrderByAggregateInput
    _avg?: CashierSessionAvgOrderByAggregateInput
    _max?: CashierSessionMaxOrderByAggregateInput
    _min?: CashierSessionMinOrderByAggregateInput
    _sum?: CashierSessionSumOrderByAggregateInput
  }

  export type CashierSessionScalarWhereWithAggregatesInput = {
    AND?: CashierSessionScalarWhereWithAggregatesInput | CashierSessionScalarWhereWithAggregatesInput[]
    OR?: CashierSessionScalarWhereWithAggregatesInput[]
    NOT?: CashierSessionScalarWhereWithAggregatesInput | CashierSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CashierSession"> | string
    staffId?: StringWithAggregatesFilter<"CashierSession"> | string
    openedAt?: DateTimeWithAggregatesFilter<"CashierSession"> | Date | string
    closedAt?: DateTimeNullableWithAggregatesFilter<"CashierSession"> | Date | string | null
    openingFloatCents?: IntWithAggregatesFilter<"CashierSession"> | number
    closingNote?: StringNullableWithAggregatesFilter<"CashierSession"> | string | null
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: StringFilter<"Order"> | string
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    tableId?: StringNullableFilter<"Order"> | string | null
    staffId?: StringNullableFilter<"Order"> | string | null
    sessionId?: StringNullableFilter<"Order"> | string | null
    subtotalCents?: IntFilter<"Order"> | number
    taxCents?: IntFilter<"Order"> | number
    totalCents?: IntFilter<"Order"> | number
    idempotencyKey?: StringNullableFilter<"Order"> | string | null
    customerName?: StringNullableFilter<"Order"> | string | null
    customerEmail?: StringNullableFilter<"Order"> | string | null
    commandNumber?: IntNullableFilter<"Order"> | number | null
    currency?: StringNullableFilter<"Order"> | string | null
    pack?: JsonNullableFilter<"Order">
    paymentMethod?: JsonNullableFilter<"Order">
    orderDiscountValue?: IntFilter<"Order"> | number
    logoPath?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    table?: XOR<RestaurantTableNullableRelationFilter, RestaurantTableWhereInput> | null
    staff?: XOR<StaffNullableRelationFilter, StaffWhereInput> | null
    session?: XOR<CashierSessionNullableRelationFilter, CashierSessionWhereInput> | null
    lines?: OrderLineListRelationFilter
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    status?: SortOrder
    tableId?: SortOrderInput | SortOrder
    staffId?: SortOrderInput | SortOrder
    sessionId?: SortOrderInput | SortOrder
    subtotalCents?: SortOrder
    taxCents?: SortOrder
    totalCents?: SortOrder
    idempotencyKey?: SortOrderInput | SortOrder
    customerName?: SortOrderInput | SortOrder
    customerEmail?: SortOrderInput | SortOrder
    commandNumber?: SortOrderInput | SortOrder
    currency?: SortOrderInput | SortOrder
    pack?: SortOrderInput | SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    orderDiscountValue?: SortOrder
    logoPath?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    table?: RestaurantTableOrderByWithRelationInput
    staff?: StaffOrderByWithRelationInput
    session?: CashierSessionOrderByWithRelationInput
    lines?: OrderLineOrderByRelationAggregateInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    idempotencyKey?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    tableId?: StringNullableFilter<"Order"> | string | null
    staffId?: StringNullableFilter<"Order"> | string | null
    sessionId?: StringNullableFilter<"Order"> | string | null
    subtotalCents?: IntFilter<"Order"> | number
    taxCents?: IntFilter<"Order"> | number
    totalCents?: IntFilter<"Order"> | number
    customerName?: StringNullableFilter<"Order"> | string | null
    customerEmail?: StringNullableFilter<"Order"> | string | null
    commandNumber?: IntNullableFilter<"Order"> | number | null
    currency?: StringNullableFilter<"Order"> | string | null
    pack?: JsonNullableFilter<"Order">
    paymentMethod?: JsonNullableFilter<"Order">
    orderDiscountValue?: IntFilter<"Order"> | number
    logoPath?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    table?: XOR<RestaurantTableNullableRelationFilter, RestaurantTableWhereInput> | null
    staff?: XOR<StaffNullableRelationFilter, StaffWhereInput> | null
    session?: XOR<CashierSessionNullableRelationFilter, CashierSessionWhereInput> | null
    lines?: OrderLineListRelationFilter
  }, "id" | "idempotencyKey">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    status?: SortOrder
    tableId?: SortOrderInput | SortOrder
    staffId?: SortOrderInput | SortOrder
    sessionId?: SortOrderInput | SortOrder
    subtotalCents?: SortOrder
    taxCents?: SortOrder
    totalCents?: SortOrder
    idempotencyKey?: SortOrderInput | SortOrder
    customerName?: SortOrderInput | SortOrder
    customerEmail?: SortOrderInput | SortOrder
    commandNumber?: SortOrderInput | SortOrder
    currency?: SortOrderInput | SortOrder
    pack?: SortOrderInput | SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    orderDiscountValue?: SortOrder
    logoPath?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Order"> | string
    status?: EnumOrderStatusWithAggregatesFilter<"Order"> | $Enums.OrderStatus
    tableId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    staffId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    sessionId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    subtotalCents?: IntWithAggregatesFilter<"Order"> | number
    taxCents?: IntWithAggregatesFilter<"Order"> | number
    totalCents?: IntWithAggregatesFilter<"Order"> | number
    idempotencyKey?: StringNullableWithAggregatesFilter<"Order"> | string | null
    customerName?: StringNullableWithAggregatesFilter<"Order"> | string | null
    customerEmail?: StringNullableWithAggregatesFilter<"Order"> | string | null
    commandNumber?: IntNullableWithAggregatesFilter<"Order"> | number | null
    currency?: StringNullableWithAggregatesFilter<"Order"> | string | null
    pack?: JsonNullableWithAggregatesFilter<"Order">
    paymentMethod?: JsonNullableWithAggregatesFilter<"Order">
    orderDiscountValue?: IntWithAggregatesFilter<"Order"> | number
    logoPath?: StringNullableWithAggregatesFilter<"Order"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
  }

  export type OrderLineWhereInput = {
    AND?: OrderLineWhereInput | OrderLineWhereInput[]
    OR?: OrderLineWhereInput[]
    NOT?: OrderLineWhereInput | OrderLineWhereInput[]
    id?: StringFilter<"OrderLine"> | string
    orderId?: StringFilter<"OrderLine"> | string
    productId?: StringFilter<"OrderLine"> | string
    quantity?: IntFilter<"OrderLine"> | number
    unitPriceCents?: IntFilter<"OrderLine"> | number
    lineTotalCents?: IntFilter<"OrderLine"> | number
    taxCents?: IntFilter<"OrderLine"> | number
    modifiersSnapshot?: JsonNullableFilter<"OrderLine">
    compositionSnapshot?: JsonNullableFilter<"OrderLine">
    note?: StringNullableFilter<"OrderLine"> | string | null
    order?: XOR<OrderRelationFilter, OrderWhereInput>
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }

  export type OrderLineOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    unitPriceCents?: SortOrder
    lineTotalCents?: SortOrder
    taxCents?: SortOrder
    modifiersSnapshot?: SortOrderInput | SortOrder
    compositionSnapshot?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    order?: OrderOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type OrderLineWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderLineWhereInput | OrderLineWhereInput[]
    OR?: OrderLineWhereInput[]
    NOT?: OrderLineWhereInput | OrderLineWhereInput[]
    orderId?: StringFilter<"OrderLine"> | string
    productId?: StringFilter<"OrderLine"> | string
    quantity?: IntFilter<"OrderLine"> | number
    unitPriceCents?: IntFilter<"OrderLine"> | number
    lineTotalCents?: IntFilter<"OrderLine"> | number
    taxCents?: IntFilter<"OrderLine"> | number
    modifiersSnapshot?: JsonNullableFilter<"OrderLine">
    compositionSnapshot?: JsonNullableFilter<"OrderLine">
    note?: StringNullableFilter<"OrderLine"> | string | null
    order?: XOR<OrderRelationFilter, OrderWhereInput>
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }, "id">

  export type OrderLineOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    unitPriceCents?: SortOrder
    lineTotalCents?: SortOrder
    taxCents?: SortOrder
    modifiersSnapshot?: SortOrderInput | SortOrder
    compositionSnapshot?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    _count?: OrderLineCountOrderByAggregateInput
    _avg?: OrderLineAvgOrderByAggregateInput
    _max?: OrderLineMaxOrderByAggregateInput
    _min?: OrderLineMinOrderByAggregateInput
    _sum?: OrderLineSumOrderByAggregateInput
  }

  export type OrderLineScalarWhereWithAggregatesInput = {
    AND?: OrderLineScalarWhereWithAggregatesInput | OrderLineScalarWhereWithAggregatesInput[]
    OR?: OrderLineScalarWhereWithAggregatesInput[]
    NOT?: OrderLineScalarWhereWithAggregatesInput | OrderLineScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrderLine"> | string
    orderId?: StringWithAggregatesFilter<"OrderLine"> | string
    productId?: StringWithAggregatesFilter<"OrderLine"> | string
    quantity?: IntWithAggregatesFilter<"OrderLine"> | number
    unitPriceCents?: IntWithAggregatesFilter<"OrderLine"> | number
    lineTotalCents?: IntWithAggregatesFilter<"OrderLine"> | number
    taxCents?: IntWithAggregatesFilter<"OrderLine"> | number
    modifiersSnapshot?: JsonNullableWithAggregatesFilter<"OrderLine">
    compositionSnapshot?: JsonNullableWithAggregatesFilter<"OrderLine">
    note?: StringNullableWithAggregatesFilter<"OrderLine"> | string | null
  }

  export type SettingWhereInput = {
    AND?: SettingWhereInput | SettingWhereInput[]
    OR?: SettingWhereInput[]
    NOT?: SettingWhereInput | SettingWhereInput[]
    key?: StringFilter<"Setting"> | string
    value?: JsonFilter<"Setting">
    updatedAt?: DateTimeFilter<"Setting"> | Date | string
  }

  export type SettingOrderByWithRelationInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingWhereUniqueInput = Prisma.AtLeast<{
    key?: string
    AND?: SettingWhereInput | SettingWhereInput[]
    OR?: SettingWhereInput[]
    NOT?: SettingWhereInput | SettingWhereInput[]
    value?: JsonFilter<"Setting">
    updatedAt?: DateTimeFilter<"Setting"> | Date | string
  }, "key">

  export type SettingOrderByWithAggregationInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
    _count?: SettingCountOrderByAggregateInput
    _max?: SettingMaxOrderByAggregateInput
    _min?: SettingMinOrderByAggregateInput
  }

  export type SettingScalarWhereWithAggregatesInput = {
    AND?: SettingScalarWhereWithAggregatesInput | SettingScalarWhereWithAggregatesInput[]
    OR?: SettingScalarWhereWithAggregatesInput[]
    NOT?: SettingScalarWhereWithAggregatesInput | SettingScalarWhereWithAggregatesInput[]
    key?: StringWithAggregatesFilter<"Setting"> | string
    value?: JsonWithAggregatesFilter<"Setting">
    updatedAt?: DateTimeWithAggregatesFilter<"Setting"> | Date | string
  }

  export type StaffCreateInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role?: $Enums.StaffRole
    isActive?: boolean
    createdAt?: Date | string
    sessions?: CashierSessionCreateNestedManyWithoutStaffInput
    orders?: OrderCreateNestedManyWithoutStaffInput
  }

  export type StaffUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role?: $Enums.StaffRole
    isActive?: boolean
    createdAt?: Date | string
    sessions?: CashierSessionUncheckedCreateNestedManyWithoutStaffInput
    orders?: OrderUncheckedCreateNestedManyWithoutStaffInput
  }

  export type StaffUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumStaffRoleFieldUpdateOperationsInput | $Enums.StaffRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: CashierSessionUpdateManyWithoutStaffNestedInput
    orders?: OrderUpdateManyWithoutStaffNestedInput
  }

  export type StaffUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumStaffRoleFieldUpdateOperationsInput | $Enums.StaffRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: CashierSessionUncheckedUpdateManyWithoutStaffNestedInput
    orders?: OrderUncheckedUpdateManyWithoutStaffNestedInput
  }

  export type StaffCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role?: $Enums.StaffRole
    isActive?: boolean
    createdAt?: Date | string
  }

  export type StaffUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumStaffRoleFieldUpdateOperationsInput | $Enums.StaffRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumStaffRoleFieldUpdateOperationsInput | $Enums.StaffRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    id?: string
    name: string
    image?: string | null
    sortOrder?: number
    isActive?: boolean
    createdAt?: Date | string
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    name: string
    image?: string | null
    sortOrder?: number
    isActive?: boolean
    createdAt?: Date | string
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: string
    name: string
    image?: string | null
    sortOrder?: number
    isActive?: boolean
    createdAt?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExtraCreateInput = {
    id?: string
    name: string
    image?: string | null
    price?: number
    suppPrice?: number
    outOfStock?: boolean
    visible?: boolean
    sortOrder?: number
    createdAt?: Date | string
    typeLinks?: CompositionTypeExtraCreateNestedManyWithoutExtraInput
  }

  export type ExtraUncheckedCreateInput = {
    id?: string
    name: string
    image?: string | null
    price?: number
    suppPrice?: number
    outOfStock?: boolean
    visible?: boolean
    sortOrder?: number
    createdAt?: Date | string
    typeLinks?: CompositionTypeExtraUncheckedCreateNestedManyWithoutExtraInput
  }

  export type ExtraUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    suppPrice?: IntFieldUpdateOperationsInput | number
    outOfStock?: BoolFieldUpdateOperationsInput | boolean
    visible?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    typeLinks?: CompositionTypeExtraUpdateManyWithoutExtraNestedInput
  }

  export type ExtraUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    suppPrice?: IntFieldUpdateOperationsInput | number
    outOfStock?: BoolFieldUpdateOperationsInput | boolean
    visible?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    typeLinks?: CompositionTypeExtraUncheckedUpdateManyWithoutExtraNestedInput
  }

  export type ExtraCreateManyInput = {
    id?: string
    name: string
    image?: string | null
    price?: number
    suppPrice?: number
    outOfStock?: boolean
    visible?: boolean
    sortOrder?: number
    createdAt?: Date | string
  }

  export type ExtraUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    suppPrice?: IntFieldUpdateOperationsInput | number
    outOfStock?: BoolFieldUpdateOperationsInput | boolean
    visible?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExtraUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    suppPrice?: IntFieldUpdateOperationsInput | number
    outOfStock?: BoolFieldUpdateOperationsInput | boolean
    visible?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompositionTypeCreateInput = {
    id?: string
    name: string
    label: string
    message?: string | null
    min?: number
    max?: number
    payment?: boolean
    selection?: boolean
    mode?: $Enums.CompositionSlotMode
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    extras?: CompositionTypeExtraCreateNestedManyWithoutCompositionTypeInput
    productSteps?: ProductCompositionCreateNestedManyWithoutCompositionTypeInput
  }

  export type CompositionTypeUncheckedCreateInput = {
    id?: string
    name: string
    label: string
    message?: string | null
    min?: number
    max?: number
    payment?: boolean
    selection?: boolean
    mode?: $Enums.CompositionSlotMode
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    extras?: CompositionTypeExtraUncheckedCreateNestedManyWithoutCompositionTypeInput
    productSteps?: ProductCompositionUncheckedCreateNestedManyWithoutCompositionTypeInput
  }

  export type CompositionTypeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    min?: IntFieldUpdateOperationsInput | number
    max?: IntFieldUpdateOperationsInput | number
    payment?: BoolFieldUpdateOperationsInput | boolean
    selection?: BoolFieldUpdateOperationsInput | boolean
    mode?: EnumCompositionSlotModeFieldUpdateOperationsInput | $Enums.CompositionSlotMode
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    extras?: CompositionTypeExtraUpdateManyWithoutCompositionTypeNestedInput
    productSteps?: ProductCompositionUpdateManyWithoutCompositionTypeNestedInput
  }

  export type CompositionTypeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    min?: IntFieldUpdateOperationsInput | number
    max?: IntFieldUpdateOperationsInput | number
    payment?: BoolFieldUpdateOperationsInput | boolean
    selection?: BoolFieldUpdateOperationsInput | boolean
    mode?: EnumCompositionSlotModeFieldUpdateOperationsInput | $Enums.CompositionSlotMode
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    extras?: CompositionTypeExtraUncheckedUpdateManyWithoutCompositionTypeNestedInput
    productSteps?: ProductCompositionUncheckedUpdateManyWithoutCompositionTypeNestedInput
  }

  export type CompositionTypeCreateManyInput = {
    id?: string
    name: string
    label: string
    message?: string | null
    min?: number
    max?: number
    payment?: boolean
    selection?: boolean
    mode?: $Enums.CompositionSlotMode
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
  }

  export type CompositionTypeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    min?: IntFieldUpdateOperationsInput | number
    max?: IntFieldUpdateOperationsInput | number
    payment?: BoolFieldUpdateOperationsInput | boolean
    selection?: BoolFieldUpdateOperationsInput | boolean
    mode?: EnumCompositionSlotModeFieldUpdateOperationsInput | $Enums.CompositionSlotMode
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompositionTypeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    min?: IntFieldUpdateOperationsInput | number
    max?: IntFieldUpdateOperationsInput | number
    payment?: BoolFieldUpdateOperationsInput | boolean
    selection?: BoolFieldUpdateOperationsInput | boolean
    mode?: EnumCompositionSlotModeFieldUpdateOperationsInput | $Enums.CompositionSlotMode
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompositionTypeExtraCreateInput = {
    position?: number
    compositionType: CompositionTypeCreateNestedOneWithoutExtrasInput
    extra: ExtraCreateNestedOneWithoutTypeLinksInput
  }

  export type CompositionTypeExtraUncheckedCreateInput = {
    compositionTypeId: string
    extraId: string
    position?: number
  }

  export type CompositionTypeExtraUpdateInput = {
    position?: IntFieldUpdateOperationsInput | number
    compositionType?: CompositionTypeUpdateOneRequiredWithoutExtrasNestedInput
    extra?: ExtraUpdateOneRequiredWithoutTypeLinksNestedInput
  }

  export type CompositionTypeExtraUncheckedUpdateInput = {
    compositionTypeId?: StringFieldUpdateOperationsInput | string
    extraId?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
  }

  export type CompositionTypeExtraCreateManyInput = {
    compositionTypeId: string
    extraId: string
    position?: number
  }

  export type CompositionTypeExtraUpdateManyMutationInput = {
    position?: IntFieldUpdateOperationsInput | number
  }

  export type CompositionTypeExtraUncheckedUpdateManyInput = {
    compositionTypeId?: StringFieldUpdateOperationsInput | string
    extraId?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
  }

  export type ProductCompositionCreateInput = {
    sortOrder?: number
    product: ProductCreateNestedOneWithoutCompositionsInput
    compositionType: CompositionTypeCreateNestedOneWithoutProductStepsInput
  }

  export type ProductCompositionUncheckedCreateInput = {
    productId: string
    compositionTypeId: string
    sortOrder?: number
  }

  export type ProductCompositionUpdateInput = {
    sortOrder?: IntFieldUpdateOperationsInput | number
    product?: ProductUpdateOneRequiredWithoutCompositionsNestedInput
    compositionType?: CompositionTypeUpdateOneRequiredWithoutProductStepsNestedInput
  }

  export type ProductCompositionUncheckedUpdateInput = {
    productId?: StringFieldUpdateOperationsInput | string
    compositionTypeId?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ProductCompositionCreateManyInput = {
    productId: string
    compositionTypeId: string
    sortOrder?: number
  }

  export type ProductCompositionUpdateManyMutationInput = {
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ProductCompositionUncheckedUpdateManyInput = {
    productId?: StringFieldUpdateOperationsInput | string
    compositionTypeId?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ProductCreateInput = {
    id?: string
    name: string
    description?: string | null
    image?: string | null
    kind?: $Enums.ProductKind
    price: number
    formulePrice?: number
    taxRateBps?: number | null
    modifiers?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    outOfStock?: boolean
    sortOrder?: number
    discountValue?: number
    originalPrice?: number | null
    discountStartDate?: Date | string | null
    discountEndDate?: Date | string | null
    createdAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    compositions?: ProductCompositionCreateNestedManyWithoutProductInput
    orderLines?: OrderLineCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    categoryId: string
    name: string
    description?: string | null
    image?: string | null
    kind?: $Enums.ProductKind
    price: number
    formulePrice?: number
    taxRateBps?: number | null
    modifiers?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    outOfStock?: boolean
    sortOrder?: number
    discountValue?: number
    originalPrice?: number | null
    discountStartDate?: Date | string | null
    discountEndDate?: Date | string | null
    createdAt?: Date | string
    compositions?: ProductCompositionUncheckedCreateNestedManyWithoutProductInput
    orderLines?: OrderLineUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: EnumProductKindFieldUpdateOperationsInput | $Enums.ProductKind
    price?: IntFieldUpdateOperationsInput | number
    formulePrice?: IntFieldUpdateOperationsInput | number
    taxRateBps?: NullableIntFieldUpdateOperationsInput | number | null
    modifiers?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    outOfStock?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    discountValue?: IntFieldUpdateOperationsInput | number
    originalPrice?: NullableIntFieldUpdateOperationsInput | number | null
    discountStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discountEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    compositions?: ProductCompositionUpdateManyWithoutProductNestedInput
    orderLines?: OrderLineUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: EnumProductKindFieldUpdateOperationsInput | $Enums.ProductKind
    price?: IntFieldUpdateOperationsInput | number
    formulePrice?: IntFieldUpdateOperationsInput | number
    taxRateBps?: NullableIntFieldUpdateOperationsInput | number | null
    modifiers?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    outOfStock?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    discountValue?: IntFieldUpdateOperationsInput | number
    originalPrice?: NullableIntFieldUpdateOperationsInput | number | null
    discountStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discountEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    compositions?: ProductCompositionUncheckedUpdateManyWithoutProductNestedInput
    orderLines?: OrderLineUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    categoryId: string
    name: string
    description?: string | null
    image?: string | null
    kind?: $Enums.ProductKind
    price: number
    formulePrice?: number
    taxRateBps?: number | null
    modifiers?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    outOfStock?: boolean
    sortOrder?: number
    discountValue?: number
    originalPrice?: number | null
    discountStartDate?: Date | string | null
    discountEndDate?: Date | string | null
    createdAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: EnumProductKindFieldUpdateOperationsInput | $Enums.ProductKind
    price?: IntFieldUpdateOperationsInput | number
    formulePrice?: IntFieldUpdateOperationsInput | number
    taxRateBps?: NullableIntFieldUpdateOperationsInput | number | null
    modifiers?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    outOfStock?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    discountValue?: IntFieldUpdateOperationsInput | number
    originalPrice?: NullableIntFieldUpdateOperationsInput | number | null
    discountStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discountEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: EnumProductKindFieldUpdateOperationsInput | $Enums.ProductKind
    price?: IntFieldUpdateOperationsInput | number
    formulePrice?: IntFieldUpdateOperationsInput | number
    taxRateBps?: NullableIntFieldUpdateOperationsInput | number | null
    modifiers?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    outOfStock?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    discountValue?: IntFieldUpdateOperationsInput | number
    originalPrice?: NullableIntFieldUpdateOperationsInput | number | null
    discountStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discountEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RestaurantTableCreateInput = {
    id?: string
    name: string
    zone?: string | null
    sortOrder?: number
    isActive?: boolean
    createdAt?: Date | string
    orders?: OrderCreateNestedManyWithoutTableInput
  }

  export type RestaurantTableUncheckedCreateInput = {
    id?: string
    name: string
    zone?: string | null
    sortOrder?: number
    isActive?: boolean
    createdAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutTableInput
  }

  export type RestaurantTableUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    zone?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutTableNestedInput
  }

  export type RestaurantTableUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    zone?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutTableNestedInput
  }

  export type RestaurantTableCreateManyInput = {
    id?: string
    name: string
    zone?: string | null
    sortOrder?: number
    isActive?: boolean
    createdAt?: Date | string
  }

  export type RestaurantTableUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    zone?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RestaurantTableUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    zone?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CashierSessionCreateInput = {
    id?: string
    openedAt?: Date | string
    closedAt?: Date | string | null
    openingFloatCents?: number
    closingNote?: string | null
    staff: StaffCreateNestedOneWithoutSessionsInput
    orders?: OrderCreateNestedManyWithoutSessionInput
  }

  export type CashierSessionUncheckedCreateInput = {
    id?: string
    staffId: string
    openedAt?: Date | string
    closedAt?: Date | string | null
    openingFloatCents?: number
    closingNote?: string | null
    orders?: OrderUncheckedCreateNestedManyWithoutSessionInput
  }

  export type CashierSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openingFloatCents?: IntFieldUpdateOperationsInput | number
    closingNote?: NullableStringFieldUpdateOperationsInput | string | null
    staff?: StaffUpdateOneRequiredWithoutSessionsNestedInput
    orders?: OrderUpdateManyWithoutSessionNestedInput
  }

  export type CashierSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openingFloatCents?: IntFieldUpdateOperationsInput | number
    closingNote?: NullableStringFieldUpdateOperationsInput | string | null
    orders?: OrderUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type CashierSessionCreateManyInput = {
    id?: string
    staffId: string
    openedAt?: Date | string
    closedAt?: Date | string | null
    openingFloatCents?: number
    closingNote?: string | null
  }

  export type CashierSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openingFloatCents?: IntFieldUpdateOperationsInput | number
    closingNote?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CashierSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openingFloatCents?: IntFieldUpdateOperationsInput | number
    closingNote?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderCreateInput = {
    id?: string
    status?: $Enums.OrderStatus
    subtotalCents?: number
    taxCents?: number
    totalCents?: number
    idempotencyKey?: string | null
    customerName?: string | null
    customerEmail?: string | null
    commandNumber?: number | null
    currency?: string | null
    pack?: NullableJsonNullValueInput | InputJsonValue
    paymentMethod?: NullableJsonNullValueInput | InputJsonValue
    orderDiscountValue?: number
    logoPath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    table?: RestaurantTableCreateNestedOneWithoutOrdersInput
    staff?: StaffCreateNestedOneWithoutOrdersInput
    session?: CashierSessionCreateNestedOneWithoutOrdersInput
    lines?: OrderLineCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id?: string
    status?: $Enums.OrderStatus
    tableId?: string | null
    staffId?: string | null
    sessionId?: string | null
    subtotalCents?: number
    taxCents?: number
    totalCents?: number
    idempotencyKey?: string | null
    customerName?: string | null
    customerEmail?: string | null
    commandNumber?: number | null
    currency?: string | null
    pack?: NullableJsonNullValueInput | InputJsonValue
    paymentMethod?: NullableJsonNullValueInput | InputJsonValue
    orderDiscountValue?: number
    logoPath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lines?: OrderLineUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    subtotalCents?: IntFieldUpdateOperationsInput | number
    taxCents?: IntFieldUpdateOperationsInput | number
    totalCents?: IntFieldUpdateOperationsInput | number
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    commandNumber?: NullableIntFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    pack?: NullableJsonNullValueInput | InputJsonValue
    paymentMethod?: NullableJsonNullValueInput | InputJsonValue
    orderDiscountValue?: IntFieldUpdateOperationsInput | number
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    table?: RestaurantTableUpdateOneWithoutOrdersNestedInput
    staff?: StaffUpdateOneWithoutOrdersNestedInput
    session?: CashierSessionUpdateOneWithoutOrdersNestedInput
    lines?: OrderLineUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    tableId?: NullableStringFieldUpdateOperationsInput | string | null
    staffId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    subtotalCents?: IntFieldUpdateOperationsInput | number
    taxCents?: IntFieldUpdateOperationsInput | number
    totalCents?: IntFieldUpdateOperationsInput | number
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    commandNumber?: NullableIntFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    pack?: NullableJsonNullValueInput | InputJsonValue
    paymentMethod?: NullableJsonNullValueInput | InputJsonValue
    orderDiscountValue?: IntFieldUpdateOperationsInput | number
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lines?: OrderLineUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    id?: string
    status?: $Enums.OrderStatus
    tableId?: string | null
    staffId?: string | null
    sessionId?: string | null
    subtotalCents?: number
    taxCents?: number
    totalCents?: number
    idempotencyKey?: string | null
    customerName?: string | null
    customerEmail?: string | null
    commandNumber?: number | null
    currency?: string | null
    pack?: NullableJsonNullValueInput | InputJsonValue
    paymentMethod?: NullableJsonNullValueInput | InputJsonValue
    orderDiscountValue?: number
    logoPath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    subtotalCents?: IntFieldUpdateOperationsInput | number
    taxCents?: IntFieldUpdateOperationsInput | number
    totalCents?: IntFieldUpdateOperationsInput | number
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    commandNumber?: NullableIntFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    pack?: NullableJsonNullValueInput | InputJsonValue
    paymentMethod?: NullableJsonNullValueInput | InputJsonValue
    orderDiscountValue?: IntFieldUpdateOperationsInput | number
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    tableId?: NullableStringFieldUpdateOperationsInput | string | null
    staffId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    subtotalCents?: IntFieldUpdateOperationsInput | number
    taxCents?: IntFieldUpdateOperationsInput | number
    totalCents?: IntFieldUpdateOperationsInput | number
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    commandNumber?: NullableIntFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    pack?: NullableJsonNullValueInput | InputJsonValue
    paymentMethod?: NullableJsonNullValueInput | InputJsonValue
    orderDiscountValue?: IntFieldUpdateOperationsInput | number
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderLineCreateInput = {
    id?: string
    quantity: number
    unitPriceCents: number
    lineTotalCents: number
    taxCents?: number
    modifiersSnapshot?: NullableJsonNullValueInput | InputJsonValue
    compositionSnapshot?: NullableJsonNullValueInput | InputJsonValue
    note?: string | null
    order: OrderCreateNestedOneWithoutLinesInput
    product: ProductCreateNestedOneWithoutOrderLinesInput
  }

  export type OrderLineUncheckedCreateInput = {
    id?: string
    orderId: string
    productId: string
    quantity: number
    unitPriceCents: number
    lineTotalCents: number
    taxCents?: number
    modifiersSnapshot?: NullableJsonNullValueInput | InputJsonValue
    compositionSnapshot?: NullableJsonNullValueInput | InputJsonValue
    note?: string | null
  }

  export type OrderLineUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPriceCents?: IntFieldUpdateOperationsInput | number
    lineTotalCents?: IntFieldUpdateOperationsInput | number
    taxCents?: IntFieldUpdateOperationsInput | number
    modifiersSnapshot?: NullableJsonNullValueInput | InputJsonValue
    compositionSnapshot?: NullableJsonNullValueInput | InputJsonValue
    note?: NullableStringFieldUpdateOperationsInput | string | null
    order?: OrderUpdateOneRequiredWithoutLinesNestedInput
    product?: ProductUpdateOneRequiredWithoutOrderLinesNestedInput
  }

  export type OrderLineUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPriceCents?: IntFieldUpdateOperationsInput | number
    lineTotalCents?: IntFieldUpdateOperationsInput | number
    taxCents?: IntFieldUpdateOperationsInput | number
    modifiersSnapshot?: NullableJsonNullValueInput | InputJsonValue
    compositionSnapshot?: NullableJsonNullValueInput | InputJsonValue
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderLineCreateManyInput = {
    id?: string
    orderId: string
    productId: string
    quantity: number
    unitPriceCents: number
    lineTotalCents: number
    taxCents?: number
    modifiersSnapshot?: NullableJsonNullValueInput | InputJsonValue
    compositionSnapshot?: NullableJsonNullValueInput | InputJsonValue
    note?: string | null
  }

  export type OrderLineUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPriceCents?: IntFieldUpdateOperationsInput | number
    lineTotalCents?: IntFieldUpdateOperationsInput | number
    taxCents?: IntFieldUpdateOperationsInput | number
    modifiersSnapshot?: NullableJsonNullValueInput | InputJsonValue
    compositionSnapshot?: NullableJsonNullValueInput | InputJsonValue
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderLineUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPriceCents?: IntFieldUpdateOperationsInput | number
    lineTotalCents?: IntFieldUpdateOperationsInput | number
    taxCents?: IntFieldUpdateOperationsInput | number
    modifiersSnapshot?: NullableJsonNullValueInput | InputJsonValue
    compositionSnapshot?: NullableJsonNullValueInput | InputJsonValue
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SettingCreateInput = {
    key: string
    value: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
  }

  export type SettingUncheckedCreateInput = {
    key: string
    value: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
  }

  export type SettingUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingUncheckedUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingCreateManyInput = {
    key: string
    value: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
  }

  export type SettingUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingUncheckedUpdateManyInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumStaffRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.StaffRole | EnumStaffRoleFieldRefInput<$PrismaModel>
    in?: $Enums.StaffRole[] | ListEnumStaffRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.StaffRole[] | ListEnumStaffRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumStaffRoleFilter<$PrismaModel> | $Enums.StaffRole
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CashierSessionListRelationFilter = {
    every?: CashierSessionWhereInput
    some?: CashierSessionWhereInput
    none?: CashierSessionWhereInput
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type CashierSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StaffCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type StaffMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type StaffMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumStaffRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StaffRole | EnumStaffRoleFieldRefInput<$PrismaModel>
    in?: $Enums.StaffRole[] | ListEnumStaffRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.StaffRole[] | ListEnumStaffRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumStaffRoleWithAggregatesFilter<$PrismaModel> | $Enums.StaffRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStaffRoleFilter<$PrismaModel>
    _max?: NestedEnumStaffRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    image?: SortOrder
    sortOrder?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type CategoryAvgOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    image?: SortOrder
    sortOrder?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    image?: SortOrder
    sortOrder?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type CategorySumOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type CompositionTypeExtraListRelationFilter = {
    every?: CompositionTypeExtraWhereInput
    some?: CompositionTypeExtraWhereInput
    none?: CompositionTypeExtraWhereInput
  }

  export type CompositionTypeExtraOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExtraCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    image?: SortOrder
    price?: SortOrder
    suppPrice?: SortOrder
    outOfStock?: SortOrder
    visible?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type ExtraAvgOrderByAggregateInput = {
    price?: SortOrder
    suppPrice?: SortOrder
    sortOrder?: SortOrder
  }

  export type ExtraMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    image?: SortOrder
    price?: SortOrder
    suppPrice?: SortOrder
    outOfStock?: SortOrder
    visible?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type ExtraMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    image?: SortOrder
    price?: SortOrder
    suppPrice?: SortOrder
    outOfStock?: SortOrder
    visible?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type ExtraSumOrderByAggregateInput = {
    price?: SortOrder
    suppPrice?: SortOrder
    sortOrder?: SortOrder
  }

  export type EnumCompositionSlotModeFilter<$PrismaModel = never> = {
    equals?: $Enums.CompositionSlotMode | EnumCompositionSlotModeFieldRefInput<$PrismaModel>
    in?: $Enums.CompositionSlotMode[] | ListEnumCompositionSlotModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CompositionSlotMode[] | ListEnumCompositionSlotModeFieldRefInput<$PrismaModel>
    not?: NestedEnumCompositionSlotModeFilter<$PrismaModel> | $Enums.CompositionSlotMode
  }

  export type ProductCompositionListRelationFilter = {
    every?: ProductCompositionWhereInput
    some?: ProductCompositionWhereInput
    none?: ProductCompositionWhereInput
  }

  export type ProductCompositionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompositionTypeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    label?: SortOrder
    message?: SortOrder
    min?: SortOrder
    max?: SortOrder
    payment?: SortOrder
    selection?: SortOrder
    mode?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type CompositionTypeAvgOrderByAggregateInput = {
    min?: SortOrder
    max?: SortOrder
    sortOrder?: SortOrder
  }

  export type CompositionTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    label?: SortOrder
    message?: SortOrder
    min?: SortOrder
    max?: SortOrder
    payment?: SortOrder
    selection?: SortOrder
    mode?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type CompositionTypeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    label?: SortOrder
    message?: SortOrder
    min?: SortOrder
    max?: SortOrder
    payment?: SortOrder
    selection?: SortOrder
    mode?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type CompositionTypeSumOrderByAggregateInput = {
    min?: SortOrder
    max?: SortOrder
    sortOrder?: SortOrder
  }

  export type EnumCompositionSlotModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CompositionSlotMode | EnumCompositionSlotModeFieldRefInput<$PrismaModel>
    in?: $Enums.CompositionSlotMode[] | ListEnumCompositionSlotModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CompositionSlotMode[] | ListEnumCompositionSlotModeFieldRefInput<$PrismaModel>
    not?: NestedEnumCompositionSlotModeWithAggregatesFilter<$PrismaModel> | $Enums.CompositionSlotMode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCompositionSlotModeFilter<$PrismaModel>
    _max?: NestedEnumCompositionSlotModeFilter<$PrismaModel>
  }

  export type CompositionTypeRelationFilter = {
    is?: CompositionTypeWhereInput
    isNot?: CompositionTypeWhereInput
  }

  export type ExtraRelationFilter = {
    is?: ExtraWhereInput
    isNot?: ExtraWhereInput
  }

  export type CompositionTypeExtraCompositionTypeIdExtraIdCompoundUniqueInput = {
    compositionTypeId: string
    extraId: string
  }

  export type CompositionTypeExtraCountOrderByAggregateInput = {
    compositionTypeId?: SortOrder
    extraId?: SortOrder
    position?: SortOrder
  }

  export type CompositionTypeExtraAvgOrderByAggregateInput = {
    position?: SortOrder
  }

  export type CompositionTypeExtraMaxOrderByAggregateInput = {
    compositionTypeId?: SortOrder
    extraId?: SortOrder
    position?: SortOrder
  }

  export type CompositionTypeExtraMinOrderByAggregateInput = {
    compositionTypeId?: SortOrder
    extraId?: SortOrder
    position?: SortOrder
  }

  export type CompositionTypeExtraSumOrderByAggregateInput = {
    position?: SortOrder
  }

  export type ProductRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type ProductCompositionProductIdSortOrderCompoundUniqueInput = {
    productId: string
    sortOrder: number
  }

  export type ProductCompositionProductIdCompositionTypeIdCompoundUniqueInput = {
    productId: string
    compositionTypeId: string
  }

  export type ProductCompositionCountOrderByAggregateInput = {
    productId?: SortOrder
    compositionTypeId?: SortOrder
    sortOrder?: SortOrder
  }

  export type ProductCompositionAvgOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type ProductCompositionMaxOrderByAggregateInput = {
    productId?: SortOrder
    compositionTypeId?: SortOrder
    sortOrder?: SortOrder
  }

  export type ProductCompositionMinOrderByAggregateInput = {
    productId?: SortOrder
    compositionTypeId?: SortOrder
    sortOrder?: SortOrder
  }

  export type ProductCompositionSumOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type EnumProductKindFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductKind | EnumProductKindFieldRefInput<$PrismaModel>
    in?: $Enums.ProductKind[] | ListEnumProductKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductKind[] | ListEnumProductKindFieldRefInput<$PrismaModel>
    not?: NestedEnumProductKindFilter<$PrismaModel> | $Enums.ProductKind
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type CategoryRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type OrderLineListRelationFilter = {
    every?: OrderLineWhereInput
    some?: OrderLineWhereInput
    none?: OrderLineWhereInput
  }

  export type OrderLineOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    image?: SortOrder
    kind?: SortOrder
    price?: SortOrder
    formulePrice?: SortOrder
    taxRateBps?: SortOrder
    modifiers?: SortOrder
    isActive?: SortOrder
    outOfStock?: SortOrder
    sortOrder?: SortOrder
    discountValue?: SortOrder
    originalPrice?: SortOrder
    discountStartDate?: SortOrder
    discountEndDate?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    price?: SortOrder
    formulePrice?: SortOrder
    taxRateBps?: SortOrder
    sortOrder?: SortOrder
    discountValue?: SortOrder
    originalPrice?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    image?: SortOrder
    kind?: SortOrder
    price?: SortOrder
    formulePrice?: SortOrder
    taxRateBps?: SortOrder
    isActive?: SortOrder
    outOfStock?: SortOrder
    sortOrder?: SortOrder
    discountValue?: SortOrder
    originalPrice?: SortOrder
    discountStartDate?: SortOrder
    discountEndDate?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    image?: SortOrder
    kind?: SortOrder
    price?: SortOrder
    formulePrice?: SortOrder
    taxRateBps?: SortOrder
    isActive?: SortOrder
    outOfStock?: SortOrder
    sortOrder?: SortOrder
    discountValue?: SortOrder
    originalPrice?: SortOrder
    discountStartDate?: SortOrder
    discountEndDate?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    price?: SortOrder
    formulePrice?: SortOrder
    taxRateBps?: SortOrder
    sortOrder?: SortOrder
    discountValue?: SortOrder
    originalPrice?: SortOrder
  }

  export type EnumProductKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductKind | EnumProductKindFieldRefInput<$PrismaModel>
    in?: $Enums.ProductKind[] | ListEnumProductKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductKind[] | ListEnumProductKindFieldRefInput<$PrismaModel>
    not?: NestedEnumProductKindWithAggregatesFilter<$PrismaModel> | $Enums.ProductKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProductKindFilter<$PrismaModel>
    _max?: NestedEnumProductKindFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type RestaurantTableCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    zone?: SortOrder
    sortOrder?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type RestaurantTableAvgOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type RestaurantTableMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    zone?: SortOrder
    sortOrder?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type RestaurantTableMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    zone?: SortOrder
    sortOrder?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type RestaurantTableSumOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type StaffRelationFilter = {
    is?: StaffWhereInput
    isNot?: StaffWhereInput
  }

  export type CashierSessionCountOrderByAggregateInput = {
    id?: SortOrder
    staffId?: SortOrder
    openedAt?: SortOrder
    closedAt?: SortOrder
    openingFloatCents?: SortOrder
    closingNote?: SortOrder
  }

  export type CashierSessionAvgOrderByAggregateInput = {
    openingFloatCents?: SortOrder
  }

  export type CashierSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    staffId?: SortOrder
    openedAt?: SortOrder
    closedAt?: SortOrder
    openingFloatCents?: SortOrder
    closingNote?: SortOrder
  }

  export type CashierSessionMinOrderByAggregateInput = {
    id?: SortOrder
    staffId?: SortOrder
    openedAt?: SortOrder
    closedAt?: SortOrder
    openingFloatCents?: SortOrder
    closingNote?: SortOrder
  }

  export type CashierSessionSumOrderByAggregateInput = {
    openingFloatCents?: SortOrder
  }

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type RestaurantTableNullableRelationFilter = {
    is?: RestaurantTableWhereInput | null
    isNot?: RestaurantTableWhereInput | null
  }

  export type StaffNullableRelationFilter = {
    is?: StaffWhereInput | null
    isNot?: StaffWhereInput | null
  }

  export type CashierSessionNullableRelationFilter = {
    is?: CashierSessionWhereInput | null
    isNot?: CashierSessionWhereInput | null
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    tableId?: SortOrder
    staffId?: SortOrder
    sessionId?: SortOrder
    subtotalCents?: SortOrder
    taxCents?: SortOrder
    totalCents?: SortOrder
    idempotencyKey?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    commandNumber?: SortOrder
    currency?: SortOrder
    pack?: SortOrder
    paymentMethod?: SortOrder
    orderDiscountValue?: SortOrder
    logoPath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    subtotalCents?: SortOrder
    taxCents?: SortOrder
    totalCents?: SortOrder
    commandNumber?: SortOrder
    orderDiscountValue?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    tableId?: SortOrder
    staffId?: SortOrder
    sessionId?: SortOrder
    subtotalCents?: SortOrder
    taxCents?: SortOrder
    totalCents?: SortOrder
    idempotencyKey?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    commandNumber?: SortOrder
    currency?: SortOrder
    orderDiscountValue?: SortOrder
    logoPath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    tableId?: SortOrder
    staffId?: SortOrder
    sessionId?: SortOrder
    subtotalCents?: SortOrder
    taxCents?: SortOrder
    totalCents?: SortOrder
    idempotencyKey?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    commandNumber?: SortOrder
    currency?: SortOrder
    orderDiscountValue?: SortOrder
    logoPath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    subtotalCents?: SortOrder
    taxCents?: SortOrder
    totalCents?: SortOrder
    commandNumber?: SortOrder
    orderDiscountValue?: SortOrder
  }

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type OrderRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type OrderLineCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    unitPriceCents?: SortOrder
    lineTotalCents?: SortOrder
    taxCents?: SortOrder
    modifiersSnapshot?: SortOrder
    compositionSnapshot?: SortOrder
    note?: SortOrder
  }

  export type OrderLineAvgOrderByAggregateInput = {
    quantity?: SortOrder
    unitPriceCents?: SortOrder
    lineTotalCents?: SortOrder
    taxCents?: SortOrder
  }

  export type OrderLineMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    unitPriceCents?: SortOrder
    lineTotalCents?: SortOrder
    taxCents?: SortOrder
    note?: SortOrder
  }

  export type OrderLineMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    unitPriceCents?: SortOrder
    lineTotalCents?: SortOrder
    taxCents?: SortOrder
    note?: SortOrder
  }

  export type OrderLineSumOrderByAggregateInput = {
    quantity?: SortOrder
    unitPriceCents?: SortOrder
    lineTotalCents?: SortOrder
    taxCents?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SettingCountOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingMaxOrderByAggregateInput = {
    key?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingMinOrderByAggregateInput = {
    key?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type CashierSessionCreateNestedManyWithoutStaffInput = {
    create?: XOR<CashierSessionCreateWithoutStaffInput, CashierSessionUncheckedCreateWithoutStaffInput> | CashierSessionCreateWithoutStaffInput[] | CashierSessionUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: CashierSessionCreateOrConnectWithoutStaffInput | CashierSessionCreateOrConnectWithoutStaffInput[]
    createMany?: CashierSessionCreateManyStaffInputEnvelope
    connect?: CashierSessionWhereUniqueInput | CashierSessionWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutStaffInput = {
    create?: XOR<OrderCreateWithoutStaffInput, OrderUncheckedCreateWithoutStaffInput> | OrderCreateWithoutStaffInput[] | OrderUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutStaffInput | OrderCreateOrConnectWithoutStaffInput[]
    createMany?: OrderCreateManyStaffInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type CashierSessionUncheckedCreateNestedManyWithoutStaffInput = {
    create?: XOR<CashierSessionCreateWithoutStaffInput, CashierSessionUncheckedCreateWithoutStaffInput> | CashierSessionCreateWithoutStaffInput[] | CashierSessionUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: CashierSessionCreateOrConnectWithoutStaffInput | CashierSessionCreateOrConnectWithoutStaffInput[]
    createMany?: CashierSessionCreateManyStaffInputEnvelope
    connect?: CashierSessionWhereUniqueInput | CashierSessionWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutStaffInput = {
    create?: XOR<OrderCreateWithoutStaffInput, OrderUncheckedCreateWithoutStaffInput> | OrderCreateWithoutStaffInput[] | OrderUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutStaffInput | OrderCreateOrConnectWithoutStaffInput[]
    createMany?: OrderCreateManyStaffInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumStaffRoleFieldUpdateOperationsInput = {
    set?: $Enums.StaffRole
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CashierSessionUpdateManyWithoutStaffNestedInput = {
    create?: XOR<CashierSessionCreateWithoutStaffInput, CashierSessionUncheckedCreateWithoutStaffInput> | CashierSessionCreateWithoutStaffInput[] | CashierSessionUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: CashierSessionCreateOrConnectWithoutStaffInput | CashierSessionCreateOrConnectWithoutStaffInput[]
    upsert?: CashierSessionUpsertWithWhereUniqueWithoutStaffInput | CashierSessionUpsertWithWhereUniqueWithoutStaffInput[]
    createMany?: CashierSessionCreateManyStaffInputEnvelope
    set?: CashierSessionWhereUniqueInput | CashierSessionWhereUniqueInput[]
    disconnect?: CashierSessionWhereUniqueInput | CashierSessionWhereUniqueInput[]
    delete?: CashierSessionWhereUniqueInput | CashierSessionWhereUniqueInput[]
    connect?: CashierSessionWhereUniqueInput | CashierSessionWhereUniqueInput[]
    update?: CashierSessionUpdateWithWhereUniqueWithoutStaffInput | CashierSessionUpdateWithWhereUniqueWithoutStaffInput[]
    updateMany?: CashierSessionUpdateManyWithWhereWithoutStaffInput | CashierSessionUpdateManyWithWhereWithoutStaffInput[]
    deleteMany?: CashierSessionScalarWhereInput | CashierSessionScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutStaffNestedInput = {
    create?: XOR<OrderCreateWithoutStaffInput, OrderUncheckedCreateWithoutStaffInput> | OrderCreateWithoutStaffInput[] | OrderUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutStaffInput | OrderCreateOrConnectWithoutStaffInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutStaffInput | OrderUpsertWithWhereUniqueWithoutStaffInput[]
    createMany?: OrderCreateManyStaffInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutStaffInput | OrderUpdateWithWhereUniqueWithoutStaffInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutStaffInput | OrderUpdateManyWithWhereWithoutStaffInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type CashierSessionUncheckedUpdateManyWithoutStaffNestedInput = {
    create?: XOR<CashierSessionCreateWithoutStaffInput, CashierSessionUncheckedCreateWithoutStaffInput> | CashierSessionCreateWithoutStaffInput[] | CashierSessionUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: CashierSessionCreateOrConnectWithoutStaffInput | CashierSessionCreateOrConnectWithoutStaffInput[]
    upsert?: CashierSessionUpsertWithWhereUniqueWithoutStaffInput | CashierSessionUpsertWithWhereUniqueWithoutStaffInput[]
    createMany?: CashierSessionCreateManyStaffInputEnvelope
    set?: CashierSessionWhereUniqueInput | CashierSessionWhereUniqueInput[]
    disconnect?: CashierSessionWhereUniqueInput | CashierSessionWhereUniqueInput[]
    delete?: CashierSessionWhereUniqueInput | CashierSessionWhereUniqueInput[]
    connect?: CashierSessionWhereUniqueInput | CashierSessionWhereUniqueInput[]
    update?: CashierSessionUpdateWithWhereUniqueWithoutStaffInput | CashierSessionUpdateWithWhereUniqueWithoutStaffInput[]
    updateMany?: CashierSessionUpdateManyWithWhereWithoutStaffInput | CashierSessionUpdateManyWithWhereWithoutStaffInput[]
    deleteMany?: CashierSessionScalarWhereInput | CashierSessionScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutStaffNestedInput = {
    create?: XOR<OrderCreateWithoutStaffInput, OrderUncheckedCreateWithoutStaffInput> | OrderCreateWithoutStaffInput[] | OrderUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutStaffInput | OrderCreateOrConnectWithoutStaffInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutStaffInput | OrderUpsertWithWhereUniqueWithoutStaffInput[]
    createMany?: OrderCreateManyStaffInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutStaffInput | OrderUpdateWithWhereUniqueWithoutStaffInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutStaffInput | OrderUpdateManyWithWhereWithoutStaffInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type ProductCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProductUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type CompositionTypeExtraCreateNestedManyWithoutExtraInput = {
    create?: XOR<CompositionTypeExtraCreateWithoutExtraInput, CompositionTypeExtraUncheckedCreateWithoutExtraInput> | CompositionTypeExtraCreateWithoutExtraInput[] | CompositionTypeExtraUncheckedCreateWithoutExtraInput[]
    connectOrCreate?: CompositionTypeExtraCreateOrConnectWithoutExtraInput | CompositionTypeExtraCreateOrConnectWithoutExtraInput[]
    createMany?: CompositionTypeExtraCreateManyExtraInputEnvelope
    connect?: CompositionTypeExtraWhereUniqueInput | CompositionTypeExtraWhereUniqueInput[]
  }

  export type CompositionTypeExtraUncheckedCreateNestedManyWithoutExtraInput = {
    create?: XOR<CompositionTypeExtraCreateWithoutExtraInput, CompositionTypeExtraUncheckedCreateWithoutExtraInput> | CompositionTypeExtraCreateWithoutExtraInput[] | CompositionTypeExtraUncheckedCreateWithoutExtraInput[]
    connectOrCreate?: CompositionTypeExtraCreateOrConnectWithoutExtraInput | CompositionTypeExtraCreateOrConnectWithoutExtraInput[]
    createMany?: CompositionTypeExtraCreateManyExtraInputEnvelope
    connect?: CompositionTypeExtraWhereUniqueInput | CompositionTypeExtraWhereUniqueInput[]
  }

  export type CompositionTypeExtraUpdateManyWithoutExtraNestedInput = {
    create?: XOR<CompositionTypeExtraCreateWithoutExtraInput, CompositionTypeExtraUncheckedCreateWithoutExtraInput> | CompositionTypeExtraCreateWithoutExtraInput[] | CompositionTypeExtraUncheckedCreateWithoutExtraInput[]
    connectOrCreate?: CompositionTypeExtraCreateOrConnectWithoutExtraInput | CompositionTypeExtraCreateOrConnectWithoutExtraInput[]
    upsert?: CompositionTypeExtraUpsertWithWhereUniqueWithoutExtraInput | CompositionTypeExtraUpsertWithWhereUniqueWithoutExtraInput[]
    createMany?: CompositionTypeExtraCreateManyExtraInputEnvelope
    set?: CompositionTypeExtraWhereUniqueInput | CompositionTypeExtraWhereUniqueInput[]
    disconnect?: CompositionTypeExtraWhereUniqueInput | CompositionTypeExtraWhereUniqueInput[]
    delete?: CompositionTypeExtraWhereUniqueInput | CompositionTypeExtraWhereUniqueInput[]
    connect?: CompositionTypeExtraWhereUniqueInput | CompositionTypeExtraWhereUniqueInput[]
    update?: CompositionTypeExtraUpdateWithWhereUniqueWithoutExtraInput | CompositionTypeExtraUpdateWithWhereUniqueWithoutExtraInput[]
    updateMany?: CompositionTypeExtraUpdateManyWithWhereWithoutExtraInput | CompositionTypeExtraUpdateManyWithWhereWithoutExtraInput[]
    deleteMany?: CompositionTypeExtraScalarWhereInput | CompositionTypeExtraScalarWhereInput[]
  }

  export type CompositionTypeExtraUncheckedUpdateManyWithoutExtraNestedInput = {
    create?: XOR<CompositionTypeExtraCreateWithoutExtraInput, CompositionTypeExtraUncheckedCreateWithoutExtraInput> | CompositionTypeExtraCreateWithoutExtraInput[] | CompositionTypeExtraUncheckedCreateWithoutExtraInput[]
    connectOrCreate?: CompositionTypeExtraCreateOrConnectWithoutExtraInput | CompositionTypeExtraCreateOrConnectWithoutExtraInput[]
    upsert?: CompositionTypeExtraUpsertWithWhereUniqueWithoutExtraInput | CompositionTypeExtraUpsertWithWhereUniqueWithoutExtraInput[]
    createMany?: CompositionTypeExtraCreateManyExtraInputEnvelope
    set?: CompositionTypeExtraWhereUniqueInput | CompositionTypeExtraWhereUniqueInput[]
    disconnect?: CompositionTypeExtraWhereUniqueInput | CompositionTypeExtraWhereUniqueInput[]
    delete?: CompositionTypeExtraWhereUniqueInput | CompositionTypeExtraWhereUniqueInput[]
    connect?: CompositionTypeExtraWhereUniqueInput | CompositionTypeExtraWhereUniqueInput[]
    update?: CompositionTypeExtraUpdateWithWhereUniqueWithoutExtraInput | CompositionTypeExtraUpdateWithWhereUniqueWithoutExtraInput[]
    updateMany?: CompositionTypeExtraUpdateManyWithWhereWithoutExtraInput | CompositionTypeExtraUpdateManyWithWhereWithoutExtraInput[]
    deleteMany?: CompositionTypeExtraScalarWhereInput | CompositionTypeExtraScalarWhereInput[]
  }

  export type CompositionTypeExtraCreateNestedManyWithoutCompositionTypeInput = {
    create?: XOR<CompositionTypeExtraCreateWithoutCompositionTypeInput, CompositionTypeExtraUncheckedCreateWithoutCompositionTypeInput> | CompositionTypeExtraCreateWithoutCompositionTypeInput[] | CompositionTypeExtraUncheckedCreateWithoutCompositionTypeInput[]
    connectOrCreate?: CompositionTypeExtraCreateOrConnectWithoutCompositionTypeInput | CompositionTypeExtraCreateOrConnectWithoutCompositionTypeInput[]
    createMany?: CompositionTypeExtraCreateManyCompositionTypeInputEnvelope
    connect?: CompositionTypeExtraWhereUniqueInput | CompositionTypeExtraWhereUniqueInput[]
  }

  export type ProductCompositionCreateNestedManyWithoutCompositionTypeInput = {
    create?: XOR<ProductCompositionCreateWithoutCompositionTypeInput, ProductCompositionUncheckedCreateWithoutCompositionTypeInput> | ProductCompositionCreateWithoutCompositionTypeInput[] | ProductCompositionUncheckedCreateWithoutCompositionTypeInput[]
    connectOrCreate?: ProductCompositionCreateOrConnectWithoutCompositionTypeInput | ProductCompositionCreateOrConnectWithoutCompositionTypeInput[]
    createMany?: ProductCompositionCreateManyCompositionTypeInputEnvelope
    connect?: ProductCompositionWhereUniqueInput | ProductCompositionWhereUniqueInput[]
  }

  export type CompositionTypeExtraUncheckedCreateNestedManyWithoutCompositionTypeInput = {
    create?: XOR<CompositionTypeExtraCreateWithoutCompositionTypeInput, CompositionTypeExtraUncheckedCreateWithoutCompositionTypeInput> | CompositionTypeExtraCreateWithoutCompositionTypeInput[] | CompositionTypeExtraUncheckedCreateWithoutCompositionTypeInput[]
    connectOrCreate?: CompositionTypeExtraCreateOrConnectWithoutCompositionTypeInput | CompositionTypeExtraCreateOrConnectWithoutCompositionTypeInput[]
    createMany?: CompositionTypeExtraCreateManyCompositionTypeInputEnvelope
    connect?: CompositionTypeExtraWhereUniqueInput | CompositionTypeExtraWhereUniqueInput[]
  }

  export type ProductCompositionUncheckedCreateNestedManyWithoutCompositionTypeInput = {
    create?: XOR<ProductCompositionCreateWithoutCompositionTypeInput, ProductCompositionUncheckedCreateWithoutCompositionTypeInput> | ProductCompositionCreateWithoutCompositionTypeInput[] | ProductCompositionUncheckedCreateWithoutCompositionTypeInput[]
    connectOrCreate?: ProductCompositionCreateOrConnectWithoutCompositionTypeInput | ProductCompositionCreateOrConnectWithoutCompositionTypeInput[]
    createMany?: ProductCompositionCreateManyCompositionTypeInputEnvelope
    connect?: ProductCompositionWhereUniqueInput | ProductCompositionWhereUniqueInput[]
  }

  export type EnumCompositionSlotModeFieldUpdateOperationsInput = {
    set?: $Enums.CompositionSlotMode
  }

  export type CompositionTypeExtraUpdateManyWithoutCompositionTypeNestedInput = {
    create?: XOR<CompositionTypeExtraCreateWithoutCompositionTypeInput, CompositionTypeExtraUncheckedCreateWithoutCompositionTypeInput> | CompositionTypeExtraCreateWithoutCompositionTypeInput[] | CompositionTypeExtraUncheckedCreateWithoutCompositionTypeInput[]
    connectOrCreate?: CompositionTypeExtraCreateOrConnectWithoutCompositionTypeInput | CompositionTypeExtraCreateOrConnectWithoutCompositionTypeInput[]
    upsert?: CompositionTypeExtraUpsertWithWhereUniqueWithoutCompositionTypeInput | CompositionTypeExtraUpsertWithWhereUniqueWithoutCompositionTypeInput[]
    createMany?: CompositionTypeExtraCreateManyCompositionTypeInputEnvelope
    set?: CompositionTypeExtraWhereUniqueInput | CompositionTypeExtraWhereUniqueInput[]
    disconnect?: CompositionTypeExtraWhereUniqueInput | CompositionTypeExtraWhereUniqueInput[]
    delete?: CompositionTypeExtraWhereUniqueInput | CompositionTypeExtraWhereUniqueInput[]
    connect?: CompositionTypeExtraWhereUniqueInput | CompositionTypeExtraWhereUniqueInput[]
    update?: CompositionTypeExtraUpdateWithWhereUniqueWithoutCompositionTypeInput | CompositionTypeExtraUpdateWithWhereUniqueWithoutCompositionTypeInput[]
    updateMany?: CompositionTypeExtraUpdateManyWithWhereWithoutCompositionTypeInput | CompositionTypeExtraUpdateManyWithWhereWithoutCompositionTypeInput[]
    deleteMany?: CompositionTypeExtraScalarWhereInput | CompositionTypeExtraScalarWhereInput[]
  }

  export type ProductCompositionUpdateManyWithoutCompositionTypeNestedInput = {
    create?: XOR<ProductCompositionCreateWithoutCompositionTypeInput, ProductCompositionUncheckedCreateWithoutCompositionTypeInput> | ProductCompositionCreateWithoutCompositionTypeInput[] | ProductCompositionUncheckedCreateWithoutCompositionTypeInput[]
    connectOrCreate?: ProductCompositionCreateOrConnectWithoutCompositionTypeInput | ProductCompositionCreateOrConnectWithoutCompositionTypeInput[]
    upsert?: ProductCompositionUpsertWithWhereUniqueWithoutCompositionTypeInput | ProductCompositionUpsertWithWhereUniqueWithoutCompositionTypeInput[]
    createMany?: ProductCompositionCreateManyCompositionTypeInputEnvelope
    set?: ProductCompositionWhereUniqueInput | ProductCompositionWhereUniqueInput[]
    disconnect?: ProductCompositionWhereUniqueInput | ProductCompositionWhereUniqueInput[]
    delete?: ProductCompositionWhereUniqueInput | ProductCompositionWhereUniqueInput[]
    connect?: ProductCompositionWhereUniqueInput | ProductCompositionWhereUniqueInput[]
    update?: ProductCompositionUpdateWithWhereUniqueWithoutCompositionTypeInput | ProductCompositionUpdateWithWhereUniqueWithoutCompositionTypeInput[]
    updateMany?: ProductCompositionUpdateManyWithWhereWithoutCompositionTypeInput | ProductCompositionUpdateManyWithWhereWithoutCompositionTypeInput[]
    deleteMany?: ProductCompositionScalarWhereInput | ProductCompositionScalarWhereInput[]
  }

  export type CompositionTypeExtraUncheckedUpdateManyWithoutCompositionTypeNestedInput = {
    create?: XOR<CompositionTypeExtraCreateWithoutCompositionTypeInput, CompositionTypeExtraUncheckedCreateWithoutCompositionTypeInput> | CompositionTypeExtraCreateWithoutCompositionTypeInput[] | CompositionTypeExtraUncheckedCreateWithoutCompositionTypeInput[]
    connectOrCreate?: CompositionTypeExtraCreateOrConnectWithoutCompositionTypeInput | CompositionTypeExtraCreateOrConnectWithoutCompositionTypeInput[]
    upsert?: CompositionTypeExtraUpsertWithWhereUniqueWithoutCompositionTypeInput | CompositionTypeExtraUpsertWithWhereUniqueWithoutCompositionTypeInput[]
    createMany?: CompositionTypeExtraCreateManyCompositionTypeInputEnvelope
    set?: CompositionTypeExtraWhereUniqueInput | CompositionTypeExtraWhereUniqueInput[]
    disconnect?: CompositionTypeExtraWhereUniqueInput | CompositionTypeExtraWhereUniqueInput[]
    delete?: CompositionTypeExtraWhereUniqueInput | CompositionTypeExtraWhereUniqueInput[]
    connect?: CompositionTypeExtraWhereUniqueInput | CompositionTypeExtraWhereUniqueInput[]
    update?: CompositionTypeExtraUpdateWithWhereUniqueWithoutCompositionTypeInput | CompositionTypeExtraUpdateWithWhereUniqueWithoutCompositionTypeInput[]
    updateMany?: CompositionTypeExtraUpdateManyWithWhereWithoutCompositionTypeInput | CompositionTypeExtraUpdateManyWithWhereWithoutCompositionTypeInput[]
    deleteMany?: CompositionTypeExtraScalarWhereInput | CompositionTypeExtraScalarWhereInput[]
  }

  export type ProductCompositionUncheckedUpdateManyWithoutCompositionTypeNestedInput = {
    create?: XOR<ProductCompositionCreateWithoutCompositionTypeInput, ProductCompositionUncheckedCreateWithoutCompositionTypeInput> | ProductCompositionCreateWithoutCompositionTypeInput[] | ProductCompositionUncheckedCreateWithoutCompositionTypeInput[]
    connectOrCreate?: ProductCompositionCreateOrConnectWithoutCompositionTypeInput | ProductCompositionCreateOrConnectWithoutCompositionTypeInput[]
    upsert?: ProductCompositionUpsertWithWhereUniqueWithoutCompositionTypeInput | ProductCompositionUpsertWithWhereUniqueWithoutCompositionTypeInput[]
    createMany?: ProductCompositionCreateManyCompositionTypeInputEnvelope
    set?: ProductCompositionWhereUniqueInput | ProductCompositionWhereUniqueInput[]
    disconnect?: ProductCompositionWhereUniqueInput | ProductCompositionWhereUniqueInput[]
    delete?: ProductCompositionWhereUniqueInput | ProductCompositionWhereUniqueInput[]
    connect?: ProductCompositionWhereUniqueInput | ProductCompositionWhereUniqueInput[]
    update?: ProductCompositionUpdateWithWhereUniqueWithoutCompositionTypeInput | ProductCompositionUpdateWithWhereUniqueWithoutCompositionTypeInput[]
    updateMany?: ProductCompositionUpdateManyWithWhereWithoutCompositionTypeInput | ProductCompositionUpdateManyWithWhereWithoutCompositionTypeInput[]
    deleteMany?: ProductCompositionScalarWhereInput | ProductCompositionScalarWhereInput[]
  }

  export type CompositionTypeCreateNestedOneWithoutExtrasInput = {
    create?: XOR<CompositionTypeCreateWithoutExtrasInput, CompositionTypeUncheckedCreateWithoutExtrasInput>
    connectOrCreate?: CompositionTypeCreateOrConnectWithoutExtrasInput
    connect?: CompositionTypeWhereUniqueInput
  }

  export type ExtraCreateNestedOneWithoutTypeLinksInput = {
    create?: XOR<ExtraCreateWithoutTypeLinksInput, ExtraUncheckedCreateWithoutTypeLinksInput>
    connectOrCreate?: ExtraCreateOrConnectWithoutTypeLinksInput
    connect?: ExtraWhereUniqueInput
  }

  export type CompositionTypeUpdateOneRequiredWithoutExtrasNestedInput = {
    create?: XOR<CompositionTypeCreateWithoutExtrasInput, CompositionTypeUncheckedCreateWithoutExtrasInput>
    connectOrCreate?: CompositionTypeCreateOrConnectWithoutExtrasInput
    upsert?: CompositionTypeUpsertWithoutExtrasInput
    connect?: CompositionTypeWhereUniqueInput
    update?: XOR<XOR<CompositionTypeUpdateToOneWithWhereWithoutExtrasInput, CompositionTypeUpdateWithoutExtrasInput>, CompositionTypeUncheckedUpdateWithoutExtrasInput>
  }

  export type ExtraUpdateOneRequiredWithoutTypeLinksNestedInput = {
    create?: XOR<ExtraCreateWithoutTypeLinksInput, ExtraUncheckedCreateWithoutTypeLinksInput>
    connectOrCreate?: ExtraCreateOrConnectWithoutTypeLinksInput
    upsert?: ExtraUpsertWithoutTypeLinksInput
    connect?: ExtraWhereUniqueInput
    update?: XOR<XOR<ExtraUpdateToOneWithWhereWithoutTypeLinksInput, ExtraUpdateWithoutTypeLinksInput>, ExtraUncheckedUpdateWithoutTypeLinksInput>
  }

  export type ProductCreateNestedOneWithoutCompositionsInput = {
    create?: XOR<ProductCreateWithoutCompositionsInput, ProductUncheckedCreateWithoutCompositionsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutCompositionsInput
    connect?: ProductWhereUniqueInput
  }

  export type CompositionTypeCreateNestedOneWithoutProductStepsInput = {
    create?: XOR<CompositionTypeCreateWithoutProductStepsInput, CompositionTypeUncheckedCreateWithoutProductStepsInput>
    connectOrCreate?: CompositionTypeCreateOrConnectWithoutProductStepsInput
    connect?: CompositionTypeWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutCompositionsNestedInput = {
    create?: XOR<ProductCreateWithoutCompositionsInput, ProductUncheckedCreateWithoutCompositionsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutCompositionsInput
    upsert?: ProductUpsertWithoutCompositionsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutCompositionsInput, ProductUpdateWithoutCompositionsInput>, ProductUncheckedUpdateWithoutCompositionsInput>
  }

  export type CompositionTypeUpdateOneRequiredWithoutProductStepsNestedInput = {
    create?: XOR<CompositionTypeCreateWithoutProductStepsInput, CompositionTypeUncheckedCreateWithoutProductStepsInput>
    connectOrCreate?: CompositionTypeCreateOrConnectWithoutProductStepsInput
    upsert?: CompositionTypeUpsertWithoutProductStepsInput
    connect?: CompositionTypeWhereUniqueInput
    update?: XOR<XOR<CompositionTypeUpdateToOneWithWhereWithoutProductStepsInput, CompositionTypeUpdateWithoutProductStepsInput>, CompositionTypeUncheckedUpdateWithoutProductStepsInput>
  }

  export type CategoryCreateNestedOneWithoutProductsInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    connect?: CategoryWhereUniqueInput
  }

  export type ProductCompositionCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductCompositionCreateWithoutProductInput, ProductCompositionUncheckedCreateWithoutProductInput> | ProductCompositionCreateWithoutProductInput[] | ProductCompositionUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductCompositionCreateOrConnectWithoutProductInput | ProductCompositionCreateOrConnectWithoutProductInput[]
    createMany?: ProductCompositionCreateManyProductInputEnvelope
    connect?: ProductCompositionWhereUniqueInput | ProductCompositionWhereUniqueInput[]
  }

  export type OrderLineCreateNestedManyWithoutProductInput = {
    create?: XOR<OrderLineCreateWithoutProductInput, OrderLineUncheckedCreateWithoutProductInput> | OrderLineCreateWithoutProductInput[] | OrderLineUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderLineCreateOrConnectWithoutProductInput | OrderLineCreateOrConnectWithoutProductInput[]
    createMany?: OrderLineCreateManyProductInputEnvelope
    connect?: OrderLineWhereUniqueInput | OrderLineWhereUniqueInput[]
  }

  export type ProductCompositionUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductCompositionCreateWithoutProductInput, ProductCompositionUncheckedCreateWithoutProductInput> | ProductCompositionCreateWithoutProductInput[] | ProductCompositionUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductCompositionCreateOrConnectWithoutProductInput | ProductCompositionCreateOrConnectWithoutProductInput[]
    createMany?: ProductCompositionCreateManyProductInputEnvelope
    connect?: ProductCompositionWhereUniqueInput | ProductCompositionWhereUniqueInput[]
  }

  export type OrderLineUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<OrderLineCreateWithoutProductInput, OrderLineUncheckedCreateWithoutProductInput> | OrderLineCreateWithoutProductInput[] | OrderLineUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderLineCreateOrConnectWithoutProductInput | OrderLineCreateOrConnectWithoutProductInput[]
    createMany?: OrderLineCreateManyProductInputEnvelope
    connect?: OrderLineWhereUniqueInput | OrderLineWhereUniqueInput[]
  }

  export type EnumProductKindFieldUpdateOperationsInput = {
    set?: $Enums.ProductKind
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type CategoryUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    upsert?: CategoryUpsertWithoutProductsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutProductsInput, CategoryUpdateWithoutProductsInput>, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type ProductCompositionUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductCompositionCreateWithoutProductInput, ProductCompositionUncheckedCreateWithoutProductInput> | ProductCompositionCreateWithoutProductInput[] | ProductCompositionUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductCompositionCreateOrConnectWithoutProductInput | ProductCompositionCreateOrConnectWithoutProductInput[]
    upsert?: ProductCompositionUpsertWithWhereUniqueWithoutProductInput | ProductCompositionUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductCompositionCreateManyProductInputEnvelope
    set?: ProductCompositionWhereUniqueInput | ProductCompositionWhereUniqueInput[]
    disconnect?: ProductCompositionWhereUniqueInput | ProductCompositionWhereUniqueInput[]
    delete?: ProductCompositionWhereUniqueInput | ProductCompositionWhereUniqueInput[]
    connect?: ProductCompositionWhereUniqueInput | ProductCompositionWhereUniqueInput[]
    update?: ProductCompositionUpdateWithWhereUniqueWithoutProductInput | ProductCompositionUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductCompositionUpdateManyWithWhereWithoutProductInput | ProductCompositionUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductCompositionScalarWhereInput | ProductCompositionScalarWhereInput[]
  }

  export type OrderLineUpdateManyWithoutProductNestedInput = {
    create?: XOR<OrderLineCreateWithoutProductInput, OrderLineUncheckedCreateWithoutProductInput> | OrderLineCreateWithoutProductInput[] | OrderLineUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderLineCreateOrConnectWithoutProductInput | OrderLineCreateOrConnectWithoutProductInput[]
    upsert?: OrderLineUpsertWithWhereUniqueWithoutProductInput | OrderLineUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: OrderLineCreateManyProductInputEnvelope
    set?: OrderLineWhereUniqueInput | OrderLineWhereUniqueInput[]
    disconnect?: OrderLineWhereUniqueInput | OrderLineWhereUniqueInput[]
    delete?: OrderLineWhereUniqueInput | OrderLineWhereUniqueInput[]
    connect?: OrderLineWhereUniqueInput | OrderLineWhereUniqueInput[]
    update?: OrderLineUpdateWithWhereUniqueWithoutProductInput | OrderLineUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: OrderLineUpdateManyWithWhereWithoutProductInput | OrderLineUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: OrderLineScalarWhereInput | OrderLineScalarWhereInput[]
  }

  export type ProductCompositionUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductCompositionCreateWithoutProductInput, ProductCompositionUncheckedCreateWithoutProductInput> | ProductCompositionCreateWithoutProductInput[] | ProductCompositionUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductCompositionCreateOrConnectWithoutProductInput | ProductCompositionCreateOrConnectWithoutProductInput[]
    upsert?: ProductCompositionUpsertWithWhereUniqueWithoutProductInput | ProductCompositionUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductCompositionCreateManyProductInputEnvelope
    set?: ProductCompositionWhereUniqueInput | ProductCompositionWhereUniqueInput[]
    disconnect?: ProductCompositionWhereUniqueInput | ProductCompositionWhereUniqueInput[]
    delete?: ProductCompositionWhereUniqueInput | ProductCompositionWhereUniqueInput[]
    connect?: ProductCompositionWhereUniqueInput | ProductCompositionWhereUniqueInput[]
    update?: ProductCompositionUpdateWithWhereUniqueWithoutProductInput | ProductCompositionUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductCompositionUpdateManyWithWhereWithoutProductInput | ProductCompositionUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductCompositionScalarWhereInput | ProductCompositionScalarWhereInput[]
  }

  export type OrderLineUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<OrderLineCreateWithoutProductInput, OrderLineUncheckedCreateWithoutProductInput> | OrderLineCreateWithoutProductInput[] | OrderLineUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderLineCreateOrConnectWithoutProductInput | OrderLineCreateOrConnectWithoutProductInput[]
    upsert?: OrderLineUpsertWithWhereUniqueWithoutProductInput | OrderLineUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: OrderLineCreateManyProductInputEnvelope
    set?: OrderLineWhereUniqueInput | OrderLineWhereUniqueInput[]
    disconnect?: OrderLineWhereUniqueInput | OrderLineWhereUniqueInput[]
    delete?: OrderLineWhereUniqueInput | OrderLineWhereUniqueInput[]
    connect?: OrderLineWhereUniqueInput | OrderLineWhereUniqueInput[]
    update?: OrderLineUpdateWithWhereUniqueWithoutProductInput | OrderLineUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: OrderLineUpdateManyWithWhereWithoutProductInput | OrderLineUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: OrderLineScalarWhereInput | OrderLineScalarWhereInput[]
  }

  export type OrderCreateNestedManyWithoutTableInput = {
    create?: XOR<OrderCreateWithoutTableInput, OrderUncheckedCreateWithoutTableInput> | OrderCreateWithoutTableInput[] | OrderUncheckedCreateWithoutTableInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutTableInput | OrderCreateOrConnectWithoutTableInput[]
    createMany?: OrderCreateManyTableInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutTableInput = {
    create?: XOR<OrderCreateWithoutTableInput, OrderUncheckedCreateWithoutTableInput> | OrderCreateWithoutTableInput[] | OrderUncheckedCreateWithoutTableInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutTableInput | OrderCreateOrConnectWithoutTableInput[]
    createMany?: OrderCreateManyTableInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type OrderUpdateManyWithoutTableNestedInput = {
    create?: XOR<OrderCreateWithoutTableInput, OrderUncheckedCreateWithoutTableInput> | OrderCreateWithoutTableInput[] | OrderUncheckedCreateWithoutTableInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutTableInput | OrderCreateOrConnectWithoutTableInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutTableInput | OrderUpsertWithWhereUniqueWithoutTableInput[]
    createMany?: OrderCreateManyTableInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutTableInput | OrderUpdateWithWhereUniqueWithoutTableInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutTableInput | OrderUpdateManyWithWhereWithoutTableInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutTableNestedInput = {
    create?: XOR<OrderCreateWithoutTableInput, OrderUncheckedCreateWithoutTableInput> | OrderCreateWithoutTableInput[] | OrderUncheckedCreateWithoutTableInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutTableInput | OrderCreateOrConnectWithoutTableInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutTableInput | OrderUpsertWithWhereUniqueWithoutTableInput[]
    createMany?: OrderCreateManyTableInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutTableInput | OrderUpdateWithWhereUniqueWithoutTableInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutTableInput | OrderUpdateManyWithWhereWithoutTableInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type StaffCreateNestedOneWithoutSessionsInput = {
    create?: XOR<StaffCreateWithoutSessionsInput, StaffUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: StaffCreateOrConnectWithoutSessionsInput
    connect?: StaffWhereUniqueInput
  }

  export type OrderCreateNestedManyWithoutSessionInput = {
    create?: XOR<OrderCreateWithoutSessionInput, OrderUncheckedCreateWithoutSessionInput> | OrderCreateWithoutSessionInput[] | OrderUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutSessionInput | OrderCreateOrConnectWithoutSessionInput[]
    createMany?: OrderCreateManySessionInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<OrderCreateWithoutSessionInput, OrderUncheckedCreateWithoutSessionInput> | OrderCreateWithoutSessionInput[] | OrderUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutSessionInput | OrderCreateOrConnectWithoutSessionInput[]
    createMany?: OrderCreateManySessionInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type StaffUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<StaffCreateWithoutSessionsInput, StaffUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: StaffCreateOrConnectWithoutSessionsInput
    upsert?: StaffUpsertWithoutSessionsInput
    connect?: StaffWhereUniqueInput
    update?: XOR<XOR<StaffUpdateToOneWithWhereWithoutSessionsInput, StaffUpdateWithoutSessionsInput>, StaffUncheckedUpdateWithoutSessionsInput>
  }

  export type OrderUpdateManyWithoutSessionNestedInput = {
    create?: XOR<OrderCreateWithoutSessionInput, OrderUncheckedCreateWithoutSessionInput> | OrderCreateWithoutSessionInput[] | OrderUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutSessionInput | OrderCreateOrConnectWithoutSessionInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutSessionInput | OrderUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: OrderCreateManySessionInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutSessionInput | OrderUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutSessionInput | OrderUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<OrderCreateWithoutSessionInput, OrderUncheckedCreateWithoutSessionInput> | OrderCreateWithoutSessionInput[] | OrderUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutSessionInput | OrderCreateOrConnectWithoutSessionInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutSessionInput | OrderUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: OrderCreateManySessionInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutSessionInput | OrderUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutSessionInput | OrderUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type RestaurantTableCreateNestedOneWithoutOrdersInput = {
    create?: XOR<RestaurantTableCreateWithoutOrdersInput, RestaurantTableUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: RestaurantTableCreateOrConnectWithoutOrdersInput
    connect?: RestaurantTableWhereUniqueInput
  }

  export type StaffCreateNestedOneWithoutOrdersInput = {
    create?: XOR<StaffCreateWithoutOrdersInput, StaffUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: StaffCreateOrConnectWithoutOrdersInput
    connect?: StaffWhereUniqueInput
  }

  export type CashierSessionCreateNestedOneWithoutOrdersInput = {
    create?: XOR<CashierSessionCreateWithoutOrdersInput, CashierSessionUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: CashierSessionCreateOrConnectWithoutOrdersInput
    connect?: CashierSessionWhereUniqueInput
  }

  export type OrderLineCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderLineCreateWithoutOrderInput, OrderLineUncheckedCreateWithoutOrderInput> | OrderLineCreateWithoutOrderInput[] | OrderLineUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderLineCreateOrConnectWithoutOrderInput | OrderLineCreateOrConnectWithoutOrderInput[]
    createMany?: OrderLineCreateManyOrderInputEnvelope
    connect?: OrderLineWhereUniqueInput | OrderLineWhereUniqueInput[]
  }

  export type OrderLineUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderLineCreateWithoutOrderInput, OrderLineUncheckedCreateWithoutOrderInput> | OrderLineCreateWithoutOrderInput[] | OrderLineUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderLineCreateOrConnectWithoutOrderInput | OrderLineCreateOrConnectWithoutOrderInput[]
    createMany?: OrderLineCreateManyOrderInputEnvelope
    connect?: OrderLineWhereUniqueInput | OrderLineWhereUniqueInput[]
  }

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus
  }

  export type RestaurantTableUpdateOneWithoutOrdersNestedInput = {
    create?: XOR<RestaurantTableCreateWithoutOrdersInput, RestaurantTableUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: RestaurantTableCreateOrConnectWithoutOrdersInput
    upsert?: RestaurantTableUpsertWithoutOrdersInput
    disconnect?: RestaurantTableWhereInput | boolean
    delete?: RestaurantTableWhereInput | boolean
    connect?: RestaurantTableWhereUniqueInput
    update?: XOR<XOR<RestaurantTableUpdateToOneWithWhereWithoutOrdersInput, RestaurantTableUpdateWithoutOrdersInput>, RestaurantTableUncheckedUpdateWithoutOrdersInput>
  }

  export type StaffUpdateOneWithoutOrdersNestedInput = {
    create?: XOR<StaffCreateWithoutOrdersInput, StaffUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: StaffCreateOrConnectWithoutOrdersInput
    upsert?: StaffUpsertWithoutOrdersInput
    disconnect?: StaffWhereInput | boolean
    delete?: StaffWhereInput | boolean
    connect?: StaffWhereUniqueInput
    update?: XOR<XOR<StaffUpdateToOneWithWhereWithoutOrdersInput, StaffUpdateWithoutOrdersInput>, StaffUncheckedUpdateWithoutOrdersInput>
  }

  export type CashierSessionUpdateOneWithoutOrdersNestedInput = {
    create?: XOR<CashierSessionCreateWithoutOrdersInput, CashierSessionUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: CashierSessionCreateOrConnectWithoutOrdersInput
    upsert?: CashierSessionUpsertWithoutOrdersInput
    disconnect?: CashierSessionWhereInput | boolean
    delete?: CashierSessionWhereInput | boolean
    connect?: CashierSessionWhereUniqueInput
    update?: XOR<XOR<CashierSessionUpdateToOneWithWhereWithoutOrdersInput, CashierSessionUpdateWithoutOrdersInput>, CashierSessionUncheckedUpdateWithoutOrdersInput>
  }

  export type OrderLineUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderLineCreateWithoutOrderInput, OrderLineUncheckedCreateWithoutOrderInput> | OrderLineCreateWithoutOrderInput[] | OrderLineUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderLineCreateOrConnectWithoutOrderInput | OrderLineCreateOrConnectWithoutOrderInput[]
    upsert?: OrderLineUpsertWithWhereUniqueWithoutOrderInput | OrderLineUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderLineCreateManyOrderInputEnvelope
    set?: OrderLineWhereUniqueInput | OrderLineWhereUniqueInput[]
    disconnect?: OrderLineWhereUniqueInput | OrderLineWhereUniqueInput[]
    delete?: OrderLineWhereUniqueInput | OrderLineWhereUniqueInput[]
    connect?: OrderLineWhereUniqueInput | OrderLineWhereUniqueInput[]
    update?: OrderLineUpdateWithWhereUniqueWithoutOrderInput | OrderLineUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderLineUpdateManyWithWhereWithoutOrderInput | OrderLineUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderLineScalarWhereInput | OrderLineScalarWhereInput[]
  }

  export type OrderLineUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderLineCreateWithoutOrderInput, OrderLineUncheckedCreateWithoutOrderInput> | OrderLineCreateWithoutOrderInput[] | OrderLineUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderLineCreateOrConnectWithoutOrderInput | OrderLineCreateOrConnectWithoutOrderInput[]
    upsert?: OrderLineUpsertWithWhereUniqueWithoutOrderInput | OrderLineUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderLineCreateManyOrderInputEnvelope
    set?: OrderLineWhereUniqueInput | OrderLineWhereUniqueInput[]
    disconnect?: OrderLineWhereUniqueInput | OrderLineWhereUniqueInput[]
    delete?: OrderLineWhereUniqueInput | OrderLineWhereUniqueInput[]
    connect?: OrderLineWhereUniqueInput | OrderLineWhereUniqueInput[]
    update?: OrderLineUpdateWithWhereUniqueWithoutOrderInput | OrderLineUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderLineUpdateManyWithWhereWithoutOrderInput | OrderLineUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderLineScalarWhereInput | OrderLineScalarWhereInput[]
  }

  export type OrderCreateNestedOneWithoutLinesInput = {
    create?: XOR<OrderCreateWithoutLinesInput, OrderUncheckedCreateWithoutLinesInput>
    connectOrCreate?: OrderCreateOrConnectWithoutLinesInput
    connect?: OrderWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutOrderLinesInput = {
    create?: XOR<ProductCreateWithoutOrderLinesInput, ProductUncheckedCreateWithoutOrderLinesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrderLinesInput
    connect?: ProductWhereUniqueInput
  }

  export type OrderUpdateOneRequiredWithoutLinesNestedInput = {
    create?: XOR<OrderCreateWithoutLinesInput, OrderUncheckedCreateWithoutLinesInput>
    connectOrCreate?: OrderCreateOrConnectWithoutLinesInput
    upsert?: OrderUpsertWithoutLinesInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutLinesInput, OrderUpdateWithoutLinesInput>, OrderUncheckedUpdateWithoutLinesInput>
  }

  export type ProductUpdateOneRequiredWithoutOrderLinesNestedInput = {
    create?: XOR<ProductCreateWithoutOrderLinesInput, ProductUncheckedCreateWithoutOrderLinesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrderLinesInput
    upsert?: ProductUpsertWithoutOrderLinesInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutOrderLinesInput, ProductUpdateWithoutOrderLinesInput>, ProductUncheckedUpdateWithoutOrderLinesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumStaffRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.StaffRole | EnumStaffRoleFieldRefInput<$PrismaModel>
    in?: $Enums.StaffRole[] | ListEnumStaffRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.StaffRole[] | ListEnumStaffRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumStaffRoleFilter<$PrismaModel> | $Enums.StaffRole
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumStaffRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StaffRole | EnumStaffRoleFieldRefInput<$PrismaModel>
    in?: $Enums.StaffRole[] | ListEnumStaffRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.StaffRole[] | ListEnumStaffRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumStaffRoleWithAggregatesFilter<$PrismaModel> | $Enums.StaffRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStaffRoleFilter<$PrismaModel>
    _max?: NestedEnumStaffRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumCompositionSlotModeFilter<$PrismaModel = never> = {
    equals?: $Enums.CompositionSlotMode | EnumCompositionSlotModeFieldRefInput<$PrismaModel>
    in?: $Enums.CompositionSlotMode[] | ListEnumCompositionSlotModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CompositionSlotMode[] | ListEnumCompositionSlotModeFieldRefInput<$PrismaModel>
    not?: NestedEnumCompositionSlotModeFilter<$PrismaModel> | $Enums.CompositionSlotMode
  }

  export type NestedEnumCompositionSlotModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CompositionSlotMode | EnumCompositionSlotModeFieldRefInput<$PrismaModel>
    in?: $Enums.CompositionSlotMode[] | ListEnumCompositionSlotModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CompositionSlotMode[] | ListEnumCompositionSlotModeFieldRefInput<$PrismaModel>
    not?: NestedEnumCompositionSlotModeWithAggregatesFilter<$PrismaModel> | $Enums.CompositionSlotMode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCompositionSlotModeFilter<$PrismaModel>
    _max?: NestedEnumCompositionSlotModeFilter<$PrismaModel>
  }

  export type NestedEnumProductKindFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductKind | EnumProductKindFieldRefInput<$PrismaModel>
    in?: $Enums.ProductKind[] | ListEnumProductKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductKind[] | ListEnumProductKindFieldRefInput<$PrismaModel>
    not?: NestedEnumProductKindFilter<$PrismaModel> | $Enums.ProductKind
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumProductKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductKind | EnumProductKindFieldRefInput<$PrismaModel>
    in?: $Enums.ProductKind[] | ListEnumProductKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductKind[] | ListEnumProductKindFieldRefInput<$PrismaModel>
    not?: NestedEnumProductKindWithAggregatesFilter<$PrismaModel> | $Enums.ProductKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProductKindFilter<$PrismaModel>
    _max?: NestedEnumProductKindFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type CashierSessionCreateWithoutStaffInput = {
    id?: string
    openedAt?: Date | string
    closedAt?: Date | string | null
    openingFloatCents?: number
    closingNote?: string | null
    orders?: OrderCreateNestedManyWithoutSessionInput
  }

  export type CashierSessionUncheckedCreateWithoutStaffInput = {
    id?: string
    openedAt?: Date | string
    closedAt?: Date | string | null
    openingFloatCents?: number
    closingNote?: string | null
    orders?: OrderUncheckedCreateNestedManyWithoutSessionInput
  }

  export type CashierSessionCreateOrConnectWithoutStaffInput = {
    where: CashierSessionWhereUniqueInput
    create: XOR<CashierSessionCreateWithoutStaffInput, CashierSessionUncheckedCreateWithoutStaffInput>
  }

  export type CashierSessionCreateManyStaffInputEnvelope = {
    data: CashierSessionCreateManyStaffInput | CashierSessionCreateManyStaffInput[]
    skipDuplicates?: boolean
  }

  export type OrderCreateWithoutStaffInput = {
    id?: string
    status?: $Enums.OrderStatus
    subtotalCents?: number
    taxCents?: number
    totalCents?: number
    idempotencyKey?: string | null
    customerName?: string | null
    customerEmail?: string | null
    commandNumber?: number | null
    currency?: string | null
    pack?: NullableJsonNullValueInput | InputJsonValue
    paymentMethod?: NullableJsonNullValueInput | InputJsonValue
    orderDiscountValue?: number
    logoPath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    table?: RestaurantTableCreateNestedOneWithoutOrdersInput
    session?: CashierSessionCreateNestedOneWithoutOrdersInput
    lines?: OrderLineCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutStaffInput = {
    id?: string
    status?: $Enums.OrderStatus
    tableId?: string | null
    sessionId?: string | null
    subtotalCents?: number
    taxCents?: number
    totalCents?: number
    idempotencyKey?: string | null
    customerName?: string | null
    customerEmail?: string | null
    commandNumber?: number | null
    currency?: string | null
    pack?: NullableJsonNullValueInput | InputJsonValue
    paymentMethod?: NullableJsonNullValueInput | InputJsonValue
    orderDiscountValue?: number
    logoPath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lines?: OrderLineUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutStaffInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutStaffInput, OrderUncheckedCreateWithoutStaffInput>
  }

  export type OrderCreateManyStaffInputEnvelope = {
    data: OrderCreateManyStaffInput | OrderCreateManyStaffInput[]
    skipDuplicates?: boolean
  }

  export type CashierSessionUpsertWithWhereUniqueWithoutStaffInput = {
    where: CashierSessionWhereUniqueInput
    update: XOR<CashierSessionUpdateWithoutStaffInput, CashierSessionUncheckedUpdateWithoutStaffInput>
    create: XOR<CashierSessionCreateWithoutStaffInput, CashierSessionUncheckedCreateWithoutStaffInput>
  }

  export type CashierSessionUpdateWithWhereUniqueWithoutStaffInput = {
    where: CashierSessionWhereUniqueInput
    data: XOR<CashierSessionUpdateWithoutStaffInput, CashierSessionUncheckedUpdateWithoutStaffInput>
  }

  export type CashierSessionUpdateManyWithWhereWithoutStaffInput = {
    where: CashierSessionScalarWhereInput
    data: XOR<CashierSessionUpdateManyMutationInput, CashierSessionUncheckedUpdateManyWithoutStaffInput>
  }

  export type CashierSessionScalarWhereInput = {
    AND?: CashierSessionScalarWhereInput | CashierSessionScalarWhereInput[]
    OR?: CashierSessionScalarWhereInput[]
    NOT?: CashierSessionScalarWhereInput | CashierSessionScalarWhereInput[]
    id?: StringFilter<"CashierSession"> | string
    staffId?: StringFilter<"CashierSession"> | string
    openedAt?: DateTimeFilter<"CashierSession"> | Date | string
    closedAt?: DateTimeNullableFilter<"CashierSession"> | Date | string | null
    openingFloatCents?: IntFilter<"CashierSession"> | number
    closingNote?: StringNullableFilter<"CashierSession"> | string | null
  }

  export type OrderUpsertWithWhereUniqueWithoutStaffInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutStaffInput, OrderUncheckedUpdateWithoutStaffInput>
    create: XOR<OrderCreateWithoutStaffInput, OrderUncheckedCreateWithoutStaffInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutStaffInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutStaffInput, OrderUncheckedUpdateWithoutStaffInput>
  }

  export type OrderUpdateManyWithWhereWithoutStaffInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutStaffInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    id?: StringFilter<"Order"> | string
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    tableId?: StringNullableFilter<"Order"> | string | null
    staffId?: StringNullableFilter<"Order"> | string | null
    sessionId?: StringNullableFilter<"Order"> | string | null
    subtotalCents?: IntFilter<"Order"> | number
    taxCents?: IntFilter<"Order"> | number
    totalCents?: IntFilter<"Order"> | number
    idempotencyKey?: StringNullableFilter<"Order"> | string | null
    customerName?: StringNullableFilter<"Order"> | string | null
    customerEmail?: StringNullableFilter<"Order"> | string | null
    commandNumber?: IntNullableFilter<"Order"> | number | null
    currency?: StringNullableFilter<"Order"> | string | null
    pack?: JsonNullableFilter<"Order">
    paymentMethod?: JsonNullableFilter<"Order">
    orderDiscountValue?: IntFilter<"Order"> | number
    logoPath?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
  }

  export type ProductCreateWithoutCategoryInput = {
    id?: string
    name: string
    description?: string | null
    image?: string | null
    kind?: $Enums.ProductKind
    price: number
    formulePrice?: number
    taxRateBps?: number | null
    modifiers?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    outOfStock?: boolean
    sortOrder?: number
    discountValue?: number
    originalPrice?: number | null
    discountStartDate?: Date | string | null
    discountEndDate?: Date | string | null
    createdAt?: Date | string
    compositions?: ProductCompositionCreateNestedManyWithoutProductInput
    orderLines?: OrderLineCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutCategoryInput = {
    id?: string
    name: string
    description?: string | null
    image?: string | null
    kind?: $Enums.ProductKind
    price: number
    formulePrice?: number
    taxRateBps?: number | null
    modifiers?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    outOfStock?: boolean
    sortOrder?: number
    discountValue?: number
    originalPrice?: number | null
    discountStartDate?: Date | string | null
    discountEndDate?: Date | string | null
    createdAt?: Date | string
    compositions?: ProductCompositionUncheckedCreateNestedManyWithoutProductInput
    orderLines?: OrderLineUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductCreateManyCategoryInputEnvelope = {
    data: ProductCreateManyCategoryInput | ProductCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type ProductUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
  }

  export type ProductUpdateManyWithWhereWithoutCategoryInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutCategoryInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    id?: StringFilter<"Product"> | string
    categoryId?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    image?: StringNullableFilter<"Product"> | string | null
    kind?: EnumProductKindFilter<"Product"> | $Enums.ProductKind
    price?: IntFilter<"Product"> | number
    formulePrice?: IntFilter<"Product"> | number
    taxRateBps?: IntNullableFilter<"Product"> | number | null
    modifiers?: JsonNullableFilter<"Product">
    isActive?: BoolFilter<"Product"> | boolean
    outOfStock?: BoolFilter<"Product"> | boolean
    sortOrder?: IntFilter<"Product"> | number
    discountValue?: IntFilter<"Product"> | number
    originalPrice?: IntNullableFilter<"Product"> | number | null
    discountStartDate?: DateTimeNullableFilter<"Product"> | Date | string | null
    discountEndDate?: DateTimeNullableFilter<"Product"> | Date | string | null
    createdAt?: DateTimeFilter<"Product"> | Date | string
  }

  export type CompositionTypeExtraCreateWithoutExtraInput = {
    position?: number
    compositionType: CompositionTypeCreateNestedOneWithoutExtrasInput
  }

  export type CompositionTypeExtraUncheckedCreateWithoutExtraInput = {
    compositionTypeId: string
    position?: number
  }

  export type CompositionTypeExtraCreateOrConnectWithoutExtraInput = {
    where: CompositionTypeExtraWhereUniqueInput
    create: XOR<CompositionTypeExtraCreateWithoutExtraInput, CompositionTypeExtraUncheckedCreateWithoutExtraInput>
  }

  export type CompositionTypeExtraCreateManyExtraInputEnvelope = {
    data: CompositionTypeExtraCreateManyExtraInput | CompositionTypeExtraCreateManyExtraInput[]
    skipDuplicates?: boolean
  }

  export type CompositionTypeExtraUpsertWithWhereUniqueWithoutExtraInput = {
    where: CompositionTypeExtraWhereUniqueInput
    update: XOR<CompositionTypeExtraUpdateWithoutExtraInput, CompositionTypeExtraUncheckedUpdateWithoutExtraInput>
    create: XOR<CompositionTypeExtraCreateWithoutExtraInput, CompositionTypeExtraUncheckedCreateWithoutExtraInput>
  }

  export type CompositionTypeExtraUpdateWithWhereUniqueWithoutExtraInput = {
    where: CompositionTypeExtraWhereUniqueInput
    data: XOR<CompositionTypeExtraUpdateWithoutExtraInput, CompositionTypeExtraUncheckedUpdateWithoutExtraInput>
  }

  export type CompositionTypeExtraUpdateManyWithWhereWithoutExtraInput = {
    where: CompositionTypeExtraScalarWhereInput
    data: XOR<CompositionTypeExtraUpdateManyMutationInput, CompositionTypeExtraUncheckedUpdateManyWithoutExtraInput>
  }

  export type CompositionTypeExtraScalarWhereInput = {
    AND?: CompositionTypeExtraScalarWhereInput | CompositionTypeExtraScalarWhereInput[]
    OR?: CompositionTypeExtraScalarWhereInput[]
    NOT?: CompositionTypeExtraScalarWhereInput | CompositionTypeExtraScalarWhereInput[]
    compositionTypeId?: StringFilter<"CompositionTypeExtra"> | string
    extraId?: StringFilter<"CompositionTypeExtra"> | string
    position?: IntFilter<"CompositionTypeExtra"> | number
  }

  export type CompositionTypeExtraCreateWithoutCompositionTypeInput = {
    position?: number
    extra: ExtraCreateNestedOneWithoutTypeLinksInput
  }

  export type CompositionTypeExtraUncheckedCreateWithoutCompositionTypeInput = {
    extraId: string
    position?: number
  }

  export type CompositionTypeExtraCreateOrConnectWithoutCompositionTypeInput = {
    where: CompositionTypeExtraWhereUniqueInput
    create: XOR<CompositionTypeExtraCreateWithoutCompositionTypeInput, CompositionTypeExtraUncheckedCreateWithoutCompositionTypeInput>
  }

  export type CompositionTypeExtraCreateManyCompositionTypeInputEnvelope = {
    data: CompositionTypeExtraCreateManyCompositionTypeInput | CompositionTypeExtraCreateManyCompositionTypeInput[]
    skipDuplicates?: boolean
  }

  export type ProductCompositionCreateWithoutCompositionTypeInput = {
    sortOrder?: number
    product: ProductCreateNestedOneWithoutCompositionsInput
  }

  export type ProductCompositionUncheckedCreateWithoutCompositionTypeInput = {
    productId: string
    sortOrder?: number
  }

  export type ProductCompositionCreateOrConnectWithoutCompositionTypeInput = {
    where: ProductCompositionWhereUniqueInput
    create: XOR<ProductCompositionCreateWithoutCompositionTypeInput, ProductCompositionUncheckedCreateWithoutCompositionTypeInput>
  }

  export type ProductCompositionCreateManyCompositionTypeInputEnvelope = {
    data: ProductCompositionCreateManyCompositionTypeInput | ProductCompositionCreateManyCompositionTypeInput[]
    skipDuplicates?: boolean
  }

  export type CompositionTypeExtraUpsertWithWhereUniqueWithoutCompositionTypeInput = {
    where: CompositionTypeExtraWhereUniqueInput
    update: XOR<CompositionTypeExtraUpdateWithoutCompositionTypeInput, CompositionTypeExtraUncheckedUpdateWithoutCompositionTypeInput>
    create: XOR<CompositionTypeExtraCreateWithoutCompositionTypeInput, CompositionTypeExtraUncheckedCreateWithoutCompositionTypeInput>
  }

  export type CompositionTypeExtraUpdateWithWhereUniqueWithoutCompositionTypeInput = {
    where: CompositionTypeExtraWhereUniqueInput
    data: XOR<CompositionTypeExtraUpdateWithoutCompositionTypeInput, CompositionTypeExtraUncheckedUpdateWithoutCompositionTypeInput>
  }

  export type CompositionTypeExtraUpdateManyWithWhereWithoutCompositionTypeInput = {
    where: CompositionTypeExtraScalarWhereInput
    data: XOR<CompositionTypeExtraUpdateManyMutationInput, CompositionTypeExtraUncheckedUpdateManyWithoutCompositionTypeInput>
  }

  export type ProductCompositionUpsertWithWhereUniqueWithoutCompositionTypeInput = {
    where: ProductCompositionWhereUniqueInput
    update: XOR<ProductCompositionUpdateWithoutCompositionTypeInput, ProductCompositionUncheckedUpdateWithoutCompositionTypeInput>
    create: XOR<ProductCompositionCreateWithoutCompositionTypeInput, ProductCompositionUncheckedCreateWithoutCompositionTypeInput>
  }

  export type ProductCompositionUpdateWithWhereUniqueWithoutCompositionTypeInput = {
    where: ProductCompositionWhereUniqueInput
    data: XOR<ProductCompositionUpdateWithoutCompositionTypeInput, ProductCompositionUncheckedUpdateWithoutCompositionTypeInput>
  }

  export type ProductCompositionUpdateManyWithWhereWithoutCompositionTypeInput = {
    where: ProductCompositionScalarWhereInput
    data: XOR<ProductCompositionUpdateManyMutationInput, ProductCompositionUncheckedUpdateManyWithoutCompositionTypeInput>
  }

  export type ProductCompositionScalarWhereInput = {
    AND?: ProductCompositionScalarWhereInput | ProductCompositionScalarWhereInput[]
    OR?: ProductCompositionScalarWhereInput[]
    NOT?: ProductCompositionScalarWhereInput | ProductCompositionScalarWhereInput[]
    productId?: StringFilter<"ProductComposition"> | string
    compositionTypeId?: StringFilter<"ProductComposition"> | string
    sortOrder?: IntFilter<"ProductComposition"> | number
  }

  export type CompositionTypeCreateWithoutExtrasInput = {
    id?: string
    name: string
    label: string
    message?: string | null
    min?: number
    max?: number
    payment?: boolean
    selection?: boolean
    mode?: $Enums.CompositionSlotMode
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    productSteps?: ProductCompositionCreateNestedManyWithoutCompositionTypeInput
  }

  export type CompositionTypeUncheckedCreateWithoutExtrasInput = {
    id?: string
    name: string
    label: string
    message?: string | null
    min?: number
    max?: number
    payment?: boolean
    selection?: boolean
    mode?: $Enums.CompositionSlotMode
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    productSteps?: ProductCompositionUncheckedCreateNestedManyWithoutCompositionTypeInput
  }

  export type CompositionTypeCreateOrConnectWithoutExtrasInput = {
    where: CompositionTypeWhereUniqueInput
    create: XOR<CompositionTypeCreateWithoutExtrasInput, CompositionTypeUncheckedCreateWithoutExtrasInput>
  }

  export type ExtraCreateWithoutTypeLinksInput = {
    id?: string
    name: string
    image?: string | null
    price?: number
    suppPrice?: number
    outOfStock?: boolean
    visible?: boolean
    sortOrder?: number
    createdAt?: Date | string
  }

  export type ExtraUncheckedCreateWithoutTypeLinksInput = {
    id?: string
    name: string
    image?: string | null
    price?: number
    suppPrice?: number
    outOfStock?: boolean
    visible?: boolean
    sortOrder?: number
    createdAt?: Date | string
  }

  export type ExtraCreateOrConnectWithoutTypeLinksInput = {
    where: ExtraWhereUniqueInput
    create: XOR<ExtraCreateWithoutTypeLinksInput, ExtraUncheckedCreateWithoutTypeLinksInput>
  }

  export type CompositionTypeUpsertWithoutExtrasInput = {
    update: XOR<CompositionTypeUpdateWithoutExtrasInput, CompositionTypeUncheckedUpdateWithoutExtrasInput>
    create: XOR<CompositionTypeCreateWithoutExtrasInput, CompositionTypeUncheckedCreateWithoutExtrasInput>
    where?: CompositionTypeWhereInput
  }

  export type CompositionTypeUpdateToOneWithWhereWithoutExtrasInput = {
    where?: CompositionTypeWhereInput
    data: XOR<CompositionTypeUpdateWithoutExtrasInput, CompositionTypeUncheckedUpdateWithoutExtrasInput>
  }

  export type CompositionTypeUpdateWithoutExtrasInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    min?: IntFieldUpdateOperationsInput | number
    max?: IntFieldUpdateOperationsInput | number
    payment?: BoolFieldUpdateOperationsInput | boolean
    selection?: BoolFieldUpdateOperationsInput | boolean
    mode?: EnumCompositionSlotModeFieldUpdateOperationsInput | $Enums.CompositionSlotMode
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productSteps?: ProductCompositionUpdateManyWithoutCompositionTypeNestedInput
  }

  export type CompositionTypeUncheckedUpdateWithoutExtrasInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    min?: IntFieldUpdateOperationsInput | number
    max?: IntFieldUpdateOperationsInput | number
    payment?: BoolFieldUpdateOperationsInput | boolean
    selection?: BoolFieldUpdateOperationsInput | boolean
    mode?: EnumCompositionSlotModeFieldUpdateOperationsInput | $Enums.CompositionSlotMode
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productSteps?: ProductCompositionUncheckedUpdateManyWithoutCompositionTypeNestedInput
  }

  export type ExtraUpsertWithoutTypeLinksInput = {
    update: XOR<ExtraUpdateWithoutTypeLinksInput, ExtraUncheckedUpdateWithoutTypeLinksInput>
    create: XOR<ExtraCreateWithoutTypeLinksInput, ExtraUncheckedCreateWithoutTypeLinksInput>
    where?: ExtraWhereInput
  }

  export type ExtraUpdateToOneWithWhereWithoutTypeLinksInput = {
    where?: ExtraWhereInput
    data: XOR<ExtraUpdateWithoutTypeLinksInput, ExtraUncheckedUpdateWithoutTypeLinksInput>
  }

  export type ExtraUpdateWithoutTypeLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    suppPrice?: IntFieldUpdateOperationsInput | number
    outOfStock?: BoolFieldUpdateOperationsInput | boolean
    visible?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExtraUncheckedUpdateWithoutTypeLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    suppPrice?: IntFieldUpdateOperationsInput | number
    outOfStock?: BoolFieldUpdateOperationsInput | boolean
    visible?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateWithoutCompositionsInput = {
    id?: string
    name: string
    description?: string | null
    image?: string | null
    kind?: $Enums.ProductKind
    price: number
    formulePrice?: number
    taxRateBps?: number | null
    modifiers?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    outOfStock?: boolean
    sortOrder?: number
    discountValue?: number
    originalPrice?: number | null
    discountStartDate?: Date | string | null
    discountEndDate?: Date | string | null
    createdAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    orderLines?: OrderLineCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutCompositionsInput = {
    id?: string
    categoryId: string
    name: string
    description?: string | null
    image?: string | null
    kind?: $Enums.ProductKind
    price: number
    formulePrice?: number
    taxRateBps?: number | null
    modifiers?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    outOfStock?: boolean
    sortOrder?: number
    discountValue?: number
    originalPrice?: number | null
    discountStartDate?: Date | string | null
    discountEndDate?: Date | string | null
    createdAt?: Date | string
    orderLines?: OrderLineUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutCompositionsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCompositionsInput, ProductUncheckedCreateWithoutCompositionsInput>
  }

  export type CompositionTypeCreateWithoutProductStepsInput = {
    id?: string
    name: string
    label: string
    message?: string | null
    min?: number
    max?: number
    payment?: boolean
    selection?: boolean
    mode?: $Enums.CompositionSlotMode
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    extras?: CompositionTypeExtraCreateNestedManyWithoutCompositionTypeInput
  }

  export type CompositionTypeUncheckedCreateWithoutProductStepsInput = {
    id?: string
    name: string
    label: string
    message?: string | null
    min?: number
    max?: number
    payment?: boolean
    selection?: boolean
    mode?: $Enums.CompositionSlotMode
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    extras?: CompositionTypeExtraUncheckedCreateNestedManyWithoutCompositionTypeInput
  }

  export type CompositionTypeCreateOrConnectWithoutProductStepsInput = {
    where: CompositionTypeWhereUniqueInput
    create: XOR<CompositionTypeCreateWithoutProductStepsInput, CompositionTypeUncheckedCreateWithoutProductStepsInput>
  }

  export type ProductUpsertWithoutCompositionsInput = {
    update: XOR<ProductUpdateWithoutCompositionsInput, ProductUncheckedUpdateWithoutCompositionsInput>
    create: XOR<ProductCreateWithoutCompositionsInput, ProductUncheckedCreateWithoutCompositionsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutCompositionsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutCompositionsInput, ProductUncheckedUpdateWithoutCompositionsInput>
  }

  export type ProductUpdateWithoutCompositionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: EnumProductKindFieldUpdateOperationsInput | $Enums.ProductKind
    price?: IntFieldUpdateOperationsInput | number
    formulePrice?: IntFieldUpdateOperationsInput | number
    taxRateBps?: NullableIntFieldUpdateOperationsInput | number | null
    modifiers?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    outOfStock?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    discountValue?: IntFieldUpdateOperationsInput | number
    originalPrice?: NullableIntFieldUpdateOperationsInput | number | null
    discountStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discountEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    orderLines?: OrderLineUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutCompositionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: EnumProductKindFieldUpdateOperationsInput | $Enums.ProductKind
    price?: IntFieldUpdateOperationsInput | number
    formulePrice?: IntFieldUpdateOperationsInput | number
    taxRateBps?: NullableIntFieldUpdateOperationsInput | number | null
    modifiers?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    outOfStock?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    discountValue?: IntFieldUpdateOperationsInput | number
    originalPrice?: NullableIntFieldUpdateOperationsInput | number | null
    discountStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discountEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderLines?: OrderLineUncheckedUpdateManyWithoutProductNestedInput
  }

  export type CompositionTypeUpsertWithoutProductStepsInput = {
    update: XOR<CompositionTypeUpdateWithoutProductStepsInput, CompositionTypeUncheckedUpdateWithoutProductStepsInput>
    create: XOR<CompositionTypeCreateWithoutProductStepsInput, CompositionTypeUncheckedCreateWithoutProductStepsInput>
    where?: CompositionTypeWhereInput
  }

  export type CompositionTypeUpdateToOneWithWhereWithoutProductStepsInput = {
    where?: CompositionTypeWhereInput
    data: XOR<CompositionTypeUpdateWithoutProductStepsInput, CompositionTypeUncheckedUpdateWithoutProductStepsInput>
  }

  export type CompositionTypeUpdateWithoutProductStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    min?: IntFieldUpdateOperationsInput | number
    max?: IntFieldUpdateOperationsInput | number
    payment?: BoolFieldUpdateOperationsInput | boolean
    selection?: BoolFieldUpdateOperationsInput | boolean
    mode?: EnumCompositionSlotModeFieldUpdateOperationsInput | $Enums.CompositionSlotMode
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    extras?: CompositionTypeExtraUpdateManyWithoutCompositionTypeNestedInput
  }

  export type CompositionTypeUncheckedUpdateWithoutProductStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    min?: IntFieldUpdateOperationsInput | number
    max?: IntFieldUpdateOperationsInput | number
    payment?: BoolFieldUpdateOperationsInput | boolean
    selection?: BoolFieldUpdateOperationsInput | boolean
    mode?: EnumCompositionSlotModeFieldUpdateOperationsInput | $Enums.CompositionSlotMode
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    extras?: CompositionTypeExtraUncheckedUpdateManyWithoutCompositionTypeNestedInput
  }

  export type CategoryCreateWithoutProductsInput = {
    id?: string
    name: string
    image?: string | null
    sortOrder?: number
    isActive?: boolean
    createdAt?: Date | string
  }

  export type CategoryUncheckedCreateWithoutProductsInput = {
    id?: string
    name: string
    image?: string | null
    sortOrder?: number
    isActive?: boolean
    createdAt?: Date | string
  }

  export type CategoryCreateOrConnectWithoutProductsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
  }

  export type ProductCompositionCreateWithoutProductInput = {
    sortOrder?: number
    compositionType: CompositionTypeCreateNestedOneWithoutProductStepsInput
  }

  export type ProductCompositionUncheckedCreateWithoutProductInput = {
    compositionTypeId: string
    sortOrder?: number
  }

  export type ProductCompositionCreateOrConnectWithoutProductInput = {
    where: ProductCompositionWhereUniqueInput
    create: XOR<ProductCompositionCreateWithoutProductInput, ProductCompositionUncheckedCreateWithoutProductInput>
  }

  export type ProductCompositionCreateManyProductInputEnvelope = {
    data: ProductCompositionCreateManyProductInput | ProductCompositionCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type OrderLineCreateWithoutProductInput = {
    id?: string
    quantity: number
    unitPriceCents: number
    lineTotalCents: number
    taxCents?: number
    modifiersSnapshot?: NullableJsonNullValueInput | InputJsonValue
    compositionSnapshot?: NullableJsonNullValueInput | InputJsonValue
    note?: string | null
    order: OrderCreateNestedOneWithoutLinesInput
  }

  export type OrderLineUncheckedCreateWithoutProductInput = {
    id?: string
    orderId: string
    quantity: number
    unitPriceCents: number
    lineTotalCents: number
    taxCents?: number
    modifiersSnapshot?: NullableJsonNullValueInput | InputJsonValue
    compositionSnapshot?: NullableJsonNullValueInput | InputJsonValue
    note?: string | null
  }

  export type OrderLineCreateOrConnectWithoutProductInput = {
    where: OrderLineWhereUniqueInput
    create: XOR<OrderLineCreateWithoutProductInput, OrderLineUncheckedCreateWithoutProductInput>
  }

  export type OrderLineCreateManyProductInputEnvelope = {
    data: OrderLineCreateManyProductInput | OrderLineCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithoutProductsInput = {
    update: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type CategoryUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCompositionUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductCompositionWhereUniqueInput
    update: XOR<ProductCompositionUpdateWithoutProductInput, ProductCompositionUncheckedUpdateWithoutProductInput>
    create: XOR<ProductCompositionCreateWithoutProductInput, ProductCompositionUncheckedCreateWithoutProductInput>
  }

  export type ProductCompositionUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductCompositionWhereUniqueInput
    data: XOR<ProductCompositionUpdateWithoutProductInput, ProductCompositionUncheckedUpdateWithoutProductInput>
  }

  export type ProductCompositionUpdateManyWithWhereWithoutProductInput = {
    where: ProductCompositionScalarWhereInput
    data: XOR<ProductCompositionUpdateManyMutationInput, ProductCompositionUncheckedUpdateManyWithoutProductInput>
  }

  export type OrderLineUpsertWithWhereUniqueWithoutProductInput = {
    where: OrderLineWhereUniqueInput
    update: XOR<OrderLineUpdateWithoutProductInput, OrderLineUncheckedUpdateWithoutProductInput>
    create: XOR<OrderLineCreateWithoutProductInput, OrderLineUncheckedCreateWithoutProductInput>
  }

  export type OrderLineUpdateWithWhereUniqueWithoutProductInput = {
    where: OrderLineWhereUniqueInput
    data: XOR<OrderLineUpdateWithoutProductInput, OrderLineUncheckedUpdateWithoutProductInput>
  }

  export type OrderLineUpdateManyWithWhereWithoutProductInput = {
    where: OrderLineScalarWhereInput
    data: XOR<OrderLineUpdateManyMutationInput, OrderLineUncheckedUpdateManyWithoutProductInput>
  }

  export type OrderLineScalarWhereInput = {
    AND?: OrderLineScalarWhereInput | OrderLineScalarWhereInput[]
    OR?: OrderLineScalarWhereInput[]
    NOT?: OrderLineScalarWhereInput | OrderLineScalarWhereInput[]
    id?: StringFilter<"OrderLine"> | string
    orderId?: StringFilter<"OrderLine"> | string
    productId?: StringFilter<"OrderLine"> | string
    quantity?: IntFilter<"OrderLine"> | number
    unitPriceCents?: IntFilter<"OrderLine"> | number
    lineTotalCents?: IntFilter<"OrderLine"> | number
    taxCents?: IntFilter<"OrderLine"> | number
    modifiersSnapshot?: JsonNullableFilter<"OrderLine">
    compositionSnapshot?: JsonNullableFilter<"OrderLine">
    note?: StringNullableFilter<"OrderLine"> | string | null
  }

  export type OrderCreateWithoutTableInput = {
    id?: string
    status?: $Enums.OrderStatus
    subtotalCents?: number
    taxCents?: number
    totalCents?: number
    idempotencyKey?: string | null
    customerName?: string | null
    customerEmail?: string | null
    commandNumber?: number | null
    currency?: string | null
    pack?: NullableJsonNullValueInput | InputJsonValue
    paymentMethod?: NullableJsonNullValueInput | InputJsonValue
    orderDiscountValue?: number
    logoPath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    staff?: StaffCreateNestedOneWithoutOrdersInput
    session?: CashierSessionCreateNestedOneWithoutOrdersInput
    lines?: OrderLineCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutTableInput = {
    id?: string
    status?: $Enums.OrderStatus
    staffId?: string | null
    sessionId?: string | null
    subtotalCents?: number
    taxCents?: number
    totalCents?: number
    idempotencyKey?: string | null
    customerName?: string | null
    customerEmail?: string | null
    commandNumber?: number | null
    currency?: string | null
    pack?: NullableJsonNullValueInput | InputJsonValue
    paymentMethod?: NullableJsonNullValueInput | InputJsonValue
    orderDiscountValue?: number
    logoPath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lines?: OrderLineUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutTableInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutTableInput, OrderUncheckedCreateWithoutTableInput>
  }

  export type OrderCreateManyTableInputEnvelope = {
    data: OrderCreateManyTableInput | OrderCreateManyTableInput[]
    skipDuplicates?: boolean
  }

  export type OrderUpsertWithWhereUniqueWithoutTableInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutTableInput, OrderUncheckedUpdateWithoutTableInput>
    create: XOR<OrderCreateWithoutTableInput, OrderUncheckedCreateWithoutTableInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutTableInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutTableInput, OrderUncheckedUpdateWithoutTableInput>
  }

  export type OrderUpdateManyWithWhereWithoutTableInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutTableInput>
  }

  export type StaffCreateWithoutSessionsInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role?: $Enums.StaffRole
    isActive?: boolean
    createdAt?: Date | string
    orders?: OrderCreateNestedManyWithoutStaffInput
  }

  export type StaffUncheckedCreateWithoutSessionsInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role?: $Enums.StaffRole
    isActive?: boolean
    createdAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutStaffInput
  }

  export type StaffCreateOrConnectWithoutSessionsInput = {
    where: StaffWhereUniqueInput
    create: XOR<StaffCreateWithoutSessionsInput, StaffUncheckedCreateWithoutSessionsInput>
  }

  export type OrderCreateWithoutSessionInput = {
    id?: string
    status?: $Enums.OrderStatus
    subtotalCents?: number
    taxCents?: number
    totalCents?: number
    idempotencyKey?: string | null
    customerName?: string | null
    customerEmail?: string | null
    commandNumber?: number | null
    currency?: string | null
    pack?: NullableJsonNullValueInput | InputJsonValue
    paymentMethod?: NullableJsonNullValueInput | InputJsonValue
    orderDiscountValue?: number
    logoPath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    table?: RestaurantTableCreateNestedOneWithoutOrdersInput
    staff?: StaffCreateNestedOneWithoutOrdersInput
    lines?: OrderLineCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutSessionInput = {
    id?: string
    status?: $Enums.OrderStatus
    tableId?: string | null
    staffId?: string | null
    subtotalCents?: number
    taxCents?: number
    totalCents?: number
    idempotencyKey?: string | null
    customerName?: string | null
    customerEmail?: string | null
    commandNumber?: number | null
    currency?: string | null
    pack?: NullableJsonNullValueInput | InputJsonValue
    paymentMethod?: NullableJsonNullValueInput | InputJsonValue
    orderDiscountValue?: number
    logoPath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lines?: OrderLineUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutSessionInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutSessionInput, OrderUncheckedCreateWithoutSessionInput>
  }

  export type OrderCreateManySessionInputEnvelope = {
    data: OrderCreateManySessionInput | OrderCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type StaffUpsertWithoutSessionsInput = {
    update: XOR<StaffUpdateWithoutSessionsInput, StaffUncheckedUpdateWithoutSessionsInput>
    create: XOR<StaffCreateWithoutSessionsInput, StaffUncheckedCreateWithoutSessionsInput>
    where?: StaffWhereInput
  }

  export type StaffUpdateToOneWithWhereWithoutSessionsInput = {
    where?: StaffWhereInput
    data: XOR<StaffUpdateWithoutSessionsInput, StaffUncheckedUpdateWithoutSessionsInput>
  }

  export type StaffUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumStaffRoleFieldUpdateOperationsInput | $Enums.StaffRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutStaffNestedInput
  }

  export type StaffUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumStaffRoleFieldUpdateOperationsInput | $Enums.StaffRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutStaffNestedInput
  }

  export type OrderUpsertWithWhereUniqueWithoutSessionInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutSessionInput, OrderUncheckedUpdateWithoutSessionInput>
    create: XOR<OrderCreateWithoutSessionInput, OrderUncheckedCreateWithoutSessionInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutSessionInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutSessionInput, OrderUncheckedUpdateWithoutSessionInput>
  }

  export type OrderUpdateManyWithWhereWithoutSessionInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutSessionInput>
  }

  export type RestaurantTableCreateWithoutOrdersInput = {
    id?: string
    name: string
    zone?: string | null
    sortOrder?: number
    isActive?: boolean
    createdAt?: Date | string
  }

  export type RestaurantTableUncheckedCreateWithoutOrdersInput = {
    id?: string
    name: string
    zone?: string | null
    sortOrder?: number
    isActive?: boolean
    createdAt?: Date | string
  }

  export type RestaurantTableCreateOrConnectWithoutOrdersInput = {
    where: RestaurantTableWhereUniqueInput
    create: XOR<RestaurantTableCreateWithoutOrdersInput, RestaurantTableUncheckedCreateWithoutOrdersInput>
  }

  export type StaffCreateWithoutOrdersInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role?: $Enums.StaffRole
    isActive?: boolean
    createdAt?: Date | string
    sessions?: CashierSessionCreateNestedManyWithoutStaffInput
  }

  export type StaffUncheckedCreateWithoutOrdersInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role?: $Enums.StaffRole
    isActive?: boolean
    createdAt?: Date | string
    sessions?: CashierSessionUncheckedCreateNestedManyWithoutStaffInput
  }

  export type StaffCreateOrConnectWithoutOrdersInput = {
    where: StaffWhereUniqueInput
    create: XOR<StaffCreateWithoutOrdersInput, StaffUncheckedCreateWithoutOrdersInput>
  }

  export type CashierSessionCreateWithoutOrdersInput = {
    id?: string
    openedAt?: Date | string
    closedAt?: Date | string | null
    openingFloatCents?: number
    closingNote?: string | null
    staff: StaffCreateNestedOneWithoutSessionsInput
  }

  export type CashierSessionUncheckedCreateWithoutOrdersInput = {
    id?: string
    staffId: string
    openedAt?: Date | string
    closedAt?: Date | string | null
    openingFloatCents?: number
    closingNote?: string | null
  }

  export type CashierSessionCreateOrConnectWithoutOrdersInput = {
    where: CashierSessionWhereUniqueInput
    create: XOR<CashierSessionCreateWithoutOrdersInput, CashierSessionUncheckedCreateWithoutOrdersInput>
  }

  export type OrderLineCreateWithoutOrderInput = {
    id?: string
    quantity: number
    unitPriceCents: number
    lineTotalCents: number
    taxCents?: number
    modifiersSnapshot?: NullableJsonNullValueInput | InputJsonValue
    compositionSnapshot?: NullableJsonNullValueInput | InputJsonValue
    note?: string | null
    product: ProductCreateNestedOneWithoutOrderLinesInput
  }

  export type OrderLineUncheckedCreateWithoutOrderInput = {
    id?: string
    productId: string
    quantity: number
    unitPriceCents: number
    lineTotalCents: number
    taxCents?: number
    modifiersSnapshot?: NullableJsonNullValueInput | InputJsonValue
    compositionSnapshot?: NullableJsonNullValueInput | InputJsonValue
    note?: string | null
  }

  export type OrderLineCreateOrConnectWithoutOrderInput = {
    where: OrderLineWhereUniqueInput
    create: XOR<OrderLineCreateWithoutOrderInput, OrderLineUncheckedCreateWithoutOrderInput>
  }

  export type OrderLineCreateManyOrderInputEnvelope = {
    data: OrderLineCreateManyOrderInput | OrderLineCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type RestaurantTableUpsertWithoutOrdersInput = {
    update: XOR<RestaurantTableUpdateWithoutOrdersInput, RestaurantTableUncheckedUpdateWithoutOrdersInput>
    create: XOR<RestaurantTableCreateWithoutOrdersInput, RestaurantTableUncheckedCreateWithoutOrdersInput>
    where?: RestaurantTableWhereInput
  }

  export type RestaurantTableUpdateToOneWithWhereWithoutOrdersInput = {
    where?: RestaurantTableWhereInput
    data: XOR<RestaurantTableUpdateWithoutOrdersInput, RestaurantTableUncheckedUpdateWithoutOrdersInput>
  }

  export type RestaurantTableUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    zone?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RestaurantTableUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    zone?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffUpsertWithoutOrdersInput = {
    update: XOR<StaffUpdateWithoutOrdersInput, StaffUncheckedUpdateWithoutOrdersInput>
    create: XOR<StaffCreateWithoutOrdersInput, StaffUncheckedCreateWithoutOrdersInput>
    where?: StaffWhereInput
  }

  export type StaffUpdateToOneWithWhereWithoutOrdersInput = {
    where?: StaffWhereInput
    data: XOR<StaffUpdateWithoutOrdersInput, StaffUncheckedUpdateWithoutOrdersInput>
  }

  export type StaffUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumStaffRoleFieldUpdateOperationsInput | $Enums.StaffRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: CashierSessionUpdateManyWithoutStaffNestedInput
  }

  export type StaffUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumStaffRoleFieldUpdateOperationsInput | $Enums.StaffRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: CashierSessionUncheckedUpdateManyWithoutStaffNestedInput
  }

  export type CashierSessionUpsertWithoutOrdersInput = {
    update: XOR<CashierSessionUpdateWithoutOrdersInput, CashierSessionUncheckedUpdateWithoutOrdersInput>
    create: XOR<CashierSessionCreateWithoutOrdersInput, CashierSessionUncheckedCreateWithoutOrdersInput>
    where?: CashierSessionWhereInput
  }

  export type CashierSessionUpdateToOneWithWhereWithoutOrdersInput = {
    where?: CashierSessionWhereInput
    data: XOR<CashierSessionUpdateWithoutOrdersInput, CashierSessionUncheckedUpdateWithoutOrdersInput>
  }

  export type CashierSessionUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openingFloatCents?: IntFieldUpdateOperationsInput | number
    closingNote?: NullableStringFieldUpdateOperationsInput | string | null
    staff?: StaffUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type CashierSessionUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openingFloatCents?: IntFieldUpdateOperationsInput | number
    closingNote?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderLineUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderLineWhereUniqueInput
    update: XOR<OrderLineUpdateWithoutOrderInput, OrderLineUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderLineCreateWithoutOrderInput, OrderLineUncheckedCreateWithoutOrderInput>
  }

  export type OrderLineUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderLineWhereUniqueInput
    data: XOR<OrderLineUpdateWithoutOrderInput, OrderLineUncheckedUpdateWithoutOrderInput>
  }

  export type OrderLineUpdateManyWithWhereWithoutOrderInput = {
    where: OrderLineScalarWhereInput
    data: XOR<OrderLineUpdateManyMutationInput, OrderLineUncheckedUpdateManyWithoutOrderInput>
  }

  export type OrderCreateWithoutLinesInput = {
    id?: string
    status?: $Enums.OrderStatus
    subtotalCents?: number
    taxCents?: number
    totalCents?: number
    idempotencyKey?: string | null
    customerName?: string | null
    customerEmail?: string | null
    commandNumber?: number | null
    currency?: string | null
    pack?: NullableJsonNullValueInput | InputJsonValue
    paymentMethod?: NullableJsonNullValueInput | InputJsonValue
    orderDiscountValue?: number
    logoPath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    table?: RestaurantTableCreateNestedOneWithoutOrdersInput
    staff?: StaffCreateNestedOneWithoutOrdersInput
    session?: CashierSessionCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateWithoutLinesInput = {
    id?: string
    status?: $Enums.OrderStatus
    tableId?: string | null
    staffId?: string | null
    sessionId?: string | null
    subtotalCents?: number
    taxCents?: number
    totalCents?: number
    idempotencyKey?: string | null
    customerName?: string | null
    customerEmail?: string | null
    commandNumber?: number | null
    currency?: string | null
    pack?: NullableJsonNullValueInput | InputJsonValue
    paymentMethod?: NullableJsonNullValueInput | InputJsonValue
    orderDiscountValue?: number
    logoPath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateOrConnectWithoutLinesInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutLinesInput, OrderUncheckedCreateWithoutLinesInput>
  }

  export type ProductCreateWithoutOrderLinesInput = {
    id?: string
    name: string
    description?: string | null
    image?: string | null
    kind?: $Enums.ProductKind
    price: number
    formulePrice?: number
    taxRateBps?: number | null
    modifiers?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    outOfStock?: boolean
    sortOrder?: number
    discountValue?: number
    originalPrice?: number | null
    discountStartDate?: Date | string | null
    discountEndDate?: Date | string | null
    createdAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    compositions?: ProductCompositionCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutOrderLinesInput = {
    id?: string
    categoryId: string
    name: string
    description?: string | null
    image?: string | null
    kind?: $Enums.ProductKind
    price: number
    formulePrice?: number
    taxRateBps?: number | null
    modifiers?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    outOfStock?: boolean
    sortOrder?: number
    discountValue?: number
    originalPrice?: number | null
    discountStartDate?: Date | string | null
    discountEndDate?: Date | string | null
    createdAt?: Date | string
    compositions?: ProductCompositionUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutOrderLinesInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutOrderLinesInput, ProductUncheckedCreateWithoutOrderLinesInput>
  }

  export type OrderUpsertWithoutLinesInput = {
    update: XOR<OrderUpdateWithoutLinesInput, OrderUncheckedUpdateWithoutLinesInput>
    create: XOR<OrderCreateWithoutLinesInput, OrderUncheckedCreateWithoutLinesInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutLinesInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutLinesInput, OrderUncheckedUpdateWithoutLinesInput>
  }

  export type OrderUpdateWithoutLinesInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    subtotalCents?: IntFieldUpdateOperationsInput | number
    taxCents?: IntFieldUpdateOperationsInput | number
    totalCents?: IntFieldUpdateOperationsInput | number
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    commandNumber?: NullableIntFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    pack?: NullableJsonNullValueInput | InputJsonValue
    paymentMethod?: NullableJsonNullValueInput | InputJsonValue
    orderDiscountValue?: IntFieldUpdateOperationsInput | number
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    table?: RestaurantTableUpdateOneWithoutOrdersNestedInput
    staff?: StaffUpdateOneWithoutOrdersNestedInput
    session?: CashierSessionUpdateOneWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateWithoutLinesInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    tableId?: NullableStringFieldUpdateOperationsInput | string | null
    staffId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    subtotalCents?: IntFieldUpdateOperationsInput | number
    taxCents?: IntFieldUpdateOperationsInput | number
    totalCents?: IntFieldUpdateOperationsInput | number
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    commandNumber?: NullableIntFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    pack?: NullableJsonNullValueInput | InputJsonValue
    paymentMethod?: NullableJsonNullValueInput | InputJsonValue
    orderDiscountValue?: IntFieldUpdateOperationsInput | number
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUpsertWithoutOrderLinesInput = {
    update: XOR<ProductUpdateWithoutOrderLinesInput, ProductUncheckedUpdateWithoutOrderLinesInput>
    create: XOR<ProductCreateWithoutOrderLinesInput, ProductUncheckedCreateWithoutOrderLinesInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutOrderLinesInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutOrderLinesInput, ProductUncheckedUpdateWithoutOrderLinesInput>
  }

  export type ProductUpdateWithoutOrderLinesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: EnumProductKindFieldUpdateOperationsInput | $Enums.ProductKind
    price?: IntFieldUpdateOperationsInput | number
    formulePrice?: IntFieldUpdateOperationsInput | number
    taxRateBps?: NullableIntFieldUpdateOperationsInput | number | null
    modifiers?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    outOfStock?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    discountValue?: IntFieldUpdateOperationsInput | number
    originalPrice?: NullableIntFieldUpdateOperationsInput | number | null
    discountStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discountEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    compositions?: ProductCompositionUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutOrderLinesInput = {
    id?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: EnumProductKindFieldUpdateOperationsInput | $Enums.ProductKind
    price?: IntFieldUpdateOperationsInput | number
    formulePrice?: IntFieldUpdateOperationsInput | number
    taxRateBps?: NullableIntFieldUpdateOperationsInput | number | null
    modifiers?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    outOfStock?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    discountValue?: IntFieldUpdateOperationsInput | number
    originalPrice?: NullableIntFieldUpdateOperationsInput | number | null
    discountStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discountEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    compositions?: ProductCompositionUncheckedUpdateManyWithoutProductNestedInput
  }

  export type CashierSessionCreateManyStaffInput = {
    id?: string
    openedAt?: Date | string
    closedAt?: Date | string | null
    openingFloatCents?: number
    closingNote?: string | null
  }

  export type OrderCreateManyStaffInput = {
    id?: string
    status?: $Enums.OrderStatus
    tableId?: string | null
    sessionId?: string | null
    subtotalCents?: number
    taxCents?: number
    totalCents?: number
    idempotencyKey?: string | null
    customerName?: string | null
    customerEmail?: string | null
    commandNumber?: number | null
    currency?: string | null
    pack?: NullableJsonNullValueInput | InputJsonValue
    paymentMethod?: NullableJsonNullValueInput | InputJsonValue
    orderDiscountValue?: number
    logoPath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CashierSessionUpdateWithoutStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openingFloatCents?: IntFieldUpdateOperationsInput | number
    closingNote?: NullableStringFieldUpdateOperationsInput | string | null
    orders?: OrderUpdateManyWithoutSessionNestedInput
  }

  export type CashierSessionUncheckedUpdateWithoutStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openingFloatCents?: IntFieldUpdateOperationsInput | number
    closingNote?: NullableStringFieldUpdateOperationsInput | string | null
    orders?: OrderUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type CashierSessionUncheckedUpdateManyWithoutStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openingFloatCents?: IntFieldUpdateOperationsInput | number
    closingNote?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderUpdateWithoutStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    subtotalCents?: IntFieldUpdateOperationsInput | number
    taxCents?: IntFieldUpdateOperationsInput | number
    totalCents?: IntFieldUpdateOperationsInput | number
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    commandNumber?: NullableIntFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    pack?: NullableJsonNullValueInput | InputJsonValue
    paymentMethod?: NullableJsonNullValueInput | InputJsonValue
    orderDiscountValue?: IntFieldUpdateOperationsInput | number
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    table?: RestaurantTableUpdateOneWithoutOrdersNestedInput
    session?: CashierSessionUpdateOneWithoutOrdersNestedInput
    lines?: OrderLineUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    tableId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    subtotalCents?: IntFieldUpdateOperationsInput | number
    taxCents?: IntFieldUpdateOperationsInput | number
    totalCents?: IntFieldUpdateOperationsInput | number
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    commandNumber?: NullableIntFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    pack?: NullableJsonNullValueInput | InputJsonValue
    paymentMethod?: NullableJsonNullValueInput | InputJsonValue
    orderDiscountValue?: IntFieldUpdateOperationsInput | number
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lines?: OrderLineUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    tableId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    subtotalCents?: IntFieldUpdateOperationsInput | number
    taxCents?: IntFieldUpdateOperationsInput | number
    totalCents?: IntFieldUpdateOperationsInput | number
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    commandNumber?: NullableIntFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    pack?: NullableJsonNullValueInput | InputJsonValue
    paymentMethod?: NullableJsonNullValueInput | InputJsonValue
    orderDiscountValue?: IntFieldUpdateOperationsInput | number
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateManyCategoryInput = {
    id?: string
    name: string
    description?: string | null
    image?: string | null
    kind?: $Enums.ProductKind
    price: number
    formulePrice?: number
    taxRateBps?: number | null
    modifiers?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    outOfStock?: boolean
    sortOrder?: number
    discountValue?: number
    originalPrice?: number | null
    discountStartDate?: Date | string | null
    discountEndDate?: Date | string | null
    createdAt?: Date | string
  }

  export type ProductUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: EnumProductKindFieldUpdateOperationsInput | $Enums.ProductKind
    price?: IntFieldUpdateOperationsInput | number
    formulePrice?: IntFieldUpdateOperationsInput | number
    taxRateBps?: NullableIntFieldUpdateOperationsInput | number | null
    modifiers?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    outOfStock?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    discountValue?: IntFieldUpdateOperationsInput | number
    originalPrice?: NullableIntFieldUpdateOperationsInput | number | null
    discountStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discountEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    compositions?: ProductCompositionUpdateManyWithoutProductNestedInput
    orderLines?: OrderLineUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: EnumProductKindFieldUpdateOperationsInput | $Enums.ProductKind
    price?: IntFieldUpdateOperationsInput | number
    formulePrice?: IntFieldUpdateOperationsInput | number
    taxRateBps?: NullableIntFieldUpdateOperationsInput | number | null
    modifiers?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    outOfStock?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    discountValue?: IntFieldUpdateOperationsInput | number
    originalPrice?: NullableIntFieldUpdateOperationsInput | number | null
    discountStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discountEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    compositions?: ProductCompositionUncheckedUpdateManyWithoutProductNestedInput
    orderLines?: OrderLineUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: EnumProductKindFieldUpdateOperationsInput | $Enums.ProductKind
    price?: IntFieldUpdateOperationsInput | number
    formulePrice?: IntFieldUpdateOperationsInput | number
    taxRateBps?: NullableIntFieldUpdateOperationsInput | number | null
    modifiers?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    outOfStock?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    discountValue?: IntFieldUpdateOperationsInput | number
    originalPrice?: NullableIntFieldUpdateOperationsInput | number | null
    discountStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discountEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompositionTypeExtraCreateManyExtraInput = {
    compositionTypeId: string
    position?: number
  }

  export type CompositionTypeExtraUpdateWithoutExtraInput = {
    position?: IntFieldUpdateOperationsInput | number
    compositionType?: CompositionTypeUpdateOneRequiredWithoutExtrasNestedInput
  }

  export type CompositionTypeExtraUncheckedUpdateWithoutExtraInput = {
    compositionTypeId?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
  }

  export type CompositionTypeExtraUncheckedUpdateManyWithoutExtraInput = {
    compositionTypeId?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
  }

  export type CompositionTypeExtraCreateManyCompositionTypeInput = {
    extraId: string
    position?: number
  }

  export type ProductCompositionCreateManyCompositionTypeInput = {
    productId: string
    sortOrder?: number
  }

  export type CompositionTypeExtraUpdateWithoutCompositionTypeInput = {
    position?: IntFieldUpdateOperationsInput | number
    extra?: ExtraUpdateOneRequiredWithoutTypeLinksNestedInput
  }

  export type CompositionTypeExtraUncheckedUpdateWithoutCompositionTypeInput = {
    extraId?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
  }

  export type CompositionTypeExtraUncheckedUpdateManyWithoutCompositionTypeInput = {
    extraId?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
  }

  export type ProductCompositionUpdateWithoutCompositionTypeInput = {
    sortOrder?: IntFieldUpdateOperationsInput | number
    product?: ProductUpdateOneRequiredWithoutCompositionsNestedInput
  }

  export type ProductCompositionUncheckedUpdateWithoutCompositionTypeInput = {
    productId?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ProductCompositionUncheckedUpdateManyWithoutCompositionTypeInput = {
    productId?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ProductCompositionCreateManyProductInput = {
    compositionTypeId: string
    sortOrder?: number
  }

  export type OrderLineCreateManyProductInput = {
    id?: string
    orderId: string
    quantity: number
    unitPriceCents: number
    lineTotalCents: number
    taxCents?: number
    modifiersSnapshot?: NullableJsonNullValueInput | InputJsonValue
    compositionSnapshot?: NullableJsonNullValueInput | InputJsonValue
    note?: string | null
  }

  export type ProductCompositionUpdateWithoutProductInput = {
    sortOrder?: IntFieldUpdateOperationsInput | number
    compositionType?: CompositionTypeUpdateOneRequiredWithoutProductStepsNestedInput
  }

  export type ProductCompositionUncheckedUpdateWithoutProductInput = {
    compositionTypeId?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ProductCompositionUncheckedUpdateManyWithoutProductInput = {
    compositionTypeId?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type OrderLineUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPriceCents?: IntFieldUpdateOperationsInput | number
    lineTotalCents?: IntFieldUpdateOperationsInput | number
    taxCents?: IntFieldUpdateOperationsInput | number
    modifiersSnapshot?: NullableJsonNullValueInput | InputJsonValue
    compositionSnapshot?: NullableJsonNullValueInput | InputJsonValue
    note?: NullableStringFieldUpdateOperationsInput | string | null
    order?: OrderUpdateOneRequiredWithoutLinesNestedInput
  }

  export type OrderLineUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPriceCents?: IntFieldUpdateOperationsInput | number
    lineTotalCents?: IntFieldUpdateOperationsInput | number
    taxCents?: IntFieldUpdateOperationsInput | number
    modifiersSnapshot?: NullableJsonNullValueInput | InputJsonValue
    compositionSnapshot?: NullableJsonNullValueInput | InputJsonValue
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderLineUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPriceCents?: IntFieldUpdateOperationsInput | number
    lineTotalCents?: IntFieldUpdateOperationsInput | number
    taxCents?: IntFieldUpdateOperationsInput | number
    modifiersSnapshot?: NullableJsonNullValueInput | InputJsonValue
    compositionSnapshot?: NullableJsonNullValueInput | InputJsonValue
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderCreateManyTableInput = {
    id?: string
    status?: $Enums.OrderStatus
    staffId?: string | null
    sessionId?: string | null
    subtotalCents?: number
    taxCents?: number
    totalCents?: number
    idempotencyKey?: string | null
    customerName?: string | null
    customerEmail?: string | null
    commandNumber?: number | null
    currency?: string | null
    pack?: NullableJsonNullValueInput | InputJsonValue
    paymentMethod?: NullableJsonNullValueInput | InputJsonValue
    orderDiscountValue?: number
    logoPath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateWithoutTableInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    subtotalCents?: IntFieldUpdateOperationsInput | number
    taxCents?: IntFieldUpdateOperationsInput | number
    totalCents?: IntFieldUpdateOperationsInput | number
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    commandNumber?: NullableIntFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    pack?: NullableJsonNullValueInput | InputJsonValue
    paymentMethod?: NullableJsonNullValueInput | InputJsonValue
    orderDiscountValue?: IntFieldUpdateOperationsInput | number
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    staff?: StaffUpdateOneWithoutOrdersNestedInput
    session?: CashierSessionUpdateOneWithoutOrdersNestedInput
    lines?: OrderLineUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutTableInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    staffId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    subtotalCents?: IntFieldUpdateOperationsInput | number
    taxCents?: IntFieldUpdateOperationsInput | number
    totalCents?: IntFieldUpdateOperationsInput | number
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    commandNumber?: NullableIntFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    pack?: NullableJsonNullValueInput | InputJsonValue
    paymentMethod?: NullableJsonNullValueInput | InputJsonValue
    orderDiscountValue?: IntFieldUpdateOperationsInput | number
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lines?: OrderLineUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutTableInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    staffId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    subtotalCents?: IntFieldUpdateOperationsInput | number
    taxCents?: IntFieldUpdateOperationsInput | number
    totalCents?: IntFieldUpdateOperationsInput | number
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    commandNumber?: NullableIntFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    pack?: NullableJsonNullValueInput | InputJsonValue
    paymentMethod?: NullableJsonNullValueInput | InputJsonValue
    orderDiscountValue?: IntFieldUpdateOperationsInput | number
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateManySessionInput = {
    id?: string
    status?: $Enums.OrderStatus
    tableId?: string | null
    staffId?: string | null
    subtotalCents?: number
    taxCents?: number
    totalCents?: number
    idempotencyKey?: string | null
    customerName?: string | null
    customerEmail?: string | null
    commandNumber?: number | null
    currency?: string | null
    pack?: NullableJsonNullValueInput | InputJsonValue
    paymentMethod?: NullableJsonNullValueInput | InputJsonValue
    orderDiscountValue?: number
    logoPath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    subtotalCents?: IntFieldUpdateOperationsInput | number
    taxCents?: IntFieldUpdateOperationsInput | number
    totalCents?: IntFieldUpdateOperationsInput | number
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    commandNumber?: NullableIntFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    pack?: NullableJsonNullValueInput | InputJsonValue
    paymentMethod?: NullableJsonNullValueInput | InputJsonValue
    orderDiscountValue?: IntFieldUpdateOperationsInput | number
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    table?: RestaurantTableUpdateOneWithoutOrdersNestedInput
    staff?: StaffUpdateOneWithoutOrdersNestedInput
    lines?: OrderLineUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    tableId?: NullableStringFieldUpdateOperationsInput | string | null
    staffId?: NullableStringFieldUpdateOperationsInput | string | null
    subtotalCents?: IntFieldUpdateOperationsInput | number
    taxCents?: IntFieldUpdateOperationsInput | number
    totalCents?: IntFieldUpdateOperationsInput | number
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    commandNumber?: NullableIntFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    pack?: NullableJsonNullValueInput | InputJsonValue
    paymentMethod?: NullableJsonNullValueInput | InputJsonValue
    orderDiscountValue?: IntFieldUpdateOperationsInput | number
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lines?: OrderLineUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    tableId?: NullableStringFieldUpdateOperationsInput | string | null
    staffId?: NullableStringFieldUpdateOperationsInput | string | null
    subtotalCents?: IntFieldUpdateOperationsInput | number
    taxCents?: IntFieldUpdateOperationsInput | number
    totalCents?: IntFieldUpdateOperationsInput | number
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    commandNumber?: NullableIntFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    pack?: NullableJsonNullValueInput | InputJsonValue
    paymentMethod?: NullableJsonNullValueInput | InputJsonValue
    orderDiscountValue?: IntFieldUpdateOperationsInput | number
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderLineCreateManyOrderInput = {
    id?: string
    productId: string
    quantity: number
    unitPriceCents: number
    lineTotalCents: number
    taxCents?: number
    modifiersSnapshot?: NullableJsonNullValueInput | InputJsonValue
    compositionSnapshot?: NullableJsonNullValueInput | InputJsonValue
    note?: string | null
  }

  export type OrderLineUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPriceCents?: IntFieldUpdateOperationsInput | number
    lineTotalCents?: IntFieldUpdateOperationsInput | number
    taxCents?: IntFieldUpdateOperationsInput | number
    modifiersSnapshot?: NullableJsonNullValueInput | InputJsonValue
    compositionSnapshot?: NullableJsonNullValueInput | InputJsonValue
    note?: NullableStringFieldUpdateOperationsInput | string | null
    product?: ProductUpdateOneRequiredWithoutOrderLinesNestedInput
  }

  export type OrderLineUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPriceCents?: IntFieldUpdateOperationsInput | number
    lineTotalCents?: IntFieldUpdateOperationsInput | number
    taxCents?: IntFieldUpdateOperationsInput | number
    modifiersSnapshot?: NullableJsonNullValueInput | InputJsonValue
    compositionSnapshot?: NullableJsonNullValueInput | InputJsonValue
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderLineUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPriceCents?: IntFieldUpdateOperationsInput | number
    lineTotalCents?: IntFieldUpdateOperationsInput | number
    taxCents?: IntFieldUpdateOperationsInput | number
    modifiersSnapshot?: NullableJsonNullValueInput | InputJsonValue
    compositionSnapshot?: NullableJsonNullValueInput | InputJsonValue
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use StaffCountOutputTypeDefaultArgs instead
     */
    export type StaffCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StaffCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CategoryCountOutputTypeDefaultArgs instead
     */
    export type CategoryCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoryCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExtraCountOutputTypeDefaultArgs instead
     */
    export type ExtraCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExtraCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CompositionTypeCountOutputTypeDefaultArgs instead
     */
    export type CompositionTypeCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CompositionTypeCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductCountOutputTypeDefaultArgs instead
     */
    export type ProductCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RestaurantTableCountOutputTypeDefaultArgs instead
     */
    export type RestaurantTableCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RestaurantTableCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CashierSessionCountOutputTypeDefaultArgs instead
     */
    export type CashierSessionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CashierSessionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OrderCountOutputTypeDefaultArgs instead
     */
    export type OrderCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OrderCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StaffDefaultArgs instead
     */
    export type StaffArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StaffDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CategoryDefaultArgs instead
     */
    export type CategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExtraDefaultArgs instead
     */
    export type ExtraArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExtraDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CompositionTypeDefaultArgs instead
     */
    export type CompositionTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CompositionTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CompositionTypeExtraDefaultArgs instead
     */
    export type CompositionTypeExtraArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CompositionTypeExtraDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductCompositionDefaultArgs instead
     */
    export type ProductCompositionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductCompositionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductDefaultArgs instead
     */
    export type ProductArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RestaurantTableDefaultArgs instead
     */
    export type RestaurantTableArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RestaurantTableDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CashierSessionDefaultArgs instead
     */
    export type CashierSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CashierSessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OrderDefaultArgs instead
     */
    export type OrderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OrderDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OrderLineDefaultArgs instead
     */
    export type OrderLineArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OrderLineDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SettingDefaultArgs instead
     */
    export type SettingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SettingDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}