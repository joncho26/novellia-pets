import * as runtime from "@prisma/client/runtime/client";
export const PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export const PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export const PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export const PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export const PrismaClientValidationError = runtime.PrismaClientValidationError;
export const sql = runtime.sqltag;
export const empty = runtime.empty;
export const join = runtime.join;
export const raw = runtime.raw;
export const Sql = runtime.Sql;
export const Decimal = runtime.Decimal;
export const getExtensionContext = runtime.Extensions.getExtensionContext;
export const prismaVersion = {
    client: "7.10.0",
    engine: "0edf323efd1d98336f3f0a68684b56f689b900d3"
};
export const NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
export const DbNull = runtime.DbNull;
export const JsonNull = runtime.JsonNull;
export const AnyNull = runtime.AnyNull;
export const ModelName = {
    Pet: 'Pet',
    PetOwner: 'PetOwner',
    EmergencyContact: 'EmergencyContact',
    MedicalRecord: 'MedicalRecord',
    Treatment: 'Treatment',
    Immunization: 'Immunization',
    Diagnostic: 'Diagnostic',
    Medication: 'Medication'
};
export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
export const PetScalarFieldEnum = {
    id: 'id',
    microchipId: 'microchipId',
    microchipRegistry: 'microchipRegistry',
    microchipDate: 'microchipDate',
    name: 'name',
    type: 'type',
    breed: 'breed',
    dateOfBirth: 'dateOfBirth',
    weight: 'weight',
    weightUnit: 'weightUnit',
    sex: 'sex',
    neutered: 'neutered',
    ownerId: 'ownerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const PetOwnerScalarFieldEnum = {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    passwordHash: 'passwordHash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const EmergencyContactScalarFieldEnum = {
    id: 'id',
    petOwnerId: 'petOwnerId',
    petId: 'petId',
    firstName: 'firstName',
    lastName: 'lastName',
    relationship: 'relationship',
    email: 'email',
    phone: 'phone',
    isPrimary: 'isPrimary',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const MedicalRecordScalarFieldEnum = {
    id: 'id',
    petId: 'petId',
    recordDate: 'recordDate',
    vetContactId: 'vetContactId',
    vetName: 'vetName',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const TreatmentScalarFieldEnum = {
    id: 'id',
    petId: 'petId',
    medicalRecordId: 'medicalRecordId',
    name: 'name',
    date: 'date',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const ImmunizationScalarFieldEnum = {
    id: 'id',
    petId: 'petId',
    medicalRecordId: 'medicalRecordId',
    name: 'name',
    dateAdministered: 'dateAdministered',
    nextDueDate: 'nextDueDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const DiagnosticScalarFieldEnum = {
    id: 'id',
    petId: 'petId',
    medicalRecordId: 'medicalRecordId',
    type: 'type',
    date: 'date',
    result: 'result',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const MedicationScalarFieldEnum = {
    id: 'id',
    petId: 'petId',
    medicalRecordId: 'medicalRecordId',
    name: 'name',
    dosageAmount: 'dosageAmount',
    dosageUnit: 'dosageUnit',
    frequency: 'frequency',
    startDate: 'startDate',
    endDate: 'endDate',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
export const NullsOrder = {
    first: 'first',
    last: 'last'
};
export const defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map