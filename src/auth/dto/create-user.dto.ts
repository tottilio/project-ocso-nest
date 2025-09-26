import { IsEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDTo {
    @IsEmail()
    userEmail: string
    @IsString()
    @MinLength(8)
    userPassword: string
    @IsOptional()
    @IsIn(["Admin", "Employee", "Manager"])
    userRoles: string[]
}
