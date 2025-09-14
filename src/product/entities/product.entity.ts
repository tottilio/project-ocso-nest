import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
        // @Column({type:"uuid"})
        // productProvider:string
}
