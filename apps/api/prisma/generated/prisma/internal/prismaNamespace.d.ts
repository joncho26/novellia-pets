import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models";
import { type PrismaClient } from "./class";
export type * from '../models';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: runtime.DbNullClass;
export declare const JsonNull: runtime.JsonNullClass;
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> = [
    PrismaClientOptions
] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? ((Without<T, U> & U) | (Without<U, T> & T)) & object : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
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
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly Pet: "Pet";
    readonly PetOwner: "PetOwner";
    readonly EmergencyContact: "EmergencyContact";
    readonly MedicalRecord: "MedicalRecord";
    readonly Treatment: "Treatment";
    readonly Immunization: "Immunization";
    readonly Diagnostic: "Diagnostic";
    readonly Medication: "Medication";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "pet" | "petOwner" | "emergencyContact" | "medicalRecord" | "treatment" | "immunization" | "diagnostic" | "medication";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        Pet: {
            payload: Prisma.$PetPayload<ExtArgs>;
            fields: Prisma.PetFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PetFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PetPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PetFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PetPayload>;
                };
                findFirst: {
                    args: Prisma.PetFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PetPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PetFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PetPayload>;
                };
                findMany: {
                    args: Prisma.PetFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PetPayload>[];
                };
                create: {
                    args: Prisma.PetCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PetPayload>;
                };
                createMany: {
                    args: Prisma.PetCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PetCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PetPayload>[];
                };
                delete: {
                    args: Prisma.PetDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PetPayload>;
                };
                update: {
                    args: Prisma.PetUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PetPayload>;
                };
                deleteMany: {
                    args: Prisma.PetDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PetUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PetUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PetPayload>[];
                };
                upsert: {
                    args: Prisma.PetUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PetPayload>;
                };
                aggregate: {
                    args: Prisma.PetAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePet>;
                };
                groupBy: {
                    args: Prisma.PetGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PetGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PetCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PetCountAggregateOutputType> | number;
                };
            };
        };
        PetOwner: {
            payload: Prisma.$PetOwnerPayload<ExtArgs>;
            fields: Prisma.PetOwnerFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PetOwnerFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PetOwnerPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PetOwnerFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PetOwnerPayload>;
                };
                findFirst: {
                    args: Prisma.PetOwnerFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PetOwnerPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PetOwnerFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PetOwnerPayload>;
                };
                findMany: {
                    args: Prisma.PetOwnerFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PetOwnerPayload>[];
                };
                create: {
                    args: Prisma.PetOwnerCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PetOwnerPayload>;
                };
                createMany: {
                    args: Prisma.PetOwnerCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PetOwnerCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PetOwnerPayload>[];
                };
                delete: {
                    args: Prisma.PetOwnerDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PetOwnerPayload>;
                };
                update: {
                    args: Prisma.PetOwnerUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PetOwnerPayload>;
                };
                deleteMany: {
                    args: Prisma.PetOwnerDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PetOwnerUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PetOwnerUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PetOwnerPayload>[];
                };
                upsert: {
                    args: Prisma.PetOwnerUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PetOwnerPayload>;
                };
                aggregate: {
                    args: Prisma.PetOwnerAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePetOwner>;
                };
                groupBy: {
                    args: Prisma.PetOwnerGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PetOwnerGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PetOwnerCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PetOwnerCountAggregateOutputType> | number;
                };
            };
        };
        EmergencyContact: {
            payload: Prisma.$EmergencyContactPayload<ExtArgs>;
            fields: Prisma.EmergencyContactFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.EmergencyContactFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmergencyContactPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.EmergencyContactFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmergencyContactPayload>;
                };
                findFirst: {
                    args: Prisma.EmergencyContactFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmergencyContactPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.EmergencyContactFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmergencyContactPayload>;
                };
                findMany: {
                    args: Prisma.EmergencyContactFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmergencyContactPayload>[];
                };
                create: {
                    args: Prisma.EmergencyContactCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmergencyContactPayload>;
                };
                createMany: {
                    args: Prisma.EmergencyContactCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.EmergencyContactCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmergencyContactPayload>[];
                };
                delete: {
                    args: Prisma.EmergencyContactDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmergencyContactPayload>;
                };
                update: {
                    args: Prisma.EmergencyContactUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmergencyContactPayload>;
                };
                deleteMany: {
                    args: Prisma.EmergencyContactDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.EmergencyContactUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.EmergencyContactUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmergencyContactPayload>[];
                };
                upsert: {
                    args: Prisma.EmergencyContactUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmergencyContactPayload>;
                };
                aggregate: {
                    args: Prisma.EmergencyContactAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEmergencyContact>;
                };
                groupBy: {
                    args: Prisma.EmergencyContactGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EmergencyContactGroupByOutputType>[];
                };
                count: {
                    args: Prisma.EmergencyContactCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EmergencyContactCountAggregateOutputType> | number;
                };
            };
        };
        MedicalRecord: {
            payload: Prisma.$MedicalRecordPayload<ExtArgs>;
            fields: Prisma.MedicalRecordFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MedicalRecordFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalRecordPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MedicalRecordFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalRecordPayload>;
                };
                findFirst: {
                    args: Prisma.MedicalRecordFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalRecordPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MedicalRecordFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalRecordPayload>;
                };
                findMany: {
                    args: Prisma.MedicalRecordFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalRecordPayload>[];
                };
                create: {
                    args: Prisma.MedicalRecordCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalRecordPayload>;
                };
                createMany: {
                    args: Prisma.MedicalRecordCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MedicalRecordCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalRecordPayload>[];
                };
                delete: {
                    args: Prisma.MedicalRecordDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalRecordPayload>;
                };
                update: {
                    args: Prisma.MedicalRecordUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalRecordPayload>;
                };
                deleteMany: {
                    args: Prisma.MedicalRecordDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MedicalRecordUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MedicalRecordUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalRecordPayload>[];
                };
                upsert: {
                    args: Prisma.MedicalRecordUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalRecordPayload>;
                };
                aggregate: {
                    args: Prisma.MedicalRecordAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMedicalRecord>;
                };
                groupBy: {
                    args: Prisma.MedicalRecordGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MedicalRecordGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MedicalRecordCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MedicalRecordCountAggregateOutputType> | number;
                };
            };
        };
        Treatment: {
            payload: Prisma.$TreatmentPayload<ExtArgs>;
            fields: Prisma.TreatmentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TreatmentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TreatmentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TreatmentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TreatmentPayload>;
                };
                findFirst: {
                    args: Prisma.TreatmentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TreatmentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TreatmentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TreatmentPayload>;
                };
                findMany: {
                    args: Prisma.TreatmentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TreatmentPayload>[];
                };
                create: {
                    args: Prisma.TreatmentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TreatmentPayload>;
                };
                createMany: {
                    args: Prisma.TreatmentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TreatmentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TreatmentPayload>[];
                };
                delete: {
                    args: Prisma.TreatmentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TreatmentPayload>;
                };
                update: {
                    args: Prisma.TreatmentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TreatmentPayload>;
                };
                deleteMany: {
                    args: Prisma.TreatmentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TreatmentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TreatmentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TreatmentPayload>[];
                };
                upsert: {
                    args: Prisma.TreatmentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TreatmentPayload>;
                };
                aggregate: {
                    args: Prisma.TreatmentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTreatment>;
                };
                groupBy: {
                    args: Prisma.TreatmentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TreatmentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TreatmentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TreatmentCountAggregateOutputType> | number;
                };
            };
        };
        Immunization: {
            payload: Prisma.$ImmunizationPayload<ExtArgs>;
            fields: Prisma.ImmunizationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ImmunizationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImmunizationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ImmunizationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImmunizationPayload>;
                };
                findFirst: {
                    args: Prisma.ImmunizationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImmunizationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ImmunizationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImmunizationPayload>;
                };
                findMany: {
                    args: Prisma.ImmunizationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImmunizationPayload>[];
                };
                create: {
                    args: Prisma.ImmunizationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImmunizationPayload>;
                };
                createMany: {
                    args: Prisma.ImmunizationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ImmunizationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImmunizationPayload>[];
                };
                delete: {
                    args: Prisma.ImmunizationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImmunizationPayload>;
                };
                update: {
                    args: Prisma.ImmunizationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImmunizationPayload>;
                };
                deleteMany: {
                    args: Prisma.ImmunizationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ImmunizationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ImmunizationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImmunizationPayload>[];
                };
                upsert: {
                    args: Prisma.ImmunizationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImmunizationPayload>;
                };
                aggregate: {
                    args: Prisma.ImmunizationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateImmunization>;
                };
                groupBy: {
                    args: Prisma.ImmunizationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ImmunizationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ImmunizationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ImmunizationCountAggregateOutputType> | number;
                };
            };
        };
        Diagnostic: {
            payload: Prisma.$DiagnosticPayload<ExtArgs>;
            fields: Prisma.DiagnosticFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DiagnosticFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiagnosticPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DiagnosticFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiagnosticPayload>;
                };
                findFirst: {
                    args: Prisma.DiagnosticFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiagnosticPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DiagnosticFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiagnosticPayload>;
                };
                findMany: {
                    args: Prisma.DiagnosticFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiagnosticPayload>[];
                };
                create: {
                    args: Prisma.DiagnosticCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiagnosticPayload>;
                };
                createMany: {
                    args: Prisma.DiagnosticCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DiagnosticCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiagnosticPayload>[];
                };
                delete: {
                    args: Prisma.DiagnosticDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiagnosticPayload>;
                };
                update: {
                    args: Prisma.DiagnosticUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiagnosticPayload>;
                };
                deleteMany: {
                    args: Prisma.DiagnosticDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DiagnosticUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DiagnosticUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiagnosticPayload>[];
                };
                upsert: {
                    args: Prisma.DiagnosticUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiagnosticPayload>;
                };
                aggregate: {
                    args: Prisma.DiagnosticAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDiagnostic>;
                };
                groupBy: {
                    args: Prisma.DiagnosticGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DiagnosticGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DiagnosticCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DiagnosticCountAggregateOutputType> | number;
                };
            };
        };
        Medication: {
            payload: Prisma.$MedicationPayload<ExtArgs>;
            fields: Prisma.MedicationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MedicationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MedicationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicationPayload>;
                };
                findFirst: {
                    args: Prisma.MedicationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MedicationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicationPayload>;
                };
                findMany: {
                    args: Prisma.MedicationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicationPayload>[];
                };
                create: {
                    args: Prisma.MedicationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicationPayload>;
                };
                createMany: {
                    args: Prisma.MedicationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MedicationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicationPayload>[];
                };
                delete: {
                    args: Prisma.MedicationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicationPayload>;
                };
                update: {
                    args: Prisma.MedicationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicationPayload>;
                };
                deleteMany: {
                    args: Prisma.MedicationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MedicationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MedicationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicationPayload>[];
                };
                upsert: {
                    args: Prisma.MedicationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicationPayload>;
                };
                aggregate: {
                    args: Prisma.MedicationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMedication>;
                };
                groupBy: {
                    args: Prisma.MedicationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MedicationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MedicationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MedicationCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const PetScalarFieldEnum: {
    readonly id: "id";
    readonly microchipId: "microchipId";
    readonly microchipRegistry: "microchipRegistry";
    readonly microchipDate: "microchipDate";
    readonly name: "name";
    readonly type: "type";
    readonly breed: "breed";
    readonly dateOfBirth: "dateOfBirth";
    readonly weight: "weight";
    readonly weightUnit: "weightUnit";
    readonly sex: "sex";
    readonly neutered: "neutered";
    readonly ownerId: "ownerId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PetScalarFieldEnum = (typeof PetScalarFieldEnum)[keyof typeof PetScalarFieldEnum];
export declare const PetOwnerScalarFieldEnum: {
    readonly id: "id";
    readonly firstName: "firstName";
    readonly lastName: "lastName";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PetOwnerScalarFieldEnum = (typeof PetOwnerScalarFieldEnum)[keyof typeof PetOwnerScalarFieldEnum];
export declare const EmergencyContactScalarFieldEnum: {
    readonly id: "id";
    readonly petOwnerId: "petOwnerId";
    readonly petId: "petId";
    readonly firstName: "firstName";
    readonly lastName: "lastName";
    readonly relationship: "relationship";
    readonly email: "email";
    readonly phone: "phone";
    readonly isPrimary: "isPrimary";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type EmergencyContactScalarFieldEnum = (typeof EmergencyContactScalarFieldEnum)[keyof typeof EmergencyContactScalarFieldEnum];
export declare const MedicalRecordScalarFieldEnum: {
    readonly id: "id";
    readonly petId: "petId";
    readonly recordDate: "recordDate";
    readonly vetContactId: "vetContactId";
    readonly vetName: "vetName";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type MedicalRecordScalarFieldEnum = (typeof MedicalRecordScalarFieldEnum)[keyof typeof MedicalRecordScalarFieldEnum];
export declare const TreatmentScalarFieldEnum: {
    readonly id: "id";
    readonly petId: "petId";
    readonly medicalRecordId: "medicalRecordId";
    readonly name: "name";
    readonly date: "date";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TreatmentScalarFieldEnum = (typeof TreatmentScalarFieldEnum)[keyof typeof TreatmentScalarFieldEnum];
export declare const ImmunizationScalarFieldEnum: {
    readonly id: "id";
    readonly petId: "petId";
    readonly medicalRecordId: "medicalRecordId";
    readonly name: "name";
    readonly dateAdministered: "dateAdministered";
    readonly nextDueDate: "nextDueDate";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ImmunizationScalarFieldEnum = (typeof ImmunizationScalarFieldEnum)[keyof typeof ImmunizationScalarFieldEnum];
export declare const DiagnosticScalarFieldEnum: {
    readonly id: "id";
    readonly petId: "petId";
    readonly medicalRecordId: "medicalRecordId";
    readonly type: "type";
    readonly date: "date";
    readonly result: "result";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DiagnosticScalarFieldEnum = (typeof DiagnosticScalarFieldEnum)[keyof typeof DiagnosticScalarFieldEnum];
export declare const MedicationScalarFieldEnum: {
    readonly id: "id";
    readonly petId: "petId";
    readonly medicalRecordId: "medicalRecordId";
    readonly name: "name";
    readonly dosageAmount: "dosageAmount";
    readonly dosageUnit: "dosageUnit";
    readonly frequency: "frequency";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type MedicationScalarFieldEnum = (typeof MedicationScalarFieldEnum)[keyof typeof MedicationScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
export type EnumPetTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PetType'>;
export type ListEnumPetTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PetType[]'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
export type EnumWeightUnitFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WeightUnit'>;
export type ListEnumWeightUnitFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WeightUnit[]'>;
export type EnumPetSexFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PetSex'>;
export type ListEnumPetSexFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PetSex[]'>;
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
export type EnumContactRelationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ContactRelation'>;
export type ListEnumContactRelationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ContactRelation[]'>;
export type EnumDiagnosticTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DiagnosticType'>;
export type ListEnumDiagnosticTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DiagnosticType[]'>;
export type EnumDosageUnitFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DosageUnit'>;
export type ListEnumDosageUnitFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DosageUnit[]'>;
export type EnumMedicationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MedicationStatus'>;
export type ListEnumMedicationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MedicationStatus[]'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export interface PrismaClientBaseOptions {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
    queryPlanCacheMaxSize?: number;
}
export interface PrismaClientOptionsWithAccelerateUrl extends PrismaClientBaseOptions {
    accelerateUrl: string;
    adapter?: never;
}
export interface PrismaClientOptionsWithAdapter extends PrismaClientBaseOptions {
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
}
export type PrismaClientOptions = PrismaClientOptionsWithAccelerateUrl | PrismaClientOptionsWithAdapter;
export type GlobalOmitConfig = {
    pet?: Prisma.PetOmit;
    petOwner?: Prisma.PetOwnerOmit;
    emergencyContact?: Prisma.EmergencyContactOmit;
    medicalRecord?: Prisma.MedicalRecordOmit;
    treatment?: Prisma.TreatmentOmit;
    immunization?: Prisma.ImmunizationOmit;
    diagnostic?: Prisma.DiagnosticOmit;
    medication?: Prisma.MedicationOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
