import { HttpStatus, HttpException } from "@nestjs/common";

export class UserNotFoundException extends HttpException {
    constructor(email: string) {
        super(`O Email - ${email} - não foi encontrado`, HttpStatus.NOT_FOUND);
    }
}

export class UserUnauthorizedException extends HttpException {
    constructor(email: string) {
        super(`O Email - ${email} - não está inativo. Entre em contato com o GSI`, HttpStatus.UNAUTHORIZED);
    }
}

export class UnauthorizedException extends HttpException {
    constructor() {
        super(`Senha não confere`, HttpStatus.UNAUTHORIZED);
    }
}

