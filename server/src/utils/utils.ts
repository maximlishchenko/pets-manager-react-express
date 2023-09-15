import { PetDto } from "../dto/pet-dto";
import { Pet } from "../entity/pet.entity";


export class Utils {
    static mapPetToPetDto(pet: Pet): PetDto {
        const petDto = new PetDto(pet!.petType.type,
            pet!.furColor.color,
            pet!.country.country,
            pet!.idCode,
            pet!.name,
            pet!.id
        );
        return petDto;
    }
}