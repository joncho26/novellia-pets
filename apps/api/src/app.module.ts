import { Module } from '@nestjs/common';
import { PetsModule } from './pets/pets.module';
import { MedicalRecordsModule } from './medical-records/medical-records-module';
import { TreatmentsModule } from './treatments/treatments.module';
import { ImmunizationsModule } from './immunizations/immunizations.module';
import { DiagnosticsModule } from './diagnostics/diagnostics.module';
import { MedicationsModule } from './medications/medications.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { VaccinesModule } from './vaccines/vaccines.module';

@Module({
  imports: [
    PetsModule,
    MedicalRecordsModule,
    TreatmentsModule,
    ImmunizationsModule,
    DiagnosticsModule,
    MedicationsModule,
    DashboardModule,
    VaccinesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
