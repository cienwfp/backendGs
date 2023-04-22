import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString, IsNotEmpty, IsNumber, IsOptional, IsObject } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    @IsEmail({}, { message: 'O email deve ser válido' })
    @IsNotEmpty({ message: 'O email é um campo obrigatório' })
    @IsString()
    email: string;

    @ApiProperty({ default: "user" })
    @IsNotEmpty({ message: 'O tipo de usuário é um campo obrigatório' })
    @IsString()
    roles: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'É obrigatório associar o usuário a uma unidade' })
    @IsNumber()
    orgao_id: number;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    @IsObject()
    orgao_associado: object;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    token_recuperar_password: string;

    updatedBy: string;
}
