import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BotOrJwtAdminGuard extends AuthGuard('jwt') {
  constructor(private config: ConfigService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const botKey = this.config.get<string>('BOT_API_KEY');
    const header = request.headers['x-bot-key'];
    if (botKey && header === botKey) {
      request.user = { id: 0, role: 'ADMIN', phone: 'bot' };
      return true;
    }
    return (await super.canActivate(context)) as boolean;
  }
}
