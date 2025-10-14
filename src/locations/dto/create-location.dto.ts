import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsObject, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { Region } from "src/regions/entities/region.entity";

export class CreateLocationDto {
    @ApiProperty({
        default: "juriquilla"
    })
    @IsString()
    @MaxLength(35)
    locationName: string;
    @ApiProperty({
        default:"Av juanG calle 231"
    })
    @IsString()
    @MaxLength(160)
    locationAdress: string;
    @ApiProperty({
        default: [2,4]
    })
    @IsArray()
    locationLatLng: number[];
    @ApiProperty({
        default: "region"
    })
    @IsObject()
    @IsOptional()
    region: Region;
    @IsUUID()
    @IsOptional()
    manager: string
}
