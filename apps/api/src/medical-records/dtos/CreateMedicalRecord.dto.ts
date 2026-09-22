import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
}
