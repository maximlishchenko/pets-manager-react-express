import { Request, Response } from "express";

class PetController {
    async addPet(req: Request, res: Response) {
        try {
            const pet = await myDataSource.getRepository(User).create(req.body);
            const results = await myDataSource.getRepository(User).save(user);
        } catch (e) {
            console.log(e);
        }
    }
}

export default PetController;