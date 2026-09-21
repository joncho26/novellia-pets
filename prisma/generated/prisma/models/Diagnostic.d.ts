import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type DiagnosticModel = runtime.Types.Result.DefaultSelection<Prisma.$DiagnosticPayload>;
export type AggregateDiagnostic = {
    _count: DiagnosticCountAggregateOutputType | null;
    _min: DiagnosticMinAggregateOutputType | null;
    _max: DiagnosticMaxAggregateOutputType | null;
};
export type DiagnosticMinAggregateOutputType = {
    id: string | null;
    petId: string | null;
    medicalRecordId: string | null;
    type: $Enums.DiagnosticType | null;
    date: Date | null;
    result: string | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DiagnosticMaxAggregateOutputType = {
    id: string | null;
    petId: string | null;
    medicalRecordId: string | null;
    type: $Enums.DiagnosticType | null;
    date: Date | null;
    result: string | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DiagnosticCountAggregateOutputType = {
    id: number;
    petId: number;
    medicalRecordId: number;
    type: number;
    date: number;
    result: number;
    notes: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type DiagnosticMinAggregateInputType = {
    id?: true;
    petId?: true;
    medicalRecordId?: true;
    type?: true;
    date?: true;
    result?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DiagnosticMaxAggregateInputType = {
    id?: true;
    petId?: true;
    medicalRecordId?: true;
    type?: true;
    date?: true;
    result?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DiagnosticCountAggregateInputType = {
    id?: true;
    petId?: true;
    medicalRecordId?: true;
    type?: true;
    date?: true;
    result?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type DiagnosticAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiagnosticWhereInput;
    orderBy?: Prisma.DiagnosticOrderByWithRelationInput | Prisma.DiagnosticOrderByWithRelationInput[];
    cursor?: Prisma.DiagnosticWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | DiagnosticCountAggregateInputType;
    _min?: DiagnosticMinAggregateInputType;
    _max?: DiagnosticMaxAggregateInputType;
};
export type GetDiagnosticAggregateType<T extends DiagnosticAggregateArgs> = {
    [P in keyof T & keyof AggregateDiagnostic]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDiagnostic[P]> : Prisma.GetScalarType<T[P], AggregateDiagnostic[P]>;
};
export type DiagnosticGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiagnosticWhereInput;
    orderBy?: Prisma.DiagnosticOrderByWithAggregationInput | Prisma.DiagnosticOrderByWithAggregationInput[];
    by: Prisma.DiagnosticScalarFieldEnum[] | Prisma.DiagnosticScalarFieldEnum;
    having?: Prisma.DiagnosticScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DiagnosticCountAggregateInputType | true;
    _min?: DiagnosticMinAggregateInputType;
    _max?: DiagnosticMaxAggregateInputType;
};
export type DiagnosticGroupByOutputType = {
    id: string;
    petId: string;
    medicalRecordId: string | null;
    type: $Enums.DiagnosticType;
    date: Date;
    result: string | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: DiagnosticCountAggregateOutputType | null;
    _min: DiagnosticMinAggregateOutputType | null;
    _max: DiagnosticMaxAggregateOutputType | null;
};
export type GetDiagnosticGroupByPayload<T extends DiagnosticGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DiagnosticGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DiagnosticGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DiagnosticGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DiagnosticGroupByOutputType[P]>;
}>>;
export type DiagnosticWhereInput = {
    AND?: Prisma.DiagnosticWhereInput | Prisma.DiagnosticWhereInput[];
    OR?: Prisma.DiagnosticWhereInput[];
    NOT?: Prisma.DiagnosticWhereInput | Prisma.DiagnosticWhereInput[];
    id?: Prisma.StringFilter<"Diagnostic"> | string;
    petId?: Prisma.StringFilter<"Diagnostic"> | string;
    medicalRecordId?: Prisma.StringNullableFilter<"Diagnostic"> | string | null;
    type?: Prisma.EnumDiagnosticTypeFilter<"Diagnostic"> | $Enums.DiagnosticType;
    date?: Prisma.DateTimeFilter<"Diagnostic"> | Date | string;
    result?: Prisma.StringNullableFilter<"Diagnostic"> | string | null;
    notes?: Prisma.StringNullableFilter<"Diagnostic"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Diagnostic"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Diagnostic"> | Date | string;
    pet?: Prisma.XOR<Prisma.PetScalarRelationFilter, Prisma.PetWhereInput>;
    medicalRecord?: Prisma.XOR<Prisma.MedicalRecordNullableScalarRelationFilter, Prisma.MedicalRecordWhereInput> | null;
};
export type DiagnosticOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    petId?: Prisma.SortOrder;
    medicalRecordId?: Prisma.SortOrderInput | Prisma.SortOrder;
    type?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    result?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    pet?: Prisma.PetOrderByWithRelationInput;
    medicalRecord?: Prisma.MedicalRecordOrderByWithRelationInput;
};
export type DiagnosticWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.DiagnosticWhereInput | Prisma.DiagnosticWhereInput[];
    OR?: Prisma.DiagnosticWhereInput[];
    NOT?: Prisma.DiagnosticWhereInput | Prisma.DiagnosticWhereInput[];
    petId?: Prisma.StringFilter<"Diagnostic"> | string;
    medicalRecordId?: Prisma.StringNullableFilter<"Diagnostic"> | string | null;
    type?: Prisma.EnumDiagnosticTypeFilter<"Diagnostic"> | $Enums.DiagnosticType;
    date?: Prisma.DateTimeFilter<"Diagnostic"> | Date | string;
    result?: Prisma.StringNullableFilter<"Diagnostic"> | string | null;
    notes?: Prisma.StringNullableFilter<"Diagnostic"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Diagnostic"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Diagnostic"> | Date | string;
    pet?: Prisma.XOR<Prisma.PetScalarRelationFilter, Prisma.PetWhereInput>;
    medicalRecord?: Prisma.XOR<Prisma.MedicalRecordNullableScalarRelationFilter, Prisma.MedicalRecordWhereInput> | null;
}, "id">;
export type DiagnosticOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    petId?: Prisma.SortOrder;
    medicalRecordId?: Prisma.SortOrderInput | Prisma.SortOrder;
    type?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    result?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.DiagnosticCountOrderByAggregateInput;
    _max?: Prisma.DiagnosticMaxOrderByAggregateInput;
    _min?: Prisma.DiagnosticMinOrderByAggregateInput;
};
export type DiagnosticScalarWhereWithAggregatesInput = {
    AND?: Prisma.DiagnosticScalarWhereWithAggregatesInput | Prisma.DiagnosticScalarWhereWithAggregatesInput[];
    OR?: Prisma.DiagnosticScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DiagnosticScalarWhereWithAggregatesInput | Prisma.DiagnosticScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Diagnostic"> | string;
    petId?: Prisma.StringWithAggregatesFilter<"Diagnostic"> | string;
    medicalRecordId?: Prisma.StringNullableWithAggregatesFilter<"Diagnostic"> | string | null;
    type?: Prisma.EnumDiagnosticTypeWithAggregatesFilter<"Diagnostic"> | $Enums.DiagnosticType;
    date?: Prisma.DateTimeWithAggregatesFilter<"Diagnostic"> | Date | string;
    result?: Prisma.StringNullableWithAggregatesFilter<"Diagnostic"> | string | null;
    notes?: Prisma.StringNullableWithAggregatesFilter<"Diagnostic"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Diagnostic"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Diagnostic"> | Date | string;
};
export type DiagnosticCreateInput = {
    id?: string;
    type: $Enums.DiagnosticType;
    date: Date | string;
    result?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pet: Prisma.PetCreateNestedOneWithoutDiagnosticsInput;
    medicalRecord?: Prisma.MedicalRecordCreateNestedOneWithoutDiagnosticsInput;
};
export type DiagnosticUncheckedCreateInput = {
    id?: string;
    petId: string;
    medicalRecordId?: string | null;
    type: $Enums.DiagnosticType;
    date: Date | string;
    result?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DiagnosticUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumDiagnosticTypeFieldUpdateOperationsInput | $Enums.DiagnosticType;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    result?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pet?: Prisma.PetUpdateOneRequiredWithoutDiagnosticsNestedInput;
    medicalRecord?: Prisma.MedicalRecordUpdateOneWithoutDiagnosticsNestedInput;
};
export type DiagnosticUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    petId?: Prisma.StringFieldUpdateOperationsInput | string;
    medicalRecordId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumDiagnosticTypeFieldUpdateOperationsInput | $Enums.DiagnosticType;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    result?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiagnosticCreateManyInput = {
    id?: string;
    petId: string;
    medicalRecordId?: string | null;
    type: $Enums.DiagnosticType;
    date: Date | string;
    result?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DiagnosticUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumDiagnosticTypeFieldUpdateOperationsInput | $Enums.DiagnosticType;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    result?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiagnosticUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    petId?: Prisma.StringFieldUpdateOperationsInput | string;
    medicalRecordId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumDiagnosticTypeFieldUpdateOperationsInput | $Enums.DiagnosticType;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    result?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiagnosticListRelationFilter = {
    every?: Prisma.DiagnosticWhereInput;
    some?: Prisma.DiagnosticWhereInput;
    none?: Prisma.DiagnosticWhereInput;
};
export type DiagnosticOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DiagnosticCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    petId?: Prisma.SortOrder;
    medicalRecordId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    result?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DiagnosticMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    petId?: Prisma.SortOrder;
    medicalRecordId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    result?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DiagnosticMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    petId?: Prisma.SortOrder;
    medicalRecordId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    result?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DiagnosticCreateNestedManyWithoutPetInput = {
    create?: Prisma.XOR<Prisma.DiagnosticCreateWithoutPetInput, Prisma.DiagnosticUncheckedCreateWithoutPetInput> | Prisma.DiagnosticCreateWithoutPetInput[] | Prisma.DiagnosticUncheckedCreateWithoutPetInput[];
    connectOrCreate?: Prisma.DiagnosticCreateOrConnectWithoutPetInput | Prisma.DiagnosticCreateOrConnectWithoutPetInput[];
    createMany?: Prisma.DiagnosticCreateManyPetInputEnvelope;
    connect?: Prisma.DiagnosticWhereUniqueInput | Prisma.DiagnosticWhereUniqueInput[];
};
export type DiagnosticUncheckedCreateNestedManyWithoutPetInput = {
    create?: Prisma.XOR<Prisma.DiagnosticCreateWithoutPetInput, Prisma.DiagnosticUncheckedCreateWithoutPetInput> | Prisma.DiagnosticCreateWithoutPetInput[] | Prisma.DiagnosticUncheckedCreateWithoutPetInput[];
    connectOrCreate?: Prisma.DiagnosticCreateOrConnectWithoutPetInput | Prisma.DiagnosticCreateOrConnectWithoutPetInput[];
    createMany?: Prisma.DiagnosticCreateManyPetInputEnvelope;
    connect?: Prisma.DiagnosticWhereUniqueInput | Prisma.DiagnosticWhereUniqueInput[];
};
export type DiagnosticUpdateManyWithoutPetNestedInput = {
    create?: Prisma.XOR<Prisma.DiagnosticCreateWithoutPetInput, Prisma.DiagnosticUncheckedCreateWithoutPetInput> | Prisma.DiagnosticCreateWithoutPetInput[] | Prisma.DiagnosticUncheckedCreateWithoutPetInput[];
    connectOrCreate?: Prisma.DiagnosticCreateOrConnectWithoutPetInput | Prisma.DiagnosticCreateOrConnectWithoutPetInput[];
    upsert?: Prisma.DiagnosticUpsertWithWhereUniqueWithoutPetInput | Prisma.DiagnosticUpsertWithWhereUniqueWithoutPetInput[];
    createMany?: Prisma.DiagnosticCreateManyPetInputEnvelope;
    set?: Prisma.DiagnosticWhereUniqueInput | Prisma.DiagnosticWhereUniqueInput[];
    disconnect?: Prisma.DiagnosticWhereUniqueInput | Prisma.DiagnosticWhereUniqueInput[];
    delete?: Prisma.DiagnosticWhereUniqueInput | Prisma.DiagnosticWhereUniqueInput[];
    connect?: Prisma.DiagnosticWhereUniqueInput | Prisma.DiagnosticWhereUniqueInput[];
    update?: Prisma.DiagnosticUpdateWithWhereUniqueWithoutPetInput | Prisma.DiagnosticUpdateWithWhereUniqueWithoutPetInput[];
    updateMany?: Prisma.DiagnosticUpdateManyWithWhereWithoutPetInput | Prisma.DiagnosticUpdateManyWithWhereWithoutPetInput[];
    deleteMany?: Prisma.DiagnosticScalarWhereInput | Prisma.DiagnosticScalarWhereInput[];
};
export type DiagnosticUncheckedUpdateManyWithoutPetNestedInput = {
    create?: Prisma.XOR<Prisma.DiagnosticCreateWithoutPetInput, Prisma.DiagnosticUncheckedCreateWithoutPetInput> | Prisma.DiagnosticCreateWithoutPetInput[] | Prisma.DiagnosticUncheckedCreateWithoutPetInput[];
    connectOrCreate?: Prisma.DiagnosticCreateOrConnectWithoutPetInput | Prisma.DiagnosticCreateOrConnectWithoutPetInput[];
    upsert?: Prisma.DiagnosticUpsertWithWhereUniqueWithoutPetInput | Prisma.DiagnosticUpsertWithWhereUniqueWithoutPetInput[];
    createMany?: Prisma.DiagnosticCreateManyPetInputEnvelope;
    set?: Prisma.DiagnosticWhereUniqueInput | Prisma.DiagnosticWhereUniqueInput[];
    disconnect?: Prisma.DiagnosticWhereUniqueInput | Prisma.DiagnosticWhereUniqueInput[];
    delete?: Prisma.DiagnosticWhereUniqueInput | Prisma.DiagnosticWhereUniqueInput[];
    connect?: Prisma.DiagnosticWhereUniqueInput | Prisma.DiagnosticWhereUniqueInput[];
    update?: Prisma.DiagnosticUpdateWithWhereUniqueWithoutPetInput | Prisma.DiagnosticUpdateWithWhereUniqueWithoutPetInput[];
    updateMany?: Prisma.DiagnosticUpdateManyWithWhereWithoutPetInput | Prisma.DiagnosticUpdateManyWithWhereWithoutPetInput[];
    deleteMany?: Prisma.DiagnosticScalarWhereInput | Prisma.DiagnosticScalarWhereInput[];
};
export type DiagnosticCreateNestedManyWithoutMedicalRecordInput = {
    create?: Prisma.XOR<Prisma.DiagnosticCreateWithoutMedicalRecordInput, Prisma.DiagnosticUncheckedCreateWithoutMedicalRecordInput> | Prisma.DiagnosticCreateWithoutMedicalRecordInput[] | Prisma.DiagnosticUncheckedCreateWithoutMedicalRecordInput[];
    connectOrCreate?: Prisma.DiagnosticCreateOrConnectWithoutMedicalRecordInput | Prisma.DiagnosticCreateOrConnectWithoutMedicalRecordInput[];
    createMany?: Prisma.DiagnosticCreateManyMedicalRecordInputEnvelope;
    connect?: Prisma.DiagnosticWhereUniqueInput | Prisma.DiagnosticWhereUniqueInput[];
};
export type DiagnosticUncheckedCreateNestedManyWithoutMedicalRecordInput = {
    create?: Prisma.XOR<Prisma.DiagnosticCreateWithoutMedicalRecordInput, Prisma.DiagnosticUncheckedCreateWithoutMedicalRecordInput> | Prisma.DiagnosticCreateWithoutMedicalRecordInput[] | Prisma.DiagnosticUncheckedCreateWithoutMedicalRecordInput[];
    connectOrCreate?: Prisma.DiagnosticCreateOrConnectWithoutMedicalRecordInput | Prisma.DiagnosticCreateOrConnectWithoutMedicalRecordInput[];
    createMany?: Prisma.DiagnosticCreateManyMedicalRecordInputEnvelope;
    connect?: Prisma.DiagnosticWhereUniqueInput | Prisma.DiagnosticWhereUniqueInput[];
};
export type DiagnosticUpdateManyWithoutMedicalRecordNestedInput = {
    create?: Prisma.XOR<Prisma.DiagnosticCreateWithoutMedicalRecordInput, Prisma.DiagnosticUncheckedCreateWithoutMedicalRecordInput> | Prisma.DiagnosticCreateWithoutMedicalRecordInput[] | Prisma.DiagnosticUncheckedCreateWithoutMedicalRecordInput[];
    connectOrCreate?: Prisma.DiagnosticCreateOrConnectWithoutMedicalRecordInput | Prisma.DiagnosticCreateOrConnectWithoutMedicalRecordInput[];
    upsert?: Prisma.DiagnosticUpsertWithWhereUniqueWithoutMedicalRecordInput | Prisma.DiagnosticUpsertWithWhereUniqueWithoutMedicalRecordInput[];
    createMany?: Prisma.DiagnosticCreateManyMedicalRecordInputEnvelope;
    set?: Prisma.DiagnosticWhereUniqueInput | Prisma.DiagnosticWhereUniqueInput[];
    disconnect?: Prisma.DiagnosticWhereUniqueInput | Prisma.DiagnosticWhereUniqueInput[];
    delete?: Prisma.DiagnosticWhereUniqueInput | Prisma.DiagnosticWhereUniqueInput[];
    connect?: Prisma.DiagnosticWhereUniqueInput | Prisma.DiagnosticWhereUniqueInput[];
    update?: Prisma.DiagnosticUpdateWithWhereUniqueWithoutMedicalRecordInput | Prisma.DiagnosticUpdateWithWhereUniqueWithoutMedicalRecordInput[];
    updateMany?: Prisma.DiagnosticUpdateManyWithWhereWithoutMedicalRecordInput | Prisma.DiagnosticUpdateManyWithWhereWithoutMedicalRecordInput[];
    deleteMany?: Prisma.DiagnosticScalarWhereInput | Prisma.DiagnosticScalarWhereInput[];
};
export type DiagnosticUncheckedUpdateManyWithoutMedicalRecordNestedInput = {
    create?: Prisma.XOR<Prisma.DiagnosticCreateWithoutMedicalRecordInput, Prisma.DiagnosticUncheckedCreateWithoutMedicalRecordInput> | Prisma.DiagnosticCreateWithoutMedicalRecordInput[] | Prisma.DiagnosticUncheckedCreateWithoutMedicalRecordInput[];
    connectOrCreate?: Prisma.DiagnosticCreateOrConnectWithoutMedicalRecordInput | Prisma.DiagnosticCreateOrConnectWithoutMedicalRecordInput[];
    upsert?: Prisma.DiagnosticUpsertWithWhereUniqueWithoutMedicalRecordInput | Prisma.DiagnosticUpsertWithWhereUniqueWithoutMedicalRecordInput[];
    createMany?: Prisma.DiagnosticCreateManyMedicalRecordInputEnvelope;
    set?: Prisma.DiagnosticWhereUniqueInput | Prisma.DiagnosticWhereUniqueInput[];
    disconnect?: Prisma.DiagnosticWhereUniqueInput | Prisma.DiagnosticWhereUniqueInput[];
    delete?: Prisma.DiagnosticWhereUniqueInput | Prisma.DiagnosticWhereUniqueInput[];
    connect?: Prisma.DiagnosticWhereUniqueInput | Prisma.DiagnosticWhereUniqueInput[];
    update?: Prisma.DiagnosticUpdateWithWhereUniqueWithoutMedicalRecordInput | Prisma.DiagnosticUpdateWithWhereUniqueWithoutMedicalRecordInput[];
    updateMany?: Prisma.DiagnosticUpdateManyWithWhereWithoutMedicalRecordInput | Prisma.DiagnosticUpdateManyWithWhereWithoutMedicalRecordInput[];
    deleteMany?: Prisma.DiagnosticScalarWhereInput | Prisma.DiagnosticScalarWhereInput[];
};
export type EnumDiagnosticTypeFieldUpdateOperationsInput = {
    set?: $Enums.DiagnosticType;
};
export type DiagnosticCreateWithoutPetInput = {
    id?: string;
    type: $Enums.DiagnosticType;
    date: Date | string;
    result?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    medicalRecord?: Prisma.MedicalRecordCreateNestedOneWithoutDiagnosticsInput;
};
export type DiagnosticUncheckedCreateWithoutPetInput = {
    id?: string;
    medicalRecordId?: string | null;
    type: $Enums.DiagnosticType;
    date: Date | string;
    result?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DiagnosticCreateOrConnectWithoutPetInput = {
    where: Prisma.DiagnosticWhereUniqueInput;
    create: Prisma.XOR<Prisma.DiagnosticCreateWithoutPetInput, Prisma.DiagnosticUncheckedCreateWithoutPetInput>;
};
export type DiagnosticCreateManyPetInputEnvelope = {
    data: Prisma.DiagnosticCreateManyPetInput | Prisma.DiagnosticCreateManyPetInput[];
    skipDuplicates?: boolean;
};
export type DiagnosticUpsertWithWhereUniqueWithoutPetInput = {
    where: Prisma.DiagnosticWhereUniqueInput;
    update: Prisma.XOR<Prisma.DiagnosticUpdateWithoutPetInput, Prisma.DiagnosticUncheckedUpdateWithoutPetInput>;
    create: Prisma.XOR<Prisma.DiagnosticCreateWithoutPetInput, Prisma.DiagnosticUncheckedCreateWithoutPetInput>;
};
export type DiagnosticUpdateWithWhereUniqueWithoutPetInput = {
    where: Prisma.DiagnosticWhereUniqueInput;
    data: Prisma.XOR<Prisma.DiagnosticUpdateWithoutPetInput, Prisma.DiagnosticUncheckedUpdateWithoutPetInput>;
};
export type DiagnosticUpdateManyWithWhereWithoutPetInput = {
    where: Prisma.DiagnosticScalarWhereInput;
    data: Prisma.XOR<Prisma.DiagnosticUpdateManyMutationInput, Prisma.DiagnosticUncheckedUpdateManyWithoutPetInput>;
};
export type DiagnosticScalarWhereInput = {
    AND?: Prisma.DiagnosticScalarWhereInput | Prisma.DiagnosticScalarWhereInput[];
    OR?: Prisma.DiagnosticScalarWhereInput[];
    NOT?: Prisma.DiagnosticScalarWhereInput | Prisma.DiagnosticScalarWhereInput[];
    id?: Prisma.StringFilter<"Diagnostic"> | string;
    petId?: Prisma.StringFilter<"Diagnostic"> | string;
    medicalRecordId?: Prisma.StringNullableFilter<"Diagnostic"> | string | null;
    type?: Prisma.EnumDiagnosticTypeFilter<"Diagnostic"> | $Enums.DiagnosticType;
    date?: Prisma.DateTimeFilter<"Diagnostic"> | Date | string;
    result?: Prisma.StringNullableFilter<"Diagnostic"> | string | null;
    notes?: Prisma.StringNullableFilter<"Diagnostic"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Diagnostic"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Diagnostic"> | Date | string;
};
export type DiagnosticCreateWithoutMedicalRecordInput = {
    id?: string;
    type: $Enums.DiagnosticType;
    date: Date | string;
    result?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pet: Prisma.PetCreateNestedOneWithoutDiagnosticsInput;
};
export type DiagnosticUncheckedCreateWithoutMedicalRecordInput = {
    id?: string;
    petId: string;
    type: $Enums.DiagnosticType;
    date: Date | string;
    result?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DiagnosticCreateOrConnectWithoutMedicalRecordInput = {
    where: Prisma.DiagnosticWhereUniqueInput;
    create: Prisma.XOR<Prisma.DiagnosticCreateWithoutMedicalRecordInput, Prisma.DiagnosticUncheckedCreateWithoutMedicalRecordInput>;
};
export type DiagnosticCreateManyMedicalRecordInputEnvelope = {
    data: Prisma.DiagnosticCreateManyMedicalRecordInput | Prisma.DiagnosticCreateManyMedicalRecordInput[];
    skipDuplicates?: boolean;
};
export type DiagnosticUpsertWithWhereUniqueWithoutMedicalRecordInput = {
    where: Prisma.DiagnosticWhereUniqueInput;
    update: Prisma.XOR<Prisma.DiagnosticUpdateWithoutMedicalRecordInput, Prisma.DiagnosticUncheckedUpdateWithoutMedicalRecordInput>;
    create: Prisma.XOR<Prisma.DiagnosticCreateWithoutMedicalRecordInput, Prisma.DiagnosticUncheckedCreateWithoutMedicalRecordInput>;
};
export type DiagnosticUpdateWithWhereUniqueWithoutMedicalRecordInput = {
    where: Prisma.DiagnosticWhereUniqueInput;
    data: Prisma.XOR<Prisma.DiagnosticUpdateWithoutMedicalRecordInput, Prisma.DiagnosticUncheckedUpdateWithoutMedicalRecordInput>;
};
export type DiagnosticUpdateManyWithWhereWithoutMedicalRecordInput = {
    where: Prisma.DiagnosticScalarWhereInput;
    data: Prisma.XOR<Prisma.DiagnosticUpdateManyMutationInput, Prisma.DiagnosticUncheckedUpdateManyWithoutMedicalRecordInput>;
};
export type DiagnosticCreateManyPetInput = {
    id?: string;
    medicalRecordId?: string | null;
    type: $Enums.DiagnosticType;
    date: Date | string;
    result?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DiagnosticUpdateWithoutPetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumDiagnosticTypeFieldUpdateOperationsInput | $Enums.DiagnosticType;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    result?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    medicalRecord?: Prisma.MedicalRecordUpdateOneWithoutDiagnosticsNestedInput;
};
export type DiagnosticUncheckedUpdateWithoutPetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    medicalRecordId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumDiagnosticTypeFieldUpdateOperationsInput | $Enums.DiagnosticType;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    result?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiagnosticUncheckedUpdateManyWithoutPetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    medicalRecordId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumDiagnosticTypeFieldUpdateOperationsInput | $Enums.DiagnosticType;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    result?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiagnosticCreateManyMedicalRecordInput = {
    id?: string;
    petId: string;
    type: $Enums.DiagnosticType;
    date: Date | string;
    result?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DiagnosticUpdateWithoutMedicalRecordInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumDiagnosticTypeFieldUpdateOperationsInput | $Enums.DiagnosticType;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    result?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pet?: Prisma.PetUpdateOneRequiredWithoutDiagnosticsNestedInput;
};
export type DiagnosticUncheckedUpdateWithoutMedicalRecordInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    petId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumDiagnosticTypeFieldUpdateOperationsInput | $Enums.DiagnosticType;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    result?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiagnosticUncheckedUpdateManyWithoutMedicalRecordInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    petId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumDiagnosticTypeFieldUpdateOperationsInput | $Enums.DiagnosticType;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    result?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiagnosticSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    petId?: boolean;
    medicalRecordId?: boolean;
    type?: boolean;
    date?: boolean;
    result?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    pet?: boolean | Prisma.PetDefaultArgs<ExtArgs>;
    medicalRecord?: boolean | Prisma.Diagnostic$medicalRecordArgs<ExtArgs>;
}, ExtArgs["result"]["diagnostic"]>;
export type DiagnosticSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    petId?: boolean;
    medicalRecordId?: boolean;
    type?: boolean;
    date?: boolean;
    result?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    pet?: boolean | Prisma.PetDefaultArgs<ExtArgs>;
    medicalRecord?: boolean | Prisma.Diagnostic$medicalRecordArgs<ExtArgs>;
}, ExtArgs["result"]["diagnostic"]>;
export type DiagnosticSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    petId?: boolean;
    medicalRecordId?: boolean;
    type?: boolean;
    date?: boolean;
    result?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    pet?: boolean | Prisma.PetDefaultArgs<ExtArgs>;
    medicalRecord?: boolean | Prisma.Diagnostic$medicalRecordArgs<ExtArgs>;
}, ExtArgs["result"]["diagnostic"]>;
export type DiagnosticSelectScalar = {
    id?: boolean;
    petId?: boolean;
    medicalRecordId?: boolean;
    type?: boolean;
    date?: boolean;
    result?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type DiagnosticOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "petId" | "medicalRecordId" | "type" | "date" | "result" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["diagnostic"]>;
export type DiagnosticInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    pet?: boolean | Prisma.PetDefaultArgs<ExtArgs>;
    medicalRecord?: boolean | Prisma.Diagnostic$medicalRecordArgs<ExtArgs>;
};
export type DiagnosticIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    pet?: boolean | Prisma.PetDefaultArgs<ExtArgs>;
    medicalRecord?: boolean | Prisma.Diagnostic$medicalRecordArgs<ExtArgs>;
};
export type DiagnosticIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    pet?: boolean | Prisma.PetDefaultArgs<ExtArgs>;
    medicalRecord?: boolean | Prisma.Diagnostic$medicalRecordArgs<ExtArgs>;
};
export type $DiagnosticPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Diagnostic";
    objects: {
        pet: Prisma.$PetPayload<ExtArgs>;
        medicalRecord: Prisma.$MedicalRecordPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        petId: string;
        medicalRecordId: string | null;
        type: $Enums.DiagnosticType;
        date: Date;
        result: string | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["diagnostic"]>;
    composites: {};
};
export type DiagnosticGetPayload<S extends boolean | null | undefined | DiagnosticDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DiagnosticPayload, S>;
export type DiagnosticCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DiagnosticFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DiagnosticCountAggregateInputType | true;
};
export interface DiagnosticDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Diagnostic'];
        meta: {
            name: 'Diagnostic';
        };
    };
    findUnique<T extends DiagnosticFindUniqueArgs>(args: Prisma.SelectSubset<T, DiagnosticFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DiagnosticClient<runtime.Types.Result.GetResult<Prisma.$DiagnosticPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends DiagnosticFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DiagnosticFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DiagnosticClient<runtime.Types.Result.GetResult<Prisma.$DiagnosticPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends DiagnosticFindFirstArgs>(args?: Prisma.SelectSubset<T, DiagnosticFindFirstArgs<ExtArgs>>): Prisma.Prisma__DiagnosticClient<runtime.Types.Result.GetResult<Prisma.$DiagnosticPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends DiagnosticFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DiagnosticFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DiagnosticClient<runtime.Types.Result.GetResult<Prisma.$DiagnosticPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends DiagnosticFindManyArgs>(args?: Prisma.SelectSubset<T, DiagnosticFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiagnosticPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends DiagnosticCreateArgs>(args: Prisma.SelectSubset<T, DiagnosticCreateArgs<ExtArgs>>): Prisma.Prisma__DiagnosticClient<runtime.Types.Result.GetResult<Prisma.$DiagnosticPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends DiagnosticCreateManyArgs>(args?: Prisma.SelectSubset<T, DiagnosticCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends DiagnosticCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DiagnosticCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiagnosticPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends DiagnosticDeleteArgs>(args: Prisma.SelectSubset<T, DiagnosticDeleteArgs<ExtArgs>>): Prisma.Prisma__DiagnosticClient<runtime.Types.Result.GetResult<Prisma.$DiagnosticPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends DiagnosticUpdateArgs>(args: Prisma.SelectSubset<T, DiagnosticUpdateArgs<ExtArgs>>): Prisma.Prisma__DiagnosticClient<runtime.Types.Result.GetResult<Prisma.$DiagnosticPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends DiagnosticDeleteManyArgs>(args?: Prisma.SelectSubset<T, DiagnosticDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends DiagnosticUpdateManyArgs>(args: Prisma.SelectSubset<T, DiagnosticUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends DiagnosticUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DiagnosticUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiagnosticPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends DiagnosticUpsertArgs>(args: Prisma.SelectSubset<T, DiagnosticUpsertArgs<ExtArgs>>): Prisma.Prisma__DiagnosticClient<runtime.Types.Result.GetResult<Prisma.$DiagnosticPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends DiagnosticCountArgs>(args?: Prisma.Subset<T, DiagnosticCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DiagnosticCountAggregateOutputType> : number>;
    aggregate<T extends DiagnosticAggregateArgs>(args: Prisma.Subset<T, DiagnosticAggregateArgs>): Prisma.PrismaPromise<GetDiagnosticAggregateType<T>>;
    groupBy<T extends DiagnosticGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DiagnosticGroupByArgs['orderBy'];
    } : {
        orderBy?: DiagnosticGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DiagnosticGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDiagnosticGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: DiagnosticFieldRefs;
}
export interface Prisma__DiagnosticClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    pet<T extends Prisma.PetDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PetDefaultArgs<ExtArgs>>): Prisma.Prisma__PetClient<runtime.Types.Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    medicalRecord<T extends Prisma.Diagnostic$medicalRecordArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Diagnostic$medicalRecordArgs<ExtArgs>>): Prisma.Prisma__MedicalRecordClient<runtime.Types.Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface DiagnosticFieldRefs {
    readonly id: Prisma.FieldRef<"Diagnostic", 'String'>;
    readonly petId: Prisma.FieldRef<"Diagnostic", 'String'>;
    readonly medicalRecordId: Prisma.FieldRef<"Diagnostic", 'String'>;
    readonly type: Prisma.FieldRef<"Diagnostic", 'DiagnosticType'>;
    readonly date: Prisma.FieldRef<"Diagnostic", 'DateTime'>;
    readonly result: Prisma.FieldRef<"Diagnostic", 'String'>;
    readonly notes: Prisma.FieldRef<"Diagnostic", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Diagnostic", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Diagnostic", 'DateTime'>;
}
export type DiagnosticFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiagnosticSelect<ExtArgs> | null;
    omit?: Prisma.DiagnosticOmit<ExtArgs> | null;
    include?: Prisma.DiagnosticInclude<ExtArgs> | null;
    where: Prisma.DiagnosticWhereUniqueInput;
};
export type DiagnosticFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiagnosticSelect<ExtArgs> | null;
    omit?: Prisma.DiagnosticOmit<ExtArgs> | null;
    include?: Prisma.DiagnosticInclude<ExtArgs> | null;
    where: Prisma.DiagnosticWhereUniqueInput;
};
export type DiagnosticFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiagnosticSelect<ExtArgs> | null;
    omit?: Prisma.DiagnosticOmit<ExtArgs> | null;
    include?: Prisma.DiagnosticInclude<ExtArgs> | null;
    where?: Prisma.DiagnosticWhereInput;
    orderBy?: Prisma.DiagnosticOrderByWithRelationInput | Prisma.DiagnosticOrderByWithRelationInput[];
    cursor?: Prisma.DiagnosticWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DiagnosticScalarFieldEnum | Prisma.DiagnosticScalarFieldEnum[];
};
export type DiagnosticFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiagnosticSelect<ExtArgs> | null;
    omit?: Prisma.DiagnosticOmit<ExtArgs> | null;
    include?: Prisma.DiagnosticInclude<ExtArgs> | null;
    where?: Prisma.DiagnosticWhereInput;
    orderBy?: Prisma.DiagnosticOrderByWithRelationInput | Prisma.DiagnosticOrderByWithRelationInput[];
    cursor?: Prisma.DiagnosticWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DiagnosticScalarFieldEnum | Prisma.DiagnosticScalarFieldEnum[];
};
export type DiagnosticFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiagnosticSelect<ExtArgs> | null;
    omit?: Prisma.DiagnosticOmit<ExtArgs> | null;
    include?: Prisma.DiagnosticInclude<ExtArgs> | null;
    where?: Prisma.DiagnosticWhereInput;
    orderBy?: Prisma.DiagnosticOrderByWithRelationInput | Prisma.DiagnosticOrderByWithRelationInput[];
    cursor?: Prisma.DiagnosticWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DiagnosticScalarFieldEnum | Prisma.DiagnosticScalarFieldEnum[];
};
export type DiagnosticCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiagnosticSelect<ExtArgs> | null;
    omit?: Prisma.DiagnosticOmit<ExtArgs> | null;
    include?: Prisma.DiagnosticInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DiagnosticCreateInput, Prisma.DiagnosticUncheckedCreateInput>;
};
export type DiagnosticCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.DiagnosticCreateManyInput | Prisma.DiagnosticCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DiagnosticCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiagnosticSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DiagnosticOmit<ExtArgs> | null;
    data: Prisma.DiagnosticCreateManyInput | Prisma.DiagnosticCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.DiagnosticIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type DiagnosticUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiagnosticSelect<ExtArgs> | null;
    omit?: Prisma.DiagnosticOmit<ExtArgs> | null;
    include?: Prisma.DiagnosticInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DiagnosticUpdateInput, Prisma.DiagnosticUncheckedUpdateInput>;
    where: Prisma.DiagnosticWhereUniqueInput;
};
export type DiagnosticUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.DiagnosticUpdateManyMutationInput, Prisma.DiagnosticUncheckedUpdateManyInput>;
    where?: Prisma.DiagnosticWhereInput;
    limit?: number;
};
export type DiagnosticUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiagnosticSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DiagnosticOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DiagnosticUpdateManyMutationInput, Prisma.DiagnosticUncheckedUpdateManyInput>;
    where?: Prisma.DiagnosticWhereInput;
    limit?: number;
    include?: Prisma.DiagnosticIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type DiagnosticUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiagnosticSelect<ExtArgs> | null;
    omit?: Prisma.DiagnosticOmit<ExtArgs> | null;
    include?: Prisma.DiagnosticInclude<ExtArgs> | null;
    where: Prisma.DiagnosticWhereUniqueInput;
    create: Prisma.XOR<Prisma.DiagnosticCreateInput, Prisma.DiagnosticUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.DiagnosticUpdateInput, Prisma.DiagnosticUncheckedUpdateInput>;
};
export type DiagnosticDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiagnosticSelect<ExtArgs> | null;
    omit?: Prisma.DiagnosticOmit<ExtArgs> | null;
    include?: Prisma.DiagnosticInclude<ExtArgs> | null;
    where: Prisma.DiagnosticWhereUniqueInput;
};
export type DiagnosticDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiagnosticWhereInput;
    limit?: number;
};
export type Diagnostic$medicalRecordArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MedicalRecordSelect<ExtArgs> | null;
    omit?: Prisma.MedicalRecordOmit<ExtArgs> | null;
    include?: Prisma.MedicalRecordInclude<ExtArgs> | null;
    where?: Prisma.MedicalRecordWhereInput;
};
export type DiagnosticDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiagnosticSelect<ExtArgs> | null;
    omit?: Prisma.DiagnosticOmit<ExtArgs> | null;
    include?: Prisma.DiagnosticInclude<ExtArgs> | null;
};
