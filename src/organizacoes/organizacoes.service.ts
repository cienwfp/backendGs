import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrganizacoeDto } from './dto/create-organizacoe.dto';
import { UpdateOrganizacoeDto } from './dto/update-organizacoe.dto';

@Injectable()
export class OrganizacoesService {
  constructor(
    private prisma: PrismaService
  ) { }

  create(createOrganizacoeDto: CreateOrganizacoeDto) {
    const org = this.prisma.orgao.create({
      data: createOrganizacoeDto
    })
    return org;
  }

  findAll() {
    const orgs = this.prisma.orgao.findMany();
    return orgs;
  }

  findOne(sigla: string) {
    const org = this.prisma.orgao.findUnique({
      where: { sigla: sigla }
    })
    return org;
  }

  update(id: number, updateOrganizacoeDto: UpdateOrganizacoeDto) {
    console.log('id, updateOrganizacoeDto', id, updateOrganizacoeDto)
    const org = this.prisma.orgao.update({
      where: {
        id: Number(id)
      },
      data: updateOrganizacoeDto
    })
    return org;
  }

  remove(id: number) {
    const res = this.prisma.orgao.delete({
      where: { id: Number(id) }
    })
    return res;
  }
}
