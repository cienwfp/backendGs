import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, IsNotEmpty, MinLength, IsNumber, IsOptional, IsBoolean, IsObject } from 'class-validator';
import * as bcrypt from 'bcrypt';

export class CreateUserDto {
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

  @ApiProperty({ required: true })
  @IsBoolean()
  status: boolean;

  @ApiProperty({ default: "user" })
  @IsNotEmpty({ message: 'O tipo de usuário é um campo obrigatório' })
  @IsString()
  roles: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'É obrigatório associar o usuário a uma unidade' })
  @IsNumber()
  orgao_id: number;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsObject()
  orgao_associado: object;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsBoolean()
  first_access: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  token_recuperar_password: string;

  createdBy: string;

  updatedBy: string;
}

