import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Requer um email válido' })
  @IsNotEmpty({ message: 'O email não pode ser vazio' })
  @IsString()
  email: string;

  @ApiProperty()
  @MinLength(8, { message: 'A senha não pode ter menos do que 8 caracteres' })
  @IsNotEmpty()
  @IsString()
  password: string;
}           
