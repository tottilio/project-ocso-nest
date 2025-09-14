import { IsInt, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator"

export class CreateProductDto {

    @IsUUID("4")
    @IsOptional()
    productId:string

    @IsString()
    @MaxLength(40)  
    productName:string

    @IsNumber()
    productPrice:number

    @IsInt()
    productSeal: number

    @IsString()
    @IsUUID("4")
    productProvider:string
}
