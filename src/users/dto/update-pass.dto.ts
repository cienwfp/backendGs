import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MinLength, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class ChangePassUserDto {
  @ApiProperty()
  @IsEmail({}, { message: 'O email deve ser válido' })
  @IsNotEmpty({ message: 'O email é um campo obrigatório' })
  @IsString()
  email: string;

  @ApiProperty()
  @MinLength(8, { message: 'A senha não pode ter menos do que 8 caracteres' })
  @IsNotEmpty({ message: 'A senha é um campo obrigatório' })
  @IsString()
  password: string;

  @ApiProperty()
  @MinLength(8, { message: 'A senha não pode ter menos do que 8 caracteres' })
  @IsNotEmpty({ message: 'A confirmacao é um campo obrigatório' })
  @IsString()
  passwordOld: string;
}

function typeOf(res: string): any {
  throw new Error('Function not implemented.');
}

