import { dataSource } from "../db/data-source";
import { PetDto } from "../dto/pet-dto";
import { FurColor } from "../entity/fur-colors.entity";
import { PetCountry } from "../entity/pet-countries.entity";
import { PetType } from "../entity/pet-types.entity";
import { Pet } from "../entity/pet.entity";
import { ApiError } from "../exceptions/api-error";
import { Utils } from "../utils/utils";
import { Code } from "../enum/code.enum";

class PetService {
    async getPetById(id: number) {
        const petFromDb: Pet | null = await dataSource.getRepository(Pet).findOne({
            where: {
                id: id
            },
            relations: {
                country: true,
                furColor: true,
                petType: true
            }
        });
        if (!petFromDb) {
            throw new ApiError(Code.NOT_FOUND, 'Pet with such id not found');
        }
        const petDto = Utils.mapPetToPetDto(petFromDb);
        return petDto;
    }

    async getAllPets() {
        const petsFromDb: Pet[] = await dataSource.getRepository(Pet).find({
            relations: {
                country: true,
                furColor: true,
                petType: true
            }
        }).catch(() => {
            throw new Error('Unexpected error');
        });
        const petDtos: PetDto[] = [];
        for (let i = 0; i < petsFromDb.length; i++) {
            const petDto = Utils.mapPetToPetDto(petsFromDb[i]);
            petDtos.push(petDto);
        }
        return petDtos;
    }

    async addPet(petType: string, furColor: string, country: string, name: string, idCode: string) {
        const typeFromDb: PetType | null = await dataSource.getRepository(PetType).findOne({
            where: {
                type: petType
            }
        });
        const colorFromDb: FurColor | null = await dataSource.getRepository(FurColor).findOne({
            where: {
                color: furColor
            }
        });
        const countryFromDb: PetCountry | null = await dataSource.getRepository(PetCountry).findOne({
            where: {
                country: country
            }
        });
        if (!typeFromDb || !colorFromDb || !countryFromDb) {
            throw new ApiError(Code.BAD_REQUEST, "Error with data input");
        }
        const petToSave = await dataSource.getRepository(Pet).create({
            name: name,
            idCode: idCode,
            petType: typeFromDb,
            furColor: colorFromDb,
            country: countryFromDb
        });
        const savedPet = await dataSource.getRepository(Pet).save(petToSave)
            .catch((e) => {
                console.log(e);
            });
        if (!savedPet) {
            throw new ApiError(Code.NOT_FOUND, 'Error when saving pet');
        }
        const resultPetDto = Utils.mapPetToPetDto(savedPet);
        return resultPetDto;
    }

    async editPet(id: number, petData: any) {
        const petFromDb: Pet | null = await dataSource.getRepository(Pet).findOne({
            where: {
                id: id
            }
        });
        if (!petFromDb) {
            throw new ApiError(Code.NOT_FOUND, 'Pet not found');
        }
        dataSource.getRepository(Pet).merge(petFromDb, petData);
        const results = await dataSource.getRepository(Pet).save(petFromDb!);
        const resultPetDto = Utils.mapPetToPetDto(results);
        return resultPetDto;
    }

    async deletePet(id: number) {
        const petFromDb: Pet | null = await dataSource.getRepository(Pet).findOne({
            where: {
                id: id
            }
        });
        if (!petFromDb) {
            throw new ApiError(Code.NOT_FOUND, 'Pet not found');
        }
        const results = await dataSource.getRepository(Pet).delete(id);
        return results;
    }
}

module.exports = new PetService();