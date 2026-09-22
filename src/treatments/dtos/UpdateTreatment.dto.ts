import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateTreatmentDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    date?: Date

    @IsString()
    @IsOptional()
    notes?: string | null

    @IsUUID()
    @IsOptional()
    medicalRecordId?: string | null
}
