import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type PetOwnerModel = runtime.Types.Result.DefaultSelection<Prisma.$PetOwnerPayload>;
export type AggregatePetOwner = {
    _count: PetOwnerCountAggregateOutputType | null;
    _min: PetOwnerMinAggregateOutputType | null;
    _max: PetOwnerMaxAggregateOutputType | null;
};
export type PetOwnerMinAggregateOutputType = {
    id: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    passwordHash: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PetOwnerMaxAggregateOutputType = {
    id: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    passwordHash: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PetOwnerCountAggregateOutputType = {
    id: number;
    firstName: number;
    lastName: number;
    email: number;
    passwordHash: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PetOwnerMinAggregateInputType = {
    id?: true;
    firstName?: true;
    lastName?: true;
    email?: true;
    passwordHash?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PetOwnerMaxAggregateInputType = {
    id?: true;
    firstName?: true;
    lastName?: true;
    email?: true;
    passwordHash?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PetOwnerCountAggregateInputType = {
    id?: true;
    firstName?: true;
    lastName?: true;
    email?: true;
    passwordHash?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PetOwnerAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PetOwnerWhereInput;
    orderBy?: Prisma.PetOwnerOrderByWithRelationInput | Prisma.PetOwnerOrderByWithRelationInput[];
    cursor?: Prisma.PetOwnerWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PetOwnerCountAggregateInputType;
    _min?: PetOwnerMinAggregateInputType;
    _max?: PetOwnerMaxAggregateInputType;
};
export type GetPetOwnerAggregateType<T extends PetOwnerAggregateArgs> = {
    [P in keyof T & keyof AggregatePetOwner]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePetOwner[P]> : Prisma.GetScalarType<T[P], AggregatePetOwner[P]>;
};
export type PetOwnerGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PetOwnerWhereInput;
    orderBy?: Prisma.PetOwnerOrderByWithAggregationInput | Prisma.PetOwnerOrderByWithAggregationInput[];
    by: Prisma.PetOwnerScalarFieldEnum[] | Prisma.PetOwnerScalarFieldEnum;
    having?: Prisma.PetOwnerScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PetOwnerCountAggregateInputType | true;
    _min?: PetOwnerMinAggregateInputType;
    _max?: PetOwnerMaxAggregateInputType;
};
export type PetOwnerGroupByOutputType = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
    _count: PetOwnerCountAggregateOutputType | null;
    _min: PetOwnerMinAggregateOutputType | null;
    _max: PetOwnerMaxAggregateOutputType | null;
};
export type GetPetOwnerGroupByPayload<T extends PetOwnerGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PetOwnerGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PetOwnerGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PetOwnerGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PetOwnerGroupByOutputType[P]>;
}>>;
export type PetOwnerWhereInput = {
    AND?: Prisma.PetOwnerWhereInput | Prisma.PetOwnerWhereInput[];
    OR?: Prisma.PetOwnerWhereInput[];
    NOT?: Prisma.PetOwnerWhereInput | Prisma.PetOwnerWhereInput[];
    id?: Prisma.StringFilter<"PetOwner"> | string;
    firstName?: Prisma.StringFilter<"PetOwner"> | string;
    lastName?: Prisma.StringFilter<"PetOwner"> | string;
    email?: Prisma.StringFilter<"PetOwner"> | string;
    passwordHash?: Prisma.StringFilter<"PetOwner"> | string;
    createdAt?: Prisma.DateTimeFilter<"PetOwner"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PetOwner"> | Date | string;
    emergencyContacts?: Prisma.EmergencyContactListRelationFilter;
    pets?: Prisma.PetListRelationFilter;
};
export type PetOwnerOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    emergencyContacts?: Prisma.EmergencyContactOrderByRelationAggregateInput;
    pets?: Prisma.PetOrderByRelationAggregateInput;
};
export type PetOwnerWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    AND?: Prisma.PetOwnerWhereInput | Prisma.PetOwnerWhereInput[];
    OR?: Prisma.PetOwnerWhereInput[];
    NOT?: Prisma.PetOwnerWhereInput | Prisma.PetOwnerWhereInput[];
    firstName?: Prisma.StringFilter<"PetOwner"> | string;
    lastName?: Prisma.StringFilter<"PetOwner"> | string;
    passwordHash?: Prisma.StringFilter<"PetOwner"> | string;
    createdAt?: Prisma.DateTimeFilter<"PetOwner"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PetOwner"> | Date | string;
    emergencyContacts?: Prisma.EmergencyContactListRelationFilter;
    pets?: Prisma.PetListRelationFilter;
}, "id" | "email">;
export type PetOwnerOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PetOwnerCountOrderByAggregateInput;
    _max?: Prisma.PetOwnerMaxOrderByAggregateInput;
    _min?: Prisma.PetOwnerMinOrderByAggregateInput;
};
export type PetOwnerScalarWhereWithAggregatesInput = {
    AND?: Prisma.PetOwnerScalarWhereWithAggregatesInput | Prisma.PetOwnerScalarWhereWithAggregatesInput[];
    OR?: Prisma.PetOwnerScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PetOwnerScalarWhereWithAggregatesInput | Prisma.PetOwnerScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PetOwner"> | string;
    firstName?: Prisma.StringWithAggregatesFilter<"PetOwner"> | string;
    lastName?: Prisma.StringWithAggregatesFilter<"PetOwner"> | string;
    email?: Prisma.StringWithAggregatesFilter<"PetOwner"> | string;
    passwordHash?: Prisma.StringWithAggregatesFilter<"PetOwner"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PetOwner"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"PetOwner"> | Date | string;
};
export type PetOwnerCreateInput = {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    emergencyContacts?: Prisma.EmergencyContactCreateNestedManyWithoutPetOwnerInput;
    pets?: Prisma.PetCreateNestedManyWithoutOwnerInput;
};
export type PetOwnerUncheckedCreateInput = {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    emergencyContacts?: Prisma.EmergencyContactUncheckedCreateNestedManyWithoutPetOwnerInput;
    pets?: Prisma.PetUncheckedCreateNestedManyWithoutOwnerInput;
};
export type PetOwnerUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    emergencyContacts?: Prisma.EmergencyContactUpdateManyWithoutPetOwnerNestedInput;
    pets?: Prisma.PetUpdateManyWithoutOwnerNestedInput;
};
export type PetOwnerUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    emergencyContacts?: Prisma.EmergencyContactUncheckedUpdateManyWithoutPetOwnerNestedInput;
    pets?: Prisma.PetUncheckedUpdateManyWithoutOwnerNestedInput;
};
export type PetOwnerCreateManyInput = {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PetOwnerUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PetOwnerUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PetOwnerScalarRelationFilter = {
    is?: Prisma.PetOwnerWhereInput;
    isNot?: Prisma.PetOwnerWhereInput;
};
export type PetOwnerCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PetOwnerMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PetOwnerMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PetOwnerCreateNestedOneWithoutPetsInput = {
    create?: Prisma.XOR<Prisma.PetOwnerCreateWithoutPetsInput, Prisma.PetOwnerUncheckedCreateWithoutPetsInput>;
    connectOrCreate?: Prisma.PetOwnerCreateOrConnectWithoutPetsInput;
    connect?: Prisma.PetOwnerWhereUniqueInput;
};
export type PetOwnerUpdateOneRequiredWithoutPetsNestedInput = {
    create?: Prisma.XOR<Prisma.PetOwnerCreateWithoutPetsInput, Prisma.PetOwnerUncheckedCreateWithoutPetsInput>;
    connectOrCreate?: Prisma.PetOwnerCreateOrConnectWithoutPetsInput;
    upsert?: Prisma.PetOwnerUpsertWithoutPetsInput;
    connect?: Prisma.PetOwnerWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PetOwnerUpdateToOneWithWhereWithoutPetsInput, Prisma.PetOwnerUpdateWithoutPetsInput>, Prisma.PetOwnerUncheckedUpdateWithoutPetsInput>;
};
export type PetOwnerCreateNestedOneWithoutEmergencyContactsInput = {
    create?: Prisma.XOR<Prisma.PetOwnerCreateWithoutEmergencyContactsInput, Prisma.PetOwnerUncheckedCreateWithoutEmergencyContactsInput>;
    connectOrCreate?: Prisma.PetOwnerCreateOrConnectWithoutEmergencyContactsInput;
    connect?: Prisma.PetOwnerWhereUniqueInput;
};
export type PetOwnerUpdateOneRequiredWithoutEmergencyContactsNestedInput = {
    create?: Prisma.XOR<Prisma.PetOwnerCreateWithoutEmergencyContactsInput, Prisma.PetOwnerUncheckedCreateWithoutEmergencyContactsInput>;
    connectOrCreate?: Prisma.PetOwnerCreateOrConnectWithoutEmergencyContactsInput;
    upsert?: Prisma.PetOwnerUpsertWithoutEmergencyContactsInput;
    connect?: Prisma.PetOwnerWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PetOwnerUpdateToOneWithWhereWithoutEmergencyContactsInput, Prisma.PetOwnerUpdateWithoutEmergencyContactsInput>, Prisma.PetOwnerUncheckedUpdateWithoutEmergencyContactsInput>;
};
export type PetOwnerCreateWithoutPetsInput = {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    emergencyContacts?: Prisma.EmergencyContactCreateNestedManyWithoutPetOwnerInput;
};
export type PetOwnerUncheckedCreateWithoutPetsInput = {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    emergencyContacts?: Prisma.EmergencyContactUncheckedCreateNestedManyWithoutPetOwnerInput;
};
export type PetOwnerCreateOrConnectWithoutPetsInput = {
    where: Prisma.PetOwnerWhereUniqueInput;
    create: Prisma.XOR<Prisma.PetOwnerCreateWithoutPetsInput, Prisma.PetOwnerUncheckedCreateWithoutPetsInput>;
};
export type PetOwnerUpsertWithoutPetsInput = {
    update: Prisma.XOR<Prisma.PetOwnerUpdateWithoutPetsInput, Prisma.PetOwnerUncheckedUpdateWithoutPetsInput>;
    create: Prisma.XOR<Prisma.PetOwnerCreateWithoutPetsInput, Prisma.PetOwnerUncheckedCreateWithoutPetsInput>;
    where?: Prisma.PetOwnerWhereInput;
};
export type PetOwnerUpdateToOneWithWhereWithoutPetsInput = {
    where?: Prisma.PetOwnerWhereInput;
    data: Prisma.XOR<Prisma.PetOwnerUpdateWithoutPetsInput, Prisma.PetOwnerUncheckedUpdateWithoutPetsInput>;
};
export type PetOwnerUpdateWithoutPetsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    emergencyContacts?: Prisma.EmergencyContactUpdateManyWithoutPetOwnerNestedInput;
};
export type PetOwnerUncheckedUpdateWithoutPetsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    emergencyContacts?: Prisma.EmergencyContactUncheckedUpdateManyWithoutPetOwnerNestedInput;
};
export type PetOwnerCreateWithoutEmergencyContactsInput = {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pets?: Prisma.PetCreateNestedManyWithoutOwnerInput;
};
export type PetOwnerUncheckedCreateWithoutEmergencyContactsInput = {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pets?: Prisma.PetUncheckedCreateNestedManyWithoutOwnerInput;
};
export type PetOwnerCreateOrConnectWithoutEmergencyContactsInput = {
    where: Prisma.PetOwnerWhereUniqueInput;
    create: Prisma.XOR<Prisma.PetOwnerCreateWithoutEmergencyContactsInput, Prisma.PetOwnerUncheckedCreateWithoutEmergencyContactsInput>;
};
export type PetOwnerUpsertWithoutEmergencyContactsInput = {
    update: Prisma.XOR<Prisma.PetOwnerUpdateWithoutEmergencyContactsInput, Prisma.PetOwnerUncheckedUpdateWithoutEmergencyContactsInput>;
    create: Prisma.XOR<Prisma.PetOwnerCreateWithoutEmergencyContactsInput, Prisma.PetOwnerUncheckedCreateWithoutEmergencyContactsInput>;
    where?: Prisma.PetOwnerWhereInput;
};
export type PetOwnerUpdateToOneWithWhereWithoutEmergencyContactsInput = {
    where?: Prisma.PetOwnerWhereInput;
    data: Prisma.XOR<Prisma.PetOwnerUpdateWithoutEmergencyContactsInput, Prisma.PetOwnerUncheckedUpdateWithoutEmergencyContactsInput>;
};
export type PetOwnerUpdateWithoutEmergencyContactsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pets?: Prisma.PetUpdateManyWithoutOwnerNestedInput;
};
export type PetOwnerUncheckedUpdateWithoutEmergencyContactsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pets?: Prisma.PetUncheckedUpdateManyWithoutOwnerNestedInput;
};
export type PetOwnerCountOutputType = {
    emergencyContacts: number;
    pets: number;
};
export type PetOwnerCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    emergencyContacts?: boolean | PetOwnerCountOutputTypeCountEmergencyContactsArgs;
    pets?: boolean | PetOwnerCountOutputTypeCountPetsArgs;
};
export type PetOwnerCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetOwnerCountOutputTypeSelect<ExtArgs> | null;
};
export type PetOwnerCountOutputTypeCountEmergencyContactsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmergencyContactWhereInput;
};
export type PetOwnerCountOutputTypeCountPetsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PetWhereInput;
};
export type PetOwnerSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    emergencyContacts?: boolean | Prisma.PetOwner$emergencyContactsArgs<ExtArgs>;
    pets?: boolean | Prisma.PetOwner$petsArgs<ExtArgs>;
    _count?: boolean | Prisma.PetOwnerCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["petOwner"]>;
