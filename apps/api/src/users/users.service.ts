import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  getById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  updateProfile(id: number, data: { name?: string; address?: string }) {
    return this.prisma.user.update({ where: { id }, data });
  }

  listAll() {
    return this.prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async createUser(data: { name: string; phone: string; password: string; address?: string; role: string }) {
    const hash = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        name: data.name,
        phone: data.phone,
        address: data.address,
        passwordHash: hash,
        role: data.role as any,
      },
    });
  }
}
