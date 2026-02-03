import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async summary() {
    const monthlyOrders = await this.prisma.order.count();
    const topCustomers = await this.prisma.user.count();
    return { monthlyOrders, topCustomers };
  }

  async topMenuItems() {
    const items = await this.prisma.orderItem.groupBy({
      by: ['menuItemId'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    });
    const menu = await this.prisma.menuItem.findMany({
      where: { id: { in: items.map((i) => i.menuItemId) } },
    });
    return items.map((i) => ({
      menuItemId: i.menuItemId,
      name: menu.find((m) => m.id === i.menuItemId)?.name ?? 'Unknown',
      quantity: i._sum.quantity ?? 0,
    }));
  }

  async topCustomers() {
    const orders = await this.prisma.order.groupBy({
      by: ['userId'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 5,
    });
    const users = await this.prisma.user.findMany({
      where: { id: { in: orders.map((o) => o.userId) } },
    });
    return orders.map((o) => ({
      userId: o.userId,
      name: users.find((u) => u.id === o.userId)?.name ?? 'Unknown',
      orders: o._count.id,
    }));
  }
}
