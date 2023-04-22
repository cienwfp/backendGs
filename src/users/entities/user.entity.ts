import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements User {
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty({ required: false })
    orgao_id: number;

    @ApiProperty({ required: false })
    orgao_associado: object;

    @ApiProperty()
    roles: string;

    @ApiProperty()
    first_access: boolean;

    @ApiProperty()
    token_recuperar_password: string;

    @ApiProperty()
    admin: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    createdBy: string;

    updatedBy: string;
}
