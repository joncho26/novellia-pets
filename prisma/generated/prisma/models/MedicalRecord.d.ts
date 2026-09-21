import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type MedicalRecordModel = runtime.Types.Result.DefaultSelection<Prisma.$MedicalRecordPayload>;
export type AggregateMedicalRecord = {
    _count: MedicalRecordCountAggregateOutputType | null;
    _min: MedicalRecordMinAggregateOutputType | null;
    _max: MedicalRecordMaxAggregateOutputType | null;
};
export type MedicalRecordMinAggregateOutputType = {
    id: string | null;
    petId: string | null;
    recordDate: Date | null;
    vetContactId: string | null;
    vetName: string | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MedicalRecordMaxAggregateOutputType = {
    id: string | null;
    petId: string | null;
    recordDate: Date | null;
    vetContactId: string | null;
    vetName: string | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MedicalRecordCountAggregateOutputType = {
    id: number;
    petId: number;
    recordDate: number;
    vetContactId: number;
    vetName: number;
    notes: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type MedicalRecordMinAggregateInputType = {
    id?: true;
    petId?: true;
    recordDate?: true;
    vetContactId?: true;
    vetName?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MedicalRecordMaxAggregateInputType = {
    id?: true;
    petId?: true;
    recordDate?: true;
    vetContactId?: true;
    vetName?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MedicalRecordCountAggregateInputType = {
    id?: true;
    petId?: true;
    recordDate?: true;
    vetContactId?: true;
    vetName?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type MedicalRecordAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MedicalRecordWhereInput;
    orderBy?: Prisma.MedicalRecordOrderByWithRelationInput | Prisma.MedicalRecordOrderByWithRelationInput[];
    cursor?: Prisma.MedicalRecordWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MedicalRecordCountAggregateInputType;
    _min?: MedicalRecordMinAggregateInputType;
    _max?: MedicalRecordMaxAggregateInputType;
};
export type GetMedicalRecordAggregateType<T extends MedicalRecordAggregateArgs> = {
    [P in keyof T & keyof AggregateMedicalRecord]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMedicalRecord[P]> : Prisma.GetScalarType<T[P], AggregateMedicalRecord[P]>;
};
export type MedicalRecordGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MedicalRecordWhereInput;
    orderBy?: Prisma.MedicalRecordOrderByWithAggregationInput | Prisma.MedicalRecordOrderByWithAggregationInput[];
    by: Prisma.MedicalRecordScalarFieldEnum[] | Prisma.MedicalRecordScalarFieldEnum;
    having?: Prisma.MedicalRecordScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MedicalRecordCountAggregateInputType | true;
    _min?: MedicalRecordMinAggregateInputType;
    _max?: MedicalRecordMaxAggregateInputType;
};
export type MedicalRecordGroupByOutputType = {
    id: string;
    petId: string;
    recordDate: Date;
    vetContactId: string | null;
    vetName: string | null;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
    _count: MedicalRecordCountAggregateOutputType | null;
    _min: MedicalRecordMinAggregateOutputType | null;
    _max: MedicalRecordMaxAggregateOutputType | null;
};
export type GetMedicalRecordGroupByPayload<T extends MedicalRecordGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MedicalRecordGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MedicalRecordGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MedicalRecordGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MedicalRecordGroupByOutputType[P]>;
}>>;
export type MedicalRecordWhereInput = {
    AND?: Prisma.MedicalRecordWhereInput | Prisma.MedicalRecordWhereInput[];
    OR?: Prisma.MedicalRecordWhereInput[];
    NOT?: Prisma.MedicalRecordWhereInput | Prisma.MedicalRecordWhereInput[];
    id?: Prisma.StringFilter<"MedicalRecord"> | string;
    petId?: Prisma.StringFilter<"MedicalRecord"> | string;
    recordDate?: Prisma.DateTimeFilter<"MedicalRecord"> | Date | string;
    vetContactId?: Prisma.StringNullableFilter<"MedicalRecord"> | string | null;
    vetName?: Prisma.StringNullableFilter<"MedicalRecord"> | string | null;
    notes?: Prisma.StringFilter<"MedicalRecord"> | string;
    createdAt?: Prisma.DateTimeFilter<"MedicalRecord"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MedicalRecord"> | Date | string;
    pet?: Prisma.XOR<Prisma.PetScalarRelationFilter, Prisma.PetWhereInput>;
    vet?: Prisma.XOR<Prisma.EmergencyContactNullableScalarRelationFilter, Prisma.EmergencyContactWhereInput> | null;
    treatments?: Prisma.TreatmentListRelationFilter;
    immunizations?: Prisma.ImmunizationListRelationFilter;
    diagnostics?: Prisma.DiagnosticListRelationFilter;
    medications?: Prisma.MedicationListRelationFilter;
};
export type MedicalRecordOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    petId?: Prisma.SortOrder;
    recordDate?: Prisma.SortOrder;
    vetContactId?: Prisma.SortOrderInput | Prisma.SortOrder;
    vetName?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    pet?: Prisma.PetOrderByWithRelationInput;
    vet?: Prisma.EmergencyContactOrderByWithRelationInput;
    treatments?: Prisma.TreatmentOrderByRelationAggregateInput;
    immunizations?: Prisma.ImmunizationOrderByRelationAggregateInput;
    diagnostics?: Prisma.DiagnosticOrderByRelationAggregateInput;
    medications?: Prisma.MedicationOrderByRelationAggregateInput;
};
export type MedicalRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.MedicalRecordWhereInput | Prisma.MedicalRecordWhereInput[];
    OR?: Prisma.MedicalRecordWhereInput[];
    NOT?: Prisma.MedicalRecordWhereInput | Prisma.MedicalRecordWhereInput[];
    petId?: Prisma.StringFilter<"MedicalRecord"> | string;
    recordDate?: Prisma.DateTimeFilter<"MedicalRecord"> | Date | string;
    vetContactId?: Prisma.StringNullableFilter<"MedicalRecord"> | string | null;
    vetName?: Prisma.StringNullableFilter<"MedicalRecord"> | string | null;
    notes?: Prisma.StringFilter<"MedicalRecord"> | string;
    createdAt?: Prisma.DateTimeFilter<"MedicalRecord"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MedicalRecord"> | Date | string;
    pet?: Prisma.XOR<Prisma.PetScalarRelationFilter, Prisma.PetWhereInput>;
    vet?: Prisma.XOR<Prisma.EmergencyContactNullableScalarRelationFilter, Prisma.EmergencyContactWhereInput> | null;
    treatments?: Prisma.TreatmentListRelationFilter;
    immunizations?: Prisma.ImmunizationListRelationFilter;
    diagnostics?: Prisma.DiagnosticListRelationFilter;
    medications?: Prisma.MedicationListRelationFilter;
}, "id">;
export type MedicalRecordOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    petId?: Prisma.SortOrder;
    recordDate?: Prisma.SortOrder;
    vetContactId?: Prisma.SortOrderInput | Prisma.SortOrder;
    vetName?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.MedicalRecordCountOrderByAggregateInput;
    _max?: Prisma.MedicalRecordMaxOrderByAggregateInput;
    _min?: Prisma.MedicalRecordMinOrderByAggregateInput;
};
export type MedicalRecordScalarWhereWithAggregatesInput = {
    AND?: Prisma.MedicalRecordScalarWhereWithAggregatesInput | Prisma.MedicalRecordScalarWhereWithAggregatesInput[];
    OR?: Prisma.MedicalRecordScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MedicalRecordScalarWhereWithAggregatesInput | Prisma.MedicalRecordScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"MedicalRecord"> | string;
    petId?: Prisma.StringWithAggregatesFilter<"MedicalRecord"> | string;
    recordDate?: Prisma.DateTimeWithAggregatesFilter<"MedicalRecord"> | Date | string;
    vetContactId?: Prisma.StringNullableWithAggregatesFilter<"MedicalRecord"> | string | null;
    vetName?: Prisma.StringNullableWithAggregatesFilter<"MedicalRecord"> | string | null;
    notes?: Prisma.StringWithAggregatesFilter<"MedicalRecord"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"MedicalRecord"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"MedicalRecord"> | Date | string;
};
export type MedicalRecordCreateInput = {
    id?: string;
    recordDate: Date | string;
    vetName?: string | null;
    notes: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pet: Prisma.PetCreateNestedOneWithoutMedicalRecordsInput;
    vet?: Prisma.EmergencyContactCreateNestedOneWithoutVetMedicalRecordsInput;
    treatments?: Prisma.TreatmentCreateNestedManyWithoutMedicalRecordInput;
    immunizations?: Prisma.ImmunizationCreateNestedManyWithoutMedicalRecordInput;
    diagnostics?: Prisma.DiagnosticCreateNestedManyWithoutMedicalRecordInput;
    medications?: Prisma.MedicationCreateNestedManyWithoutMedicalRecordInput;
};
export type MedicalRecordUncheckedCreateInput = {
    id?: string;
    petId: string;
    recordDate: Date | string;
    vetContactId?: string | null;
    vetName?: string | null;
    notes: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    treatments?: Prisma.TreatmentUncheckedCreateNestedManyWithoutMedicalRecordInput;
    immunizations?: Prisma.ImmunizationUncheckedCreateNestedManyWithoutMedicalRecordInput;
    diagnostics?: Prisma.DiagnosticUncheckedCreateNestedManyWithoutMedicalRecordInput;
    medications?: Prisma.MedicationUncheckedCreateNestedManyWithoutMedicalRecordInput;
};
export type MedicalRecordUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vetName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pet?: Prisma.PetUpdateOneRequiredWithoutMedicalRecordsNestedInput;
    vet?: Prisma.EmergencyContactUpdateOneWithoutVetMedicalRecordsNestedInput;
    treatments?: Prisma.TreatmentUpdateManyWithoutMedicalRecordNestedInput;
    immunizations?: Prisma.ImmunizationUpdateManyWithoutMedicalRecordNestedInput;
    diagnostics?: Prisma.DiagnosticUpdateManyWithoutMedicalRecordNestedInput;
    medications?: Prisma.MedicationUpdateManyWithoutMedicalRecordNestedInput;
};
export type MedicalRecordUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    petId?: Prisma.StringFieldUpdateOperationsInput | string;
    recordDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vetContactId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vetName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    treatments?: Prisma.TreatmentUncheckedUpdateManyWithoutMedicalRecordNestedInput;
    immunizations?: Prisma.ImmunizationUncheckedUpdateManyWithoutMedicalRecordNestedInput;
    diagnostics?: Prisma.DiagnosticUncheckedUpdateManyWithoutMedicalRecordNestedInput;
    medications?: Prisma.MedicationUncheckedUpdateManyWithoutMedicalRecordNestedInput;
};
export type MedicalRecordCreateManyInput = {
    id?: string;
    petId: string;
    recordDate: Date | string;
    vetContactId?: string | null;
    vetName?: string | null;
    notes: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MedicalRecordUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vetName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MedicalRecordUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    petId?: Prisma.StringFieldUpdateOperationsInput | string;
    recordDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vetContactId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vetName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MedicalRecordListRelationFilter = {
    every?: Prisma.MedicalRecordWhereInput;
    some?: Prisma.MedicalRecordWhereInput;
    none?: Prisma.MedicalRecordWhereInput;
};
export type MedicalRecordOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MedicalRecordCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    petId?: Prisma.SortOrder;
    recordDate?: Prisma.SortOrder;
    vetContactId?: Prisma.SortOrder;
    vetName?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MedicalRecordMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    petId?: Prisma.SortOrder;
    recordDate?: Prisma.SortOrder;
    vetContactId?: Prisma.SortOrder;
    vetName?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MedicalRecordMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    petId?: Prisma.SortOrder;
    recordDate?: Prisma.SortOrder;
    vetContactId?: Prisma.SortOrder;
    vetName?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MedicalRecordNullableScalarRelationFilter = {
    is?: Prisma.MedicalRecordWhereInput | null;
    isNot?: Prisma.MedicalRecordWhereInput | null;
};
export type MedicalRecordCreateNestedManyWithoutPetInput = {
    create?: Prisma.XOR<Prisma.MedicalRecordCreateWithoutPetInput, Prisma.MedicalRecordUncheckedCreateWithoutPetInput> | Prisma.MedicalRecordCreateWithoutPetInput[] | Prisma.MedicalRecordUncheckedCreateWithoutPetInput[];
    connectOrCreate?: Prisma.MedicalRecordCreateOrConnectWithoutPetInput | Prisma.MedicalRecordCreateOrConnectWithoutPetInput[];
    createMany?: Prisma.MedicalRecordCreateManyPetInputEnvelope;
    connect?: Prisma.MedicalRecordWhereUniqueInput | Prisma.MedicalRecordWhereUniqueInput[];
};
export type MedicalRecordUncheckedCreateNestedManyWithoutPetInput = {
    create?: Prisma.XOR<Prisma.MedicalRecordCreateWithoutPetInput, Prisma.MedicalRecordUncheckedCreateWithoutPetInput> | Prisma.MedicalRecordCreateWithoutPetInput[] | Prisma.MedicalRecordUncheckedCreateWithoutPetInput[];
    connectOrCreate?: Prisma.MedicalRecordCreateOrConnectWithoutPetInput | Prisma.MedicalRecordCreateOrConnectWithoutPetInput[];
    createMany?: Prisma.MedicalRecordCreateManyPetInputEnvelope;
    connect?: Prisma.MedicalRecordWhereUniqueInput | Prisma.MedicalRecordWhereUniqueInput[];
};
export type MedicalRecordUpdateManyWithoutPetNestedInput = {
    create?: Prisma.XOR<Prisma.MedicalRecordCreateWithoutPetInput, Prisma.MedicalRecordUncheckedCreateWithoutPetInput> | Prisma.MedicalRecordCreateWithoutPetInput[] | Prisma.MedicalRecordUncheckedCreateWithoutPetInput[];
    connectOrCreate?: Prisma.MedicalRecordCreateOrConnectWithoutPetInput | Prisma.MedicalRecordCreateOrConnectWithoutPetInput[];
    upsert?: Prisma.MedicalRecordUpsertWithWhereUniqueWithoutPetInput | Prisma.MedicalRecordUpsertWithWhereUniqueWithoutPetInput[];
    createMany?: Prisma.MedicalRecordCreateManyPetInputEnvelope;
    set?: Prisma.MedicalRecordWhereUniqueInput | Prisma.MedicalRecordWhereUniqueInput[];
    disconnect?: Prisma.MedicalRecordWhereUniqueInput | Prisma.MedicalRecordWhereUniqueInput[];
    delete?: Prisma.MedicalRecordWhereUniqueInput | Prisma.MedicalRecordWhereUniqueInput[];
    connect?: Prisma.MedicalRecordWhereUniqueInput | Prisma.MedicalRecordWhereUniqueInput[];
    update?: Prisma.MedicalRecordUpdateWithWhereUniqueWithoutPetInput | Prisma.MedicalRecordUpdateWithWhereUniqueWithoutPetInput[];
    updateMany?: Prisma.MedicalRecordUpdateManyWithWhereWithoutPetInput | Prisma.MedicalRecordUpdateManyWithWhereWithoutPetInput[];
    deleteMany?: Prisma.MedicalRecordScalarWhereInput | Prisma.MedicalRecordScalarWhereInput[];
};
export type MedicalRecordUncheckedUpdateManyWithoutPetNestedInput = {
    create?: Prisma.XOR<Prisma.MedicalRecordCreateWithoutPetInput, Prisma.MedicalRecordUncheckedCreateWithoutPetInput> | Prisma.MedicalRecordCreateWithoutPetInput[] | Prisma.MedicalRecordUncheckedCreateWithoutPetInput[];
    connectOrCreate?: Prisma.MedicalRecordCreateOrConnectWithoutPetInput | Prisma.MedicalRecordCreateOrConnectWithoutPetInput[];
    upsert?: Prisma.MedicalRecordUpsertWithWhereUniqueWithoutPetInput | Prisma.MedicalRecordUpsertWithWhereUniqueWithoutPetInput[];
    createMany?: Prisma.MedicalRecordCreateManyPetInputEnvelope;
    set?: Prisma.MedicalRecordWhereUniqueInput | Prisma.MedicalRecordWhereUniqueInput[];
    disconnect?: Prisma.MedicalRecordWhereUniqueInput | Prisma.MedicalRecordWhereUniqueInput[];
    delete?: Prisma.MedicalRecordWhereUniqueInput | Prisma.MedicalRecordWhereUniqueInput[];
    connect?: Prisma.MedicalRecordWhereUniqueInput | Prisma.MedicalRecordWhereUniqueInput[];
    update?: Prisma.MedicalRecordUpdateWithWhereUniqueWithoutPetInput | Prisma.MedicalRecordUpdateWithWhereUniqueWithoutPetInput[];
    updateMany?: Prisma.MedicalRecordUpdateManyWithWhereWithoutPetInput | Prisma.MedicalRecordUpdateManyWithWhereWithoutPetInput[];
    deleteMany?: Prisma.MedicalRecordScalarWhereInput | Prisma.MedicalRecordScalarWhereInput[];
};
export type MedicalRecordCreateNestedManyWithoutVetInput = {
    create?: Prisma.XOR<Prisma.MedicalRecordCreateWithoutVetInput, Prisma.MedicalRecordUncheckedCreateWithoutVetInput> | Prisma.MedicalRecordCreateWithoutVetInput[] | Prisma.MedicalRecordUncheckedCreateWithoutVetInput[];
    connectOrCreate?: Prisma.MedicalRecordCreateOrConnectWithoutVetInput | Prisma.MedicalRecordCreateOrConnectWithoutVetInput[];
    createMany?: Prisma.MedicalRecordCreateManyVetInputEnvelope;
    connect?: Prisma.MedicalRecordWhereUniqueInput | Prisma.MedicalRecordWhereUniqueInput[];
};
export type MedicalRecordUncheckedCreateNestedManyWithoutVetInput = {
    create?: Prisma.XOR<Prisma.MedicalRecordCreateWithoutVetInput, Prisma.MedicalRecordUncheckedCreateWithoutVetInput> | Prisma.MedicalRecordCreateWithoutVetInput[] | Prisma.MedicalRecordUncheckedCreateWithoutVetInput[];
    connectOrCreate?: Prisma.MedicalRecordCreateOrConnectWithoutVetInput | Prisma.MedicalRecordCreateOrConnectWithoutVetInput[];
    createMany?: Prisma.MedicalRecordCreateManyVetInputEnvelope;
    connect?: Prisma.MedicalRecordWhereUniqueInput | Prisma.MedicalRecordWhereUniqueInput[];
};
export type MedicalRecordUpdateManyWithoutVetNestedInput = {
    create?: Prisma.XOR<Prisma.MedicalRecordCreateWithoutVetInput, Prisma.MedicalRecordUncheckedCreateWithoutVetInput> | Prisma.MedicalRecordCreateWithoutVetInput[] | Prisma.MedicalRecordUncheckedCreateWithoutVetInput[];
    connectOrCreate?: Prisma.MedicalRecordCreateOrConnectWithoutVetInput | Prisma.MedicalRecordCreateOrConnectWithoutVetInput[];
    upsert?: Prisma.MedicalRecordUpsertWithWhereUniqueWithoutVetInput | Prisma.MedicalRecordUpsertWithWhereUniqueWithoutVetInput[];
    createMany?: Prisma.MedicalRecordCreateManyVetInputEnvelope;
    set?: Prisma.MedicalRecordWhereUniqueInput | Prisma.MedicalRecordWhereUniqueInput[];
    disconnect?: Prisma.MedicalRecordWhereUniqueInput | Prisma.MedicalRecordWhereUniqueInput[];
    delete?: Prisma.MedicalRecordWhereUniqueInput | Prisma.MedicalRecordWhereUniqueInput[];
    connect?: Prisma.MedicalRecordWhereUniqueInput | Prisma.MedicalRecordWhereUniqueInput[];
    update?: Prisma.MedicalRecordUpdateWithWhereUniqueWithoutVetInput | Prisma.MedicalRecordUpdateWithWhereUniqueWithoutVetInput[];
    updateMany?: Prisma.MedicalRecordUpdateManyWithWhereWithoutVetInput | Prisma.MedicalRecordUpdateManyWithWhereWithoutVetInput[];
    deleteMany?: Prisma.MedicalRecordScalarWhereInput | Prisma.MedicalRecordScalarWhereInput[];
};
export type MedicalRecordUncheckedUpdateManyWithoutVetNestedInput = {
    create?: Prisma.XOR<Prisma.MedicalRecordCreateWithoutVetInput, Prisma.MedicalRecordUncheckedCreateWithoutVetInput> | Prisma.MedicalRecordCreateWithoutVetInput[] | Prisma.MedicalRecordUncheckedCreateWithoutVetInput[];
    connectOrCreate?: Prisma.MedicalRecordCreateOrConnectWithoutVetInput | Prisma.MedicalRecordCreateOrConnectWithoutVetInput[];
    upsert?: Prisma.MedicalRecordUpsertWithWhereUniqueWithoutVetInput | Prisma.MedicalRecordUpsertWithWhereUniqueWithoutVetInput[];
    createMany?: Prisma.MedicalRecordCreateManyVetInputEnvelope;
    set?: Prisma.MedicalRecordWhereUniqueInput | Prisma.MedicalRecordWhereUniqueInput[];
    disconnect?: Prisma.MedicalRecordWhereUniqueInput | Prisma.MedicalRecordWhereUniqueInput[];
    delete?: Prisma.MedicalRecordWhereUniqueInput | Prisma.MedicalRecordWhereUniqueInput[];
    connect?: Prisma.MedicalRecordWhereUniqueInput | Prisma.MedicalRecordWhereUniqueInput[];
    update?: Prisma.MedicalRecordUpdateWithWhereUniqueWithoutVetInput | Prisma.MedicalRecordUpdateWithWhereUniqueWithoutVetInput[];
    updateMany?: Prisma.MedicalRecordUpdateManyWithWhereWithoutVetInput | Prisma.MedicalRecordUpdateManyWithWhereWithoutVetInput[];
    deleteMany?: Prisma.MedicalRecordScalarWhereInput | Prisma.MedicalRecordScalarWhereInput[];
};
export type MedicalRecordCreateNestedOneWithoutTreatmentsInput = {
    create?: Prisma.XOR<Prisma.MedicalRecordCreateWithoutTreatmentsInput, Prisma.MedicalRecordUncheckedCreateWithoutTreatmentsInput>;
    connectOrCreate?: Prisma.MedicalRecordCreateOrConnectWithoutTreatmentsInput;
    connect?: Prisma.MedicalRecordWhereUniqueInput;
};
export type MedicalRecordUpdateOneWithoutTreatmentsNestedInput = {
    create?: Prisma.XOR<Prisma.MedicalRecordCreateWithoutTreatmentsInput, Prisma.MedicalRecordUncheckedCreateWithoutTreatmentsInput>;
    connectOrCreate?: Prisma.MedicalRecordCreateOrConnectWithoutTreatmentsInput;
    upsert?: Prisma.MedicalRecordUpsertWithoutTreatmentsInput;
    disconnect?: Prisma.MedicalRecordWhereInput | boolean;
    delete?: Prisma.MedicalRecordWhereInput | boolean;
    connect?: Prisma.MedicalRecordWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MedicalRecordUpdateToOneWithWhereWithoutTreatmentsInput, Prisma.MedicalRecordUpdateWithoutTreatmentsInput>, Prisma.MedicalRecordUncheckedUpdateWithoutTreatmentsInput>;
};
export type MedicalRecordCreateNestedOneWithoutImmunizationsInput = {
    create?: Prisma.XOR<Prisma.MedicalRecordCreateWithoutImmunizationsInput, Prisma.MedicalRecordUncheckedCreateWithoutImmunizationsInput>;
    connectOrCreate?: Prisma.MedicalRecordCreateOrConnectWithoutImmunizationsInput;
    connect?: Prisma.MedicalRecordWhereUniqueInput;
};
export type MedicalRecordUpdateOneWithoutImmunizationsNestedInput = {
    create?: Prisma.XOR<Prisma.MedicalRecordCreateWithoutImmunizationsInput, Prisma.MedicalRecordUncheckedCreateWithoutImmunizationsInput>;
    connectOrCreate?: Prisma.MedicalRecordCreateOrConnectWithoutImmunizationsInput;
    upsert?: Prisma.MedicalRecordUpsertWithoutImmunizationsInput;
    disconnect?: Prisma.MedicalRecordWhereInput | boolean;
    delete?: Prisma.MedicalRecordWhereInput | boolean;
    connect?: Prisma.MedicalRecordWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MedicalRecordUpdateToOneWithWhereWithoutImmunizationsInput, Prisma.MedicalRecordUpdateWithoutImmunizationsInput>, Prisma.MedicalRecordUncheckedUpdateWithoutImmunizationsInput>;
};
export type MedicalRecordCreateNestedOneWithoutDiagnosticsInput = {
    create?: Prisma.XOR<Prisma.MedicalRecordCreateWithoutDiagnosticsInput, Prisma.MedicalRecordUncheckedCreateWithoutDiagnosticsInput>;
    connectOrCreate?: Prisma.MedicalRecordCreateOrConnectWithoutDiagnosticsInput;
    connect?: Prisma.MedicalRecordWhereUniqueInput;
};
export type MedicalRecordUpdateOneWithoutDiagnosticsNestedInput = {
    create?: Prisma.XOR<Prisma.MedicalRecordCreateWithoutDiagnosticsInput, Prisma.MedicalRecordUncheckedCreateWithoutDiagnosticsInput>;
    connectOrCreate?: Prisma.MedicalRecordCreateOrConnectWithoutDiagnosticsInput;
    upsert?: Prisma.MedicalRecordUpsertWithoutDiagnosticsInput;
    disconnect?: Prisma.MedicalRecordWhereInput | boolean;
    delete?: Prisma.MedicalRecordWhereInput | boolean;
    connect?: Prisma.MedicalRecordWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MedicalRecordUpdateToOneWithWhereWithoutDiagnosticsInput, Prisma.MedicalRecordUpdateWithoutDiagnosticsInput>, Prisma.MedicalRecordUncheckedUpdateWithoutDiagnosticsInput>;
};
export type MedicalRecordCreateNestedOneWithoutMedicationsInput = {
    create?: Prisma.XOR<Prisma.MedicalRecordCreateWithoutMedicationsInput, Prisma.MedicalRecordUncheckedCreateWithoutMedicationsInput>;
    connectOrCreate?: Prisma.MedicalRecordCreateOrConnectWithoutMedicationsInput;
    connect?: Prisma.MedicalRecordWhereUniqueInput;
};
export type MedicalRecordUpdateOneWithoutMedicationsNestedInput = {
    create?: Prisma.XOR<Prisma.MedicalRecordCreateWithoutMedicationsInput, Prisma.MedicalRecordUncheckedCreateWithoutMedicationsInput>;
    connectOrCreate?: Prisma.MedicalRecordCreateOrConnectWithoutMedicationsInput;
    upsert?: Prisma.MedicalRecordUpsertWithoutMedicationsInput;
    disconnect?: Prisma.MedicalRecordWhereInput | boolean;
    delete?: Prisma.MedicalRecordWhereInput | boolean;
    connect?: Prisma.MedicalRecordWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MedicalRecordUpdateToOneWithWhereWithoutMedicationsInput, Prisma.MedicalRecordUpdateWithoutMedicationsInput>, Prisma.MedicalRecordUncheckedUpdateWithoutMedicationsInput>;
};
export type MedicalRecordCreateWithoutPetInput = {
    id?: string;
    recordDate: Date | string;
    vetName?: string | null;
    notes: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    vet?: Prisma.EmergencyContactCreateNestedOneWithoutVetMedicalRecordsInput;
    treatments?: Prisma.TreatmentCreateNestedManyWithoutMedicalRecordInput;
    immunizations?: Prisma.ImmunizationCreateNestedManyWithoutMedicalRecordInput;
    diagnostics?: Prisma.DiagnosticCreateNestedManyWithoutMedicalRecordInput;
    medications?: Prisma.MedicationCreateNestedManyWithoutMedicalRecordInput;
};
export type MedicalRecordUncheckedCreateWithoutPetInput = {
    id?: string;
    recordDate: Date | string;
    vetContactId?: string | null;
    vetName?: string | null;
    notes: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    treatments?: Prisma.TreatmentUncheckedCreateNestedManyWithoutMedicalRecordInput;
    immunizations?: Prisma.ImmunizationUncheckedCreateNestedManyWithoutMedicalRecordInput;
    diagnostics?: Prisma.DiagnosticUncheckedCreateNestedManyWithoutMedicalRecordInput;
    medications?: Prisma.MedicationUncheckedCreateNestedManyWithoutMedicalRecordInput;
};
export type MedicalRecordCreateOrConnectWithoutPetInput = {
    where: Prisma.MedicalRecordWhereUniqueInput;
    create: Prisma.XOR<Prisma.MedicalRecordCreateWithoutPetInput, Prisma.MedicalRecordUncheckedCreateWithoutPetInput>;
};
export type MedicalRecordCreateManyPetInputEnvelope = {
    data: Prisma.MedicalRecordCreateManyPetInput | Prisma.MedicalRecordCreateManyPetInput[];
    skipDuplicates?: boolean;
};
export type MedicalRecordUpsertWithWhereUniqueWithoutPetInput = {
    where: Prisma.MedicalRecordWhereUniqueInput;
    update: Prisma.XOR<Prisma.MedicalRecordUpdateWithoutPetInput, Prisma.MedicalRecordUncheckedUpdateWithoutPetInput>;
    create: Prisma.XOR<Prisma.MedicalRecordCreateWithoutPetInput, Prisma.MedicalRecordUncheckedCreateWithoutPetInput>;
};
export type MedicalRecordUpdateWithWhereUniqueWithoutPetInput = {
    where: Prisma.MedicalRecordWhereUniqueInput;
    data: Prisma.XOR<Prisma.MedicalRecordUpdateWithoutPetInput, Prisma.MedicalRecordUncheckedUpdateWithoutPetInput>;
};
export type MedicalRecordUpdateManyWithWhereWithoutPetInput = {
    where: Prisma.MedicalRecordScalarWhereInput;
    data: Prisma.XOR<Prisma.MedicalRecordUpdateManyMutationInput, Prisma.MedicalRecordUncheckedUpdateManyWithoutPetInput>;
};
export type MedicalRecordScalarWhereInput = {
    AND?: Prisma.MedicalRecordScalarWhereInput | Prisma.MedicalRecordScalarWhereInput[];
    OR?: Prisma.MedicalRecordScalarWhereInput[];
    NOT?: Prisma.MedicalRecordScalarWhereInput | Prisma.MedicalRecordScalarWhereInput[];
    id?: Prisma.StringFilter<"MedicalRecord"> | string;
    petId?: Prisma.StringFilter<"MedicalRecord"> | string;
    recordDate?: Prisma.DateTimeFilter<"MedicalRecord"> | Date | string;
    vetContactId?: Prisma.StringNullableFilter<"MedicalRecord"> | string | null;
    vetName?: Prisma.StringNullableFilter<"MedicalRecord"> | string | null;
    notes?: Prisma.StringFilter<"MedicalRecord"> | string;
    createdAt?: Prisma.DateTimeFilter<"MedicalRecord"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MedicalRecord"> | Date | string;
};
export type MedicalRecordCreateWithoutVetInput = {
    id?: string;
    recordDate: Date | string;
    vetName?: string | null;
    notes: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pet: Prisma.PetCreateNestedOneWithoutMedicalRecordsInput;
    treatments?: Prisma.TreatmentCreateNestedManyWithoutMedicalRecordInput;
    immunizations?: Prisma.ImmunizationCreateNestedManyWithoutMedicalRecordInput;
    diagnostics?: Prisma.DiagnosticCreateNestedManyWithoutMedicalRecordInput;
    medications?: Prisma.MedicationCreateNestedManyWithoutMedicalRecordInput;
};
export type MedicalRecordUncheckedCreateWithoutVetInput = {
    id?: string;
    petId: string;
    recordDate: Date | string;
    vetName?: string | null;
    notes: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    treatments?: Prisma.TreatmentUncheckedCreateNestedManyWithoutMedicalRecordInput;
    immunizations?: Prisma.ImmunizationUncheckedCreateNestedManyWithoutMedicalRecordInput;
    diagnostics?: Prisma.DiagnosticUncheckedCreateNestedManyWithoutMedicalRecordInput;
    medications?: Prisma.MedicationUncheckedCreateNestedManyWithoutMedicalRecordInput;
};
export type MedicalRecordCreateOrConnectWithoutVetInput = {
    where: Prisma.MedicalRecordWhereUniqueInput;
    create: Prisma.XOR<Prisma.MedicalRecordCreateWithoutVetInput, Prisma.MedicalRecordUncheckedCreateWithoutVetInput>;
};
export type MedicalRecordCreateManyVetInputEnvelope = {
    data: Prisma.MedicalRecordCreateManyVetInput | Prisma.MedicalRecordCreateManyVetInput[];
    skipDuplicates?: boolean;
};
export type MedicalRecordUpsertWithWhereUniqueWithoutVetInput = {
    where: Prisma.MedicalRecordWhereUniqueInput;
    update: Prisma.XOR<Prisma.MedicalRecordUpdateWithoutVetInput, Prisma.MedicalRecordUncheckedUpdateWithoutVetInput>;
    create: Prisma.XOR<Prisma.MedicalRecordCreateWithoutVetInput, Prisma.MedicalRecordUncheckedCreateWithoutVetInput>;
};
export type MedicalRecordUpdateWithWhereUniqueWithoutVetInput = {
    where: Prisma.MedicalRecordWhereUniqueInput;
    data: Prisma.XOR<Prisma.MedicalRecordUpdateWithoutVetInput, Prisma.MedicalRecordUncheckedUpdateWithoutVetInput>;
};
export type MedicalRecordUpdateManyWithWhereWithoutVetInput = {
    where: Prisma.MedicalRecordScalarWhereInput;
    data: Prisma.XOR<Prisma.MedicalRecordUpdateManyMutationInput, Prisma.MedicalRecordUncheckedUpdateManyWithoutVetInput>;
};
export type MedicalRecordCreateWithoutTreatmentsInput = {
    id?: string;
    recordDate: Date | string;
    vetName?: string | null;
    notes: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pet: Prisma.PetCreateNestedOneWithoutMedicalRecordsInput;
    vet?: Prisma.EmergencyContactCreateNestedOneWithoutVetMedicalRecordsInput;
    immunizations?: Prisma.ImmunizationCreateNestedManyWithoutMedicalRecordInput;
    diagnostics?: Prisma.DiagnosticCreateNestedManyWithoutMedicalRecordInput;
    medications?: Prisma.MedicationCreateNestedManyWithoutMedicalRecordInput;
};
export type MedicalRecordUncheckedCreateWithoutTreatmentsInput = {
    id?: string;
    petId: string;
    recordDate: Date | string;
    vetContactId?: string | null;
    vetName?: string | null;
    notes: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    immunizations?: Prisma.ImmunizationUncheckedCreateNestedManyWithoutMedicalRecordInput;
    diagnostics?: Prisma.DiagnosticUncheckedCreateNestedManyWithoutMedicalRecordInput;
    medications?: Prisma.MedicationUncheckedCreateNestedManyWithoutMedicalRecordInput;
};
export type MedicalRecordCreateOrConnectWithoutTreatmentsInput = {
    where: Prisma.MedicalRecordWhereUniqueInput;
    create: Prisma.XOR<Prisma.MedicalRecordCreateWithoutTreatmentsInput, Prisma.MedicalRecordUncheckedCreateWithoutTreatmentsInput>;
};
export type MedicalRecordUpsertWithoutTreatmentsInput = {
    update: Prisma.XOR<Prisma.MedicalRecordUpdateWithoutTreatmentsInput, Prisma.MedicalRecordUncheckedUpdateWithoutTreatmentsInput>;
    create: Prisma.XOR<Prisma.MedicalRecordCreateWithoutTreatmentsInput, Prisma.MedicalRecordUncheckedCreateWithoutTreatmentsInput>;
    where?: Prisma.MedicalRecordWhereInput;
};
export type MedicalRecordUpdateToOneWithWhereWithoutTreatmentsInput = {
    where?: Prisma.MedicalRecordWhereInput;
    data: Prisma.XOR<Prisma.MedicalRecordUpdateWithoutTreatmentsInput, Prisma.MedicalRecordUncheckedUpdateWithoutTreatmentsInput>;
};
export type MedicalRecordUpdateWithoutTreatmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vetName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pet?: Prisma.PetUpdateOneRequiredWithoutMedicalRecordsNestedInput;
    vet?: Prisma.EmergencyContactUpdateOneWithoutVetMedicalRecordsNestedInput;
    immunizations?: Prisma.ImmunizationUpdateManyWithoutMedicalRecordNestedInput;
    diagnostics?: Prisma.DiagnosticUpdateManyWithoutMedicalRecordNestedInput;
    medications?: Prisma.MedicationUpdateManyWithoutMedicalRecordNestedInput;
};
export type MedicalRecordUncheckedUpdateWithoutTreatmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    petId?: Prisma.StringFieldUpdateOperationsInput | string;
    recordDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vetContactId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vetName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    immunizations?: Prisma.ImmunizationUncheckedUpdateManyWithoutMedicalRecordNestedInput;
    diagnostics?: Prisma.DiagnosticUncheckedUpdateManyWithoutMedicalRecordNestedInput;
    medications?: Prisma.MedicationUncheckedUpdateManyWithoutMedicalRecordNestedInput;
};
export type MedicalRecordCreateWithoutImmunizationsInput = {
    id?: string;
    recordDate: Date | string;
    vetName?: string | null;
    notes: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pet: Prisma.PetCreateNestedOneWithoutMedicalRecordsInput;
    vet?: Prisma.EmergencyContactCreateNestedOneWithoutVetMedicalRecordsInput;
    treatments?: Prisma.TreatmentCreateNestedManyWithoutMedicalRecordInput;
    diagnostics?: Prisma.DiagnosticCreateNestedManyWithoutMedicalRecordInput;
    medications?: Prisma.MedicationCreateNestedManyWithoutMedicalRecordInput;
};
export type MedicalRecordUncheckedCreateWithoutImmunizationsInput = {
    id?: string;
    petId: string;
    recordDate: Date | string;
    vetContactId?: string | null;
    vetName?: string | null;
    notes: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    treatments?: Prisma.TreatmentUncheckedCreateNestedManyWithoutMedicalRecordInput;
    diagnostics?: Prisma.DiagnosticUncheckedCreateNestedManyWithoutMedicalRecordInput;
    medications?: Prisma.MedicationUncheckedCreateNestedManyWithoutMedicalRecordInput;
};
export type MedicalRecordCreateOrConnectWithoutImmunizationsInput = {
    where: Prisma.MedicalRecordWhereUniqueInput;
    create: Prisma.XOR<Prisma.MedicalRecordCreateWithoutImmunizationsInput, Prisma.MedicalRecordUncheckedCreateWithoutImmunizationsInput>;
};
export type MedicalRecordUpsertWithoutImmunizationsInput = {
    update: Prisma.XOR<Prisma.MedicalRecordUpdateWithoutImmunizationsInput, Prisma.MedicalRecordUncheckedUpdateWithoutImmunizationsInput>;
    create: Prisma.XOR<Prisma.MedicalRecordCreateWithoutImmunizationsInput, Prisma.MedicalRecordUncheckedCreateWithoutImmunizationsInput>;
    where?: Prisma.MedicalRecordWhereInput;
};
export type MedicalRecordUpdateToOneWithWhereWithoutImmunizationsInput = {
    where?: Prisma.MedicalRecordWhereInput;
    data: Prisma.XOR<Prisma.MedicalRecordUpdateWithoutImmunizationsInput, Prisma.MedicalRecordUncheckedUpdateWithoutImmunizationsInput>;
};
export type MedicalRecordUpdateWithoutImmunizationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vetName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pet?: Prisma.PetUpdateOneRequiredWithoutMedicalRecordsNestedInput;
    vet?: Prisma.EmergencyContactUpdateOneWithoutVetMedicalRecordsNestedInput;
    treatments?: Prisma.TreatmentUpdateManyWithoutMedicalRecordNestedInput;
    diagnostics?: Prisma.DiagnosticUpdateManyWithoutMedicalRecordNestedInput;
    medications?: Prisma.MedicationUpdateManyWithoutMedicalRecordNestedInput;
};
export type MedicalRecordUncheckedUpdateWithoutImmunizationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    petId?: Prisma.StringFieldUpdateOperationsInput | string;
    recordDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vetContactId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vetName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    treatments?: Prisma.TreatmentUncheckedUpdateManyWithoutMedicalRecordNestedInput;
    diagnostics?: Prisma.DiagnosticUncheckedUpdateManyWithoutMedicalRecordNestedInput;
    medications?: Prisma.MedicationUncheckedUpdateManyWithoutMedicalRecordNestedInput;
};
export type MedicalRecordCreateWithoutDiagnosticsInput = {
    id?: string;
    recordDate: Date | string;
    vetName?: string | null;
    notes: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pet: Prisma.PetCreateNestedOneWithoutMedicalRecordsInput;
    vet?: Prisma.EmergencyContactCreateNestedOneWithoutVetMedicalRecordsInput;
    treatments?: Prisma.TreatmentCreateNestedManyWithoutMedicalRecordInput;
    immunizations?: Prisma.ImmunizationCreateNestedManyWithoutMedicalRecordInput;
    medications?: Prisma.MedicationCreateNestedManyWithoutMedicalRecordInput;
};
export type MedicalRecordUncheckedCreateWithoutDiagnosticsInput = {
    id?: string;
    petId: string;
    recordDate: Date | string;
    vetContactId?: string | null;
    vetName?: string | null;
    notes: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    treatments?: Prisma.TreatmentUncheckedCreateNestedManyWithoutMedicalRecordInput;
    immunizations?: Prisma.ImmunizationUncheckedCreateNestedManyWithoutMedicalRecordInput;
    medications?: Prisma.MedicationUncheckedCreateNestedManyWithoutMedicalRecordInput;
};
export type MedicalRecordCreateOrConnectWithoutDiagnosticsInput = {
    where: Prisma.MedicalRecordWhereUniqueInput;
    create: Prisma.XOR<Prisma.MedicalRecordCreateWithoutDiagnosticsInput, Prisma.MedicalRecordUncheckedCreateWithoutDiagnosticsInput>;
};
export type MedicalRecordUpsertWithoutDiagnosticsInput = {
    update: Prisma.XOR<Prisma.MedicalRecordUpdateWithoutDiagnosticsInput, Prisma.MedicalRecordUncheckedUpdateWithoutDiagnosticsInput>;
    create: Prisma.XOR<Prisma.MedicalRecordCreateWithoutDiagnosticsInput, Prisma.MedicalRecordUncheckedCreateWithoutDiagnosticsInput>;
    where?: Prisma.MedicalRecordWhereInput;
};
export type MedicalRecordUpdateToOneWithWhereWithoutDiagnosticsInput = {
    where?: Prisma.MedicalRecordWhereInput;
    data: Prisma.XOR<Prisma.MedicalRecordUpdateWithoutDiagnosticsInput, Prisma.MedicalRecordUncheckedUpdateWithoutDiagnosticsInput>;
};
export type MedicalRecordUpdateWithoutDiagnosticsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vetName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pet?: Prisma.PetUpdateOneRequiredWithoutMedicalRecordsNestedInput;
    vet?: Prisma.EmergencyContactUpdateOneWithoutVetMedicalRecordsNestedInput;
    treatments?: Prisma.TreatmentUpdateManyWithoutMedicalRecordNestedInput;
    immunizations?: Prisma.ImmunizationUpdateManyWithoutMedicalRecordNestedInput;
    medications?: Prisma.MedicationUpdateManyWithoutMedicalRecordNestedInput;
};
export type MedicalRecordUncheckedUpdateWithoutDiagnosticsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    petId?: Prisma.StringFieldUpdateOperationsInput | string;
    recordDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vetContactId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vetName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    treatments?: Prisma.TreatmentUncheckedUpdateManyWithoutMedicalRecordNestedInput;
    immunizations?: Prisma.ImmunizationUncheckedUpdateManyWithoutMedicalRecordNestedInput;
    medications?: Prisma.MedicationUncheckedUpdateManyWithoutMedicalRecordNestedInput;
};
export type MedicalRecordCreateWithoutMedicationsInput = {
    id?: string;
    recordDate: Date | string;
    vetName?: string | null;
    notes: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pet: Prisma.PetCreateNestedOneWithoutMedicalRecordsInput;
    vet?: Prisma.EmergencyContactCreateNestedOneWithoutVetMedicalRecordsInput;
    treatments?: Prisma.TreatmentCreateNestedManyWithoutMedicalRecordInput;
    immunizations?: Prisma.ImmunizationCreateNestedManyWithoutMedicalRecordInput;
    diagnostics?: Prisma.DiagnosticCreateNestedManyWithoutMedicalRecordInput;
};
export type MedicalRecordUncheckedCreateWithoutMedicationsInput = {
    id?: string;
    petId: string;
    recordDate: Date | string;
    vetContactId?: string | null;
    vetName?: string | null;
    notes: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    treatments?: Prisma.TreatmentUncheckedCreateNestedManyWithoutMedicalRecordInput;
    immunizations?: Prisma.ImmunizationUncheckedCreateNestedManyWithoutMedicalRecordInput;
    diagnostics?: Prisma.DiagnosticUncheckedCreateNestedManyWithoutMedicalRecordInput;
};
export type MedicalRecordCreateOrConnectWithoutMedicationsInput = {
    where: Prisma.MedicalRecordWhereUniqueInput;
    create: Prisma.XOR<Prisma.MedicalRecordCreateWithoutMedicationsInput, Prisma.MedicalRecordUncheckedCreateWithoutMedicationsInput>;
};
export type MedicalRecordUpsertWithoutMedicationsInput = {
    update: Prisma.XOR<Prisma.MedicalRecordUpdateWithoutMedicationsInput, Prisma.MedicalRecordUncheckedUpdateWithoutMedicationsInput>;
    create: Prisma.XOR<Prisma.MedicalRecordCreateWithoutMedicationsInput, Prisma.MedicalRecordUncheckedCreateWithoutMedicationsInput>;
    where?: Prisma.MedicalRecordWhereInput;
};
export type MedicalRecordUpdateToOneWithWhereWithoutMedicationsInput = {
    where?: Prisma.MedicalRecordWhereInput;
    data: Prisma.XOR<Prisma.MedicalRecordUpdateWithoutMedicationsInput, Prisma.MedicalRecordUncheckedUpdateWithoutMedicationsInput>;
};
export type MedicalRecordUpdateWithoutMedicationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vetName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pet?: Prisma.PetUpdateOneRequiredWithoutMedicalRecordsNestedInput;
    vet?: Prisma.EmergencyContactUpdateOneWithoutVetMedicalRecordsNestedInput;
    treatments?: Prisma.TreatmentUpdateManyWithoutMedicalRecordNestedInput;
    immunizations?: Prisma.ImmunizationUpdateManyWithoutMedicalRecordNestedInput;
    diagnostics?: Prisma.DiagnosticUpdateManyWithoutMedicalRecordNestedInput;
};
export type MedicalRecordUncheckedUpdateWithoutMedicationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    petId?: Prisma.StringFieldUpdateOperationsInput | string;
    recordDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vetContactId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vetName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    treatments?: Prisma.TreatmentUncheckedUpdateManyWithoutMedicalRecordNestedInput;
    immunizations?: Prisma.ImmunizationUncheckedUpdateManyWithoutMedicalRecordNestedInput;
    diagnostics?: Prisma.DiagnosticUncheckedUpdateManyWithoutMedicalRecordNestedInput;
};
export type MedicalRecordCreateManyPetInput = {
    id?: string;
    recordDate: Date | string;
    vetContactId?: string | null;
    vetName?: string | null;
    notes: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MedicalRecordUpdateWithoutPetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vetName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vet?: Prisma.EmergencyContactUpdateOneWithoutVetMedicalRecordsNestedInput;
    treatments?: Prisma.TreatmentUpdateManyWithoutMedicalRecordNestedInput;
    immunizations?: Prisma.ImmunizationUpdateManyWithoutMedicalRecordNestedInput;
    diagnostics?: Prisma.DiagnosticUpdateManyWithoutMedicalRecordNestedInput;
    medications?: Prisma.MedicationUpdateManyWithoutMedicalRecordNestedInput;
};
export type MedicalRecordUncheckedUpdateWithoutPetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vetContactId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vetName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    treatments?: Prisma.TreatmentUncheckedUpdateManyWithoutMedicalRecordNestedInput;
    immunizations?: Prisma.ImmunizationUncheckedUpdateManyWithoutMedicalRecordNestedInput;
    diagnostics?: Prisma.DiagnosticUncheckedUpdateManyWithoutMedicalRecordNestedInput;
    medications?: Prisma.MedicationUncheckedUpdateManyWithoutMedicalRecordNestedInput;
};
export type MedicalRecordUncheckedUpdateManyWithoutPetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vetContactId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vetName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MedicalRecordCreateManyVetInput = {
    id?: string;
    petId: string;
    recordDate: Date | string;
    vetName?: string | null;
    notes: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MedicalRecordUpdateWithoutVetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recordDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vetName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pet?: Prisma.PetUpdateOneRequiredWithoutMedicalRecordsNestedInput;
    treatments?: Prisma.TreatmentUpdateManyWithoutMedicalRecordNestedInput;
    immunizations?: Prisma.ImmunizationUpdateManyWithoutMedicalRecordNestedInput;
    diagnostics?: Prisma.DiagnosticUpdateManyWithoutMedicalRecordNestedInput;
    medications?: Prisma.MedicationUpdateManyWithoutMedicalRecordNestedInput;
};
export type MedicalRecordUncheckedUpdateWithoutVetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    petId?: Prisma.StringFieldUpdateOperationsInput | string;
    recordDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vetName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    treatments?: Prisma.TreatmentUncheckedUpdateManyWithoutMedicalRecordNestedInput;
    immunizations?: Prisma.ImmunizationUncheckedUpdateManyWithoutMedicalRecordNestedInput;
    diagnostics?: Prisma.DiagnosticUncheckedUpdateManyWithoutMedicalRecordNestedInput;
    medications?: Prisma.MedicationUncheckedUpdateManyWithoutMedicalRecordNestedInput;
};
export type MedicalRecordUncheckedUpdateManyWithoutVetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    petId?: Prisma.StringFieldUpdateOperationsInput | string;
    recordDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vetName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MedicalRecordCountOutputType = {
    treatments: number;
    immunizations: number;
    diagnostics: number;
    medications: number;
};
export type MedicalRecordCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    treatments?: boolean | MedicalRecordCountOutputTypeCountTreatmentsArgs;
    immunizations?: boolean | MedicalRecordCountOutputTypeCountImmunizationsArgs;
    diagnostics?: boolean | MedicalRecordCountOutputTypeCountDiagnosticsArgs;
    medications?: boolean | MedicalRecordCountOutputTypeCountMedicationsArgs;
};
export type MedicalRecordCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MedicalRecordCountOutputTypeSelect<ExtArgs> | null;
};
export type MedicalRecordCountOutputTypeCountTreatmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TreatmentWhereInput;
};
export type MedicalRecordCountOutputTypeCountImmunizationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ImmunizationWhereInput;
};
export type MedicalRecordCountOutputTypeCountDiagnosticsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiagnosticWhereInput;
};
export type MedicalRecordCountOutputTypeCountMedicationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MedicationWhereInput;
};
export type MedicalRecordSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    petId?: boolean;
    recordDate?: boolean;
    vetContactId?: boolean;
    vetName?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    pet?: boolean | Prisma.PetDefaultArgs<ExtArgs>;
    vet?: boolean | Prisma.MedicalRecord$vetArgs<ExtArgs>;
    treatments?: boolean | Prisma.MedicalRecord$treatmentsArgs<ExtArgs>;
    immunizations?: boolean | Prisma.MedicalRecord$immunizationsArgs<ExtArgs>;
    diagnostics?: boolean | Prisma.MedicalRecord$diagnosticsArgs<ExtArgs>;
    medications?: boolean | Prisma.MedicalRecord$medicationsArgs<ExtArgs>;
    _count?: boolean | Prisma.MedicalRecordCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["medicalRecord"]>;
