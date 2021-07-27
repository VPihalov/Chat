import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(10)
    username: string;
     
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(10)
    password: string;
}
