import { Type } from 'class-transformer';
import { IsArray, IsDate, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { TreatmentDetailsDto } from "../../treatments/dtos/CreateTreatment.dto";
import { ImmunizationDetailsDto } from "../../immunizations/dtos/CreateImmunization.dto";
import { DiagnosticDetailsDto } from "../../diagnostics/dtos/CreateDiagnostic.dto";
import { MedicationDetailsDto } from "../../medications/dtos/CreateMedication.dto";

export class UpdateMedicalRecordDto {
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    recordDate?: Date

    @IsUUID()
    @IsOptional()
    vetContactId?: string | null

    @IsString()
    @IsOptional()
    vetName?: string | null

    @IsString()
    @IsOptional()
    notes?: string | null

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
