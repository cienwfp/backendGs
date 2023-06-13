import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as dayjs from 'dayjs';
import { time } from 'console';

@Injectable()
export class DashboardService {
  constructor(
    private prisma: PrismaService
  ) { }

  async countVtr() {
    var res = []
    var countVtr = []
    var countSituacaoVtr = []
    var count = []
    var countUser = []
    var countRent = []
    var countJaVencido = []
    var vencidoArray = []
    var jaVencidoArray = []
    var countVencido = []

    res = await this.prisma.$queryRaw`
      SELECT "public"."Orgao"."sigla", COUNT("public"."Viatura"."orgao_id") as "count_vtr" 
      FROM "public"."Viatura", "public"."Orgao" 
      WHERE ("public"."Viatura"."orgao_id" = "public"."Orgao"."id" AND "public"."Viatura"."situacao_id" = 1 ) 
      GROUP BY "public"."Orgao"."sigla" 
      ORDER BY  "count_vtr" 
      DESC`
    res.map((el) => {
      var b = JSON.parse(JSON.stringify(el, (_, v) => typeof v === 'bigint' ? Number(v.toString()) : v))
      countVtr.push({ x: b.sigla, y: b.count_vtr })
      //a.push(b)
    })

    res = await this.prisma.$queryRaw`
      SELECT "public"."Situacao"."tipo", COUNT("public"."Viatura"."situacao_id") as "count_vtr" 
      FROM "public"."Viatura", "public"."Situacao" 
      WHERE ("public"."Viatura"."situacao_id" = "public"."Situacao"."id") 
      GROUP BY "public"."Situacao"."tipo" 
      ORDER BY  "count_vtr" 
      DESC`
    res.map((el) => {
      var b = JSON.parse(JSON.stringify(el, (_, v) => typeof v === 'bigint' ? Number(v.toString()) : v))
      countSituacaoVtr.push({ x: b.tipo, y: b.count_vtr })
      //a.push(b)
    })

    res = await this.prisma.$queryRaw`
    SELECT COUNT(*) as "count_vtr"
    FROM "public"."Viatura"
    WHERE ("public"."Viatura"."situacao_id" = 1)`

    res.map((el) => {
      var b = JSON.parse(JSON.stringify(el, (_, v) => typeof v === 'bigint' ? Number(v.toString()) : v))
      count.push({ x: 'vtr', y: b.count_vtr })
      //a.push(b)
    })

    res = await this.prisma.$queryRaw`
    SELECT COUNT(*) as "count_user" 
    FROM "public"."users"`

    res.map((el) => {
      var b = JSON.parse(JSON.stringify(el, (_, v) => typeof v === 'bigint' ? Number(v.toString()) : v))
      countUser.push({ x: 'users', y: b.count_user })
      //a.push(b)
    })

    res = await this.prisma.$queryRaw`
     SELECT COUNT(*) as "count_rent" 
    FROM "public"."Viatura"
    WHERE ("public"."Viatura"."locado" = true AND "public"."Viatura"."situacao_id" = 1)`

    res.map((el) => {
      var b = JSON.parse(JSON.stringify(el, (_, v) => typeof v === 'bigint' ? Number(v.toString()) : v))
      countRent.push({ x: 'rent', y: b.count_rent })
      //a.push(b)
    })

    const firstdate = dayjs().format("YYYY-MM-DD")
    const lastdate = dayjs().endOf('month').format("YYYY-MM-DD")

    console.log('first', new Date(dayjs().add(-1, 'day').add(3, 'hours').format("YYYY-MM-DDTHH:mm:ss")))

    const vencido = await this.prisma.viatura.findMany({
      select: {
        processo_vinculacao: true,
        placa_oficial: true,
        placa_atribuida: true,
        data_atribuicao: true,
        data_validade: true,
        orgao: {
          select: {
            sigla: true,
          }
        },
      },
      where: {
        AND: [
          {
            data_validade: {
              gt: new Date(firstdate),
              lte: new Date(lastdate)
            },
          },
          {
            situacao_id: 1
          }
        ]
      }
    })

    vencido.forEach((el => {
      vencidoArray.push({ ...el, status: "Vencendo" })
    }))

    const da = dayjs().add(-1, 'day').format("YYYY-MM-DD")
    const jaVencido = await this.prisma.viatura.findMany({
      select: {
        processo_vinculacao: true,
        placa_oficial: true,
        placa_atribuida: true,
        data_atribuicao: true,
        data_validade: true,
        orgao: {
          select: {
            sigla: true,
          }
        }
      },
      where: {
        AND: [
          {
            data_validade: {
              lte: new Date(new Date(dayjs().add(-1, 'day').add(3, 'hours').format("YYYY-MM-DDTHH:mm:ss")))
            }
          },
          {
            situacao_id: 1
          }
        ]
      }
    })

    jaVencido.forEach((el => {
      jaVencidoArray.push({ ...el, status: "Vencido" })
    }))

    res = await this.prisma.$queryRaw`
      SELECT "public"."Orgao"."sigla", COUNT("public"."Viatura"."orgao_id") as "count_vtr" 
          FROM "public"."Viatura", "public"."Orgao" 
          WHERE ("public"."Viatura"."orgao_id" = "public"."Orgao"."id" AND "public"."Viatura"."data_validade" < ${new Date(dayjs().add(-1, 'day').add(3, 'hours').format("YYYY-MM-DDTHH:mm:ss"))} AND "public"."Viatura"."situacao_id" = 1 )
          GROUP BY "public"."Orgao"."sigla" 
          ORDER BY  "count_vtr" 
          DESC`

    res.map((el) => {
      var b = JSON.parse(JSON.stringify(el, (_, v) => typeof v === 'bigint' ? Number(v.toString()) : v))
      countJaVencido.push({ x: b.sigla, y: b.count_vtr })
      //a.push(b)
    })

    res = await this.prisma.$queryRaw`
    SELECT "public"."Orgao"."sigla", COUNT("public"."Viatura"."orgao_id") as "count_vtr" 
        FROM "public"."Viatura", "public"."Orgao" 
        WHERE (
          "public"."Viatura"."orgao_id" = "public"."Orgao"."id" 
          AND ("public"."Viatura"."data_validade" > ${new Date(firstdate)} AND "public"."Viatura"."data_validade" < ${new Date(lastdate)} AND "public"."Viatura"."situacao_id" = 1) )
        GROUP BY "public"."Orgao"."sigla" 
        ORDER BY  "count_vtr" 
        DESC`

    res.map((el) => {
      var b = JSON.parse(JSON.stringify(el, (_, v) => typeof v === 'bigint' ? Number(v.toString()) : v))
      countVencido.push({ x: b.sigla, y: b.count_vtr })
      //a.push(b)
    })

    return {
      countVtr: countVtr,
      countSituacaoVtr: countSituacaoVtr,
      count: count,
      countUser: countUser,
      countRent: countRent,
      vencido: vencidoArray,
      jaVencido: jaVencidoArray,
      countJaVencido: countJaVencido,
      countVencido: countVencido
    };
  }

  async countSituacaoVtr() {
    var res = []
    var a = []
    res = await this.prisma.$queryRaw`
    SELECT "public"."Viatura"."situacao", COUNT("public"."Viatura"."situacao") as "count_vtr" 
    FROM "public"."Viatura"
    GROUP BY "public"."Viatura"."situacao" 
    ORDER BY  "count_vtr" 
    DESC`
    res.map((el) => {
      var b = JSON.parse(JSON.stringify(el, (_, v) => typeof v === 'bigint' ? Number(v.toString()) : v))
      a.push({ x: b.situacao, y: b.count_vtr })
      //a.push(b)
    })
    return a;
  }

}
