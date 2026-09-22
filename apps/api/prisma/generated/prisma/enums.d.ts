export declare const PetType: {
    readonly DOG: "DOG";
    readonly CAT: "CAT";
    readonly BIRD: "BIRD";
};
export type PetType = (typeof PetType)[keyof typeof PetType];
export declare const PetSex: {
    readonly MALE: "MALE";
    readonly FEMALE: "FEMALE";
    readonly UNKNOWN: "UNKNOWN";
};
export type PetSex = (typeof PetSex)[keyof typeof PetSex];
export declare const ContactRelation: {
    readonly SPOUSE: "SPOUSE";
    readonly NEIGHBOR: "NEIGHBOR";
    readonly VET: "VET";
    readonly FAMILY_MEMBER: "FAMILY_MEMBER";
    readonly OTHER: "OTHER";
};
export type ContactRelation = (typeof ContactRelation)[keyof typeof ContactRelation];
export declare const DiagnosticType: {
    readonly BLOODWORK: "BLOODWORK";
    readonly XRAY: "XRAY";
    readonly ULTRASOUND: "ULTRASOUND";
    readonly URINALYSIS: "URINALYSIS";
    readonly FECAL: "FECAL";
    readonly BIOPSY: "BIOPSY";
    readonly OTHER: "OTHER";
};
export type DiagnosticType = (typeof DiagnosticType)[keyof typeof DiagnosticType];
export declare const DosageUnit: {
    readonly MG: "MG";
    readonly ML: "ML";
    readonly TABLET: "TABLET";
    readonly DROP: "DROP";
};
export type DosageUnit = (typeof DosageUnit)[keyof typeof DosageUnit];
export declare const MedicationStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly COMPLETED: "COMPLETED";
    readonly DISCONTINUED: "DISCONTINUED";
};
export type MedicationStatus = (typeof MedicationStatus)[keyof typeof MedicationStatus];
export declare const WeightUnit: {
    readonly KG: "KG";
    readonly LB: "LB";
};
export type WeightUnit = (typeof WeightUnit)[keyof typeof WeightUnit];
