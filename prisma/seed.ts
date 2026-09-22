import { 
    PetType, 
    PetSex,
    ContactRelation,
    MedicationStatus,
    WeightUnit, 
    DosageUnit, 
    DiagnosticType } from "../src/generated/prisma/enums"
import { prisma } from "./lib/prisma"

const VACCINE_CATALOG = [
    { name: 'Rabies', species: PetType.DOG, defaultIntervalMonths: 36 },
    { name: 'Distemper', species: PetType.DOG, defaultIntervalMonths: 12 },
    { name: 'Bordetella', species: PetType.DOG, defaultIntervalMonths: 12 },
    { name: 'Leptospirosis', species: PetType.DOG, defaultIntervalMonths: 12 },
    { name: 'Other', species: PetType.DOG, defaultIntervalMonths: null },
    { name: 'Rabies', species: PetType.CAT, defaultIntervalMonths: 36 },
    { name: 'FVRCP', species: PetType.CAT, defaultIntervalMonths: 12 },
    { name: 'Feline Leukemia', species: PetType.CAT, defaultIntervalMonths: 12 },
    { name: 'Other', species: PetType.CAT, defaultIntervalMonths: null },
    { name: 'Polyomavirus', species: PetType.BIRD, defaultIntervalMonths: 12 },
    { name: "Pacheco's Disease", species: PetType.BIRD, defaultIntervalMonths: 12 },
    { name: 'Other', species: PetType.BIRD, defaultIntervalMonths: null },
];

async function main() {
    for (const vaccine of VACCINE_CATALOG) {
        await prisma.vaccine.upsert({
            where: { name_species: { name: vaccine.name, species: vaccine.species } },
            update: {},
            create: vaccine,
        });
    }

    const rabiesDog = await prisma.vaccine.findUniqueOrThrow({
        where: { name_species: { name: 'Rabies', species: PetType.DOG } },
    });
    const fvrcpCat = await prisma.vaccine.findUniqueOrThrow({
        where: { name_species: { name: 'FVRCP', species: PetType.CAT } },
    });

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
            dateOfBirth: new Date('2025-05-01'),
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
            dateOfBirth: new Date('2025-8-8'),
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
            recordDate: new Date('2026-02-01'),
            notes: 'Biscuit\'s Medical Record',
            immunizations: {
                create: [
                    {
                        petId: pet1.id,
                        vaccineId: rabiesDog.id,
                        dateAdministered: new Date('2026-05-03'),
                        nextDueDate: new Date('2029-05-03'),
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
                        startDate: new Date('2026-06-19'),
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
                        date: new Date('2026-08-08'),
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
                        date: new Date('2021-03-09'),
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
            recordDate: new Date('2026-05-10'),
            notes: 'Butter\'s Test Medical Record',
            immunizations: {
                create: [
                    {
                        petId: pet2.id,
                        vaccineId: fvrcpCat.id,
                        dateAdministered: new Date('2026-12-19'),
                        nextDueDate: new Date('2027-12-19')
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
                        startDate: new Date('2026-11-11'),
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
                        date: new Date('2026-04-12'),
                        result: '',
                        notes: ''
                    }
                ]
            },
            treatments: {
                create: [
                    {
                        petId: pet2.id,
                        name: 'Treatment 2',
                        date: new Date('2026-07-12'),
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


