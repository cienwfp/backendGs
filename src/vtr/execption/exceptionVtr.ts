import { HttpStatus, HttpException } from "@nestjs/common";

export class VtrNotFoundException extends HttpException {
  constructor(placa: string) {
    super(`${placa} não encontrada`, HttpStatus.NOT_FOUND);
  }
}

export class PrismaExceptionExistVtr extends HttpException {
  constructor(error: string) {
    super(`${error} já exite`, HttpStatus.BAD_REQUEST);
  }
}

export class PrismaExceptionDeleteNotRecord extends HttpException {
  constructor(error: string) {
    super(`${error}`, HttpStatus.BAD_REQUEST);
  }
}

export class PrismaExceptionGenerec extends HttpException {
  constructor() {
    super(`Erro na atualização. Entre em contado com o administrado`, HttpStatus.BAD_REQUEST);
  }
}

