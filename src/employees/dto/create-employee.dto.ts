import { IsEAN, IsEmail, IsNumber, IsOptional, IsString, IsUUID, MAX, maxLength, MaxLength } from "class-validator"

export class CreateEmployeeDto {
    @IsUUID("4")
    @IsOptional()
    id:string
    @MaxLength(20)
    @IsString()
    name:string
    @MaxLength(70)
    @IsString()
    lastName: string
    @MaxLength(10)
    @IsString()
    phoneNumber:string
    @IsString()
    @IsEmail()
    email: string

}
