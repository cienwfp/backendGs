import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MinLength, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class RecuperacaoPassDto {

  @MinLength(8, { message: 'A senha não pode ter menos do que 8 caracteres' })
  @IsNotEmpty({ message: 'A senha é um campo obrigatório' })
  @IsString()
  password: string;

  updatedBy: string;
}

function typeOf(res: string): any {
  throw new Error('Function not implemented.');
}

