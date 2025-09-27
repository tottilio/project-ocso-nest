import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";
import { Provider } from "../entities/provider.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProviderDto {
    @ApiProperty({
        default: "Coca-cola"
    })
    @IsString()
    @MaxLength(100)
    providerName: string;
    @ApiProperty({
        default: "cocaCola@gmail.com"
    })
    @IsEmail()
    @IsString()
    providerEmail: string;
    @ApiProperty({
        default:"123456789"
    })
    @IsString()
    @MaxLength(15)
    @IsOptional()
    providerPhoneNumber: string;
}