export type MedicalRecordSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    petId?: boolean;
    recordDate?: boolean;
    vetContactId?: boolean;
    vetName?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    pet?: boolean | Prisma.PetDefaultArgs<ExtArgs>;
    vet?: boolean | Prisma.MedicalRecord$vetArgs<ExtArgs>;
}, ExtArgs["result"]["medicalRecord"]>;
export type MedicalRecordSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    petId?: boolean;
    recordDate?: boolean;
    vetContactId?: boolean;
    vetName?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    pet?: boolean | Prisma.PetDefaultArgs<ExtArgs>;
    vet?: boolean | Prisma.MedicalRecord$vetArgs<ExtArgs>;
}, ExtArgs["result"]["medicalRecord"]>;
export type MedicalRecordSelectScalar = {
    id?: boolean;
    petId?: boolean;
    recordDate?: boolean;
    vetContactId?: boolean;
    vetName?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type MedicalRecordOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "petId" | "recordDate" | "vetContactId" | "vetName" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["medicalRecord"]>;
export type MedicalRecordInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    pet?: boolean | Prisma.PetDefaultArgs<ExtArgs>;
    vet?: boolean | Prisma.MedicalRecord$vetArgs<ExtArgs>;
    treatments?: boolean | Prisma.MedicalRecord$treatmentsArgs<ExtArgs>;
    immunizations?: boolean | Prisma.MedicalRecord$immunizationsArgs<ExtArgs>;
    diagnostics?: boolean | Prisma.MedicalRecord$diagnosticsArgs<ExtArgs>;
    medications?: boolean | Prisma.MedicalRecord$medicationsArgs<ExtArgs>;
    _count?: boolean | Prisma.MedicalRecordCountOutputTypeDefaultArgs<ExtArgs>;
};
export type MedicalRecordIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    pet?: boolean | Prisma.PetDefaultArgs<ExtArgs>;
    vet?: boolean | Prisma.MedicalRecord$vetArgs<ExtArgs>;
};
export type MedicalRecordIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    pet?: boolean | Prisma.PetDefaultArgs<ExtArgs>;
    vet?: boolean | Prisma.MedicalRecord$vetArgs<ExtArgs>;
};
export type $MedicalRecordPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MedicalRecord";
    objects: {
        pet: Prisma.$PetPayload<ExtArgs>;
        vet: Prisma.$EmergencyContactPayload<ExtArgs> | null;
        treatments: Prisma.$TreatmentPayload<ExtArgs>[];
        immunizations: Prisma.$ImmunizationPayload<ExtArgs>[];
        diagnostics: Prisma.$DiagnosticPayload<ExtArgs>[];
        medications: Prisma.$MedicationPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        petId: string;
        recordDate: Date;
        vetContactId: string | null;
        vetName: string | null;
        notes: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["medicalRecord"]>;
    composites: {};
};
export type MedicalRecordGetPayload<S extends boolean | null | undefined | MedicalRecordDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MedicalRecordPayload, S>;
export type MedicalRecordCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MedicalRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MedicalRecordCountAggregateInputType | true;
};
export interface MedicalRecordDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MedicalRecord'];
        meta: {
            name: 'MedicalRecord';
        };
    };
    findUnique<T extends MedicalRecordFindUniqueArgs>(args: Prisma.SelectSubset<T, MedicalRecordFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MedicalRecordClient<runtime.Types.Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MedicalRecordFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MedicalRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MedicalRecordClient<runtime.Types.Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MedicalRecordFindFirstArgs>(args?: Prisma.SelectSubset<T, MedicalRecordFindFirstArgs<ExtArgs>>): Prisma.Prisma__MedicalRecordClient<runtime.Types.Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MedicalRecordFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MedicalRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MedicalRecordClient<runtime.Types.Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MedicalRecordFindManyArgs>(args?: Prisma.SelectSubset<T, MedicalRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MedicalRecordCreateArgs>(args: Prisma.SelectSubset<T, MedicalRecordCreateArgs<ExtArgs>>): Prisma.Prisma__MedicalRecordClient<runtime.Types.Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MedicalRecordCreateManyArgs>(args?: Prisma.SelectSubset<T, MedicalRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MedicalRecordCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MedicalRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MedicalRecordDeleteArgs>(args: Prisma.SelectSubset<T, MedicalRecordDeleteArgs<ExtArgs>>): Prisma.Prisma__MedicalRecordClient<runtime.Types.Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MedicalRecordUpdateArgs>(args: Prisma.SelectSubset<T, MedicalRecordUpdateArgs<ExtArgs>>): Prisma.Prisma__MedicalRecordClient<runtime.Types.Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MedicalRecordDeleteManyArgs>(args?: Prisma.SelectSubset<T, MedicalRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MedicalRecordUpdateManyArgs>(args: Prisma.SelectSubset<T, MedicalRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MedicalRecordUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MedicalRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MedicalRecordUpsertArgs>(args: Prisma.SelectSubset<T, MedicalRecordUpsertArgs<ExtArgs>>): Prisma.Prisma__MedicalRecordClient<runtime.Types.Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MedicalRecordCountArgs>(args?: Prisma.Subset<T, MedicalRecordCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MedicalRecordCountAggregateOutputType> : number>;
    aggregate<T extends MedicalRecordAggregateArgs>(args: Prisma.Subset<T, MedicalRecordAggregateArgs>): Prisma.PrismaPromise<GetMedicalRecordAggregateType<T>>;
    groupBy<T extends MedicalRecordGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MedicalRecordGroupByArgs['orderBy'];
    } : {
        orderBy?: MedicalRecordGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MedicalRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMedicalRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MedicalRecordFieldRefs;
}
export interface Prisma__MedicalRecordClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    pet<T extends Prisma.PetDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PetDefaultArgs<ExtArgs>>): Prisma.Prisma__PetClient<runtime.Types.Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    vet<T extends Prisma.MedicalRecord$vetArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MedicalRecord$vetArgs<ExtArgs>>): Prisma.Prisma__EmergencyContactClient<runtime.Types.Result.GetResult<Prisma.$EmergencyContactPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    treatments<T extends Prisma.MedicalRecord$treatmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MedicalRecord$treatmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    immunizations<T extends Prisma.MedicalRecord$immunizationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MedicalRecord$immunizationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ImmunizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    diagnostics<T extends Prisma.MedicalRecord$diagnosticsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MedicalRecord$diagnosticsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiagnosticPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    medications<T extends Prisma.MedicalRecord$medicationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MedicalRecord$medicationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MedicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MedicalRecordFieldRefs {
    readonly id: Prisma.FieldRef<"MedicalRecord", 'String'>;
    readonly petId: Prisma.FieldRef<"MedicalRecord", 'String'>;
    readonly recordDate: Prisma.FieldRef<"MedicalRecord", 'DateTime'>;
    readonly vetContactId: Prisma.FieldRef<"MedicalRecord", 'String'>;
    readonly vetName: Prisma.FieldRef<"MedicalRecord", 'String'>;
    readonly notes: Prisma.FieldRef<"MedicalRecord", 'String'>;
    readonly createdAt: Prisma.FieldRef<"MedicalRecord", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"MedicalRecord", 'DateTime'>;
}
export type MedicalRecordFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MedicalRecordSelect<ExtArgs> | null;
    omit?: Prisma.MedicalRecordOmit<ExtArgs> | null;
    include?: Prisma.MedicalRecordInclude<ExtArgs> | null;
    where: Prisma.MedicalRecordWhereUniqueInput;
};
export type MedicalRecordFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MedicalRecordSelect<ExtArgs> | null;
    omit?: Prisma.MedicalRecordOmit<ExtArgs> | null;
    include?: Prisma.MedicalRecordInclude<ExtArgs> | null;
    where: Prisma.MedicalRecordWhereUniqueInput;
};
export type MedicalRecordFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MedicalRecordSelect<ExtArgs> | null;
    omit?: Prisma.MedicalRecordOmit<ExtArgs> | null;
    include?: Prisma.MedicalRecordInclude<ExtArgs> | null;
    where?: Prisma.MedicalRecordWhereInput;
    orderBy?: Prisma.MedicalRecordOrderByWithRelationInput | Prisma.MedicalRecordOrderByWithRelationInput[];
    cursor?: Prisma.MedicalRecordWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MedicalRecordScalarFieldEnum | Prisma.MedicalRecordScalarFieldEnum[];
};
export type MedicalRecordFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MedicalRecordSelect<ExtArgs> | null;
    omit?: Prisma.MedicalRecordOmit<ExtArgs> | null;
    include?: Prisma.MedicalRecordInclude<ExtArgs> | null;
    where?: Prisma.MedicalRecordWhereInput;
    orderBy?: Prisma.MedicalRecordOrderByWithRelationInput | Prisma.MedicalRecordOrderByWithRelationInput[];
    cursor?: Prisma.MedicalRecordWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MedicalRecordScalarFieldEnum | Prisma.MedicalRecordScalarFieldEnum[];
};
export type MedicalRecordFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MedicalRecordSelect<ExtArgs> | null;
    omit?: Prisma.MedicalRecordOmit<ExtArgs> | null;
    include?: Prisma.MedicalRecordInclude<ExtArgs> | null;
    where?: Prisma.MedicalRecordWhereInput;
    orderBy?: Prisma.MedicalRecordOrderByWithRelationInput | Prisma.MedicalRecordOrderByWithRelationInput[];
    cursor?: Prisma.MedicalRecordWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MedicalRecordScalarFieldEnum | Prisma.MedicalRecordScalarFieldEnum[];
};
export type MedicalRecordCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MedicalRecordSelect<ExtArgs> | null;
    omit?: Prisma.MedicalRecordOmit<ExtArgs> | null;
    include?: Prisma.MedicalRecordInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MedicalRecordCreateInput, Prisma.MedicalRecordUncheckedCreateInput>;
};
export type MedicalRecordCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MedicalRecordCreateManyInput | Prisma.MedicalRecordCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MedicalRecordCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MedicalRecordSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MedicalRecordOmit<ExtArgs> | null;
    data: Prisma.MedicalRecordCreateManyInput | Prisma.MedicalRecordCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.MedicalRecordIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type MedicalRecordUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MedicalRecordSelect<ExtArgs> | null;
    omit?: Prisma.MedicalRecordOmit<ExtArgs> | null;
    include?: Prisma.MedicalRecordInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MedicalRecordUpdateInput, Prisma.MedicalRecordUncheckedUpdateInput>;
    where: Prisma.MedicalRecordWhereUniqueInput;
};
export type MedicalRecordUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MedicalRecordUpdateManyMutationInput, Prisma.MedicalRecordUncheckedUpdateManyInput>;
    where?: Prisma.MedicalRecordWhereInput;
    limit?: number;
};
export type MedicalRecordUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MedicalRecordSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MedicalRecordOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MedicalRecordUpdateManyMutationInput, Prisma.MedicalRecordUncheckedUpdateManyInput>;
    where?: Prisma.MedicalRecordWhereInput;
    limit?: number;
    include?: Prisma.MedicalRecordIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type MedicalRecordUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MedicalRecordSelect<ExtArgs> | null;
    omit?: Prisma.MedicalRecordOmit<ExtArgs> | null;
    include?: Prisma.MedicalRecordInclude<ExtArgs> | null;
    where: Prisma.MedicalRecordWhereUniqueInput;
    create: Prisma.XOR<Prisma.MedicalRecordCreateInput, Prisma.MedicalRecordUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MedicalRecordUpdateInput, Prisma.MedicalRecordUncheckedUpdateInput>;
};
export type MedicalRecordDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MedicalRecordSelect<ExtArgs> | null;
    omit?: Prisma.MedicalRecordOmit<ExtArgs> | null;
    include?: Prisma.MedicalRecordInclude<ExtArgs> | null;
    where: Prisma.MedicalRecordWhereUniqueInput;
};
export type MedicalRecordDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MedicalRecordWhereInput;
    limit?: number;
};
export type MedicalRecord$vetArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmergencyContactSelect<ExtArgs> | null;
    omit?: Prisma.EmergencyContactOmit<ExtArgs> | null;
    include?: Prisma.EmergencyContactInclude<ExtArgs> | null;
    where?: Prisma.EmergencyContactWhereInput;
};
export type MedicalRecord$treatmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MedicalRecord$immunizationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImmunizationSelect<ExtArgs> | null;
    omit?: Prisma.ImmunizationOmit<ExtArgs> | null;
    include?: Prisma.ImmunizationInclude<ExtArgs> | null;
    where?: Prisma.ImmunizationWhereInput;
    orderBy?: Prisma.ImmunizationOrderByWithRelationInput | Prisma.ImmunizationOrderByWithRelationInput[];
    cursor?: Prisma.ImmunizationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ImmunizationScalarFieldEnum | Prisma.ImmunizationScalarFieldEnum[];
};
export type MedicalRecord$diagnosticsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MedicalRecord$medicationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MedicationSelect<ExtArgs> | null;
    omit?: Prisma.MedicationOmit<ExtArgs> | null;
    include?: Prisma.MedicationInclude<ExtArgs> | null;
    where?: Prisma.MedicationWhereInput;
    orderBy?: Prisma.MedicationOrderByWithRelationInput | Prisma.MedicationOrderByWithRelationInput[];
    cursor?: Prisma.MedicationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MedicationScalarFieldEnum | Prisma.MedicationScalarFieldEnum[];
};
export type MedicalRecordDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MedicalRecordSelect<ExtArgs> | null;
    omit?: Prisma.MedicalRecordOmit<ExtArgs> | null;
    include?: Prisma.MedicalRecordInclude<ExtArgs> | null;
};
