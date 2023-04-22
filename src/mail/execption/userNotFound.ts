import { HttpStatus, HttpException } from "@nestjs/common";

export class UserNotFoundException extends HttpException {
    constructor(email: string) {
        super(`O email - ${email} - não encontrado`, HttpStatus.NOT_FOUND);
    }
}

export class PrismaExceptionExistUser extends HttpException {
    constructor(error: string) {
        super(`${error} já existe`, HttpStatus.BAD_REQUEST);
    }
}

export class Unauthorized extends HttpException {
    constructor() {
        super(`Operação não autorizada`, HttpStatus.BAD_REQUEST);
    }
}

export class PrismaExceptionDeleteNotRecord extends HttpException {
    constructor(error: string) {
        super(`${error}`, HttpStatus.BAD_REQUEST);
    }
}

