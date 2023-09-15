import { NextFunction, Request, Response } from "express";
import { Pet } from "../entity/pet.entity";
import { dataSource } from "../db/data-source";
import { Code } from "../enum/code.enum";
import { HttpResponse } from "../domain/response";
import { Status } from "../enum/status.enum";
import { PetDto } from "../dto/pet-dto";
import { PetType } from "../entity/pet-types.entity";
import { FurColor } from "../entity/fur-colors.entity";
import { PetCountry } from "../entity/pet-countries.entity";
const petService = require("../service/pet-service");

class PetController {
    async getPetById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const petData: PetDto = await petService.getPetById(id);
            return res.status(Code.OK)
                .send(new HttpResponse(Code.OK, Status.OK, `id = ${petData.id}, name = ${petData.name}`, petData));
        } catch (e) {
            next(e);
        }
    }

    async getAllPets(req: Request, res: Response, next: NextFunction) {
        try {
            const petData: PetDto[] = await petService.getAllPets();
            return res.status(Code.OK)
                .send(new HttpResponse(Code.OK, Status.OK, `Successfully got all pets`, petData));
        } catch (e) {
            next(e);
        }
    }

    async addPet(req: Request, res: Response, next: NextFunction) {
        try {
            const {petType, furColor, country, name, idCode} = req.body;
            const petData: PetDto = await petService.addPet(petType, furColor, country, name, idCode);
            return res.status(Code.OK)
                .send(new HttpResponse(Code.OK, Status.OK, `Successfully added pet`, petData));
        } catch (e) {
            next(e);
        }
    }

    async editPet(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const petData = req.body;
            const updatedPetData = await petService.editPet(id, petData);
            console.log(updatedPetData);
            return res.status(Code.OK)
                .send(new HttpResponse(Code.OK, Status.OK, `Successfully edited pet with id = ${id}`, updatedPetData));
        } catch (e) {
            next(e);
        }
    }

    async deletePet(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const petData: PetDto = await petService.deletePet(id);
            return res.status(Code.OK)
                .send(new HttpResponse(Code.OK, Status.OK, `Successfully deleted pet with id = ${req.params.id}`, petData));
        } catch (e) {
            console.log(e);
        }
    }
}

export default PetController;