import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret === 'malina-dev-secret') {
      throw new UnauthorizedException('Admin xavfsizlik kaliti sozlanmagan');
    }

    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization || '';
    const token = authorization.startsWith('Bearer ')
      ? authorization.slice(7)
      : '';

    if (!token) {
      throw new UnauthorizedException('Admin token talab qilinadi');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret });
      if (payload.role !== 'admin' || !payload.sub) {
        throw new Error('Admin huquqi yo‘q');
      }
      request.admin = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Admin token noto‘g‘ri yoki eskirgan');
    }
  }
}
