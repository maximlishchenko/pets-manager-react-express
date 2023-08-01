import { Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn, Column, CreateDateColumn } from "typeorm";
import { PetType } from "./pet-types.entity";
import { FurColor } from "./fur-colors.entity";
import { PetCountry } from "./pet-countries.entity";
import { User } from "./user.entity";

@Entity()
export class Pet {
    @PrimaryGeneratedColumn()
    id!: number

    @OneToOne(() => PetType)
    @JoinColumn({ name: "pet_type_id" })
    petTypeId!: PetType

    @OneToOne(() => FurColor)
    @JoinColumn({ name: "fur_color_id" })
    furColorId!: FurColor

    @OneToOne(() => PetCountry)
    @JoinColumn({ name: "country_id" })
    countryId!: PetCountry

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