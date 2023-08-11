import { Request, Response } from "express";
import { Pet } from "../entity/pet.entity";
import { dataSource } from "../db/data-source";
import { Code } from "../enum/code.enum";
import { HttpResponse } from "../domain/response";
import { Status } from "../enum/status.enum";
import { PetDto } from "../dto/pet-dto";
import { PetType } from "../entity/pet-types.entity";
import { FurColor } from "../entity/fur-colors.entity";
import { PetCountry } from "../entity/pet-countries.entity";

class PetController {
    async getPetById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const petFromDb: Pet | null = await dataSource.getRepository(Pet).findOne({
                where: {
                    id: id
                },
                // loadRelationIds: true,
                relations: {
                    country: true,
                    furColor: true,
                    petType: true
                }
            });
            if (!petFromDb) {
                return res.status(Code.NOT_FOUND)
                    .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, `Pet was not found`));
            }
            const petDto = new PetDto(petFromDb!.petType.type,
                petFromDb!.furColor.color,
                petFromDb!.country.country,
                petFromDb!.idCode,
                petFromDb!.name,
                petFromDb!.id
            );
            return res.status(Code.OK)
                .send(new HttpResponse(Code.OK, Status.OK, `id = ${id}, name = ${petFromDb?.name}`, petDto));
        } catch (e) {
            console.log(e);
        }
    }

    async getAllPets(req: Request, res: Response) {
        try {
            const petsFromDb: Pet[] = await dataSource.getRepository(Pet).find({
                relations: {
                    country: true,
                    furColor: true,
                    petType: true
                }
            });
            const petDtos: PetDto[] = [];
            for (let i = 0; i < petsFromDb.length; i++) {
                const petDto = new PetDto(petsFromDb[i]!.petType.type,
                    petsFromDb[i]!.furColor.color,
                    petsFromDb[i]!.country.country,
                    petsFromDb[i]!.idCode,
                    petsFromDb[i]!.name,
                    petsFromDb[i]!.id
                );
                petDtos.push(petDto);
            }
            return res.status(Code.OK)
                .send(new HttpResponse(Code.OK, Status.OK, `Successfully got all pets`, petDtos));
        } catch (e) {
            console.log(e);
        }
    }

    async addPet(req: Request, res: Response) {
        try {
            // const { petType, furColor, country, idCode, name } = req.body;
            const typeFromDb: PetType | null = await dataSource.getRepository(PetType).findOne({
                where: {
                    type: req.body.petType
                }
            });
            const colorFromDb: FurColor | null = await dataSource.getRepository(FurColor).findOne({
                where: {
                    color: req.body.furColor
                }
            });
            const countryFromDb: PetCountry | null = await dataSource.getRepository(PetCountry).findOne({
                where: {
                    country: req.body.country
                }
            });
            if (!typeFromDb || !colorFromDb || !countryFromDb) {
                return res.status(Code.NOT_FOUND)
                    .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, `Error with data input`));
            }
            const petToSave = await dataSource.getRepository(Pet).create({name: req.body.name,
                idCode: req.body.idCode,
                petType: {id: typeFromDb.id},
                furColor: {id: colorFromDb.id},
                country: {id: countryFromDb.id}});
            // const petToSave: Pet = new Pet();
            // petToSave.petType.id = typeFromDb.id;
            // petToSave.furColor.id = colorFromDb.id;
            // petToSave.country.id = countryFromDb.id;
            // petToSave.idCode = req.body.idCode;
            // petToSave.name = req.body.name;
            const savedPet = await dataSource.getRepository(Pet).save(petToSave);
            const result = dataSource.getRepository(Pet).findOne({
                where: {
                    id: savedPet.id
                }
            });
            console.log(result);
            return res.status(Code.OK)
                .send(new HttpResponse(Code.OK, Status.OK, `Successfully added pet`, result));
        } catch (e) {
            console.log(e);
        }
    }

    async editPet(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const petFromDb: Pet | null= await dataSource.getRepository(Pet).findOne({
                where: {
                    id: id
                }
            });
            if (petFromDb === null) {
                return res.status(Code.NOT_FOUND)
                    .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, `Pet with id = ${id} not found`));
            }
            dataSource.getRepository(Pet).merge(petFromDb!, req.body);
            const results = await dataSource.getRepository(Pet).save(petFromDb!);
            return res.status(Code.OK)
                .send(new HttpResponse(Code.OK, Status.OK, `Successfully edited pet with id = ${id}`, results));
        } catch (e) {
            console.log(e);
        }
    }

    async deletePet(req: Request, res: Response) {
        try {
            const results = await dataSource.getRepository(Pet).delete(req.params.id);
            return res.status(Code.OK)
                .send(new HttpResponse(Code.OK, Status.OK, `Successfully deleted pet with id = ${req.params.id}`, results));
        } catch (e) {
            console.log(e);
        }
    }
}

export default PetController;