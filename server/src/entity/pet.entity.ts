import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { PetType } from "./pet-types.entity";

@Entity()
export class Pet {
    @PrimaryGeneratedColumn()
    id!: number

    @OneToOne(() => PetType)
    @JoinColumn({ name: "pet_type_id" })
    petType!: PetType
}