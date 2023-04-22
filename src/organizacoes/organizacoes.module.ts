import { Module } from '@nestjs/common';
import { OrganizacoesService } from './organizacoes.service';
import { OrganizacoesController } from './organizacoes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  controllers: [OrganizacoesController],
  providers: [OrganizacoesService],
  imports: [PrismaModule],
})
export class OrganizacoesModule { }
