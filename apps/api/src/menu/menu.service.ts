import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  listPublic() {
    return this.prisma.menuItem.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' } });
  }

  listAll() {
    return this.prisma.menuItem.findMany({ orderBy: { createdAt: 'desc' } });
  }

  create(data: CreateMenuItemDto) {
    return this.prisma.menuItem.create({ data });
  }

  update(id: number, data: UpdateMenuItemDto) {
    return this.prisma.menuItem.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.menuItem.delete({ where: { id } });
  }
}
