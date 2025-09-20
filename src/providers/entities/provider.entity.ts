import { Product } from "src/product/entities/product.entity";
import { Column, OneToMany ,Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Provider {
    @PrimaryGeneratedColumn("uuid")
    providerId: string
    @Column('text')
    providerName: string
    @Column('text')
    providerEmail:string
    @Column({
        type: "text",
        nullable: true,
    })
    providerPhoneNumber: string
    @OneToMany(() => Product, (photo) => photo.provider)
    products: Product[]
}
