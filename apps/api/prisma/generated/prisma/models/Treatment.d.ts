import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type TreatmentModel = runtime.Types.Result.DefaultSelection<Prisma.$TreatmentPayload>;
export type AggregateTreatment = {
    _count: TreatmentCountAggregateOutputType | null;
    _min: TreatmentMinAggregateOutputType | null;
    _max: TreatmentMaxAggregateOutputType | null;
};
export type TreatmentMinAggregateOutputType = {
    id: string | null;
    petId: string | null;
    medicalRecordId: string | null;
    name: string | null;
    date: Date | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TreatmentMaxAggregateOutputType = {
    id: string | null;
    petId: string | null;
    medicalRecordId: string | null;
    name: string | null;
    date: Date | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TreatmentCountAggregateOutputType = {
    id: number;
    petId: number;
    medicalRecordId: number;
    name: number;
    date: number;
    notes: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type TreatmentMinAggregateInputType = {
    id?: true;
    petId?: true;
    medicalRecordId?: true;
    name?: true;
    date?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TreatmentMaxAggregateInputType = {
    id?: true;
    petId?: true;
    medicalRecordId?: true;
    name?: true;
    date?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TreatmentCountAggregateInputType = {
    id?: true;
    petId?: true;
    medicalRecordId?: true;
    name?: true;
    date?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type TreatmentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TreatmentWhereInput;
    orderBy?: Prisma.TreatmentOrderByWithRelationInput | Prisma.TreatmentOrderByWithRelationInput[];
    cursor?: Prisma.TreatmentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TreatmentCountAggregateInputType;
    _min?: TreatmentMinAggregateInputType;
    _max?: TreatmentMaxAggregateInputType;
};
export type GetTreatmentAggregateType<T extends TreatmentAggregateArgs> = {
    [P in keyof T & keyof AggregateTreatment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTreatment[P]> : Prisma.GetScalarType<T[P], AggregateTreatment[P]>;
};
export type TreatmentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TreatmentWhereInput;
    orderBy?: Prisma.TreatmentOrderByWithAggregationInput | Prisma.TreatmentOrderByWithAggregationInput[];
    by: Prisma.TreatmentScalarFieldEnum[] | Prisma.TreatmentScalarFieldEnum;
    having?: Prisma.TreatmentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TreatmentCountAggregateInputType | true;
    _min?: TreatmentMinAggregateInputType;
    _max?: TreatmentMaxAggregateInputType;
};
export type TreatmentGroupByOutputType = {
    id: string;
    petId: string;
    medicalRecordId: string | null;
    name: string;
    date: Date;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: TreatmentCountAggregateOutputType | null;
    _min: TreatmentMinAggregateOutputType | null;
    _max: TreatmentMaxAggregateOutputType | null;
};
export type GetTreatmentGroupByPayload<T extends TreatmentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TreatmentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TreatmentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TreatmentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TreatmentGroupByOutputType[P]>;
}>>;
export type TreatmentWhereInput = {
    AND?: Prisma.TreatmentWhereInput | Prisma.TreatmentWhereInput[];
    OR?: Prisma.TreatmentWhereInput[];
    NOT?: Prisma.TreatmentWhereInput | Prisma.TreatmentWhereInput[];
    id?: Prisma.StringFilter<"Treatment"> | string;
    petId?: Prisma.StringFilter<"Treatment"> | string;
    medicalRecordId?: Prisma.StringNullableFilter<"Treatment"> | string | null;
    name?: Prisma.StringFilter<"Treatment"> | string;
    date?: Prisma.DateTimeFilter<"Treatment"> | Date | string;
    notes?: Prisma.StringNullableFilter<"Treatment"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Treatment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Treatment"> | Date | string;
    pet?: Prisma.XOR<Prisma.PetScalarRelationFilter, Prisma.PetWhereInput>;
    medicalRecord?: Prisma.XOR<Prisma.MedicalRecordNullableScalarRelationFilter, Prisma.MedicalRecordWhereInput> | null;
};
export type TreatmentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    petId?: Prisma.SortOrder;
    medicalRecordId?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    pet?: Prisma.PetOrderByWithRelationInput;
    medicalRecord?: Prisma.MedicalRecordOrderByWithRelationInput;
};
export type TreatmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.TreatmentWhereInput | Prisma.TreatmentWhereInput[];
    OR?: Prisma.TreatmentWhereInput[];
    NOT?: Prisma.TreatmentWhereInput | Prisma.TreatmentWhereInput[];
    petId?: Prisma.StringFilter<"Treatment"> | string;
    medicalRecordId?: Prisma.StringNullableFilter<"Treatment"> | string | null;
    name?: Prisma.StringFilter<"Treatment"> | string;
    date?: Prisma.DateTimeFilter<"Treatment"> | Date | string;
    notes?: Prisma.StringNullableFilter<"Treatment"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Treatment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Treatment"> | Date | string;
    pet?: Prisma.XOR<Prisma.PetScalarRelationFilter, Prisma.PetWhereInput>;
    medicalRecord?: Prisma.XOR<Prisma.MedicalRecordNullableScalarRelationFilter, Prisma.MedicalRecordWhereInput> | null;
}, "id">;
export type TreatmentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    petId?: Prisma.SortOrder;
    medicalRecordId?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.TreatmentCountOrderByAggregateInput;
    _max?: Prisma.TreatmentMaxOrderByAggregateInput;
    _min?: Prisma.TreatmentMinOrderByAggregateInput;
};
export type TreatmentScalarWhereWithAggregatesInput = {
    AND?: Prisma.TreatmentScalarWhereWithAggregatesInput | Prisma.TreatmentScalarWhereWithAggregatesInput[];
    OR?: Prisma.TreatmentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TreatmentScalarWhereWithAggregatesInput | Prisma.TreatmentScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Treatment"> | string;
    petId?: Prisma.StringWithAggregatesFilter<"Treatment"> | string;
    medicalRecordId?: Prisma.StringNullableWithAggregatesFilter<"Treatment"> | string | null;
    name?: Prisma.StringWithAggregatesFilter<"Treatment"> | string;
    date?: Prisma.DateTimeWithAggregatesFilter<"Treatment"> | Date | string;
    notes?: Prisma.StringNullableWithAggregatesFilter<"Treatment"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Treatment"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Treatment"> | Date | string;
};
export type TreatmentCreateInput = {
    id?: string;
    name: string;
    date: Date | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pet: Prisma.PetCreateNestedOneWithoutTreatmentsInput;
    medicalRecord?: Prisma.MedicalRecordCreateNestedOneWithoutTreatmentsInput;
};
export type TreatmentUncheckedCreateInput = {
    id?: string;
    petId: string;
    medicalRecordId?: string | null;
    name: string;
    date: Date | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TreatmentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pet?: Prisma.PetUpdateOneRequiredWithoutTreatmentsNestedInput;
    medicalRecord?: Prisma.MedicalRecordUpdateOneWithoutTreatmentsNestedInput;
};
export type TreatmentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    petId?: Prisma.StringFieldUpdateOperationsInput | string;
    medicalRecordId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TreatmentCreateManyInput = {
    id?: string;
    petId: string;
    medicalRecordId?: string | null;
    name: string;
    date: Date | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TreatmentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TreatmentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    petId?: Prisma.StringFieldUpdateOperationsInput | string;
    medicalRecordId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TreatmentListRelationFilter = {
    every?: Prisma.TreatmentWhereInput;
    some?: Prisma.TreatmentWhereInput;
    none?: Prisma.TreatmentWhereInput;
};
export type TreatmentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TreatmentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    petId?: Prisma.SortOrder;
    medicalRecordId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TreatmentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    petId?: Prisma.SortOrder;
    medicalRecordId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TreatmentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    petId?: Prisma.SortOrder;
    medicalRecordId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TreatmentCreateNestedManyWithoutPetInput = {
    create?: Prisma.XOR<Prisma.TreatmentCreateWithoutPetInput, Prisma.TreatmentUncheckedCreateWithoutPetInput> | Prisma.TreatmentCreateWithoutPetInput[] | Prisma.TreatmentUncheckedCreateWithoutPetInput[];
    connectOrCreate?: Prisma.TreatmentCreateOrConnectWithoutPetInput | Prisma.TreatmentCreateOrConnectWithoutPetInput[];
    createMany?: Prisma.TreatmentCreateManyPetInputEnvelope;
    connect?: Prisma.TreatmentWhereUniqueInput | Prisma.TreatmentWhereUniqueInput[];
};
export type TreatmentUncheckedCreateNestedManyWithoutPetInput = {
    create?: Prisma.XOR<Prisma.TreatmentCreateWithoutPetInput, Prisma.TreatmentUncheckedCreateWithoutPetInput> | Prisma.TreatmentCreateWithoutPetInput[] | Prisma.TreatmentUncheckedCreateWithoutPetInput[];
    connectOrCreate?: Prisma.TreatmentCreateOrConnectWithoutPetInput | Prisma.TreatmentCreateOrConnectWithoutPetInput[];
    createMany?: Prisma.TreatmentCreateManyPetInputEnvelope;
    connect?: Prisma.TreatmentWhereUniqueInput | Prisma.TreatmentWhereUniqueInput[];
};
export type TreatmentUpdateManyWithoutPetNestedInput = {
    create?: Prisma.XOR<Prisma.TreatmentCreateWithoutPetInput, Prisma.TreatmentUncheckedCreateWithoutPetInput> | Prisma.TreatmentCreateWithoutPetInput[] | Prisma.TreatmentUncheckedCreateWithoutPetInput[];
    connectOrCreate?: Prisma.TreatmentCreateOrConnectWithoutPetInput | Prisma.TreatmentCreateOrConnectWithoutPetInput[];
    upsert?: Prisma.TreatmentUpsertWithWhereUniqueWithoutPetInput | Prisma.TreatmentUpsertWithWhereUniqueWithoutPetInput[];
    createMany?: Prisma.TreatmentCreateManyPetInputEnvelope;
    set?: Prisma.TreatmentWhereUniqueInput | Prisma.TreatmentWhereUniqueInput[];
    disconnect?: Prisma.TreatmentWhereUniqueInput | Prisma.TreatmentWhereUniqueInput[];
    delete?: Prisma.TreatmentWhereUniqueInput | Prisma.TreatmentWhereUniqueInput[];
    connect?: Prisma.TreatmentWhereUniqueInput | Prisma.TreatmentWhereUniqueInput[];
    update?: Prisma.TreatmentUpdateWithWhereUniqueWithoutPetInput | Prisma.TreatmentUpdateWithWhereUniqueWithoutPetInput[];
    updateMany?: Prisma.TreatmentUpdateManyWithWhereWithoutPetInput | Prisma.TreatmentUpdateManyWithWhereWithoutPetInput[];
    deleteMany?: Prisma.TreatmentScalarWhereInput | Prisma.TreatmentScalarWhereInput[];
};
export type TreatmentUncheckedUpdateManyWithoutPetNestedInput = {
    create?: Prisma.XOR<Prisma.TreatmentCreateWithoutPetInput, Prisma.TreatmentUncheckedCreateWithoutPetInput> | Prisma.TreatmentCreateWithoutPetInput[] | Prisma.TreatmentUncheckedCreateWithoutPetInput[];
    connectOrCreate?: Prisma.TreatmentCreateOrConnectWithoutPetInput | Prisma.TreatmentCreateOrConnectWithoutPetInput[];
    upsert?: Prisma.TreatmentUpsertWithWhereUniqueWithoutPetInput | Prisma.TreatmentUpsertWithWhereUniqueWithoutPetInput[];
    createMany?: Prisma.TreatmentCreateManyPetInputEnvelope;
    set?: Prisma.TreatmentWhereUniqueInput | Prisma.TreatmentWhereUniqueInput[];
    disconnect?: Prisma.TreatmentWhereUniqueInput | Prisma.TreatmentWhereUniqueInput[];
    delete?: Prisma.TreatmentWhereUniqueInput | Prisma.TreatmentWhereUniqueInput[];
    connect?: Prisma.TreatmentWhereUniqueInput | Prisma.TreatmentWhereUniqueInput[];
    update?: Prisma.TreatmentUpdateWithWhereUniqueWithoutPetInput | Prisma.TreatmentUpdateWithWhereUniqueWithoutPetInput[];
    updateMany?: Prisma.TreatmentUpdateManyWithWhereWithoutPetInput | Prisma.TreatmentUpdateManyWithWhereWithoutPetInput[];
    deleteMany?: Prisma.TreatmentScalarWhereInput | Prisma.TreatmentScalarWhereInput[];
};
export type TreatmentCreateNestedManyWithoutMedicalRecordInput = {
    create?: Prisma.XOR<Prisma.TreatmentCreateWithoutMedicalRecordInput, Prisma.TreatmentUncheckedCreateWithoutMedicalRecordInput> | Prisma.TreatmentCreateWithoutMedicalRecordInput[] | Prisma.TreatmentUncheckedCreateWithoutMedicalRecordInput[];
    connectOrCreate?: Prisma.TreatmentCreateOrConnectWithoutMedicalRecordInput | Prisma.TreatmentCreateOrConnectWithoutMedicalRecordInput[];
    createMany?: Prisma.TreatmentCreateManyMedicalRecordInputEnvelope;
    connect?: Prisma.TreatmentWhereUniqueInput | Prisma.TreatmentWhereUniqueInput[];
};
export type TreatmentUncheckedCreateNestedManyWithoutMedicalRecordInput = {
    create?: Prisma.XOR<Prisma.TreatmentCreateWithoutMedicalRecordInput, Prisma.TreatmentUncheckedCreateWithoutMedicalRecordInput> | Prisma.TreatmentCreateWithoutMedicalRecordInput[] | Prisma.TreatmentUncheckedCreateWithoutMedicalRecordInput[];
    connectOrCreate?: Prisma.TreatmentCreateOrConnectWithoutMedicalRecordInput | Prisma.TreatmentCreateOrConnectWithoutMedicalRecordInput[];
    createMany?: Prisma.TreatmentCreateManyMedicalRecordInputEnvelope;
    connect?: Prisma.TreatmentWhereUniqueInput | Prisma.TreatmentWhereUniqueInput[];
};
export type TreatmentUpdateManyWithoutMedicalRecordNestedInput = {
    create?: Prisma.XOR<Prisma.TreatmentCreateWithoutMedicalRecordInput, Prisma.TreatmentUncheckedCreateWithoutMedicalRecordInput> | Prisma.TreatmentCreateWithoutMedicalRecordInput[] | Prisma.TreatmentUncheckedCreateWithoutMedicalRecordInput[];
    connectOrCreate?: Prisma.TreatmentCreateOrConnectWithoutMedicalRecordInput | Prisma.TreatmentCreateOrConnectWithoutMedicalRecordInput[];
    upsert?: Prisma.TreatmentUpsertWithWhereUniqueWithoutMedicalRecordInput | Prisma.TreatmentUpsertWithWhereUniqueWithoutMedicalRecordInput[];
    createMany?: Prisma.TreatmentCreateManyMedicalRecordInputEnvelope;
    set?: Prisma.TreatmentWhereUniqueInput | Prisma.TreatmentWhereUniqueInput[];
    disconnect?: Prisma.TreatmentWhereUniqueInput | Prisma.TreatmentWhereUniqueInput[];
    delete?: Prisma.TreatmentWhereUniqueInput | Prisma.TreatmentWhereUniqueInput[];
    connect?: Prisma.TreatmentWhereUniqueInput | Prisma.TreatmentWhereUniqueInput[];
    update?: Prisma.TreatmentUpdateWithWhereUniqueWithoutMedicalRecordInput | Prisma.TreatmentUpdateWithWhereUniqueWithoutMedicalRecordInput[];
    updateMany?: Prisma.TreatmentUpdateManyWithWhereWithoutMedicalRecordInput | Prisma.TreatmentUpdateManyWithWhereWithoutMedicalRecordInput[];
    deleteMany?: Prisma.TreatmentScalarWhereInput | Prisma.TreatmentScalarWhereInput[];
};
export type TreatmentUncheckedUpdateManyWithoutMedicalRecordNestedInput = {
    create?: Prisma.XOR<Prisma.TreatmentCreateWithoutMedicalRecordInput, Prisma.TreatmentUncheckedCreateWithoutMedicalRecordInput> | Prisma.TreatmentCreateWithoutMedicalRecordInput[] | Prisma.TreatmentUncheckedCreateWithoutMedicalRecordInput[];
    connectOrCreate?: Prisma.TreatmentCreateOrConnectWithoutMedicalRecordInput | Prisma.TreatmentCreateOrConnectWithoutMedicalRecordInput[];
    upsert?: Prisma.TreatmentUpsertWithWhereUniqueWithoutMedicalRecordInput | Prisma.TreatmentUpsertWithWhereUniqueWithoutMedicalRecordInput[];
    createMany?: Prisma.TreatmentCreateManyMedicalRecordInputEnvelope;
    set?: Prisma.TreatmentWhereUniqueInput | Prisma.TreatmentWhereUniqueInput[];
    disconnect?: Prisma.TreatmentWhereUniqueInput | Prisma.TreatmentWhereUniqueInput[];
    delete?: Prisma.TreatmentWhereUniqueInput | Prisma.TreatmentWhereUniqueInput[];
    connect?: Prisma.TreatmentWhereUniqueInput | Prisma.TreatmentWhereUniqueInput[];
    update?: Prisma.TreatmentUpdateWithWhereUniqueWithoutMedicalRecordInput | Prisma.TreatmentUpdateWithWhereUniqueWithoutMedicalRecordInput[];
    updateMany?: Prisma.TreatmentUpdateManyWithWhereWithoutMedicalRecordInput | Prisma.TreatmentUpdateManyWithWhereWithoutMedicalRecordInput[];
    deleteMany?: Prisma.TreatmentScalarWhereInput | Prisma.TreatmentScalarWhereInput[];
};
export type TreatmentCreateWithoutPetInput = {
    id?: string;
    name: string;
    date: Date | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    medicalRecord?: Prisma.MedicalRecordCreateNestedOneWithoutTreatmentsInput;
};
export type TreatmentUncheckedCreateWithoutPetInput = {
    id?: string;
    medicalRecordId?: string | null;
    name: string;
    date: Date | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TreatmentCreateOrConnectWithoutPetInput = {
    where: Prisma.TreatmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.TreatmentCreateWithoutPetInput, Prisma.TreatmentUncheckedCreateWithoutPetInput>;
};
export type TreatmentCreateManyPetInputEnvelope = {
    data: Prisma.TreatmentCreateManyPetInput | Prisma.TreatmentCreateManyPetInput[];
    skipDuplicates?: boolean;
};
export type TreatmentUpsertWithWhereUniqueWithoutPetInput = {
    where: Prisma.TreatmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.TreatmentUpdateWithoutPetInput, Prisma.TreatmentUncheckedUpdateWithoutPetInput>;
    create: Prisma.XOR<Prisma.TreatmentCreateWithoutPetInput, Prisma.TreatmentUncheckedCreateWithoutPetInput>;
};
export type TreatmentUpdateWithWhereUniqueWithoutPetInput = {
    where: Prisma.TreatmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.TreatmentUpdateWithoutPetInput, Prisma.TreatmentUncheckedUpdateWithoutPetInput>;
};
export type TreatmentUpdateManyWithWhereWithoutPetInput = {
    where: Prisma.TreatmentScalarWhereInput;
    data: Prisma.XOR<Prisma.TreatmentUpdateManyMutationInput, Prisma.TreatmentUncheckedUpdateManyWithoutPetInput>;
};
export type TreatmentScalarWhereInput = {
    AND?: Prisma.TreatmentScalarWhereInput | Prisma.TreatmentScalarWhereInput[];
    OR?: Prisma.TreatmentScalarWhereInput[];
    NOT?: Prisma.TreatmentScalarWhereInput | Prisma.TreatmentScalarWhereInput[];
    id?: Prisma.StringFilter<"Treatment"> | string;
    petId?: Prisma.StringFilter<"Treatment"> | string;
    medicalRecordId?: Prisma.StringNullableFilter<"Treatment"> | string | null;
    name?: Prisma.StringFilter<"Treatment"> | string;
    date?: Prisma.DateTimeFilter<"Treatment"> | Date | string;
    notes?: Prisma.StringNullableFilter<"Treatment"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Treatment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Treatment"> | Date | string;
};
export type TreatmentCreateWithoutMedicalRecordInput = {
    id?: string;
    name: string;
    date: Date | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pet: Prisma.PetCreateNestedOneWithoutTreatmentsInput;
};
export type TreatmentUncheckedCreateWithoutMedicalRecordInput = {
    id?: string;
    petId: string;
    name: string;
    date: Date | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TreatmentCreateOrConnectWithoutMedicalRecordInput = {
    where: Prisma.TreatmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.TreatmentCreateWithoutMedicalRecordInput, Prisma.TreatmentUncheckedCreateWithoutMedicalRecordInput>;
};
export type TreatmentCreateManyMedicalRecordInputEnvelope = {
    data: Prisma.TreatmentCreateManyMedicalRecordInput | Prisma.TreatmentCreateManyMedicalRecordInput[];
    skipDuplicates?: boolean;
};
export type TreatmentUpsertWithWhereUniqueWithoutMedicalRecordInput = {
    where: Prisma.TreatmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.TreatmentUpdateWithoutMedicalRecordInput, Prisma.TreatmentUncheckedUpdateWithoutMedicalRecordInput>;
    create: Prisma.XOR<Prisma.TreatmentCreateWithoutMedicalRecordInput, Prisma.TreatmentUncheckedCreateWithoutMedicalRecordInput>;
};
export type TreatmentUpdateWithWhereUniqueWithoutMedicalRecordInput = {
    where: Prisma.TreatmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.TreatmentUpdateWithoutMedicalRecordInput, Prisma.TreatmentUncheckedUpdateWithoutMedicalRecordInput>;
};
export type TreatmentUpdateManyWithWhereWithoutMedicalRecordInput = {
    where: Prisma.TreatmentScalarWhereInput;
    data: Prisma.XOR<Prisma.TreatmentUpdateManyMutationInput, Prisma.TreatmentUncheckedUpdateManyWithoutMedicalRecordInput>;
};
export type TreatmentCreateManyPetInput = {
    id?: string;
    medicalRecordId?: string | null;
    name: string;
    date: Date | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TreatmentUpdateWithoutPetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    medicalRecord?: Prisma.MedicalRecordUpdateOneWithoutTreatmentsNestedInput;
};
export type TreatmentUncheckedUpdateWithoutPetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    medicalRecordId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TreatmentUncheckedUpdateManyWithoutPetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    medicalRecordId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TreatmentCreateManyMedicalRecordInput = {
    id?: string;
    petId: string;
    name: string;
    date: Date | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TreatmentUpdateWithoutMedicalRecordInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pet?: Prisma.PetUpdateOneRequiredWithoutTreatmentsNestedInput;
};
export type TreatmentUncheckedUpdateWithoutMedicalRecordInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    petId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TreatmentUncheckedUpdateManyWithoutMedicalRecordInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    petId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TreatmentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    petId?: boolean;
    medicalRecordId?: boolean;
    name?: boolean;
    date?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    pet?: boolean | Prisma.PetDefaultArgs<ExtArgs>;
    medicalRecord?: boolean | Prisma.Treatment$medicalRecordArgs<ExtArgs>;
}, ExtArgs["result"]["treatment"]>;
export type TreatmentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    petId?: boolean;
    medicalRecordId?: boolean;
    name?: boolean;
    date?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    pet?: boolean | Prisma.PetDefaultArgs<ExtArgs>;
    medicalRecord?: boolean | Prisma.Treatment$medicalRecordArgs<ExtArgs>;
}, ExtArgs["result"]["treatment"]>;
export type TreatmentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    petId?: boolean;
    medicalRecordId?: boolean;
    name?: boolean;
    date?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    pet?: boolean | Prisma.PetDefaultArgs<ExtArgs>;
    medicalRecord?: boolean | Prisma.Treatment$medicalRecordArgs<ExtArgs>;
}, ExtArgs["result"]["treatment"]>;
export type TreatmentSelectScalar = {
    id?: boolean;
    petId?: boolean;
    medicalRecordId?: boolean;
    name?: boolean;
    date?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type TreatmentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "petId" | "medicalRecordId" | "name" | "date" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["treatment"]>;
export type TreatmentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    pet?: boolean | Prisma.PetDefaultArgs<ExtArgs>;
    medicalRecord?: boolean | Prisma.Treatment$medicalRecordArgs<ExtArgs>;
};
export type TreatmentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    pet?: boolean | Prisma.PetDefaultArgs<ExtArgs>;
    medicalRecord?: boolean | Prisma.Treatment$medicalRecordArgs<ExtArgs>;
};
export type TreatmentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    pet?: boolean | Prisma.PetDefaultArgs<ExtArgs>;
    medicalRecord?: boolean | Prisma.Treatment$medicalRecordArgs<ExtArgs>;
};
export type $TreatmentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Treatment";
    objects: {
        pet: Prisma.$PetPayload<ExtArgs>;
        medicalRecord: Prisma.$MedicalRecordPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        petId: string;
        medicalRecordId: string | null;
        name: string;
        date: Date;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["treatment"]>;
    composites: {};
};
export type TreatmentGetPayload<S extends boolean | null | undefined | TreatmentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TreatmentPayload, S>;
export type TreatmentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TreatmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TreatmentCountAggregateInputType | true;
};
export interface TreatmentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Treatment'];
        meta: {
            name: 'Treatment';
        };
    };
    findUnique<T extends TreatmentFindUniqueArgs>(args: Prisma.SelectSubset<T, TreatmentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TreatmentClient<runtime.Types.Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TreatmentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TreatmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TreatmentClient<runtime.Types.Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TreatmentFindFirstArgs>(args?: Prisma.SelectSubset<T, TreatmentFindFirstArgs<ExtArgs>>): Prisma.Prisma__TreatmentClient<runtime.Types.Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TreatmentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TreatmentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TreatmentClient<runtime.Types.Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TreatmentFindManyArgs>(args?: Prisma.SelectSubset<T, TreatmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TreatmentCreateArgs>(args: Prisma.SelectSubset<T, TreatmentCreateArgs<ExtArgs>>): Prisma.Prisma__TreatmentClient<runtime.Types.Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TreatmentCreateManyArgs>(args?: Prisma.SelectSubset<T, TreatmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TreatmentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TreatmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TreatmentDeleteArgs>(args: Prisma.SelectSubset<T, TreatmentDeleteArgs<ExtArgs>>): Prisma.Prisma__TreatmentClient<runtime.Types.Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TreatmentUpdateArgs>(args: Prisma.SelectSubset<T, TreatmentUpdateArgs<ExtArgs>>): Prisma.Prisma__TreatmentClient<runtime.Types.Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TreatmentDeleteManyArgs>(args?: Prisma.SelectSubset<T, TreatmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TreatmentUpdateManyArgs>(args: Prisma.SelectSubset<T, TreatmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TreatmentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TreatmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TreatmentUpsertArgs>(args: Prisma.SelectSubset<T, TreatmentUpsertArgs<ExtArgs>>): Prisma.Prisma__TreatmentClient<runtime.Types.Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TreatmentCountArgs>(args?: Prisma.Subset<T, TreatmentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TreatmentCountAggregateOutputType> : number>;
    aggregate<T extends TreatmentAggregateArgs>(args: Prisma.Subset<T, TreatmentAggregateArgs>): Prisma.PrismaPromise<GetTreatmentAggregateType<T>>;
    groupBy<T extends TreatmentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TreatmentGroupByArgs['orderBy'];
    } : {
        orderBy?: TreatmentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TreatmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTreatmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TreatmentFieldRefs;
}
export interface Prisma__TreatmentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    pet<T extends Prisma.PetDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PetDefaultArgs<ExtArgs>>): Prisma.Prisma__PetClient<runtime.Types.Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    medicalRecord<T extends Prisma.Treatment$medicalRecordArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Treatment$medicalRecordArgs<ExtArgs>>): Prisma.Prisma__MedicalRecordClient<runtime.Types.Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TreatmentFieldRefs {
    readonly id: Prisma.FieldRef<"Treatment", 'String'>;
    readonly petId: Prisma.FieldRef<"Treatment", 'String'>;
    readonly medicalRecordId: Prisma.FieldRef<"Treatment", 'String'>;
    readonly name: Prisma.FieldRef<"Treatment", 'String'>;
    readonly date: Prisma.FieldRef<"Treatment", 'DateTime'>;
    readonly notes: Prisma.FieldRef<"Treatment", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Treatment", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Treatment", 'DateTime'>;
}
export type TreatmentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TreatmentSelect<ExtArgs> | null;
    omit?: Prisma.TreatmentOmit<ExtArgs> | null;
    include?: Prisma.TreatmentInclude<ExtArgs> | null;
    where: Prisma.TreatmentWhereUniqueInput;
};
export type TreatmentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TreatmentSelect<ExtArgs> | null;
    omit?: Prisma.TreatmentOmit<ExtArgs> | null;
    include?: Prisma.TreatmentInclude<ExtArgs> | null;
    where: Prisma.TreatmentWhereUniqueInput;
};
export type TreatmentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TreatmentSelect<ExtArgs> | null;
    omit?: Prisma.TreatmentOmit<ExtArgs> | null;
    include?: Prisma.TreatmentInclude<ExtArgs> | null;
    where?: Prisma.TreatmentWhereInput;
    orderBy?: Prisma.TreatmentOrderByWithRelationInput | Prisma.TreatmentOrderByWithRelationInput[];
    cursor?: Prisma.TreatmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TreatmentScalarFieldEnum | Prisma.TreatmentScalarFieldEnum[];
};
export type TreatmentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TreatmentSelect<ExtArgs> | null;
    omit?: Prisma.TreatmentOmit<ExtArgs> | null;
    include?: Prisma.TreatmentInclude<ExtArgs> | null;
    where?: Prisma.TreatmentWhereInput;
    orderBy?: Prisma.TreatmentOrderByWithRelationInput | Prisma.TreatmentOrderByWithRelationInput[];
    cursor?: Prisma.TreatmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TreatmentScalarFieldEnum | Prisma.TreatmentScalarFieldEnum[];
};
export type TreatmentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TreatmentSelect<ExtArgs> | null;
    omit?: Prisma.TreatmentOmit<ExtArgs> | null;
    include?: Prisma.TreatmentInclude<ExtArgs> | null;
    where?: Prisma.TreatmentWhereInput;
    orderBy?: Prisma.TreatmentOrderByWithRelationInput | Prisma.TreatmentOrderByWithRelationInput[];
    cursor?: Prisma.TreatmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TreatmentScalarFieldEnum | Prisma.TreatmentScalarFieldEnum[];
};
export type TreatmentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TreatmentSelect<ExtArgs> | null;
    omit?: Prisma.TreatmentOmit<ExtArgs> | null;
    include?: Prisma.TreatmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TreatmentCreateInput, Prisma.TreatmentUncheckedCreateInput>;
};
export type TreatmentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TreatmentCreateManyInput | Prisma.TreatmentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TreatmentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TreatmentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TreatmentOmit<ExtArgs> | null;
    data: Prisma.TreatmentCreateManyInput | Prisma.TreatmentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TreatmentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TreatmentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TreatmentSelect<ExtArgs> | null;
    omit?: Prisma.TreatmentOmit<ExtArgs> | null;
    include?: Prisma.TreatmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TreatmentUpdateInput, Prisma.TreatmentUncheckedUpdateInput>;
    where: Prisma.TreatmentWhereUniqueInput;
};
export type TreatmentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TreatmentUpdateManyMutationInput, Prisma.TreatmentUncheckedUpdateManyInput>;
    where?: Prisma.TreatmentWhereInput;
    limit?: number;
};
export type TreatmentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TreatmentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TreatmentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TreatmentUpdateManyMutationInput, Prisma.TreatmentUncheckedUpdateManyInput>;
    where?: Prisma.TreatmentWhereInput;
    limit?: number;
    include?: Prisma.TreatmentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TreatmentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TreatmentSelect<ExtArgs> | null;
    omit?: Prisma.TreatmentOmit<ExtArgs> | null;
    include?: Prisma.TreatmentInclude<ExtArgs> | null;
    where: Prisma.TreatmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.TreatmentCreateInput, Prisma.TreatmentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TreatmentUpdateInput, Prisma.TreatmentUncheckedUpdateInput>;
};
export type TreatmentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TreatmentSelect<ExtArgs> | null;
    omit?: Prisma.TreatmentOmit<ExtArgs> | null;
    include?: Prisma.TreatmentInclude<ExtArgs> | null;
    where: Prisma.TreatmentWhereUniqueInput;
};
export type TreatmentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TreatmentWhereInput;
    limit?: number;
};
export type Treatment$medicalRecordArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MedicalRecordSelect<ExtArgs> | null;
    omit?: Prisma.MedicalRecordOmit<ExtArgs> | null;
    include?: Prisma.MedicalRecordInclude<ExtArgs> | null;
    where?: Prisma.MedicalRecordWhereInput;
};
export type TreatmentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TreatmentSelect<ExtArgs> | null;
    omit?: Prisma.TreatmentOmit<ExtArgs> | null;
    include?: Prisma.TreatmentInclude<ExtArgs> | null;
};
