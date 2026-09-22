import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class TreatmentDetailsDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsDate()
    @Type(() => Date)
    date: Date

    @IsString()
    @IsOptional()
    notes?: string | null
}

export class CreateTreatmentDto extends TreatmentDetailsDto {
    @IsUUID()
    @IsOptional()
    medicalRecordId?: string | null
}
