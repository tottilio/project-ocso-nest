import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString, MaxLength } from "class-validator";

export class CreateRegionDto {
    @ApiProperty({
        default: "Queretaro"
    })
    @IsString()
    @MaxLength(100)
    regionName: string;
    @ApiProperty({
        default: ["Queretaro", "Mexico", "Oaxaca"]
    })
    @IsArray()
    regionStates: string[];
}