export type PetOwnerSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["petOwner"]>;
export type PetOwnerSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["petOwner"]>;
export type PetOwnerSelectScalar = {
    id?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PetOwnerOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "firstName" | "lastName" | "email" | "passwordHash" | "createdAt" | "updatedAt", ExtArgs["result"]["petOwner"]>;
export type PetOwnerInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    emergencyContacts?: boolean | Prisma.PetOwner$emergencyContactsArgs<ExtArgs>;
    pets?: boolean | Prisma.PetOwner$petsArgs<ExtArgs>;
    _count?: boolean | Prisma.PetOwnerCountOutputTypeDefaultArgs<ExtArgs>;
};
export type PetOwnerIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type PetOwnerIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $PetOwnerPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PetOwner";
    objects: {
        emergencyContacts: Prisma.$EmergencyContactPayload<ExtArgs>[];
        pets: Prisma.$PetPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["petOwner"]>;
    composites: {};
};
export type PetOwnerGetPayload<S extends boolean | null | undefined | PetOwnerDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PetOwnerPayload, S>;
export type PetOwnerCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PetOwnerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PetOwnerCountAggregateInputType | true;
};
export interface PetOwnerDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PetOwner'];
        meta: {
            name: 'PetOwner';
        };
    };
    findUnique<T extends PetOwnerFindUniqueArgs>(args: Prisma.SelectSubset<T, PetOwnerFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PetOwnerClient<runtime.Types.Result.GetResult<Prisma.$PetOwnerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PetOwnerFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PetOwnerFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PetOwnerClient<runtime.Types.Result.GetResult<Prisma.$PetOwnerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PetOwnerFindFirstArgs>(args?: Prisma.SelectSubset<T, PetOwnerFindFirstArgs<ExtArgs>>): Prisma.Prisma__PetOwnerClient<runtime.Types.Result.GetResult<Prisma.$PetOwnerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PetOwnerFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PetOwnerFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PetOwnerClient<runtime.Types.Result.GetResult<Prisma.$PetOwnerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PetOwnerFindManyArgs>(args?: Prisma.SelectSubset<T, PetOwnerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PetOwnerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PetOwnerCreateArgs>(args: Prisma.SelectSubset<T, PetOwnerCreateArgs<ExtArgs>>): Prisma.Prisma__PetOwnerClient<runtime.Types.Result.GetResult<Prisma.$PetOwnerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PetOwnerCreateManyArgs>(args?: Prisma.SelectSubset<T, PetOwnerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PetOwnerCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PetOwnerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PetOwnerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PetOwnerDeleteArgs>(args: Prisma.SelectSubset<T, PetOwnerDeleteArgs<ExtArgs>>): Prisma.Prisma__PetOwnerClient<runtime.Types.Result.GetResult<Prisma.$PetOwnerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PetOwnerUpdateArgs>(args: Prisma.SelectSubset<T, PetOwnerUpdateArgs<ExtArgs>>): Prisma.Prisma__PetOwnerClient<runtime.Types.Result.GetResult<Prisma.$PetOwnerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PetOwnerDeleteManyArgs>(args?: Prisma.SelectSubset<T, PetOwnerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PetOwnerUpdateManyArgs>(args: Prisma.SelectSubset<T, PetOwnerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PetOwnerUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PetOwnerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PetOwnerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PetOwnerUpsertArgs>(args: Prisma.SelectSubset<T, PetOwnerUpsertArgs<ExtArgs>>): Prisma.Prisma__PetOwnerClient<runtime.Types.Result.GetResult<Prisma.$PetOwnerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PetOwnerCountArgs>(args?: Prisma.Subset<T, PetOwnerCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PetOwnerCountAggregateOutputType> : number>;
    aggregate<T extends PetOwnerAggregateArgs>(args: Prisma.Subset<T, PetOwnerAggregateArgs>): Prisma.PrismaPromise<GetPetOwnerAggregateType<T>>;
    groupBy<T extends PetOwnerGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PetOwnerGroupByArgs['orderBy'];
    } : {
        orderBy?: PetOwnerGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PetOwnerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPetOwnerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PetOwnerFieldRefs;
}
export interface Prisma__PetOwnerClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    emergencyContacts<T extends Prisma.PetOwner$emergencyContactsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PetOwner$emergencyContactsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmergencyContactPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    pets<T extends Prisma.PetOwner$petsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PetOwner$petsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PetOwnerFieldRefs {
    readonly id: Prisma.FieldRef<"PetOwner", 'String'>;
    readonly firstName: Prisma.FieldRef<"PetOwner", 'String'>;
    readonly lastName: Prisma.FieldRef<"PetOwner", 'String'>;
    readonly email: Prisma.FieldRef<"PetOwner", 'String'>;
    readonly passwordHash: Prisma.FieldRef<"PetOwner", 'String'>;
    readonly createdAt: Prisma.FieldRef<"PetOwner", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"PetOwner", 'DateTime'>;
}
export type PetOwnerFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetOwnerSelect<ExtArgs> | null;
    omit?: Prisma.PetOwnerOmit<ExtArgs> | null;
    include?: Prisma.PetOwnerInclude<ExtArgs> | null;
    where: Prisma.PetOwnerWhereUniqueInput;
};
export type PetOwnerFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetOwnerSelect<ExtArgs> | null;
    omit?: Prisma.PetOwnerOmit<ExtArgs> | null;
    include?: Prisma.PetOwnerInclude<ExtArgs> | null;
    where: Prisma.PetOwnerWhereUniqueInput;
};
export type PetOwnerFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetOwnerSelect<ExtArgs> | null;
    omit?: Prisma.PetOwnerOmit<ExtArgs> | null;
    include?: Prisma.PetOwnerInclude<ExtArgs> | null;
    where?: Prisma.PetOwnerWhereInput;
    orderBy?: Prisma.PetOwnerOrderByWithRelationInput | Prisma.PetOwnerOrderByWithRelationInput[];
    cursor?: Prisma.PetOwnerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PetOwnerScalarFieldEnum | Prisma.PetOwnerScalarFieldEnum[];
};
export type PetOwnerFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetOwnerSelect<ExtArgs> | null;
    omit?: Prisma.PetOwnerOmit<ExtArgs> | null;
    include?: Prisma.PetOwnerInclude<ExtArgs> | null;
    where?: Prisma.PetOwnerWhereInput;
    orderBy?: Prisma.PetOwnerOrderByWithRelationInput | Prisma.PetOwnerOrderByWithRelationInput[];
    cursor?: Prisma.PetOwnerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PetOwnerScalarFieldEnum | Prisma.PetOwnerScalarFieldEnum[];
};
export type PetOwnerFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetOwnerSelect<ExtArgs> | null;
    omit?: Prisma.PetOwnerOmit<ExtArgs> | null;
    include?: Prisma.PetOwnerInclude<ExtArgs> | null;
    where?: Prisma.PetOwnerWhereInput;
    orderBy?: Prisma.PetOwnerOrderByWithRelationInput | Prisma.PetOwnerOrderByWithRelationInput[];
    cursor?: Prisma.PetOwnerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PetOwnerScalarFieldEnum | Prisma.PetOwnerScalarFieldEnum[];
};
export type PetOwnerCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetOwnerSelect<ExtArgs> | null;
    omit?: Prisma.PetOwnerOmit<ExtArgs> | null;
    include?: Prisma.PetOwnerInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PetOwnerCreateInput, Prisma.PetOwnerUncheckedCreateInput>;
};
export type PetOwnerCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PetOwnerCreateManyInput | Prisma.PetOwnerCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PetOwnerCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetOwnerSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PetOwnerOmit<ExtArgs> | null;
    data: Prisma.PetOwnerCreateManyInput | Prisma.PetOwnerCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PetOwnerUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetOwnerSelect<ExtArgs> | null;
    omit?: Prisma.PetOwnerOmit<ExtArgs> | null;
    include?: Prisma.PetOwnerInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PetOwnerUpdateInput, Prisma.PetOwnerUncheckedUpdateInput>;
    where: Prisma.PetOwnerWhereUniqueInput;
};
export type PetOwnerUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PetOwnerUpdateManyMutationInput, Prisma.PetOwnerUncheckedUpdateManyInput>;
    where?: Prisma.PetOwnerWhereInput;
    limit?: number;
};
export type PetOwnerUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetOwnerSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PetOwnerOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PetOwnerUpdateManyMutationInput, Prisma.PetOwnerUncheckedUpdateManyInput>;
    where?: Prisma.PetOwnerWhereInput;
    limit?: number;
};
export type PetOwnerUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetOwnerSelect<ExtArgs> | null;
    omit?: Prisma.PetOwnerOmit<ExtArgs> | null;
    include?: Prisma.PetOwnerInclude<ExtArgs> | null;
    where: Prisma.PetOwnerWhereUniqueInput;
    create: Prisma.XOR<Prisma.PetOwnerCreateInput, Prisma.PetOwnerUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PetOwnerUpdateInput, Prisma.PetOwnerUncheckedUpdateInput>;
};
export type PetOwnerDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetOwnerSelect<ExtArgs> | null;
    omit?: Prisma.PetOwnerOmit<ExtArgs> | null;
    include?: Prisma.PetOwnerInclude<ExtArgs> | null;
    where: Prisma.PetOwnerWhereUniqueInput;
};
export type PetOwnerDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PetOwnerWhereInput;
    limit?: number;
};
export type PetOwner$emergencyContactsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmergencyContactSelect<ExtArgs> | null;
    omit?: Prisma.EmergencyContactOmit<ExtArgs> | null;
    include?: Prisma.EmergencyContactInclude<ExtArgs> | null;
    where?: Prisma.EmergencyContactWhereInput;
    orderBy?: Prisma.EmergencyContactOrderByWithRelationInput | Prisma.EmergencyContactOrderByWithRelationInput[];
    cursor?: Prisma.EmergencyContactWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EmergencyContactScalarFieldEnum | Prisma.EmergencyContactScalarFieldEnum[];
};
export type PetOwner$petsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetSelect<ExtArgs> | null;
    omit?: Prisma.PetOmit<ExtArgs> | null;
    include?: Prisma.PetInclude<ExtArgs> | null;
    where?: Prisma.PetWhereInput;
    orderBy?: Prisma.PetOrderByWithRelationInput | Prisma.PetOrderByWithRelationInput[];
    cursor?: Prisma.PetWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PetScalarFieldEnum | Prisma.PetScalarFieldEnum[];
};
export type PetOwnerDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetOwnerSelect<ExtArgs> | null;
    omit?: Prisma.PetOwnerOmit<ExtArgs> | null;
    include?: Prisma.PetOwnerInclude<ExtArgs> | null;
};
