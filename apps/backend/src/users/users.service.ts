import { Injectable, NotFoundException } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<UserModel> {
    return this.prisma.user.create({ data });
  }

  async findAll(): Promise<UserModel[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<UserModel> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, data: UpdateUserDto): Promise<UserModel> {
    await this.findOne(id); 
    return this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: number): Promise<UserModel> {
    await this.findOne(id); 
    return this.prisma.user.delete({ where: { id } });
  }
}
