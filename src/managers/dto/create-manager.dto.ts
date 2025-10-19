import { IsEmail, IsNumber, IsObject, IsOptional, IsString, Max, MaxLength } from "class-validator";
import { Manager } from "../entities/manager.entity";
import { Location } from "src/locations/entities/location.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateManagerDto {
    @ApiProperty({
        default: "Rodrigo"
    })
    @IsString()
    @MaxLength(100)
    managerFullName: string;
    @ApiProperty({
        default: "manager@correo.com"
    })
    @IsString()
    @IsEmail()
    managerEmail: string;
    @ApiProperty({
        default: 30000
    })
    @IsNumber()
    managerSalary: number;
    @ApiProperty({
        default: "1234566789"
    })
    @IsString()
    @MaxLength(16)
    managerPhoneNumber: string;
    @ApiProperty({
        default: "location"
    })
    @IsNumber()
    @IsOptional()
    location: Location;
}
