import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { BotOrJwtAdminGuard } from '../auth/guards/bot-or-jwt-admin.guard';
import { BotOrJwtCourierGuard } from '../auth/guards/bot-or-jwt-courier.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrdersService } from './orders.service';
import { UserRole } from '@prisma/client';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Req() req: any, @Body() dto: CreateOrderDto) {
    return this.orders.create(req.user.id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  listMine(@Req() req: any) {
    return this.orders.listForUser(req.user.id);
  }

  @UseGuards(BotOrJwtAdminGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Get('admin/new')
  listAdminNew() {
    return this.orders.listNewForAdmin();
  }

  @UseGuards(BotOrJwtCourierGuard, RolesGuard)
  @Roles(UserRole.COURIER)
  @Get('courier/new')
  async listCourierNew() {
    const orders = await this.orders.listNewForCourier();
    return orders.map((o) => ({
      id: o.id,
      address: o.address,
      phone: o.phone,
      itemsSummary: o.items.map((i) => `${i.menuItem.name} x${i.quantity}`).join(', '),
    }));
  }

  @UseGuards(BotOrJwtCourierGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.COURIER)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.orders.updateStatus(Number(id), dto.status);
  }
}
