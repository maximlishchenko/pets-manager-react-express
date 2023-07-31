import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FurColor {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    color!: string
}