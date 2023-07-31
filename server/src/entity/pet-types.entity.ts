import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PetType {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    type!: string
}