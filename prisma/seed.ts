import { 
    PetType, 
    PetSex,
    ContactRelation,
    MedicationStatus,
    WeightUnit, 
    DosageUnit, 
    DiagnosticType } from "./generated/prisma/enums"
import { prisma } from "./lib/prisma"

async function main() {
    const owner1 = await prisma.petOwner.create({
        data: {
            firstName: "Jonathan",
            lastName: "Cho",
            email: "jonathan@testemail.com",
            passwordHash: "password123"
        }
    })
    const owner2 = await prisma.petOwner.create({
        data: {
            firstName: "Alex",
            lastName: "Smith",
            email: "alexsmith@testemail.com",
            passwordHash: "password123"
        }
    })
    const pet1 = await prisma.pet.create({
        data: {
            name: 'Biscuit',
            type: PetType.DOG,
            ownerId: owner1.id,
            breed: 'Dachshund',
            dateOfBirth: '2020-01-01',
            weight: 10,
            weightUnit: WeightUnit.LB,
            sex: PetSex.MALE,
            neutered: true
        }
        
    })
    const pet2 = await prisma.pet.create({
        data: {
            name: 'Butters',
            type: PetType.CAT,
            ownerId: owner2.id,
            breed: 'Persian',
            dateOfBirth: '2025-8-8',
            weight: 10,
            weightUnit: WeightUnit.LB,
            sex: PetSex.FEMALE,
            neutered: true
        }
        
    })
    await prisma.emergencyContact.create({
        data: {
             petId: pet1.id,
            petOwnerId: owner1.id,
            firstName: 'Dante',
            lastName: 'Smith',
            relationship: ContactRelation.NEIGHBOR,
            email: 'dante@testemail.com',
            phone: '5551234567',
            isPrimary: true
        }
       
    })
    await prisma.medicalRecord.create({
        data: {
            petId: pet1.id,
            recordDate: '2026-02-01',
            notes: 'Biscuit\'s Medical Record',
            immunizations: {
                create: [
                    {
                        petId: pet1.id,
                        name: '',
                        dateAdministered: '2026-05-03',
                    }
                ]
            },
            medications: {
                create: [
                    {
                        name: 'Flea medication',
                        dosageAmount: 1,
                        dosageUnit: DosageUnit.TABLET,
                        frequency: 'once a day',
                        startDate: '2026-06-19',
                        status: MedicationStatus.ACTIVE,
                        petId: pet1.id
                    }
                ],
            },
            diagnostics: {
                create: [
                    {
                        petId: pet1.id, 
                        type: DiagnosticType.BLOODWORK,
                        date: '2026-08-08',
                        result: '',
                        notes: ''
                    }
                ]
            },
            treatments: {
                create: [
                    {
                        petId: pet1.id,
                        name: 'Treatment 1',
                        date: '2021-03-09',
                        notes: ''
                    }
                ]
            }
        },
        include: {
            immunizations: true,
            treatments: true,
            diagnostics: true,
            medications: true
        },
    });
    const medicalRecord2 =  await prisma.medicalRecord.create({
        data: {
            petId: pet2.id,
            recordDate: '2026-05-10',
            notes: 'Butter\'s Test Medical Record',
            immunizations: {
                create: [
                    {
                        petId: pet2.id,
                        name: '',
                        dateAdministered: '2026-12-19'
                    }
                ]
            },
            medications: {
                create: [
                    {
                        name: 'Amoxicillin',
                        dosageAmount: 5,
                        dosageUnit: DosageUnit.TABLET,
                        frequency: 'every 12 hours',
                        startDate: '2026-11-11',
                        status: MedicationStatus.COMPLETED,
                        petId: pet2.id
                    }
                ]
            },
            diagnostics: {
                create: [
                    {
                        petId: pet2.id,
                        type: DiagnosticType.XRAY,
                        date: '2026-04-12',
                        result: '',
                        notes: ''
                    }
                ]
            },
            treaments: {
                create: [
                    {
                        petId: pet2.id,
                        name: 'Treatment 2',
                        date: '2026-07-12',
                        notes: ''
                    }
                ]
            }
        },
        include: {
            immunizations: true,
            treatments: true,
            diagnostics: true,
            medications: true
        },  
    })
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });


