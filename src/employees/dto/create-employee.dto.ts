import { IsEmail, IsObject, IsOptional, IsString, IsUUID, MaxLength } from "class-validator"
import { Employee } from "../entities/employee.entity"
import { Location } from "src/locations/entities/location.entity"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class CreateEmployeeDto extends Employee {
    @ApiProperty()
    @IsUUID("4")
    @IsOptional()
    declare employeeId: string

    @ApiProperty()
    @MaxLength(20)
    @IsString()
    declare employeeName: string

    @ApiProperty()
    @MaxLength(70)
    @IsString()
    declare employeeLastName: string

    @ApiProperty()
    @MaxLength(10)
    @IsString()
    declare employeePhoneNumber: string

    @ApiProperty()
    @IsString()
    @IsEmail()
    declare employeeEmail: string
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsObject()
    declare location: Location
}
