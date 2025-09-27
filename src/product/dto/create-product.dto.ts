import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsInt, IsNumber, IsObject, IsOptional, IsString, IsUUID, MaxLength } from "class-validator"
import { Provider } from "src/providers/entities/provider.entity"
import { Product } from "../entities/product.entity"

export class CreateProductDto extends Product {
    @ApiPropertyOptional({
        default: "UUID"
    })
    @IsUUID("4")
    @IsOptional()
    declare productId:string
    @ApiProperty({
        default: "Producto 1"
    })
    @IsString()
    @MaxLength(40)  
    declare productName:string
    @ApiProperty({
        default: 18
    })
    @IsNumber()
    declare productPrice:number
    @ApiProperty({
        default: 3
    })
    @IsInt()
    declare productSeal: number
    @ApiProperty()
    @IsObject()
    declare provider: Provider
}
