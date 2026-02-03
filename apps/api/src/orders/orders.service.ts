import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateOrderDto) {
    const menuItems = await this.prisma.menuItem.findMany({
      where: { id: { in: dto.items.map((i) => i.menuItemId) } },
    });
    const priceMap = new Map(menuItems.map((m) => [m.id, m.price]));
    const total = dto.items.reduce((sum, item) => sum + (priceMap.get(item.menuItemId) ?? 0) * item.quantity, 0);

    return this.prisma.order.create({
      data: {
        userId,
        status: 'NEW',
        total,
        address: dto.address,
        phone: dto.phone,
        items: {
          create: dto.items.map((i) => ({ menuItemId: i.menuItemId, quantity: i.quantity })),
        },
      },
      include: { items: true },
    });
  }

  listForUser(userId: number) {
    return this.prisma.order.findMany({ where: { userId }, include: { items: true }, orderBy: { createdAt: 'desc' } });
  }

  listNewForAdmin() {
    return this.prisma.order.findMany({ where: { status: 'NEW' }, orderBy: { createdAt: 'desc' } });
  }

  listNewForCourier() {
    return this.prisma.order.findMany({
      where: { status: { in: ['NEW', 'PREPARING', 'SHIPPED'] } },
      include: { items: { include: { menuItem: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(id: number, status: OrderStatus) {
    return this.prisma.order.update({ where: { id }, data: { status } });
  }
}
