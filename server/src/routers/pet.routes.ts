import { Router } from "express";
import PetController from "../controllers/pet-controller";

const petRouter = Router();
const petController = new PetController();

petRouter.post('/add', petController.addPet);
petRouter.put('/edit/:id', petController.editPet);
petRouter.delete('/delete/:id', petController.deletePet);
petRouter.get('/:id', petController.getPetById);
petRouter.get('/', petController.getAllPets);

export default petRouter;