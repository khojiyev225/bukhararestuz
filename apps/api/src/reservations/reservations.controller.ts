import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { BotOrJwtAdminGuard } from '../auth/guards/bot-or-jwt-admin.guard';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationStatusDto } from './dto/update-reservation-status.dto';
import { UserRole } from '@prisma/client';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservations: ReservationsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Req() req: any, @Body() dto: CreateReservationDto) {
    return this.reservations.create(req.user.id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  listMine(@Req() req: any) {
    return this.reservations.listForUser(req.user.id);
  }

  @UseGuards(BotOrJwtAdminGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Get('admin')
  listAll() {
    return this.reservations.listAll();
  }

  @UseGuards(BotOrJwtAdminGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateReservationStatusDto) {
    return this.reservations.updateStatus(Number(id), dto.status);
  }
}
