import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AnalyticsService } from './analytics.service';
import { UserRole } from '@prisma/client';
import { BotOrJwtAdminGuard } from '../auth/guards/bot-or-jwt-admin.guard';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analytics: AnalyticsService) {}

  @UseGuards(BotOrJwtAdminGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Get('summary')
  summary() {
    return this.analytics.summary();
  }

  @UseGuards(BotOrJwtAdminGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Get('top-menu')
  topMenu() {
    return this.analytics.topMenuItems();
  }

  @UseGuards(BotOrJwtAdminGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Get('top-customers')
  topCustomers() {
    return this.analytics.topCustomers();
  }
}
