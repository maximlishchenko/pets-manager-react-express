import { Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn, Column, CreateDateColumn } from "typeorm";
import { PetType } from "./pet-types.entity";
import { FurColor } from "./fur-colors.entity";
import { PetCountry } from "./pet-countries.entity";
import { User } from "./user.entity";

@Entity()
export class Pet {
    @PrimaryGeneratedColumn()
    id!: number

    @OneToOne(() => PetType, { cascade: true, eager: true })
    @JoinColumn({ name: "pet_type_id" })
    petType!: PetType

    @OneToOne(() => FurColor, { cascade: true, eager: true })
    @JoinColumn({ name: "fur_color_id" })
    furColor!: FurColor

    @OneToOne(() => PetCountry, { cascade: true, eager: true })
    @JoinColumn({ name: "country_id" })
    country!: PetCountry

    @ManyToOne(() => User, (user) => user.pets)
    @JoinColumn({ name: "user_id" })
    userId!: User

    @Column({ name: "id_code" })
    idCode!: string

    @Column()
    name!: string

    @CreateDateColumn({
        name: "created_at",
        type: "timestamp"
    })
    createdAt!: Date;
}