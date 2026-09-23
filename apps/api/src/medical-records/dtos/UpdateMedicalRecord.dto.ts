import { Type } from 'class-transformer';
import { IsArray, IsDate, IsOptional, IsString, IsUUID, ValidateIf, ValidateNested } from 'class-validator';
import { TreatmentDetailsDto } from "../../treatments/dtos/CreateTreatment.dto";
import { ImmunizationDetailsDto } from "../../immunizations/dtos/CreateImmunization.dto";
import { DiagnosticDetailsDto } from "../../diagnostics/dtos/CreateDiagnostic.dto";
import { MedicationDetailsDto } from "../../medications/dtos/CreateMedication.dto";

// A PATCH body: an absent field leaves the stored value alone. @IsOptional()
// marks the nullable columns, where null is how a value gets cleared;
// @ValidateIf guards the NOT NULL ones, so an explicit null is a 400 naming
// the field rather than a 500 from the database. See UpdatePetDto.
export class UpdateMedicalRecordDto {
    @ValidateIf((dto) => dto.recordDate !== undefined)
    @IsDate()
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
