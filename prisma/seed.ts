import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

const prisma = new PrismaClient()

async function main() {
  const org = await prisma.orgao.upsert({
    where: { nome: 'ORGANIZACAO' },
    update: {},
    create: {
      nome: 'ORGANIZACAO',
      sigla: 'ORG',
      createdBy: process.env.USER_ADMIN,
      updatedBy: process.env.USER_ADMIN
    }
  })

  console.log('Organização primária criada', org)

  const admin = await prisma.user.upsert({
    where: { email: process.env.USER_ADMIN },
    update: {},
    create: {
      email: process.env.USER_ADMIN,
      password: await bcrypt.hash(process.env.PASS_ADMIN, 10),
      roles: 'admin',
      first_access: false,
      orgao: {
        connect: {
          id: org.id
        }
      },
      createdBy: process.env.USER_ADMIN,
      updatedBy: process.env.USER_ADMIN
    },
  })
  console.log('Usuário admin criado', admin)

  var situacao: any = {}

  situacao = await prisma.situacao.create({
    data: { tipo: "ATIVA" }
  })
  console.log(`O tipo ${situacao.tipo} foi criada na tabaela situacao`)

  situacao = await prisma.situacao.create({
    data: { tipo: "DESTRUIDA" }
  })
  console.log(`O tipo ${situacao.tipo} foi criada na tabaela situacao`)

  situacao = await prisma.situacao.create({
    data: { tipo: "DESVINCULADA" }
  })
  console.log(`O tipo ${situacao.tipo} foi criada na tabaela situacao`)

  situacao = await prisma.situacao.create({
    data: { tipo: "EM PROCESSAMENTO" }
  })
  console.log(`O tipo ${situacao.tipo} foi criada na tabaela situacao`)

  situacao = await prisma.situacao.create({
    data: { tipo: "INDEFERIDO" }
  })
  console.log(`O tipo ${situacao.tipo} foi criada na tabaela situacao`)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })