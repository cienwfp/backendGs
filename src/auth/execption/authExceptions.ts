import { HttpStatus, HttpException } from "@nestjs/common";

export class UserNotFoundException extends HttpException {
    constructor(email: string) {
        super(`o Email - ${email} - não foi encontrado`, HttpStatus.NOT_FOUND);
    }
}

export class UnauthorizedException extends HttpException {
    constructor() {
        super(`Senha não confere`, HttpStatus.UNAUTHORIZED);
    }
}

