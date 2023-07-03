import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

const prisma = new PrismaClient()

async function main() {
  const org = await prisma.orgao.upsert({
    where: { sigla: 'ORG' },
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

  situacao = await prisma.situacao.upsert({
    where: { id: 1 },
    update: {},
    create: {
      tipo: "ATIVO"
    }
  })
  console.log(`O tipo ${situacao.tipo} foi criada na tabela situacao`)

  situacao = await prisma.situacao.upsert({
    where: { id: 2 },
    update: {},
    create: { tipo: "DESTRUIDA" }
  })
  console.log(`O tipo ${situacao.tipo} foi criada na tabela situacao`)

  situacao = await prisma.situacao.upsert({
    where: { id: 3 },
    update: {},
    create: { tipo: "DESVINCULADA" }
  })
  console.log(`O tipo ${situacao.tipo} foi criada na tabela situacao`)

  situacao = await prisma.situacao.upsert({
    where: { id: 4 },
    update: {},
    create: { tipo: "EM PROCESSAMENTO" }
  })
  console.log(`O tipo ${situacao.tipo} foi criada na tabela situacao`)

  situacao = await prisma.situacao.upsert({
    where: { id: 5 },
    update: {},
    create: { tipo: "INDEFERIDO" }
  })
  console.log(`O tipo ${situacao.tipo} foi criada na tabela situacao`)
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