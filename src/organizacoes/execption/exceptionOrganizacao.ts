import { HttpStatus, HttpException } from "@nestjs/common";

export class OrganizacaoNotFoundException extends HttpException {
  constructor(sigla: string) {
    super(`Unidade - ${sigla}  - não encontrada`, HttpStatus.NOT_FOUND);
  }
}

export class PrismaExceptionExistOrganizacao extends HttpException {
  constructor(error: string) {
    super(`${error} já exite`, HttpStatus.BAD_REQUEST);
  }
}

export class PrismaExceptionDeleteNotRecord extends HttpException {
  constructor(error: string) {
    super(`${error}`, HttpStatus.BAD_REQUEST);
  }
}

