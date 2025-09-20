import { Provider } from "src/providers/entities/provider.entity";
import { ManyToOne ,Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
        @PrimaryGeneratedColumn("uuid")
        productId:string
        @Column({type: 'text'})
        productName:string
        @Column({type: 'float'})
        productPrice:number
        @Column({type: 'int'})
        productSeal: number
        @ManyToOne(() => Provider, (provider) => provider.products, {
                eager: true
        })
        provider: Provider

}
