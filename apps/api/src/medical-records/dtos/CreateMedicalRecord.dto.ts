import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { TreatmentDetailsDto } from "../../treatments/dtos/CreateTreatment.dto";
import { ImmunizationDetailsDto } from "../../immunizations/dtos/CreateImmunization.dto";
import { DiagnosticDetailsDto } from "../../diagnostics/dtos/CreateDiagnostic.dto";
import { MedicationDetailsDto } from "../../medications/dtos/CreateMedication.dto";

export class CreateMedicalRecordDto {
    @IsString()
    @IsNotEmpty()
    petId: string

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    recordDate: string

    @IsString()
    @IsOptional()
    vetContactId?: string

    @IsString()
    @IsOptional()
    vetName?: string

    @IsNotEmpty()
    @IsOptional()
    notes: string

    // A visit and everything recorded during it arrive together, so they are
    // written together. Same nesting the PATCH route already accepts.
    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => TreatmentDetailsDto)
    treatments?: TreatmentDetailsDto[]

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ImmunizationDetailsDto)
    immunizations?: ImmunizationDetailsDto[]

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => DiagnosticDetailsDto)
    diagnostics?: DiagnosticDetailsDto[]

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => MedicationDetailsDto)
    medications?: MedicationDetailsDto[]
}
