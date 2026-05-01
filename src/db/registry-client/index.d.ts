
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
 * Model Tenant
 * Platform registry: one row per restaurant tenant; databaseUrl points at the tenant Postgres database.
 */
export type Tenant = $Result.DefaultSelection<Prisma.$TenantPayload>
/**
 * Model StaffLoginDirectory
 * Maps staff email (platform-wide unique) → tenant + staff row for slugless mobile login. Password stays in tenant DB.
 */
export type StaffLoginDirectory = $Result.DefaultSelection<Prisma.$StaffLoginDirectoryPayload>
/**
 * Model Owner
 * 
 */
export type Owner = $Result.DefaultSelection<Prisma.$OwnerPayload>
/**
 * Model PlatformAdmin
 * Global platform operator (you). Login at POST /platform/v1/auth/login — separate from restaurant staff.
 */
export type PlatformAdmin = $Result.DefaultSelection<Prisma.$PlatformAdminPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Tenants
 * const tenants = await prisma.tenant.findMany()
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
   * // Fetch zero or more Tenants
   * const tenants = await prisma.tenant.findMany()
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
   * `prisma.tenant`: Exposes CRUD operations for the **Tenant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tenants
    * const tenants = await prisma.tenant.findMany()
    * ```
    */
  get tenant(): Prisma.TenantDelegate<ExtArgs>;

  /**
   * `prisma.staffLoginDirectory`: Exposes CRUD operations for the **StaffLoginDirectory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StaffLoginDirectories
    * const staffLoginDirectories = await prisma.staffLoginDirectory.findMany()
    * ```
    */
  get staffLoginDirectory(): Prisma.StaffLoginDirectoryDelegate<ExtArgs>;

  /**
   * `prisma.owner`: Exposes CRUD operations for the **Owner** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Owners
    * const owners = await prisma.owner.findMany()
    * ```
    */
  get owner(): Prisma.OwnerDelegate<ExtArgs>;

  /**
   * `prisma.platformAdmin`: Exposes CRUD operations for the **PlatformAdmin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlatformAdmins
    * const platformAdmins = await prisma.platformAdmin.findMany()
    * ```
    */
  get platformAdmin(): Prisma.PlatformAdminDelegate<ExtArgs>;
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
    Tenant: 'Tenant',
    StaffLoginDirectory: 'StaffLoginDirectory',
    Owner: 'Owner',
    PlatformAdmin: 'PlatformAdmin'
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
      modelProps: "tenant" | "staffLoginDirectory" | "owner" | "platformAdmin"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Tenant: {
        payload: Prisma.$TenantPayload<ExtArgs>
        fields: Prisma.TenantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TenantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TenantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findFirst: {
            args: Prisma.TenantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TenantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findMany: {
            args: Prisma.TenantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          create: {
            args: Prisma.TenantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          createMany: {
            args: Prisma.TenantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TenantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          delete: {
            args: Prisma.TenantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          update: {
            args: Prisma.TenantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          deleteMany: {
            args: Prisma.TenantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TenantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TenantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          aggregate: {
            args: Prisma.TenantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTenant>
          }
          groupBy: {
            args: Prisma.TenantGroupByArgs<ExtArgs>
            result: $Utils.Optional<TenantGroupByOutputType>[]
          }
          count: {
            args: Prisma.TenantCountArgs<ExtArgs>
            result: $Utils.Optional<TenantCountAggregateOutputType> | number
          }
        }
      }
      StaffLoginDirectory: {
        payload: Prisma.$StaffLoginDirectoryPayload<ExtArgs>
        fields: Prisma.StaffLoginDirectoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StaffLoginDirectoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffLoginDirectoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StaffLoginDirectoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffLoginDirectoryPayload>
          }
          findFirst: {
            args: Prisma.StaffLoginDirectoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffLoginDirectoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StaffLoginDirectoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffLoginDirectoryPayload>
          }
          findMany: {
            args: Prisma.StaffLoginDirectoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffLoginDirectoryPayload>[]
          }
          create: {
            args: Prisma.StaffLoginDirectoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffLoginDirectoryPayload>
          }
          createMany: {
            args: Prisma.StaffLoginDirectoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StaffLoginDirectoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffLoginDirectoryPayload>[]
          }
          delete: {
            args: Prisma.StaffLoginDirectoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffLoginDirectoryPayload>
          }
          update: {
            args: Prisma.StaffLoginDirectoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffLoginDirectoryPayload>
          }
          deleteMany: {
            args: Prisma.StaffLoginDirectoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StaffLoginDirectoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StaffLoginDirectoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffLoginDirectoryPayload>
          }
          aggregate: {
            args: Prisma.StaffLoginDirectoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStaffLoginDirectory>
          }
          groupBy: {
            args: Prisma.StaffLoginDirectoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<StaffLoginDirectoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.StaffLoginDirectoryCountArgs<ExtArgs>
            result: $Utils.Optional<StaffLoginDirectoryCountAggregateOutputType> | number
          }
        }
      }
      Owner: {
        payload: Prisma.$OwnerPayload<ExtArgs>
        fields: Prisma.OwnerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OwnerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OwnerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload>
          }
          findFirst: {
            args: Prisma.OwnerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OwnerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload>
          }
          findMany: {
            args: Prisma.OwnerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload>[]
          }
          create: {
            args: Prisma.OwnerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload>
          }
          createMany: {
            args: Prisma.OwnerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OwnerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload>[]
          }
          delete: {
            args: Prisma.OwnerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload>
          }
          update: {
            args: Prisma.OwnerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload>
          }
          deleteMany: {
            args: Prisma.OwnerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OwnerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OwnerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload>
          }
          aggregate: {
            args: Prisma.OwnerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOwner>
          }
          groupBy: {
            args: Prisma.OwnerGroupByArgs<ExtArgs>
            result: $Utils.Optional<OwnerGroupByOutputType>[]
          }
          count: {
            args: Prisma.OwnerCountArgs<ExtArgs>
            result: $Utils.Optional<OwnerCountAggregateOutputType> | number
          }
        }
      }
      PlatformAdmin: {
        payload: Prisma.$PlatformAdminPayload<ExtArgs>
        fields: Prisma.PlatformAdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlatformAdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformAdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlatformAdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformAdminPayload>
          }
          findFirst: {
            args: Prisma.PlatformAdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformAdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlatformAdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformAdminPayload>
          }
          findMany: {
            args: Prisma.PlatformAdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformAdminPayload>[]
          }
          create: {
            args: Prisma.PlatformAdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformAdminPayload>
          }
          createMany: {
            args: Prisma.PlatformAdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlatformAdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformAdminPayload>[]
          }
          delete: {
            args: Prisma.PlatformAdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformAdminPayload>
          }
          update: {
            args: Prisma.PlatformAdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformAdminPayload>
          }
          deleteMany: {
            args: Prisma.PlatformAdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlatformAdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PlatformAdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformAdminPayload>
          }
          aggregate: {
            args: Prisma.PlatformAdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlatformAdmin>
          }
          groupBy: {
            args: Prisma.PlatformAdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlatformAdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlatformAdminCountArgs<ExtArgs>
            result: $Utils.Optional<PlatformAdminCountAggregateOutputType> | number
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
   * Count Type TenantCountOutputType
   */

  export type TenantCountOutputType = {
    owners: number
    staffLogins: number
  }

  export type TenantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owners?: boolean | TenantCountOutputTypeCountOwnersArgs
    staffLogins?: boolean | TenantCountOutputTypeCountStaffLoginsArgs
  }

  // Custom InputTypes
  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantCountOutputType
     */
    select?: TenantCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountOwnersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OwnerWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountStaffLoginsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffLoginDirectoryWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Tenant
   */

  export type AggregateTenant = {
    _count: TenantCountAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  export type TenantMinAggregateOutputType = {
    id: string | null
    slug: string | null
    name: string | null
    databaseUrl: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TenantMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    name: string | null
    databaseUrl: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TenantCountAggregateOutputType = {
    id: number
    slug: number
    name: number
    databaseUrl: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TenantMinAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    databaseUrl?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TenantMaxAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    databaseUrl?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TenantCountAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    databaseUrl?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TenantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenant to aggregate.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tenants
    **/
    _count?: true | TenantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenantMaxAggregateInputType
  }

  export type GetTenantAggregateType<T extends TenantAggregateArgs> = {
        [P in keyof T & keyof AggregateTenant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenant[P]>
      : GetScalarType<T[P], AggregateTenant[P]>
  }




  export type TenantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantWhereInput
    orderBy?: TenantOrderByWithAggregationInput | TenantOrderByWithAggregationInput[]
    by: TenantScalarFieldEnum[] | TenantScalarFieldEnum
    having?: TenantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenantCountAggregateInputType | true
    _min?: TenantMinAggregateInputType
    _max?: TenantMaxAggregateInputType
  }

  export type TenantGroupByOutputType = {
    id: string
    slug: string
    name: string
    databaseUrl: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: TenantCountAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  type GetTenantGroupByPayload<T extends TenantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenantGroupByOutputType[P]>
            : GetScalarType<T[P], TenantGroupByOutputType[P]>
        }
      >
    >


  export type TenantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    databaseUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owners?: boolean | Tenant$ownersArgs<ExtArgs>
    staffLogins?: boolean | Tenant$staffLoginsArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    databaseUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectScalar = {
    id?: boolean
    slug?: boolean
    name?: boolean
    databaseUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TenantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owners?: boolean | Tenant$ownersArgs<ExtArgs>
    staffLogins?: boolean | Tenant$staffLoginsArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TenantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TenantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tenant"
    objects: {
      owners: Prisma.$OwnerPayload<ExtArgs>[]
      staffLogins: Prisma.$StaffLoginDirectoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      name: string
      databaseUrl: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tenant"]>
    composites: {}
  }

  type TenantGetPayload<S extends boolean | null | undefined | TenantDefaultArgs> = $Result.GetResult<Prisma.$TenantPayload, S>

  type TenantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TenantFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TenantCountAggregateInputType | true
    }

  export interface TenantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tenant'], meta: { name: 'Tenant' } }
    /**
     * Find zero or one Tenant that matches the filter.
     * @param {TenantFindUniqueArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TenantFindUniqueArgs>(args: SelectSubset<T, TenantFindUniqueArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Tenant that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TenantFindUniqueOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TenantFindUniqueOrThrowArgs>(args: SelectSubset<T, TenantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Tenant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TenantFindFirstArgs>(args?: SelectSubset<T, TenantFindFirstArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Tenant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TenantFindFirstOrThrowArgs>(args?: SelectSubset<T, TenantFindFirstOrThrowArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Tenants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tenants
     * const tenants = await prisma.tenant.findMany()
     * 
     * // Get first 10 Tenants
     * const tenants = await prisma.tenant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenantWithIdOnly = await prisma.tenant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TenantFindManyArgs>(args?: SelectSubset<T, TenantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Tenant.
     * @param {TenantCreateArgs} args - Arguments to create a Tenant.
     * @example
     * // Create one Tenant
     * const Tenant = await prisma.tenant.create({
     *   data: {
     *     // ... data to create a Tenant
     *   }
     * })
     * 
     */
    create<T extends TenantCreateArgs>(args: SelectSubset<T, TenantCreateArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Tenants.
     * @param {TenantCreateManyArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TenantCreateManyArgs>(args?: SelectSubset<T, TenantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tenants and returns the data saved in the database.
     * @param {TenantCreateManyAndReturnArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tenants and only return the `id`
     * const tenantWithIdOnly = await prisma.tenant.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TenantCreateManyAndReturnArgs>(args?: SelectSubset<T, TenantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Tenant.
     * @param {TenantDeleteArgs} args - Arguments to delete one Tenant.
     * @example
     * // Delete one Tenant
     * const Tenant = await prisma.tenant.delete({
     *   where: {
     *     // ... filter to delete one Tenant
     *   }
     * })
     * 
     */
    delete<T extends TenantDeleteArgs>(args: SelectSubset<T, TenantDeleteArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Tenant.
     * @param {TenantUpdateArgs} args - Arguments to update one Tenant.
     * @example
     * // Update one Tenant
     * const tenant = await prisma.tenant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TenantUpdateArgs>(args: SelectSubset<T, TenantUpdateArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Tenants.
     * @param {TenantDeleteManyArgs} args - Arguments to filter Tenants to delete.
     * @example
     * // Delete a few Tenants
     * const { count } = await prisma.tenant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TenantDeleteManyArgs>(args?: SelectSubset<T, TenantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tenants
     * const tenant = await prisma.tenant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TenantUpdateManyArgs>(args: SelectSubset<T, TenantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tenant.
     * @param {TenantUpsertArgs} args - Arguments to update or create a Tenant.
     * @example
     * // Update or create a Tenant
     * const tenant = await prisma.tenant.upsert({
     *   create: {
     *     // ... data to create a Tenant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tenant we want to update
     *   }
     * })
     */
    upsert<T extends TenantUpsertArgs>(args: SelectSubset<T, TenantUpsertArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantCountArgs} args - Arguments to filter Tenants to count.
     * @example
     * // Count the number of Tenants
     * const count = await prisma.tenant.count({
     *   where: {
     *     // ... the filter for the Tenants we want to count
     *   }
     * })
    **/
    count<T extends TenantCountArgs>(
      args?: Subset<T, TenantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TenantAggregateArgs>(args: Subset<T, TenantAggregateArgs>): Prisma.PrismaPromise<GetTenantAggregateType<T>>

    /**
     * Group by Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantGroupByArgs} args - Group by arguments.
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
      T extends TenantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TenantGroupByArgs['orderBy'] }
        : { orderBy?: TenantGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TenantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tenant model
   */
  readonly fields: TenantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tenant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TenantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owners<T extends Tenant$ownersArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$ownersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "findMany"> | Null>
    staffLogins<T extends Tenant$staffLoginsArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$staffLoginsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffLoginDirectoryPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Tenant model
   */ 
  interface TenantFieldRefs {
    readonly id: FieldRef<"Tenant", 'String'>
    readonly slug: FieldRef<"Tenant", 'String'>
    readonly name: FieldRef<"Tenant", 'String'>
    readonly databaseUrl: FieldRef<"Tenant", 'String'>
    readonly isActive: FieldRef<"Tenant", 'Boolean'>
    readonly createdAt: FieldRef<"Tenant", 'DateTime'>
    readonly updatedAt: FieldRef<"Tenant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tenant findUnique
   */
  export type TenantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant findUniqueOrThrow
   */
  export type TenantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant findFirst
   */
  export type TenantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant findFirstOrThrow
   */
  export type TenantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant findMany
   */
  export type TenantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenants to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant create
   */
  export type TenantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to create a Tenant.
     */
    data: XOR<TenantCreateInput, TenantUncheckedCreateInput>
  }

  /**
   * Tenant createMany
   */
  export type TenantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tenant createManyAndReturn
   */
  export type TenantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tenant update
   */
  export type TenantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to update a Tenant.
     */
    data: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
    /**
     * Choose, which Tenant to update.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant updateMany
   */
  export type TenantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tenants.
     */
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyInput>
    /**
     * Filter which Tenants to update
     */
    where?: TenantWhereInput
  }

  /**
   * Tenant upsert
   */
  export type TenantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The filter to search for the Tenant to update in case it exists.
     */
    where: TenantWhereUniqueInput
    /**
     * In case the Tenant found by the `where` argument doesn't exist, create a new Tenant with this data.
     */
    create: XOR<TenantCreateInput, TenantUncheckedCreateInput>
    /**
     * In case the Tenant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
  }

  /**
   * Tenant delete
   */
  export type TenantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter which Tenant to delete.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant deleteMany
   */
  export type TenantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenants to delete
     */
    where?: TenantWhereInput
  }

  /**
   * Tenant.owners
   */
  export type Tenant$ownersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
    where?: OwnerWhereInput
    orderBy?: OwnerOrderByWithRelationInput | OwnerOrderByWithRelationInput[]
    cursor?: OwnerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OwnerScalarFieldEnum | OwnerScalarFieldEnum[]
  }

  /**
   * Tenant.staffLogins
   */
  export type Tenant$staffLoginsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffLoginDirectory
     */
    select?: StaffLoginDirectorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffLoginDirectoryInclude<ExtArgs> | null
    where?: StaffLoginDirectoryWhereInput
    orderBy?: StaffLoginDirectoryOrderByWithRelationInput | StaffLoginDirectoryOrderByWithRelationInput[]
    cursor?: StaffLoginDirectoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StaffLoginDirectoryScalarFieldEnum | StaffLoginDirectoryScalarFieldEnum[]
  }

  /**
   * Tenant without action
   */
  export type TenantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
  }


  /**
   * Model StaffLoginDirectory
   */

  export type AggregateStaffLoginDirectory = {
    _count: StaffLoginDirectoryCountAggregateOutputType | null
    _min: StaffLoginDirectoryMinAggregateOutputType | null
    _max: StaffLoginDirectoryMaxAggregateOutputType | null
  }

  export type StaffLoginDirectoryMinAggregateOutputType = {
    id: string | null
    emailNormalized: string | null
    tenantId: string | null
    staffId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StaffLoginDirectoryMaxAggregateOutputType = {
    id: string | null
    emailNormalized: string | null
    tenantId: string | null
    staffId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StaffLoginDirectoryCountAggregateOutputType = {
    id: number
    emailNormalized: number
    tenantId: number
    staffId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StaffLoginDirectoryMinAggregateInputType = {
    id?: true
    emailNormalized?: true
    tenantId?: true
    staffId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StaffLoginDirectoryMaxAggregateInputType = {
    id?: true
    emailNormalized?: true
    tenantId?: true
    staffId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StaffLoginDirectoryCountAggregateInputType = {
    id?: true
    emailNormalized?: true
    tenantId?: true
    staffId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StaffLoginDirectoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StaffLoginDirectory to aggregate.
     */
    where?: StaffLoginDirectoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffLoginDirectories to fetch.
     */
    orderBy?: StaffLoginDirectoryOrderByWithRelationInput | StaffLoginDirectoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StaffLoginDirectoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffLoginDirectories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffLoginDirectories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StaffLoginDirectories
    **/
    _count?: true | StaffLoginDirectoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StaffLoginDirectoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StaffLoginDirectoryMaxAggregateInputType
  }

  export type GetStaffLoginDirectoryAggregateType<T extends StaffLoginDirectoryAggregateArgs> = {
        [P in keyof T & keyof AggregateStaffLoginDirectory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStaffLoginDirectory[P]>
      : GetScalarType<T[P], AggregateStaffLoginDirectory[P]>
  }




  export type StaffLoginDirectoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffLoginDirectoryWhereInput
    orderBy?: StaffLoginDirectoryOrderByWithAggregationInput | StaffLoginDirectoryOrderByWithAggregationInput[]
    by: StaffLoginDirectoryScalarFieldEnum[] | StaffLoginDirectoryScalarFieldEnum
    having?: StaffLoginDirectoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StaffLoginDirectoryCountAggregateInputType | true
    _min?: StaffLoginDirectoryMinAggregateInputType
    _max?: StaffLoginDirectoryMaxAggregateInputType
  }

  export type StaffLoginDirectoryGroupByOutputType = {
    id: string
    emailNormalized: string
    tenantId: string
    staffId: string
    createdAt: Date
    updatedAt: Date
    _count: StaffLoginDirectoryCountAggregateOutputType | null
    _min: StaffLoginDirectoryMinAggregateOutputType | null
    _max: StaffLoginDirectoryMaxAggregateOutputType | null
  }

  type GetStaffLoginDirectoryGroupByPayload<T extends StaffLoginDirectoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StaffLoginDirectoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StaffLoginDirectoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StaffLoginDirectoryGroupByOutputType[P]>
            : GetScalarType<T[P], StaffLoginDirectoryGroupByOutputType[P]>
        }
      >
    >


  export type StaffLoginDirectorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    emailNormalized?: boolean
    tenantId?: boolean
    staffId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staffLoginDirectory"]>

  export type StaffLoginDirectorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    emailNormalized?: boolean
    tenantId?: boolean
    staffId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staffLoginDirectory"]>

  export type StaffLoginDirectorySelectScalar = {
    id?: boolean
    emailNormalized?: boolean
    tenantId?: boolean
    staffId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StaffLoginDirectoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type StaffLoginDirectoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $StaffLoginDirectoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StaffLoginDirectory"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      emailNormalized: string
      tenantId: string
      staffId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["staffLoginDirectory"]>
    composites: {}
  }

  type StaffLoginDirectoryGetPayload<S extends boolean | null | undefined | StaffLoginDirectoryDefaultArgs> = $Result.GetResult<Prisma.$StaffLoginDirectoryPayload, S>

  type StaffLoginDirectoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StaffLoginDirectoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StaffLoginDirectoryCountAggregateInputType | true
    }

  export interface StaffLoginDirectoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StaffLoginDirectory'], meta: { name: 'StaffLoginDirectory' } }
    /**
     * Find zero or one StaffLoginDirectory that matches the filter.
     * @param {StaffLoginDirectoryFindUniqueArgs} args - Arguments to find a StaffLoginDirectory
     * @example
     * // Get one StaffLoginDirectory
     * const staffLoginDirectory = await prisma.staffLoginDirectory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StaffLoginDirectoryFindUniqueArgs>(args: SelectSubset<T, StaffLoginDirectoryFindUniqueArgs<ExtArgs>>): Prisma__StaffLoginDirectoryClient<$Result.GetResult<Prisma.$StaffLoginDirectoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one StaffLoginDirectory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StaffLoginDirectoryFindUniqueOrThrowArgs} args - Arguments to find a StaffLoginDirectory
     * @example
     * // Get one StaffLoginDirectory
     * const staffLoginDirectory = await prisma.staffLoginDirectory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StaffLoginDirectoryFindUniqueOrThrowArgs>(args: SelectSubset<T, StaffLoginDirectoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StaffLoginDirectoryClient<$Result.GetResult<Prisma.$StaffLoginDirectoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first StaffLoginDirectory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffLoginDirectoryFindFirstArgs} args - Arguments to find a StaffLoginDirectory
     * @example
     * // Get one StaffLoginDirectory
     * const staffLoginDirectory = await prisma.staffLoginDirectory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StaffLoginDirectoryFindFirstArgs>(args?: SelectSubset<T, StaffLoginDirectoryFindFirstArgs<ExtArgs>>): Prisma__StaffLoginDirectoryClient<$Result.GetResult<Prisma.$StaffLoginDirectoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first StaffLoginDirectory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffLoginDirectoryFindFirstOrThrowArgs} args - Arguments to find a StaffLoginDirectory
     * @example
     * // Get one StaffLoginDirectory
     * const staffLoginDirectory = await prisma.staffLoginDirectory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StaffLoginDirectoryFindFirstOrThrowArgs>(args?: SelectSubset<T, StaffLoginDirectoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__StaffLoginDirectoryClient<$Result.GetResult<Prisma.$StaffLoginDirectoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more StaffLoginDirectories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffLoginDirectoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StaffLoginDirectories
     * const staffLoginDirectories = await prisma.staffLoginDirectory.findMany()
     * 
     * // Get first 10 StaffLoginDirectories
     * const staffLoginDirectories = await prisma.staffLoginDirectory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const staffLoginDirectoryWithIdOnly = await prisma.staffLoginDirectory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StaffLoginDirectoryFindManyArgs>(args?: SelectSubset<T, StaffLoginDirectoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffLoginDirectoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a StaffLoginDirectory.
     * @param {StaffLoginDirectoryCreateArgs} args - Arguments to create a StaffLoginDirectory.
     * @example
     * // Create one StaffLoginDirectory
     * const StaffLoginDirectory = await prisma.staffLoginDirectory.create({
     *   data: {
     *     // ... data to create a StaffLoginDirectory
     *   }
     * })
     * 
     */
    create<T extends StaffLoginDirectoryCreateArgs>(args: SelectSubset<T, StaffLoginDirectoryCreateArgs<ExtArgs>>): Prisma__StaffLoginDirectoryClient<$Result.GetResult<Prisma.$StaffLoginDirectoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many StaffLoginDirectories.
     * @param {StaffLoginDirectoryCreateManyArgs} args - Arguments to create many StaffLoginDirectories.
     * @example
     * // Create many StaffLoginDirectories
     * const staffLoginDirectory = await prisma.staffLoginDirectory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StaffLoginDirectoryCreateManyArgs>(args?: SelectSubset<T, StaffLoginDirectoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StaffLoginDirectories and returns the data saved in the database.
     * @param {StaffLoginDirectoryCreateManyAndReturnArgs} args - Arguments to create many StaffLoginDirectories.
     * @example
     * // Create many StaffLoginDirectories
     * const staffLoginDirectory = await prisma.staffLoginDirectory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StaffLoginDirectories and only return the `id`
     * const staffLoginDirectoryWithIdOnly = await prisma.staffLoginDirectory.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StaffLoginDirectoryCreateManyAndReturnArgs>(args?: SelectSubset<T, StaffLoginDirectoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffLoginDirectoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a StaffLoginDirectory.
     * @param {StaffLoginDirectoryDeleteArgs} args - Arguments to delete one StaffLoginDirectory.
     * @example
     * // Delete one StaffLoginDirectory
     * const StaffLoginDirectory = await prisma.staffLoginDirectory.delete({
     *   where: {
     *     // ... filter to delete one StaffLoginDirectory
     *   }
     * })
     * 
     */
    delete<T extends StaffLoginDirectoryDeleteArgs>(args: SelectSubset<T, StaffLoginDirectoryDeleteArgs<ExtArgs>>): Prisma__StaffLoginDirectoryClient<$Result.GetResult<Prisma.$StaffLoginDirectoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one StaffLoginDirectory.
     * @param {StaffLoginDirectoryUpdateArgs} args - Arguments to update one StaffLoginDirectory.
     * @example
     * // Update one StaffLoginDirectory
     * const staffLoginDirectory = await prisma.staffLoginDirectory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StaffLoginDirectoryUpdateArgs>(args: SelectSubset<T, StaffLoginDirectoryUpdateArgs<ExtArgs>>): Prisma__StaffLoginDirectoryClient<$Result.GetResult<Prisma.$StaffLoginDirectoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more StaffLoginDirectories.
     * @param {StaffLoginDirectoryDeleteManyArgs} args - Arguments to filter StaffLoginDirectories to delete.
     * @example
     * // Delete a few StaffLoginDirectories
     * const { count } = await prisma.staffLoginDirectory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StaffLoginDirectoryDeleteManyArgs>(args?: SelectSubset<T, StaffLoginDirectoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StaffLoginDirectories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffLoginDirectoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StaffLoginDirectories
     * const staffLoginDirectory = await prisma.staffLoginDirectory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StaffLoginDirectoryUpdateManyArgs>(args: SelectSubset<T, StaffLoginDirectoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one StaffLoginDirectory.
     * @param {StaffLoginDirectoryUpsertArgs} args - Arguments to update or create a StaffLoginDirectory.
     * @example
     * // Update or create a StaffLoginDirectory
     * const staffLoginDirectory = await prisma.staffLoginDirectory.upsert({
     *   create: {
     *     // ... data to create a StaffLoginDirectory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StaffLoginDirectory we want to update
     *   }
     * })
     */
    upsert<T extends StaffLoginDirectoryUpsertArgs>(args: SelectSubset<T, StaffLoginDirectoryUpsertArgs<ExtArgs>>): Prisma__StaffLoginDirectoryClient<$Result.GetResult<Prisma.$StaffLoginDirectoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of StaffLoginDirectories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffLoginDirectoryCountArgs} args - Arguments to filter StaffLoginDirectories to count.
     * @example
     * // Count the number of StaffLoginDirectories
     * const count = await prisma.staffLoginDirectory.count({
     *   where: {
     *     // ... the filter for the StaffLoginDirectories we want to count
     *   }
     * })
    **/
    count<T extends StaffLoginDirectoryCountArgs>(
      args?: Subset<T, StaffLoginDirectoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StaffLoginDirectoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StaffLoginDirectory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffLoginDirectoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StaffLoginDirectoryAggregateArgs>(args: Subset<T, StaffLoginDirectoryAggregateArgs>): Prisma.PrismaPromise<GetStaffLoginDirectoryAggregateType<T>>

    /**
     * Group by StaffLoginDirectory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffLoginDirectoryGroupByArgs} args - Group by arguments.
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
      T extends StaffLoginDirectoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StaffLoginDirectoryGroupByArgs['orderBy'] }
        : { orderBy?: StaffLoginDirectoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StaffLoginDirectoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStaffLoginDirectoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StaffLoginDirectory model
   */
  readonly fields: StaffLoginDirectoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StaffLoginDirectory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StaffLoginDirectoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the StaffLoginDirectory model
   */ 
  interface StaffLoginDirectoryFieldRefs {
    readonly id: FieldRef<"StaffLoginDirectory", 'String'>
    readonly emailNormalized: FieldRef<"StaffLoginDirectory", 'String'>
    readonly tenantId: FieldRef<"StaffLoginDirectory", 'String'>
    readonly staffId: FieldRef<"StaffLoginDirectory", 'String'>
    readonly createdAt: FieldRef<"StaffLoginDirectory", 'DateTime'>
    readonly updatedAt: FieldRef<"StaffLoginDirectory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StaffLoginDirectory findUnique
   */
  export type StaffLoginDirectoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffLoginDirectory
     */
    select?: StaffLoginDirectorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffLoginDirectoryInclude<ExtArgs> | null
    /**
     * Filter, which StaffLoginDirectory to fetch.
     */
    where: StaffLoginDirectoryWhereUniqueInput
  }

  /**
   * StaffLoginDirectory findUniqueOrThrow
   */
  export type StaffLoginDirectoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffLoginDirectory
     */
    select?: StaffLoginDirectorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffLoginDirectoryInclude<ExtArgs> | null
    /**
     * Filter, which StaffLoginDirectory to fetch.
     */
    where: StaffLoginDirectoryWhereUniqueInput
  }

  /**
   * StaffLoginDirectory findFirst
   */
  export type StaffLoginDirectoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffLoginDirectory
     */
    select?: StaffLoginDirectorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffLoginDirectoryInclude<ExtArgs> | null
    /**
     * Filter, which StaffLoginDirectory to fetch.
     */
    where?: StaffLoginDirectoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffLoginDirectories to fetch.
     */
    orderBy?: StaffLoginDirectoryOrderByWithRelationInput | StaffLoginDirectoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StaffLoginDirectories.
     */
    cursor?: StaffLoginDirectoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffLoginDirectories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffLoginDirectories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StaffLoginDirectories.
     */
    distinct?: StaffLoginDirectoryScalarFieldEnum | StaffLoginDirectoryScalarFieldEnum[]
  }

  /**
   * StaffLoginDirectory findFirstOrThrow
   */
  export type StaffLoginDirectoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffLoginDirectory
     */
    select?: StaffLoginDirectorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffLoginDirectoryInclude<ExtArgs> | null
    /**
     * Filter, which StaffLoginDirectory to fetch.
     */
    where?: StaffLoginDirectoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffLoginDirectories to fetch.
     */
    orderBy?: StaffLoginDirectoryOrderByWithRelationInput | StaffLoginDirectoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StaffLoginDirectories.
     */
    cursor?: StaffLoginDirectoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffLoginDirectories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffLoginDirectories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StaffLoginDirectories.
     */
    distinct?: StaffLoginDirectoryScalarFieldEnum | StaffLoginDirectoryScalarFieldEnum[]
  }

  /**
   * StaffLoginDirectory findMany
   */
  export type StaffLoginDirectoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffLoginDirectory
     */
    select?: StaffLoginDirectorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffLoginDirectoryInclude<ExtArgs> | null
    /**
     * Filter, which StaffLoginDirectories to fetch.
     */
    where?: StaffLoginDirectoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffLoginDirectories to fetch.
     */
    orderBy?: StaffLoginDirectoryOrderByWithRelationInput | StaffLoginDirectoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StaffLoginDirectories.
     */
    cursor?: StaffLoginDirectoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffLoginDirectories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffLoginDirectories.
     */
    skip?: number
    distinct?: StaffLoginDirectoryScalarFieldEnum | StaffLoginDirectoryScalarFieldEnum[]
  }

  /**
   * StaffLoginDirectory create
   */
  export type StaffLoginDirectoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffLoginDirectory
     */
    select?: StaffLoginDirectorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffLoginDirectoryInclude<ExtArgs> | null
    /**
     * The data needed to create a StaffLoginDirectory.
     */
    data: XOR<StaffLoginDirectoryCreateInput, StaffLoginDirectoryUncheckedCreateInput>
  }

  /**
   * StaffLoginDirectory createMany
   */
  export type StaffLoginDirectoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StaffLoginDirectories.
     */
    data: StaffLoginDirectoryCreateManyInput | StaffLoginDirectoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StaffLoginDirectory createManyAndReturn
   */
  export type StaffLoginDirectoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffLoginDirectory
     */
    select?: StaffLoginDirectorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many StaffLoginDirectories.
     */
    data: StaffLoginDirectoryCreateManyInput | StaffLoginDirectoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffLoginDirectoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StaffLoginDirectory update
   */
  export type StaffLoginDirectoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffLoginDirectory
     */
    select?: StaffLoginDirectorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffLoginDirectoryInclude<ExtArgs> | null
    /**
     * The data needed to update a StaffLoginDirectory.
     */
    data: XOR<StaffLoginDirectoryUpdateInput, StaffLoginDirectoryUncheckedUpdateInput>
    /**
     * Choose, which StaffLoginDirectory to update.
     */
    where: StaffLoginDirectoryWhereUniqueInput
  }

  /**
   * StaffLoginDirectory updateMany
   */
  export type StaffLoginDirectoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StaffLoginDirectories.
     */
    data: XOR<StaffLoginDirectoryUpdateManyMutationInput, StaffLoginDirectoryUncheckedUpdateManyInput>
    /**
     * Filter which StaffLoginDirectories to update
     */
    where?: StaffLoginDirectoryWhereInput
  }

  /**
   * StaffLoginDirectory upsert
   */
  export type StaffLoginDirectoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffLoginDirectory
     */
    select?: StaffLoginDirectorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffLoginDirectoryInclude<ExtArgs> | null
    /**
     * The filter to search for the StaffLoginDirectory to update in case it exists.
     */
    where: StaffLoginDirectoryWhereUniqueInput
    /**
     * In case the StaffLoginDirectory found by the `where` argument doesn't exist, create a new StaffLoginDirectory with this data.
     */
    create: XOR<StaffLoginDirectoryCreateInput, StaffLoginDirectoryUncheckedCreateInput>
    /**
     * In case the StaffLoginDirectory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StaffLoginDirectoryUpdateInput, StaffLoginDirectoryUncheckedUpdateInput>
  }

  /**
   * StaffLoginDirectory delete
   */
  export type StaffLoginDirectoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffLoginDirectory
     */
    select?: StaffLoginDirectorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffLoginDirectoryInclude<ExtArgs> | null
    /**
     * Filter which StaffLoginDirectory to delete.
     */
    where: StaffLoginDirectoryWhereUniqueInput
  }

  /**
   * StaffLoginDirectory deleteMany
   */
  export type StaffLoginDirectoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StaffLoginDirectories to delete
     */
    where?: StaffLoginDirectoryWhereInput
  }

  /**
   * StaffLoginDirectory without action
   */
  export type StaffLoginDirectoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffLoginDirectory
     */
    select?: StaffLoginDirectorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffLoginDirectoryInclude<ExtArgs> | null
  }


  /**
   * Model Owner
   */

  export type AggregateOwner = {
    _count: OwnerCountAggregateOutputType | null
    _min: OwnerMinAggregateOutputType | null
    _max: OwnerMaxAggregateOutputType | null
  }

  export type OwnerMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    email: string | null
    passwordHash: string | null
    fullName: string | null
    createdAt: Date | null
  }

  export type OwnerMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    email: string | null
    passwordHash: string | null
    fullName: string | null
    createdAt: Date | null
  }

  export type OwnerCountAggregateOutputType = {
    id: number
    tenantId: number
    email: number
    passwordHash: number
    fullName: number
    createdAt: number
    _all: number
  }


  export type OwnerMinAggregateInputType = {
    id?: true
    tenantId?: true
    email?: true
    passwordHash?: true
    fullName?: true
    createdAt?: true
  }

  export type OwnerMaxAggregateInputType = {
    id?: true
    tenantId?: true
    email?: true
    passwordHash?: true
    fullName?: true
    createdAt?: true
  }

  export type OwnerCountAggregateInputType = {
    id?: true
    tenantId?: true
    email?: true
    passwordHash?: true
    fullName?: true
    createdAt?: true
    _all?: true
  }

  export type OwnerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Owner to aggregate.
     */
    where?: OwnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Owners to fetch.
     */
    orderBy?: OwnerOrderByWithRelationInput | OwnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OwnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Owners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Owners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Owners
    **/
    _count?: true | OwnerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OwnerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OwnerMaxAggregateInputType
  }

  export type GetOwnerAggregateType<T extends OwnerAggregateArgs> = {
        [P in keyof T & keyof AggregateOwner]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOwner[P]>
      : GetScalarType<T[P], AggregateOwner[P]>
  }




  export type OwnerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OwnerWhereInput
    orderBy?: OwnerOrderByWithAggregationInput | OwnerOrderByWithAggregationInput[]
    by: OwnerScalarFieldEnum[] | OwnerScalarFieldEnum
    having?: OwnerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OwnerCountAggregateInputType | true
    _min?: OwnerMinAggregateInputType
    _max?: OwnerMaxAggregateInputType
  }

  export type OwnerGroupByOutputType = {
    id: string
    tenantId: string
    email: string
    passwordHash: string
    fullName: string
    createdAt: Date
    _count: OwnerCountAggregateOutputType | null
    _min: OwnerMinAggregateOutputType | null
    _max: OwnerMaxAggregateOutputType | null
  }

  type GetOwnerGroupByPayload<T extends OwnerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OwnerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OwnerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OwnerGroupByOutputType[P]>
            : GetScalarType<T[P], OwnerGroupByOutputType[P]>
        }
      >
    >


  export type OwnerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    createdAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["owner"]>

  export type OwnerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    createdAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["owner"]>

  export type OwnerSelectScalar = {
    id?: boolean
    tenantId?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    createdAt?: boolean
  }

  export type OwnerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type OwnerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $OwnerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Owner"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      email: string
      passwordHash: string
      fullName: string
      createdAt: Date
    }, ExtArgs["result"]["owner"]>
    composites: {}
  }

  type OwnerGetPayload<S extends boolean | null | undefined | OwnerDefaultArgs> = $Result.GetResult<Prisma.$OwnerPayload, S>

  type OwnerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<OwnerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OwnerCountAggregateInputType | true
    }

  export interface OwnerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Owner'], meta: { name: 'Owner' } }
    /**
     * Find zero or one Owner that matches the filter.
     * @param {OwnerFindUniqueArgs} args - Arguments to find a Owner
     * @example
     * // Get one Owner
     * const owner = await prisma.owner.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OwnerFindUniqueArgs>(args: SelectSubset<T, OwnerFindUniqueArgs<ExtArgs>>): Prisma__OwnerClient<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Owner that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {OwnerFindUniqueOrThrowArgs} args - Arguments to find a Owner
     * @example
     * // Get one Owner
     * const owner = await prisma.owner.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OwnerFindUniqueOrThrowArgs>(args: SelectSubset<T, OwnerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OwnerClient<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Owner that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerFindFirstArgs} args - Arguments to find a Owner
     * @example
     * // Get one Owner
     * const owner = await prisma.owner.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OwnerFindFirstArgs>(args?: SelectSubset<T, OwnerFindFirstArgs<ExtArgs>>): Prisma__OwnerClient<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Owner that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerFindFirstOrThrowArgs} args - Arguments to find a Owner
     * @example
     * // Get one Owner
     * const owner = await prisma.owner.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OwnerFindFirstOrThrowArgs>(args?: SelectSubset<T, OwnerFindFirstOrThrowArgs<ExtArgs>>): Prisma__OwnerClient<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Owners that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Owners
     * const owners = await prisma.owner.findMany()
     * 
     * // Get first 10 Owners
     * const owners = await prisma.owner.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ownerWithIdOnly = await prisma.owner.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OwnerFindManyArgs>(args?: SelectSubset<T, OwnerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Owner.
     * @param {OwnerCreateArgs} args - Arguments to create a Owner.
     * @example
     * // Create one Owner
     * const Owner = await prisma.owner.create({
     *   data: {
     *     // ... data to create a Owner
     *   }
     * })
     * 
     */
    create<T extends OwnerCreateArgs>(args: SelectSubset<T, OwnerCreateArgs<ExtArgs>>): Prisma__OwnerClient<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Owners.
     * @param {OwnerCreateManyArgs} args - Arguments to create many Owners.
     * @example
     * // Create many Owners
     * const owner = await prisma.owner.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OwnerCreateManyArgs>(args?: SelectSubset<T, OwnerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Owners and returns the data saved in the database.
     * @param {OwnerCreateManyAndReturnArgs} args - Arguments to create many Owners.
     * @example
     * // Create many Owners
     * const owner = await prisma.owner.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Owners and only return the `id`
     * const ownerWithIdOnly = await prisma.owner.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OwnerCreateManyAndReturnArgs>(args?: SelectSubset<T, OwnerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Owner.
     * @param {OwnerDeleteArgs} args - Arguments to delete one Owner.
     * @example
     * // Delete one Owner
     * const Owner = await prisma.owner.delete({
     *   where: {
     *     // ... filter to delete one Owner
     *   }
     * })
     * 
     */
    delete<T extends OwnerDeleteArgs>(args: SelectSubset<T, OwnerDeleteArgs<ExtArgs>>): Prisma__OwnerClient<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Owner.
     * @param {OwnerUpdateArgs} args - Arguments to update one Owner.
     * @example
     * // Update one Owner
     * const owner = await prisma.owner.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OwnerUpdateArgs>(args: SelectSubset<T, OwnerUpdateArgs<ExtArgs>>): Prisma__OwnerClient<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Owners.
     * @param {OwnerDeleteManyArgs} args - Arguments to filter Owners to delete.
     * @example
     * // Delete a few Owners
     * const { count } = await prisma.owner.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OwnerDeleteManyArgs>(args?: SelectSubset<T, OwnerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Owners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Owners
     * const owner = await prisma.owner.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OwnerUpdateManyArgs>(args: SelectSubset<T, OwnerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Owner.
     * @param {OwnerUpsertArgs} args - Arguments to update or create a Owner.
     * @example
     * // Update or create a Owner
     * const owner = await prisma.owner.upsert({
     *   create: {
     *     // ... data to create a Owner
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Owner we want to update
     *   }
     * })
     */
    upsert<T extends OwnerUpsertArgs>(args: SelectSubset<T, OwnerUpsertArgs<ExtArgs>>): Prisma__OwnerClient<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Owners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerCountArgs} args - Arguments to filter Owners to count.
     * @example
     * // Count the number of Owners
     * const count = await prisma.owner.count({
     *   where: {
     *     // ... the filter for the Owners we want to count
     *   }
     * })
    **/
    count<T extends OwnerCountArgs>(
      args?: Subset<T, OwnerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OwnerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Owner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OwnerAggregateArgs>(args: Subset<T, OwnerAggregateArgs>): Prisma.PrismaPromise<GetOwnerAggregateType<T>>

    /**
     * Group by Owner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerGroupByArgs} args - Group by arguments.
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
      T extends OwnerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OwnerGroupByArgs['orderBy'] }
        : { orderBy?: OwnerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OwnerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOwnerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Owner model
   */
  readonly fields: OwnerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Owner.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OwnerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Owner model
   */ 
  interface OwnerFieldRefs {
    readonly id: FieldRef<"Owner", 'String'>
    readonly tenantId: FieldRef<"Owner", 'String'>
    readonly email: FieldRef<"Owner", 'String'>
    readonly passwordHash: FieldRef<"Owner", 'String'>
    readonly fullName: FieldRef<"Owner", 'String'>
    readonly createdAt: FieldRef<"Owner", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Owner findUnique
   */
  export type OwnerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
    /**
     * Filter, which Owner to fetch.
     */
    where: OwnerWhereUniqueInput
  }

  /**
   * Owner findUniqueOrThrow
   */
  export type OwnerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
    /**
     * Filter, which Owner to fetch.
     */
    where: OwnerWhereUniqueInput
  }

  /**
   * Owner findFirst
   */
  export type OwnerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
    /**
     * Filter, which Owner to fetch.
     */
    where?: OwnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Owners to fetch.
     */
    orderBy?: OwnerOrderByWithRelationInput | OwnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Owners.
     */
    cursor?: OwnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Owners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Owners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Owners.
     */
    distinct?: OwnerScalarFieldEnum | OwnerScalarFieldEnum[]
  }

  /**
   * Owner findFirstOrThrow
   */
  export type OwnerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
    /**
     * Filter, which Owner to fetch.
     */
    where?: OwnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Owners to fetch.
     */
    orderBy?: OwnerOrderByWithRelationInput | OwnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Owners.
     */
    cursor?: OwnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Owners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Owners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Owners.
     */
    distinct?: OwnerScalarFieldEnum | OwnerScalarFieldEnum[]
  }

  /**
   * Owner findMany
   */
  export type OwnerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
    /**
     * Filter, which Owners to fetch.
     */
    where?: OwnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Owners to fetch.
     */
    orderBy?: OwnerOrderByWithRelationInput | OwnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Owners.
     */
    cursor?: OwnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Owners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Owners.
     */
    skip?: number
    distinct?: OwnerScalarFieldEnum | OwnerScalarFieldEnum[]
  }

  /**
   * Owner create
   */
  export type OwnerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
    /**
     * The data needed to create a Owner.
     */
    data: XOR<OwnerCreateInput, OwnerUncheckedCreateInput>
  }

  /**
   * Owner createMany
   */
  export type OwnerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Owners.
     */
    data: OwnerCreateManyInput | OwnerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Owner createManyAndReturn
   */
  export type OwnerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Owners.
     */
    data: OwnerCreateManyInput | OwnerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Owner update
   */
  export type OwnerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
    /**
     * The data needed to update a Owner.
     */
    data: XOR<OwnerUpdateInput, OwnerUncheckedUpdateInput>
    /**
     * Choose, which Owner to update.
     */
    where: OwnerWhereUniqueInput
  }

  /**
   * Owner updateMany
   */
  export type OwnerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Owners.
     */
    data: XOR<OwnerUpdateManyMutationInput, OwnerUncheckedUpdateManyInput>
    /**
     * Filter which Owners to update
     */
    where?: OwnerWhereInput
  }

  /**
   * Owner upsert
   */
  export type OwnerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
    /**
     * The filter to search for the Owner to update in case it exists.
     */
    where: OwnerWhereUniqueInput
    /**
     * In case the Owner found by the `where` argument doesn't exist, create a new Owner with this data.
     */
    create: XOR<OwnerCreateInput, OwnerUncheckedCreateInput>
    /**
     * In case the Owner was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OwnerUpdateInput, OwnerUncheckedUpdateInput>
  }

  /**
   * Owner delete
   */
  export type OwnerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
    /**
     * Filter which Owner to delete.
     */
    where: OwnerWhereUniqueInput
  }

  /**
   * Owner deleteMany
   */
  export type OwnerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Owners to delete
     */
    where?: OwnerWhereInput
  }

  /**
   * Owner without action
   */
  export type OwnerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
  }


  /**
   * Model PlatformAdmin
   */

  export type AggregatePlatformAdmin = {
    _count: PlatformAdminCountAggregateOutputType | null
    _min: PlatformAdminMinAggregateOutputType | null
    _max: PlatformAdminMaxAggregateOutputType | null
  }

  export type PlatformAdminMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    fullName: string | null
    createdAt: Date | null
  }

  export type PlatformAdminMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    fullName: string | null
    createdAt: Date | null
  }

  export type PlatformAdminCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    fullName: number
    createdAt: number
    _all: number
  }


  export type PlatformAdminMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    fullName?: true
    createdAt?: true
  }

  export type PlatformAdminMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    fullName?: true
    createdAt?: true
  }

  export type PlatformAdminCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    fullName?: true
    createdAt?: true
    _all?: true
  }

  export type PlatformAdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlatformAdmin to aggregate.
     */
    where?: PlatformAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformAdmins to fetch.
     */
    orderBy?: PlatformAdminOrderByWithRelationInput | PlatformAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlatformAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformAdmins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlatformAdmins
    **/
    _count?: true | PlatformAdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlatformAdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlatformAdminMaxAggregateInputType
  }

  export type GetPlatformAdminAggregateType<T extends PlatformAdminAggregateArgs> = {
        [P in keyof T & keyof AggregatePlatformAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlatformAdmin[P]>
      : GetScalarType<T[P], AggregatePlatformAdmin[P]>
  }




  export type PlatformAdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlatformAdminWhereInput
    orderBy?: PlatformAdminOrderByWithAggregationInput | PlatformAdminOrderByWithAggregationInput[]
    by: PlatformAdminScalarFieldEnum[] | PlatformAdminScalarFieldEnum
    having?: PlatformAdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlatformAdminCountAggregateInputType | true
    _min?: PlatformAdminMinAggregateInputType
    _max?: PlatformAdminMaxAggregateInputType
  }

  export type PlatformAdminGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    fullName: string
    createdAt: Date
    _count: PlatformAdminCountAggregateOutputType | null
    _min: PlatformAdminMinAggregateOutputType | null
    _max: PlatformAdminMaxAggregateOutputType | null
  }

  type GetPlatformAdminGroupByPayload<T extends PlatformAdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlatformAdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlatformAdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlatformAdminGroupByOutputType[P]>
            : GetScalarType<T[P], PlatformAdminGroupByOutputType[P]>
        }
      >
    >


  export type PlatformAdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["platformAdmin"]>

  export type PlatformAdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["platformAdmin"]>

  export type PlatformAdminSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    createdAt?: boolean
  }


  export type $PlatformAdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlatformAdmin"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      fullName: string
      createdAt: Date
    }, ExtArgs["result"]["platformAdmin"]>
    composites: {}
  }

  type PlatformAdminGetPayload<S extends boolean | null | undefined | PlatformAdminDefaultArgs> = $Result.GetResult<Prisma.$PlatformAdminPayload, S>

  type PlatformAdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PlatformAdminFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PlatformAdminCountAggregateInputType | true
    }

  export interface PlatformAdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlatformAdmin'], meta: { name: 'PlatformAdmin' } }
    /**
     * Find zero or one PlatformAdmin that matches the filter.
     * @param {PlatformAdminFindUniqueArgs} args - Arguments to find a PlatformAdmin
     * @example
     * // Get one PlatformAdmin
     * const platformAdmin = await prisma.platformAdmin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlatformAdminFindUniqueArgs>(args: SelectSubset<T, PlatformAdminFindUniqueArgs<ExtArgs>>): Prisma__PlatformAdminClient<$Result.GetResult<Prisma.$PlatformAdminPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PlatformAdmin that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PlatformAdminFindUniqueOrThrowArgs} args - Arguments to find a PlatformAdmin
     * @example
     * // Get one PlatformAdmin
     * const platformAdmin = await prisma.platformAdmin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlatformAdminFindUniqueOrThrowArgs>(args: SelectSubset<T, PlatformAdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlatformAdminClient<$Result.GetResult<Prisma.$PlatformAdminPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PlatformAdmin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformAdminFindFirstArgs} args - Arguments to find a PlatformAdmin
     * @example
     * // Get one PlatformAdmin
     * const platformAdmin = await prisma.platformAdmin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlatformAdminFindFirstArgs>(args?: SelectSubset<T, PlatformAdminFindFirstArgs<ExtArgs>>): Prisma__PlatformAdminClient<$Result.GetResult<Prisma.$PlatformAdminPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PlatformAdmin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformAdminFindFirstOrThrowArgs} args - Arguments to find a PlatformAdmin
     * @example
     * // Get one PlatformAdmin
     * const platformAdmin = await prisma.platformAdmin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlatformAdminFindFirstOrThrowArgs>(args?: SelectSubset<T, PlatformAdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlatformAdminClient<$Result.GetResult<Prisma.$PlatformAdminPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PlatformAdmins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformAdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlatformAdmins
     * const platformAdmins = await prisma.platformAdmin.findMany()
     * 
     * // Get first 10 PlatformAdmins
     * const platformAdmins = await prisma.platformAdmin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const platformAdminWithIdOnly = await prisma.platformAdmin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlatformAdminFindManyArgs>(args?: SelectSubset<T, PlatformAdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformAdminPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PlatformAdmin.
     * @param {PlatformAdminCreateArgs} args - Arguments to create a PlatformAdmin.
     * @example
     * // Create one PlatformAdmin
     * const PlatformAdmin = await prisma.platformAdmin.create({
     *   data: {
     *     // ... data to create a PlatformAdmin
     *   }
     * })
     * 
     */
    create<T extends PlatformAdminCreateArgs>(args: SelectSubset<T, PlatformAdminCreateArgs<ExtArgs>>): Prisma__PlatformAdminClient<$Result.GetResult<Prisma.$PlatformAdminPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PlatformAdmins.
     * @param {PlatformAdminCreateManyArgs} args - Arguments to create many PlatformAdmins.
     * @example
     * // Create many PlatformAdmins
     * const platformAdmin = await prisma.platformAdmin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlatformAdminCreateManyArgs>(args?: SelectSubset<T, PlatformAdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlatformAdmins and returns the data saved in the database.
     * @param {PlatformAdminCreateManyAndReturnArgs} args - Arguments to create many PlatformAdmins.
     * @example
     * // Create many PlatformAdmins
     * const platformAdmin = await prisma.platformAdmin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlatformAdmins and only return the `id`
     * const platformAdminWithIdOnly = await prisma.platformAdmin.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlatformAdminCreateManyAndReturnArgs>(args?: SelectSubset<T, PlatformAdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformAdminPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PlatformAdmin.
     * @param {PlatformAdminDeleteArgs} args - Arguments to delete one PlatformAdmin.
     * @example
     * // Delete one PlatformAdmin
     * const PlatformAdmin = await prisma.platformAdmin.delete({
     *   where: {
     *     // ... filter to delete one PlatformAdmin
     *   }
     * })
     * 
     */
    delete<T extends PlatformAdminDeleteArgs>(args: SelectSubset<T, PlatformAdminDeleteArgs<ExtArgs>>): Prisma__PlatformAdminClient<$Result.GetResult<Prisma.$PlatformAdminPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PlatformAdmin.
     * @param {PlatformAdminUpdateArgs} args - Arguments to update one PlatformAdmin.
     * @example
     * // Update one PlatformAdmin
     * const platformAdmin = await prisma.platformAdmin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlatformAdminUpdateArgs>(args: SelectSubset<T, PlatformAdminUpdateArgs<ExtArgs>>): Prisma__PlatformAdminClient<$Result.GetResult<Prisma.$PlatformAdminPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PlatformAdmins.
     * @param {PlatformAdminDeleteManyArgs} args - Arguments to filter PlatformAdmins to delete.
     * @example
     * // Delete a few PlatformAdmins
     * const { count } = await prisma.platformAdmin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlatformAdminDeleteManyArgs>(args?: SelectSubset<T, PlatformAdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlatformAdmins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformAdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlatformAdmins
     * const platformAdmin = await prisma.platformAdmin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlatformAdminUpdateManyArgs>(args: SelectSubset<T, PlatformAdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PlatformAdmin.
     * @param {PlatformAdminUpsertArgs} args - Arguments to update or create a PlatformAdmin.
     * @example
     * // Update or create a PlatformAdmin
     * const platformAdmin = await prisma.platformAdmin.upsert({
     *   create: {
     *     // ... data to create a PlatformAdmin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlatformAdmin we want to update
     *   }
     * })
     */
    upsert<T extends PlatformAdminUpsertArgs>(args: SelectSubset<T, PlatformAdminUpsertArgs<ExtArgs>>): Prisma__PlatformAdminClient<$Result.GetResult<Prisma.$PlatformAdminPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PlatformAdmins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformAdminCountArgs} args - Arguments to filter PlatformAdmins to count.
     * @example
     * // Count the number of PlatformAdmins
     * const count = await prisma.platformAdmin.count({
     *   where: {
     *     // ... the filter for the PlatformAdmins we want to count
     *   }
     * })
    **/
    count<T extends PlatformAdminCountArgs>(
      args?: Subset<T, PlatformAdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlatformAdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlatformAdmin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformAdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PlatformAdminAggregateArgs>(args: Subset<T, PlatformAdminAggregateArgs>): Prisma.PrismaPromise<GetPlatformAdminAggregateType<T>>

    /**
     * Group by PlatformAdmin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformAdminGroupByArgs} args - Group by arguments.
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
      T extends PlatformAdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlatformAdminGroupByArgs['orderBy'] }
        : { orderBy?: PlatformAdminGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PlatformAdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlatformAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlatformAdmin model
   */
  readonly fields: PlatformAdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlatformAdmin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlatformAdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the PlatformAdmin model
   */ 
  interface PlatformAdminFieldRefs {
    readonly id: FieldRef<"PlatformAdmin", 'String'>
    readonly email: FieldRef<"PlatformAdmin", 'String'>
    readonly passwordHash: FieldRef<"PlatformAdmin", 'String'>
    readonly fullName: FieldRef<"PlatformAdmin", 'String'>
    readonly createdAt: FieldRef<"PlatformAdmin", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PlatformAdmin findUnique
   */
  export type PlatformAdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformAdmin
     */
    select?: PlatformAdminSelect<ExtArgs> | null
    /**
     * Filter, which PlatformAdmin to fetch.
     */
    where: PlatformAdminWhereUniqueInput
  }

  /**
   * PlatformAdmin findUniqueOrThrow
   */
  export type PlatformAdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformAdmin
     */
    select?: PlatformAdminSelect<ExtArgs> | null
    /**
     * Filter, which PlatformAdmin to fetch.
     */
    where: PlatformAdminWhereUniqueInput
  }

  /**
   * PlatformAdmin findFirst
   */
  export type PlatformAdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformAdmin
     */
    select?: PlatformAdminSelect<ExtArgs> | null
    /**
     * Filter, which PlatformAdmin to fetch.
     */
    where?: PlatformAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformAdmins to fetch.
     */
    orderBy?: PlatformAdminOrderByWithRelationInput | PlatformAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlatformAdmins.
     */
    cursor?: PlatformAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformAdmins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlatformAdmins.
     */
    distinct?: PlatformAdminScalarFieldEnum | PlatformAdminScalarFieldEnum[]
  }

  /**
   * PlatformAdmin findFirstOrThrow
   */
  export type PlatformAdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformAdmin
     */
    select?: PlatformAdminSelect<ExtArgs> | null
    /**
     * Filter, which PlatformAdmin to fetch.
     */
    where?: PlatformAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformAdmins to fetch.
     */
    orderBy?: PlatformAdminOrderByWithRelationInput | PlatformAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlatformAdmins.
     */
    cursor?: PlatformAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformAdmins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlatformAdmins.
     */
    distinct?: PlatformAdminScalarFieldEnum | PlatformAdminScalarFieldEnum[]
  }

  /**
   * PlatformAdmin findMany
   */
  export type PlatformAdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformAdmin
     */
    select?: PlatformAdminSelect<ExtArgs> | null
    /**
     * Filter, which PlatformAdmins to fetch.
     */
    where?: PlatformAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformAdmins to fetch.
     */
    orderBy?: PlatformAdminOrderByWithRelationInput | PlatformAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlatformAdmins.
     */
    cursor?: PlatformAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformAdmins.
     */
    skip?: number
    distinct?: PlatformAdminScalarFieldEnum | PlatformAdminScalarFieldEnum[]
  }

  /**
   * PlatformAdmin create
   */
  export type PlatformAdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformAdmin
     */
    select?: PlatformAdminSelect<ExtArgs> | null
    /**
     * The data needed to create a PlatformAdmin.
     */
    data: XOR<PlatformAdminCreateInput, PlatformAdminUncheckedCreateInput>
  }

  /**
   * PlatformAdmin createMany
   */
  export type PlatformAdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlatformAdmins.
     */
    data: PlatformAdminCreateManyInput | PlatformAdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlatformAdmin createManyAndReturn
   */
  export type PlatformAdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformAdmin
     */
    select?: PlatformAdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PlatformAdmins.
     */
    data: PlatformAdminCreateManyInput | PlatformAdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlatformAdmin update
   */
  export type PlatformAdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformAdmin
     */
    select?: PlatformAdminSelect<ExtArgs> | null
    /**
     * The data needed to update a PlatformAdmin.
     */
    data: XOR<PlatformAdminUpdateInput, PlatformAdminUncheckedUpdateInput>
    /**
     * Choose, which PlatformAdmin to update.
     */
    where: PlatformAdminWhereUniqueInput
  }

  /**
   * PlatformAdmin updateMany
   */
  export type PlatformAdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlatformAdmins.
     */
    data: XOR<PlatformAdminUpdateManyMutationInput, PlatformAdminUncheckedUpdateManyInput>
    /**
     * Filter which PlatformAdmins to update
     */
    where?: PlatformAdminWhereInput
  }

  /**
   * PlatformAdmin upsert
   */
  export type PlatformAdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformAdmin
     */
    select?: PlatformAdminSelect<ExtArgs> | null
    /**
     * The filter to search for the PlatformAdmin to update in case it exists.
     */
    where: PlatformAdminWhereUniqueInput
    /**
     * In case the PlatformAdmin found by the `where` argument doesn't exist, create a new PlatformAdmin with this data.
     */
    create: XOR<PlatformAdminCreateInput, PlatformAdminUncheckedCreateInput>
    /**
     * In case the PlatformAdmin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlatformAdminUpdateInput, PlatformAdminUncheckedUpdateInput>
  }

  /**
   * PlatformAdmin delete
   */
  export type PlatformAdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformAdmin
     */
    select?: PlatformAdminSelect<ExtArgs> | null
    /**
     * Filter which PlatformAdmin to delete.
     */
    where: PlatformAdminWhereUniqueInput
  }

  /**
   * PlatformAdmin deleteMany
   */
  export type PlatformAdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlatformAdmins to delete
     */
    where?: PlatformAdminWhereInput
  }

  /**
   * PlatformAdmin without action
   */
  export type PlatformAdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformAdmin
     */
    select?: PlatformAdminSelect<ExtArgs> | null
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


  export const TenantScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    name: 'name',
    databaseUrl: 'databaseUrl',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TenantScalarFieldEnum = (typeof TenantScalarFieldEnum)[keyof typeof TenantScalarFieldEnum]


  export const StaffLoginDirectoryScalarFieldEnum: {
    id: 'id',
    emailNormalized: 'emailNormalized',
    tenantId: 'tenantId',
    staffId: 'staffId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StaffLoginDirectoryScalarFieldEnum = (typeof StaffLoginDirectoryScalarFieldEnum)[keyof typeof StaffLoginDirectoryScalarFieldEnum]


  export const OwnerScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    email: 'email',
    passwordHash: 'passwordHash',
    fullName: 'fullName',
    createdAt: 'createdAt'
  };

  export type OwnerScalarFieldEnum = (typeof OwnerScalarFieldEnum)[keyof typeof OwnerScalarFieldEnum]


  export const PlatformAdminScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    fullName: 'fullName',
    createdAt: 'createdAt'
  };

  export type PlatformAdminScalarFieldEnum = (typeof PlatformAdminScalarFieldEnum)[keyof typeof PlatformAdminScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


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
   * Deep Input Types
   */


  export type TenantWhereInput = {
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    id?: StringFilter<"Tenant"> | string
    slug?: StringFilter<"Tenant"> | string
    name?: StringFilter<"Tenant"> | string
    databaseUrl?: StringFilter<"Tenant"> | string
    isActive?: BoolFilter<"Tenant"> | boolean
    createdAt?: DateTimeFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeFilter<"Tenant"> | Date | string
    owners?: OwnerListRelationFilter
    staffLogins?: StaffLoginDirectoryListRelationFilter
  }

  export type TenantOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    databaseUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    owners?: OwnerOrderByRelationAggregateInput
    staffLogins?: StaffLoginDirectoryOrderByRelationAggregateInput
  }

  export type TenantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    name?: StringFilter<"Tenant"> | string
    databaseUrl?: StringFilter<"Tenant"> | string
    isActive?: BoolFilter<"Tenant"> | boolean
    createdAt?: DateTimeFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeFilter<"Tenant"> | Date | string
    owners?: OwnerListRelationFilter
    staffLogins?: StaffLoginDirectoryListRelationFilter
  }, "id" | "slug">

  export type TenantOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    databaseUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TenantCountOrderByAggregateInput
    _max?: TenantMaxOrderByAggregateInput
    _min?: TenantMinOrderByAggregateInput
  }

  export type TenantScalarWhereWithAggregatesInput = {
    AND?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    OR?: TenantScalarWhereWithAggregatesInput[]
    NOT?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tenant"> | string
    slug?: StringWithAggregatesFilter<"Tenant"> | string
    name?: StringWithAggregatesFilter<"Tenant"> | string
    databaseUrl?: StringWithAggregatesFilter<"Tenant"> | string
    isActive?: BoolWithAggregatesFilter<"Tenant"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Tenant"> | Date | string
  }

  export type StaffLoginDirectoryWhereInput = {
    AND?: StaffLoginDirectoryWhereInput | StaffLoginDirectoryWhereInput[]
    OR?: StaffLoginDirectoryWhereInput[]
    NOT?: StaffLoginDirectoryWhereInput | StaffLoginDirectoryWhereInput[]
    id?: StringFilter<"StaffLoginDirectory"> | string
    emailNormalized?: StringFilter<"StaffLoginDirectory"> | string
    tenantId?: StringFilter<"StaffLoginDirectory"> | string
    staffId?: StringFilter<"StaffLoginDirectory"> | string
    createdAt?: DateTimeFilter<"StaffLoginDirectory"> | Date | string
    updatedAt?: DateTimeFilter<"StaffLoginDirectory"> | Date | string
    tenant?: XOR<TenantRelationFilter, TenantWhereInput>
  }

  export type StaffLoginDirectoryOrderByWithRelationInput = {
    id?: SortOrder
    emailNormalized?: SortOrder
    tenantId?: SortOrder
    staffId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
  }

  export type StaffLoginDirectoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    emailNormalized?: string
    tenantId_staffId?: StaffLoginDirectoryTenantIdStaffIdCompoundUniqueInput
    AND?: StaffLoginDirectoryWhereInput | StaffLoginDirectoryWhereInput[]
    OR?: StaffLoginDirectoryWhereInput[]
    NOT?: StaffLoginDirectoryWhereInput | StaffLoginDirectoryWhereInput[]
    tenantId?: StringFilter<"StaffLoginDirectory"> | string
    staffId?: StringFilter<"StaffLoginDirectory"> | string
    createdAt?: DateTimeFilter<"StaffLoginDirectory"> | Date | string
    updatedAt?: DateTimeFilter<"StaffLoginDirectory"> | Date | string
    tenant?: XOR<TenantRelationFilter, TenantWhereInput>
  }, "id" | "emailNormalized" | "tenantId_staffId">

  export type StaffLoginDirectoryOrderByWithAggregationInput = {
    id?: SortOrder
    emailNormalized?: SortOrder
    tenantId?: SortOrder
    staffId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StaffLoginDirectoryCountOrderByAggregateInput
    _max?: StaffLoginDirectoryMaxOrderByAggregateInput
    _min?: StaffLoginDirectoryMinOrderByAggregateInput
  }

  export type StaffLoginDirectoryScalarWhereWithAggregatesInput = {
    AND?: StaffLoginDirectoryScalarWhereWithAggregatesInput | StaffLoginDirectoryScalarWhereWithAggregatesInput[]
    OR?: StaffLoginDirectoryScalarWhereWithAggregatesInput[]
    NOT?: StaffLoginDirectoryScalarWhereWithAggregatesInput | StaffLoginDirectoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StaffLoginDirectory"> | string
    emailNormalized?: StringWithAggregatesFilter<"StaffLoginDirectory"> | string
    tenantId?: StringWithAggregatesFilter<"StaffLoginDirectory"> | string
    staffId?: StringWithAggregatesFilter<"StaffLoginDirectory"> | string
    createdAt?: DateTimeWithAggregatesFilter<"StaffLoginDirectory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StaffLoginDirectory"> | Date | string
  }

  export type OwnerWhereInput = {
    AND?: OwnerWhereInput | OwnerWhereInput[]
    OR?: OwnerWhereInput[]
    NOT?: OwnerWhereInput | OwnerWhereInput[]
    id?: StringFilter<"Owner"> | string
    tenantId?: StringFilter<"Owner"> | string
    email?: StringFilter<"Owner"> | string
    passwordHash?: StringFilter<"Owner"> | string
    fullName?: StringFilter<"Owner"> | string
    createdAt?: DateTimeFilter<"Owner"> | Date | string
    tenant?: XOR<TenantRelationFilter, TenantWhereInput>
  }

  export type OwnerOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    createdAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
  }

  export type OwnerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_email?: OwnerTenantIdEmailCompoundUniqueInput
    AND?: OwnerWhereInput | OwnerWhereInput[]
    OR?: OwnerWhereInput[]
    NOT?: OwnerWhereInput | OwnerWhereInput[]
    tenantId?: StringFilter<"Owner"> | string
    email?: StringFilter<"Owner"> | string
    passwordHash?: StringFilter<"Owner"> | string
    fullName?: StringFilter<"Owner"> | string
    createdAt?: DateTimeFilter<"Owner"> | Date | string
    tenant?: XOR<TenantRelationFilter, TenantWhereInput>
  }, "id" | "tenantId_email">

  export type OwnerOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    createdAt?: SortOrder
    _count?: OwnerCountOrderByAggregateInput
    _max?: OwnerMaxOrderByAggregateInput
    _min?: OwnerMinOrderByAggregateInput
  }

  export type OwnerScalarWhereWithAggregatesInput = {
    AND?: OwnerScalarWhereWithAggregatesInput | OwnerScalarWhereWithAggregatesInput[]
    OR?: OwnerScalarWhereWithAggregatesInput[]
    NOT?: OwnerScalarWhereWithAggregatesInput | OwnerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Owner"> | string
    tenantId?: StringWithAggregatesFilter<"Owner"> | string
    email?: StringWithAggregatesFilter<"Owner"> | string
    passwordHash?: StringWithAggregatesFilter<"Owner"> | string
    fullName?: StringWithAggregatesFilter<"Owner"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Owner"> | Date | string
  }

  export type PlatformAdminWhereInput = {
    AND?: PlatformAdminWhereInput | PlatformAdminWhereInput[]
    OR?: PlatformAdminWhereInput[]
    NOT?: PlatformAdminWhereInput | PlatformAdminWhereInput[]
    id?: StringFilter<"PlatformAdmin"> | string
    email?: StringFilter<"PlatformAdmin"> | string
    passwordHash?: StringFilter<"PlatformAdmin"> | string
    fullName?: StringFilter<"PlatformAdmin"> | string
    createdAt?: DateTimeFilter<"PlatformAdmin"> | Date | string
  }

  export type PlatformAdminOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    createdAt?: SortOrder
  }

  export type PlatformAdminWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: PlatformAdminWhereInput | PlatformAdminWhereInput[]
    OR?: PlatformAdminWhereInput[]
    NOT?: PlatformAdminWhereInput | PlatformAdminWhereInput[]
    passwordHash?: StringFilter<"PlatformAdmin"> | string
    fullName?: StringFilter<"PlatformAdmin"> | string
    createdAt?: DateTimeFilter<"PlatformAdmin"> | Date | string
  }, "id" | "email">

  export type PlatformAdminOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    createdAt?: SortOrder
    _count?: PlatformAdminCountOrderByAggregateInput
    _max?: PlatformAdminMaxOrderByAggregateInput
    _min?: PlatformAdminMinOrderByAggregateInput
  }

  export type PlatformAdminScalarWhereWithAggregatesInput = {
    AND?: PlatformAdminScalarWhereWithAggregatesInput | PlatformAdminScalarWhereWithAggregatesInput[]
    OR?: PlatformAdminScalarWhereWithAggregatesInput[]
    NOT?: PlatformAdminScalarWhereWithAggregatesInput | PlatformAdminScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PlatformAdmin"> | string
    email?: StringWithAggregatesFilter<"PlatformAdmin"> | string
    passwordHash?: StringWithAggregatesFilter<"PlatformAdmin"> | string
    fullName?: StringWithAggregatesFilter<"PlatformAdmin"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PlatformAdmin"> | Date | string
  }

  export type TenantCreateInput = {
    id?: string
    slug: string
    name: string
    databaseUrl: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    owners?: OwnerCreateNestedManyWithoutTenantInput
    staffLogins?: StaffLoginDirectoryCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateInput = {
    id?: string
    slug: string
    name: string
    databaseUrl: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    owners?: OwnerUncheckedCreateNestedManyWithoutTenantInput
    staffLogins?: StaffLoginDirectoryUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    databaseUrl?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owners?: OwnerUpdateManyWithoutTenantNestedInput
    staffLogins?: StaffLoginDirectoryUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    databaseUrl?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owners?: OwnerUncheckedUpdateManyWithoutTenantNestedInput
    staffLogins?: StaffLoginDirectoryUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantCreateManyInput = {
    id?: string
    slug: string
    name: string
    databaseUrl: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TenantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    databaseUrl?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    databaseUrl?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffLoginDirectoryCreateInput = {
    id?: string
    emailNormalized: string
    staffId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutStaffLoginsInput
  }

  export type StaffLoginDirectoryUncheckedCreateInput = {
    id?: string
    emailNormalized: string
    tenantId: string
    staffId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StaffLoginDirectoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailNormalized?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutStaffLoginsNestedInput
  }

  export type StaffLoginDirectoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailNormalized?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffLoginDirectoryCreateManyInput = {
    id?: string
    emailNormalized: string
    tenantId: string
    staffId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StaffLoginDirectoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailNormalized?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffLoginDirectoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailNormalized?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OwnerCreateInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    createdAt?: Date | string
    tenant: TenantCreateNestedOneWithoutOwnersInput
  }

  export type OwnerUncheckedCreateInput = {
    id?: string
    tenantId: string
    email: string
    passwordHash: string
    fullName: string
    createdAt?: Date | string
  }

  export type OwnerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutOwnersNestedInput
  }

  export type OwnerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OwnerCreateManyInput = {
    id?: string
    tenantId: string
    email: string
    passwordHash: string
    fullName: string
    createdAt?: Date | string
  }

  export type OwnerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OwnerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformAdminCreateInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    createdAt?: Date | string
  }

  export type PlatformAdminUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    createdAt?: Date | string
  }

  export type PlatformAdminUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformAdminUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformAdminCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    createdAt?: Date | string
  }

  export type PlatformAdminUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformAdminUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type OwnerListRelationFilter = {
    every?: OwnerWhereInput
    some?: OwnerWhereInput
    none?: OwnerWhereInput
  }

  export type StaffLoginDirectoryListRelationFilter = {
    every?: StaffLoginDirectoryWhereInput
    some?: StaffLoginDirectoryWhereInput
    none?: StaffLoginDirectoryWhereInput
  }

  export type OwnerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StaffLoginDirectoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TenantCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    databaseUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    databaseUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    databaseUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type TenantRelationFilter = {
    is?: TenantWhereInput
    isNot?: TenantWhereInput
  }

  export type StaffLoginDirectoryTenantIdStaffIdCompoundUniqueInput = {
    tenantId: string
    staffId: string
  }

  export type StaffLoginDirectoryCountOrderByAggregateInput = {
    id?: SortOrder
    emailNormalized?: SortOrder
    tenantId?: SortOrder
    staffId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StaffLoginDirectoryMaxOrderByAggregateInput = {
    id?: SortOrder
    emailNormalized?: SortOrder
    tenantId?: SortOrder
    staffId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StaffLoginDirectoryMinOrderByAggregateInput = {
    id?: SortOrder
    emailNormalized?: SortOrder
    tenantId?: SortOrder
    staffId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OwnerTenantIdEmailCompoundUniqueInput = {
    tenantId: string
    email: string
  }

  export type OwnerCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    createdAt?: SortOrder
  }

  export type OwnerMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    createdAt?: SortOrder
  }

  export type OwnerMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    createdAt?: SortOrder
  }

  export type PlatformAdminCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    createdAt?: SortOrder
  }

  export type PlatformAdminMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    createdAt?: SortOrder
  }

  export type PlatformAdminMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    createdAt?: SortOrder
  }

  export type OwnerCreateNestedManyWithoutTenantInput = {
    create?: XOR<OwnerCreateWithoutTenantInput, OwnerUncheckedCreateWithoutTenantInput> | OwnerCreateWithoutTenantInput[] | OwnerUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: OwnerCreateOrConnectWithoutTenantInput | OwnerCreateOrConnectWithoutTenantInput[]
    createMany?: OwnerCreateManyTenantInputEnvelope
    connect?: OwnerWhereUniqueInput | OwnerWhereUniqueInput[]
  }

  export type StaffLoginDirectoryCreateNestedManyWithoutTenantInput = {
    create?: XOR<StaffLoginDirectoryCreateWithoutTenantInput, StaffLoginDirectoryUncheckedCreateWithoutTenantInput> | StaffLoginDirectoryCreateWithoutTenantInput[] | StaffLoginDirectoryUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: StaffLoginDirectoryCreateOrConnectWithoutTenantInput | StaffLoginDirectoryCreateOrConnectWithoutTenantInput[]
    createMany?: StaffLoginDirectoryCreateManyTenantInputEnvelope
    connect?: StaffLoginDirectoryWhereUniqueInput | StaffLoginDirectoryWhereUniqueInput[]
  }

  export type OwnerUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<OwnerCreateWithoutTenantInput, OwnerUncheckedCreateWithoutTenantInput> | OwnerCreateWithoutTenantInput[] | OwnerUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: OwnerCreateOrConnectWithoutTenantInput | OwnerCreateOrConnectWithoutTenantInput[]
    createMany?: OwnerCreateManyTenantInputEnvelope
    connect?: OwnerWhereUniqueInput | OwnerWhereUniqueInput[]
  }

  export type StaffLoginDirectoryUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<StaffLoginDirectoryCreateWithoutTenantInput, StaffLoginDirectoryUncheckedCreateWithoutTenantInput> | StaffLoginDirectoryCreateWithoutTenantInput[] | StaffLoginDirectoryUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: StaffLoginDirectoryCreateOrConnectWithoutTenantInput | StaffLoginDirectoryCreateOrConnectWithoutTenantInput[]
    createMany?: StaffLoginDirectoryCreateManyTenantInputEnvelope
    connect?: StaffLoginDirectoryWhereUniqueInput | StaffLoginDirectoryWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type OwnerUpdateManyWithoutTenantNestedInput = {
    create?: XOR<OwnerCreateWithoutTenantInput, OwnerUncheckedCreateWithoutTenantInput> | OwnerCreateWithoutTenantInput[] | OwnerUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: OwnerCreateOrConnectWithoutTenantInput | OwnerCreateOrConnectWithoutTenantInput[]
    upsert?: OwnerUpsertWithWhereUniqueWithoutTenantInput | OwnerUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: OwnerCreateManyTenantInputEnvelope
    set?: OwnerWhereUniqueInput | OwnerWhereUniqueInput[]
    disconnect?: OwnerWhereUniqueInput | OwnerWhereUniqueInput[]
    delete?: OwnerWhereUniqueInput | OwnerWhereUniqueInput[]
    connect?: OwnerWhereUniqueInput | OwnerWhereUniqueInput[]
    update?: OwnerUpdateWithWhereUniqueWithoutTenantInput | OwnerUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: OwnerUpdateManyWithWhereWithoutTenantInput | OwnerUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: OwnerScalarWhereInput | OwnerScalarWhereInput[]
  }

  export type StaffLoginDirectoryUpdateManyWithoutTenantNestedInput = {
    create?: XOR<StaffLoginDirectoryCreateWithoutTenantInput, StaffLoginDirectoryUncheckedCreateWithoutTenantInput> | StaffLoginDirectoryCreateWithoutTenantInput[] | StaffLoginDirectoryUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: StaffLoginDirectoryCreateOrConnectWithoutTenantInput | StaffLoginDirectoryCreateOrConnectWithoutTenantInput[]
    upsert?: StaffLoginDirectoryUpsertWithWhereUniqueWithoutTenantInput | StaffLoginDirectoryUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: StaffLoginDirectoryCreateManyTenantInputEnvelope
    set?: StaffLoginDirectoryWhereUniqueInput | StaffLoginDirectoryWhereUniqueInput[]
    disconnect?: StaffLoginDirectoryWhereUniqueInput | StaffLoginDirectoryWhereUniqueInput[]
    delete?: StaffLoginDirectoryWhereUniqueInput | StaffLoginDirectoryWhereUniqueInput[]
    connect?: StaffLoginDirectoryWhereUniqueInput | StaffLoginDirectoryWhereUniqueInput[]
    update?: StaffLoginDirectoryUpdateWithWhereUniqueWithoutTenantInput | StaffLoginDirectoryUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: StaffLoginDirectoryUpdateManyWithWhereWithoutTenantInput | StaffLoginDirectoryUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: StaffLoginDirectoryScalarWhereInput | StaffLoginDirectoryScalarWhereInput[]
  }

  export type OwnerUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<OwnerCreateWithoutTenantInput, OwnerUncheckedCreateWithoutTenantInput> | OwnerCreateWithoutTenantInput[] | OwnerUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: OwnerCreateOrConnectWithoutTenantInput | OwnerCreateOrConnectWithoutTenantInput[]
    upsert?: OwnerUpsertWithWhereUniqueWithoutTenantInput | OwnerUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: OwnerCreateManyTenantInputEnvelope
    set?: OwnerWhereUniqueInput | OwnerWhereUniqueInput[]
    disconnect?: OwnerWhereUniqueInput | OwnerWhereUniqueInput[]
    delete?: OwnerWhereUniqueInput | OwnerWhereUniqueInput[]
    connect?: OwnerWhereUniqueInput | OwnerWhereUniqueInput[]
    update?: OwnerUpdateWithWhereUniqueWithoutTenantInput | OwnerUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: OwnerUpdateManyWithWhereWithoutTenantInput | OwnerUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: OwnerScalarWhereInput | OwnerScalarWhereInput[]
  }

  export type StaffLoginDirectoryUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<StaffLoginDirectoryCreateWithoutTenantInput, StaffLoginDirectoryUncheckedCreateWithoutTenantInput> | StaffLoginDirectoryCreateWithoutTenantInput[] | StaffLoginDirectoryUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: StaffLoginDirectoryCreateOrConnectWithoutTenantInput | StaffLoginDirectoryCreateOrConnectWithoutTenantInput[]
    upsert?: StaffLoginDirectoryUpsertWithWhereUniqueWithoutTenantInput | StaffLoginDirectoryUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: StaffLoginDirectoryCreateManyTenantInputEnvelope
    set?: StaffLoginDirectoryWhereUniqueInput | StaffLoginDirectoryWhereUniqueInput[]
    disconnect?: StaffLoginDirectoryWhereUniqueInput | StaffLoginDirectoryWhereUniqueInput[]
    delete?: StaffLoginDirectoryWhereUniqueInput | StaffLoginDirectoryWhereUniqueInput[]
    connect?: StaffLoginDirectoryWhereUniqueInput | StaffLoginDirectoryWhereUniqueInput[]
    update?: StaffLoginDirectoryUpdateWithWhereUniqueWithoutTenantInput | StaffLoginDirectoryUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: StaffLoginDirectoryUpdateManyWithWhereWithoutTenantInput | StaffLoginDirectoryUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: StaffLoginDirectoryScalarWhereInput | StaffLoginDirectoryScalarWhereInput[]
  }

  export type TenantCreateNestedOneWithoutStaffLoginsInput = {
    create?: XOR<TenantCreateWithoutStaffLoginsInput, TenantUncheckedCreateWithoutStaffLoginsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutStaffLoginsInput
    connect?: TenantWhereUniqueInput
  }

  export type TenantUpdateOneRequiredWithoutStaffLoginsNestedInput = {
    create?: XOR<TenantCreateWithoutStaffLoginsInput, TenantUncheckedCreateWithoutStaffLoginsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutStaffLoginsInput
    upsert?: TenantUpsertWithoutStaffLoginsInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutStaffLoginsInput, TenantUpdateWithoutStaffLoginsInput>, TenantUncheckedUpdateWithoutStaffLoginsInput>
  }

  export type TenantCreateNestedOneWithoutOwnersInput = {
    create?: XOR<TenantCreateWithoutOwnersInput, TenantUncheckedCreateWithoutOwnersInput>
    connectOrCreate?: TenantCreateOrConnectWithoutOwnersInput
    connect?: TenantWhereUniqueInput
  }

  export type TenantUpdateOneRequiredWithoutOwnersNestedInput = {
    create?: XOR<TenantCreateWithoutOwnersInput, TenantUncheckedCreateWithoutOwnersInput>
    connectOrCreate?: TenantCreateOrConnectWithoutOwnersInput
    upsert?: TenantUpsertWithoutOwnersInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutOwnersInput, TenantUpdateWithoutOwnersInput>, TenantUncheckedUpdateWithoutOwnersInput>
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

  export type OwnerCreateWithoutTenantInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    createdAt?: Date | string
  }

  export type OwnerUncheckedCreateWithoutTenantInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    createdAt?: Date | string
  }

  export type OwnerCreateOrConnectWithoutTenantInput = {
    where: OwnerWhereUniqueInput
    create: XOR<OwnerCreateWithoutTenantInput, OwnerUncheckedCreateWithoutTenantInput>
  }

  export type OwnerCreateManyTenantInputEnvelope = {
    data: OwnerCreateManyTenantInput | OwnerCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type StaffLoginDirectoryCreateWithoutTenantInput = {
    id?: string
    emailNormalized: string
    staffId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StaffLoginDirectoryUncheckedCreateWithoutTenantInput = {
    id?: string
    emailNormalized: string
    staffId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StaffLoginDirectoryCreateOrConnectWithoutTenantInput = {
    where: StaffLoginDirectoryWhereUniqueInput
    create: XOR<StaffLoginDirectoryCreateWithoutTenantInput, StaffLoginDirectoryUncheckedCreateWithoutTenantInput>
  }

  export type StaffLoginDirectoryCreateManyTenantInputEnvelope = {
    data: StaffLoginDirectoryCreateManyTenantInput | StaffLoginDirectoryCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type OwnerUpsertWithWhereUniqueWithoutTenantInput = {
    where: OwnerWhereUniqueInput
    update: XOR<OwnerUpdateWithoutTenantInput, OwnerUncheckedUpdateWithoutTenantInput>
    create: XOR<OwnerCreateWithoutTenantInput, OwnerUncheckedCreateWithoutTenantInput>
  }

  export type OwnerUpdateWithWhereUniqueWithoutTenantInput = {
    where: OwnerWhereUniqueInput
    data: XOR<OwnerUpdateWithoutTenantInput, OwnerUncheckedUpdateWithoutTenantInput>
  }

  export type OwnerUpdateManyWithWhereWithoutTenantInput = {
    where: OwnerScalarWhereInput
    data: XOR<OwnerUpdateManyMutationInput, OwnerUncheckedUpdateManyWithoutTenantInput>
  }

  export type OwnerScalarWhereInput = {
    AND?: OwnerScalarWhereInput | OwnerScalarWhereInput[]
    OR?: OwnerScalarWhereInput[]
    NOT?: OwnerScalarWhereInput | OwnerScalarWhereInput[]
    id?: StringFilter<"Owner"> | string
    tenantId?: StringFilter<"Owner"> | string
    email?: StringFilter<"Owner"> | string
    passwordHash?: StringFilter<"Owner"> | string
    fullName?: StringFilter<"Owner"> | string
    createdAt?: DateTimeFilter<"Owner"> | Date | string
  }

  export type StaffLoginDirectoryUpsertWithWhereUniqueWithoutTenantInput = {
    where: StaffLoginDirectoryWhereUniqueInput
    update: XOR<StaffLoginDirectoryUpdateWithoutTenantInput, StaffLoginDirectoryUncheckedUpdateWithoutTenantInput>
    create: XOR<StaffLoginDirectoryCreateWithoutTenantInput, StaffLoginDirectoryUncheckedCreateWithoutTenantInput>
  }

  export type StaffLoginDirectoryUpdateWithWhereUniqueWithoutTenantInput = {
    where: StaffLoginDirectoryWhereUniqueInput
    data: XOR<StaffLoginDirectoryUpdateWithoutTenantInput, StaffLoginDirectoryUncheckedUpdateWithoutTenantInput>
  }

  export type StaffLoginDirectoryUpdateManyWithWhereWithoutTenantInput = {
    where: StaffLoginDirectoryScalarWhereInput
    data: XOR<StaffLoginDirectoryUpdateManyMutationInput, StaffLoginDirectoryUncheckedUpdateManyWithoutTenantInput>
  }

  export type StaffLoginDirectoryScalarWhereInput = {
    AND?: StaffLoginDirectoryScalarWhereInput | StaffLoginDirectoryScalarWhereInput[]
    OR?: StaffLoginDirectoryScalarWhereInput[]
    NOT?: StaffLoginDirectoryScalarWhereInput | StaffLoginDirectoryScalarWhereInput[]
    id?: StringFilter<"StaffLoginDirectory"> | string
    emailNormalized?: StringFilter<"StaffLoginDirectory"> | string
    tenantId?: StringFilter<"StaffLoginDirectory"> | string
    staffId?: StringFilter<"StaffLoginDirectory"> | string
    createdAt?: DateTimeFilter<"StaffLoginDirectory"> | Date | string
    updatedAt?: DateTimeFilter<"StaffLoginDirectory"> | Date | string
  }

  export type TenantCreateWithoutStaffLoginsInput = {
    id?: string
    slug: string
    name: string
    databaseUrl: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    owners?: OwnerCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutStaffLoginsInput = {
    id?: string
    slug: string
    name: string
    databaseUrl: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    owners?: OwnerUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutStaffLoginsInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutStaffLoginsInput, TenantUncheckedCreateWithoutStaffLoginsInput>
  }

  export type TenantUpsertWithoutStaffLoginsInput = {
    update: XOR<TenantUpdateWithoutStaffLoginsInput, TenantUncheckedUpdateWithoutStaffLoginsInput>
    create: XOR<TenantCreateWithoutStaffLoginsInput, TenantUncheckedCreateWithoutStaffLoginsInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutStaffLoginsInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutStaffLoginsInput, TenantUncheckedUpdateWithoutStaffLoginsInput>
  }

  export type TenantUpdateWithoutStaffLoginsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    databaseUrl?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owners?: OwnerUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutStaffLoginsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    databaseUrl?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owners?: OwnerUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantCreateWithoutOwnersInput = {
    id?: string
    slug: string
    name: string
    databaseUrl: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    staffLogins?: StaffLoginDirectoryCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutOwnersInput = {
    id?: string
    slug: string
    name: string
    databaseUrl: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    staffLogins?: StaffLoginDirectoryUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutOwnersInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutOwnersInput, TenantUncheckedCreateWithoutOwnersInput>
  }

  export type TenantUpsertWithoutOwnersInput = {
    update: XOR<TenantUpdateWithoutOwnersInput, TenantUncheckedUpdateWithoutOwnersInput>
    create: XOR<TenantCreateWithoutOwnersInput, TenantUncheckedCreateWithoutOwnersInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutOwnersInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutOwnersInput, TenantUncheckedUpdateWithoutOwnersInput>
  }

  export type TenantUpdateWithoutOwnersInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    databaseUrl?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    staffLogins?: StaffLoginDirectoryUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutOwnersInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    databaseUrl?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    staffLogins?: StaffLoginDirectoryUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type OwnerCreateManyTenantInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    createdAt?: Date | string
  }

  export type StaffLoginDirectoryCreateManyTenantInput = {
    id?: string
    emailNormalized: string
    staffId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OwnerUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OwnerUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OwnerUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffLoginDirectoryUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailNormalized?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffLoginDirectoryUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailNormalized?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffLoginDirectoryUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailNormalized?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use TenantCountOutputTypeDefaultArgs instead
     */
    export type TenantCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TenantCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TenantDefaultArgs instead
     */
    export type TenantArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TenantDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StaffLoginDirectoryDefaultArgs instead
     */
    export type StaffLoginDirectoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StaffLoginDirectoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OwnerDefaultArgs instead
     */
    export type OwnerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OwnerDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PlatformAdminDefaultArgs instead
     */
    export type PlatformAdminArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PlatformAdminDefaultArgs<ExtArgs>

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