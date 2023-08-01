import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Pet } from "./pet.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    email!: string

    @Column()
    password!: string

    @OneToMany(() => Pet, (pet) => pet.userId)
    pets!: Pet[]
}