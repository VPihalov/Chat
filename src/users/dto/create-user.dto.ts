import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        description: `This is user login`,
        required: true
    })
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(10)
    username: string;
     
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(10)
    password: string;
}
