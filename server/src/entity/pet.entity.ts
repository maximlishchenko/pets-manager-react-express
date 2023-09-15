import { Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn, Column, CreateDateColumn } from "typeorm";
import { PetType } from "./pet-types.entity";
import { FurColor } from "./fur-colors.entity";
import { PetCountry } from "./pet-countries.entity";
import { User } from "./user.entity";

@Entity()
export class Pet {
    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => PetType, { cascade: true, eager: true })
    @JoinColumn({ name: "pet_type_id", referencedColumnName: "id" })
    petType!: PetType

    @ManyToOne(() => FurColor, { cascade: true, eager: true })
    @JoinColumn({ name: "fur_color_id", referencedColumnName: "id" })
    furColor!: FurColor

    @ManyToOne(() => PetCountry, { cascade: true, eager: true })
    @JoinColumn({ name: "country_id",  referencedColumnName: "id" })
    country!: PetCountry

    @ManyToOne(() => User, (user) => user.pets)
    @JoinColumn({ name: "user_id", referencedColumnName: "id"  })
    userId!: User

    @Column({ name: "id_code", unique: true })
    idCode!: string

    @Column()
    name!: string

    @CreateDateColumn({
        name: "created_at",
        type: "timestamp"
    })
    createdAt!: Date;
}