import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVtrDto } from './dto/create-vtr.dto';
import { UpdateVtrDto } from './dto/update-vtr.dto';

@Injectable()
export class VtrService {
  constructor(
    private prima: PrismaService
  ) { }

  async create(createVtrDto: CreateVtrDto) {

    if (createVtrDto.placa_atribuida.length !== 0) {
      const verify = await this.prima.viatura.findFirst({
        where: {
          OR: [
            { placa_atribuida: createVtrDto.placa_oficial },
            { placa_atribuida: createVtrDto.placa_atribuida },
            { placa_oficial: createVtrDto.placa_atribuida }
          ]
        }
      })

      const verify1 = await this.prima.viatura.findFirst({
        where: {
          OR: [
            { placa_atribuida: createVtrDto.placa_oficial },
            { placa_oficial: createVtrDto.placa_atribuida }
          ]
        }
      })

      if (verify || verify1) {
        throw new Error('A placa já foi atribuida')
      }
    }
    const vtr = this.prima.viatura.create({
      data: {
        data_regsitro: createVtrDto.data_regsitro,
        processo_vinculacao: createVtrDto.processo_vinculacao,
        departamento: createVtrDto.departamento,
        nome: createVtrDto.nome,
        cpf: createVtrDto.cpf,
        marca: createVtrDto.marca,
        modelo: createVtrDto.modelo,
        cor: createVtrDto.cor,
        ano: createVtrDto.ano,
        chassi: createVtrDto.chassi,
        renavam: createVtrDto.renavam,
        placa_oficial: createVtrDto.placa_oficial,
        locado: createVtrDto.locado,
        data_fim_locacao: createVtrDto.data_fim_locacao,
        placa_atribuida: createVtrDto.placa_atribuida,
        data_atribuicao: createVtrDto.data_atribuicao,
        doerj_atribuicao: createVtrDto.doerj_atribuicao,
        data_validade: createVtrDto.data_validade,
        processo_revalidacao: createVtrDto.processo_revalidacao,
        data_expiracao: createVtrDto.data_expiracao,
        doerj_revalidacao: createVtrDto.doerj_revalidacao,
        processo_desvinculacao: createVtrDto.processo_desvinculacao,
        data_desvinculacao: createVtrDto.data_desvinculacao,
        doerj_desvinculacao: createVtrDto.doerj_desvinculacao,
        observacao: createVtrDto.observacao,
        orgao: {
          connect: {
            id: createVtrDto.orgao_id,
          }
        },
        situacao: {
          connect: {
            id: createVtrDto.situacao_id
          }
        },
        createdBy: createVtrDto.createdBy,
        updatedBy: createVtrDto.updatedBy
      },
    });
    return vtr;
  }

  findOnePlacaAtribuida(placa: string) {
    const vtr = this.prima.viatura.findFirst({
      where:
        { placa_oficial: placa }
      ,
      include: {
        situacao: true,
        orgao: true
      }
    })
    return vtr;
  }

  async update(id: number, updateVtrDto: UpdateVtrDto) {


    const vtrFind = await this.prima.viatura.findFirst({
      where: { id: Number(id) }
    })

    if (vtrFind.placa_oficial !== updateVtrDto.placa_oficial) {
      const verify = await this.prima.viatura.findFirst({
        where: {
          OR: [
            { placa_atribuida: updateVtrDto.placa_oficial },
            { placa_atribuida: updateVtrDto.placa_atribuida },
            { placa_oficial: updateVtrDto.placa_atribuida }
          ]
        }
      })

      const verify1 = await this.prima.viatura.findFirst({
        where: {
          OR: [
            { placa_atribuida: updateVtrDto.placa_oficial },
            { placa_oficial: updateVtrDto.placa_atribuida }
          ]
        }
      })

      if (verify || verify1) {
        throw new Error('A placa já foi atribuida')
      }
    }

    if (vtrFind.placa_atribuida !== updateVtrDto.placa_atribuida) {
      const verify = await this.prima.viatura.findFirst({
        where: {
          OR: [
            { placa_atribuida: updateVtrDto.placa_oficial },
            { placa_atribuida: updateVtrDto.placa_atribuida },
            { placa_oficial: updateVtrDto.placa_atribuida }
          ]
        }
      })

      const verify1 = await this.prima.viatura.findFirst({
        where: {
          OR: [
            { placa_atribuida: updateVtrDto.placa_oficial },
            { placa_oficial: updateVtrDto.placa_atribuida }
          ]
        }
      })

      if (verify || verify1) {
        throw new Error('A placa já foi atribuida')
      }
    }

    const vtr = this.prima.viatura.update({
      where: { id: Number(id) },
      data: {
        data_regsitro: updateVtrDto.data_regsitro,
        processo_vinculacao: updateVtrDto.processo_vinculacao,
        departamento: updateVtrDto.departamento,
        nome: updateVtrDto.nome,
        cpf: updateVtrDto.cpf,
        marca: updateVtrDto.marca,
        modelo: updateVtrDto.modelo,
        cor: updateVtrDto.cor,
        ano: updateVtrDto.ano,
        chassi: updateVtrDto.chassi,
        renavam: updateVtrDto.renavam,
        placa_oficial: updateVtrDto.placa_oficial,
        locado: updateVtrDto.locado,
        data_fim_locacao: updateVtrDto.data_fim_locacao,
        placa_atribuida: updateVtrDto.placa_atribuida,
        data_atribuicao: updateVtrDto.data_atribuicao,
        doerj_atribuicao: updateVtrDto.doerj_atribuicao,
        data_validade: updateVtrDto.data_validade,
        processo_revalidacao: updateVtrDto.processo_revalidacao,
        data_expiracao: updateVtrDto.data_expiracao,
        doerj_revalidacao: updateVtrDto.doerj_revalidacao,
        processo_desvinculacao: updateVtrDto.processo_desvinculacao,
        data_desvinculacao: updateVtrDto.data_desvinculacao,
        doerj_desvinculacao: updateVtrDto.doerj_desvinculacao,
        observacao: updateVtrDto.observacao,
        updatedBy: updateVtrDto.updatedBy,
        orgao: {
          connect: {
            id: updateVtrDto.orgao_id,
          }
        },
        situacao: {
          connect: {
            id: updateVtrDto.situacao_id
          }
        }
      },
      include: {
        situacao: true,
        orgao: true,
      }
    })
    return vtr;
  }

  remove(placa: string) {
    const vtr = this.prima.viatura.delete({
      where: { placa_oficial: placa }
    })
    return vtr;
  }

  //service for user roles type
  async findAllVtr(user: any) {
    if (user.role === 'admin' || user.role === 'analist') {
      const vtrs = await this.prima.viatura.findMany({
        include: {
          situacao: true,
          orgao: true
        }
      })
      return vtrs;
    } else {
      const usuario = await this.prima.user.findUnique({
        where: { email: user.email },
      })
      var orgao_associado = [0]
      orgao_associado = Object.values(usuario.orgao_associado)

      const vtrs = this.prima.viatura.findMany({
        where: {
          orgao_id: {
            in: orgao_associado
          }
        },
        include: {
          situacao: true,
          orgao: true,
        }
      })
      return vtrs;
    }
  }

  findAll() {
    const vtrs = this.prima.viatura.findMany({
      include: {
        situacao: true,
        orgao: true
      }
    })
    return vtrs;
  }

  findAllSituacao() {
    const situacao = this.prima.situacao.findMany()
    return situacao;
  }

}
