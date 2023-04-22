import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateOrganizacoeDto {

    @ApiProperty()
    @Transform(({ value }) => value.toUpperCase())
    @IsString({ message: 'O nome da unidade é obrigatório' })
    nome: string;

    @ApiProperty()
    @IsString({ message: 'O sigla da unidade é obrigatório' })
    @Transform(({ value }) => value.toUpperCase())
    sigla: string;

    createdBy: string;

    updatedBy: string;
}            
