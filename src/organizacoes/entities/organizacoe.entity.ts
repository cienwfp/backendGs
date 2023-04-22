import { Orgao } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class OrganizacoesEntity implements Orgao {
    @ApiProperty()
    id: number;

    @ApiProperty()
    nome: string;

    @ApiProperty()
    sigla: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    createdBy: string;

    updatedBy: string;

}
