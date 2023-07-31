import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PetCountry {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    country!: string
}