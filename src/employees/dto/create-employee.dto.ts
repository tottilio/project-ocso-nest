import { IsEmail, IsObject, IsOptional, IsString, IsUUID, MaxLength } from "class-validator"
import { Employee } from "../entities/employee.entity"
import { Location } from "src/locations/entities/location.entity"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class CreateEmployeeDto extends Employee {
    @ApiPropertyOptional({
        default: "UUID"
    })
    @IsUUID("4")
    @IsOptional()
    declare employeeId: string

    @ApiProperty({
        default: "EmployeeName"
    })
    @MaxLength(20)
    @IsString()
    declare employeeName: string

    @ApiProperty({
        default: "LastNameEmployee"
    })
    @MaxLength(70)
    @IsString()
    declare employeeLastName: string

    @ApiProperty({
        default: "123454458"
    })
    @MaxLength(10)
    @IsString()
    declare employeePhoneNumber: string

    @ApiProperty({
        default: "employee@corre.com"
    })
    @IsString()
    @IsEmail()
    declare employeeEmail: string
    
    @ApiPropertyOptional({
        default: "location"
    })
    @IsOptional()
    @IsObject()
    declare location: Location
}
