import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private prima: PrismaService
  ) { }

  create(createUserDto: CreateUserDto) {
    const user = this.prima.user.create({
      data: createUserDto,
    })
    return user;
  }

  findAll() {
    const users = this.prima.user.findMany({
      select: {
        id: true,
        email: true,
        roles: true,
        createdAt: true,
        updatedAt: true,
        orgao_associado: true,
        status: true,
        orgao: {
          select: {
            id: true,
            nome: true,
            sigla: true
          }
        }
      },
    });
    return users;
  }

  findOne(email: string) {
    const user = this.prima.user.findUnique({
      where: {
        email: email,
      },
      include: {
        orgao: true
      }
    })
    return user;
  }

  update(email: string, updateUserDto: UpdateUserDto) {
    const user = this.prima.user.update({
      where: { email: email },
      data: updateUserDto
    })
    return user;
  }

  updatePass(email: string, password: string, updatedBy: string) {
    const user = this.prima.user.update({
      where: { email: email },
      data: {
        password: password,
        updatedBy: updatedBy
      }
    })
    return user;
  }

  async remove(email: string) {
    const res = this.prima.user.delete({
      where: { email: email }
    })
    return res
  }
}
