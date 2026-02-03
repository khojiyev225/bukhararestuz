import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationStatus } from '@prisma/client';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  create(userId: number, dto: CreateReservationDto) {
    return this.prisma.reservation.create({
      data: {
        userId,
        date: dto.date,
        time: dto.time,
        people: dto.people,
      },
    });
  }

  listForUser(userId: number) {
    return this.prisma.reservation.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  }

  listAll() {
    return this.prisma.reservation.findMany({ orderBy: { createdAt: 'desc' } });
  }

  updateStatus(id: number, status: ReservationStatus) {
    return this.prisma.reservation.update({ where: { id }, data: { status } });
  }
}
