export class PetDto {
    id?;
    idCode;
    name;
    country;
    furColor;
    petType;

    constructor(petType: string, furColor: string, country: string, idCode: string, name: string, id?: number) {
        this.id = id;
        this.idCode = idCode;
        this.name = name;
        this.country = country;
        this.furColor = furColor;
        this.petType = petType;
    }
}
