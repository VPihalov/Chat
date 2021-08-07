import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

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
    @IsEmail()
    email: string;
}
