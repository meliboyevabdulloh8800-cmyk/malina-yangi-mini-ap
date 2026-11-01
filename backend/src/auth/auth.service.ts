import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { verifyTelegramInitData } from '../auth.telegram';

@Injectable()
export class AuthService {
  private otpStore = new Map<
    string,
    { hash: string; expiresAt: number }
  >();

  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async requestOtp(phone: string) {
    const code = String(
      Math.floor(100000 + Math.random() * 900000),
    );
    const hash = await bcrypt.hash(code, 10);

    this.otpStore.set(phone, {
      hash,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    return {
      message: 'Tasdiqlash kodi yaratildi',
      devCode: code,
    };
  }

  async verifyOtp(phone: string, code: string) {
    const record = this.otpStore.get(phone);

    if (!record || Date.now() > record.expiresAt) {
      throw new UnauthorizedException(
        'Kod eskirgan yoki mavjud emas',
      );
    }

    const isValid = await bcrypt.compare(code, record.hash);

    if (!isValid) {
      throw new UnauthorizedException('Kod noto‘g‘ri');
    }

    this.otpStore.delete(phone);

    const accessToken = await this.jwtService.signAsync({
      sub: phone,
      phone,
    });

    return {
      message: 'Telefon raqami tasdiqlandi',
      accessToken,
    };
  }

  private getTelegramUser(initData: string) {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    if (!botToken || !verifyTelegramInitData(initData, botToken)) {
      throw new UnauthorizedException(
        'Telegram tasdiqlash ma’lumoti noto‘g‘ri yoki eskirgan',
      );
    }

    const params = new URLSearchParams(initData);
    const rawUser = params.get('user');

    if (!rawUser) {
      throw new UnauthorizedException(
        'Telegram foydalanuvchi ma’lumoti topilmadi',
      );
    }

    try {
      const user = JSON.parse(rawUser);

      if (!user.id || !user.first_name) {
        throw new Error('Telegram user ma’lumoti to‘liq emas');
      }

      return {
        id: String(user.id),
        firstName: String(user.first_name).slice(0, 100),
        lastName: user.last_name
          ? String(user.last_name).slice(0, 100)
          : null,
      };
    } catch {
      throw new UnauthorizedException(
        'Telegram foydalanuvchi ma’lumotini o‘qib bo‘lmadi',
      );
    }
  }

  async adminTelegramLogin(initData: string) {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret === 'malina-dev-secret') {
      throw new ForbiddenException('Admin xavfsizlik kaliti serverda sozlanmagan');
    }

    const telegramUser = this.getTelegramUser(initData);
    const allowedIds = (process.env.ADMIN_TELEGRAM_IDS || '')
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean);

    if (!allowedIds.includes(telegramUser.id)) {
      throw new ForbiddenException('Bu Telegram akkauntga admin ruxsati berilmagan');
    }

    const accessToken = await this.jwtService.signAsync(
      { sub: telegramUser.id, role: 'admin' },
      { secret, expiresIn: '8h' },
    );

    return {
      message: 'Admin tasdiqlandi',
      accessToken,
      admin: {
        telegramId: telegramUser.id,
        firstName: telegramUser.firstName,
      },
    };
  }

  async telegramLogin(initData: string) {
    const telegramUser = this.getTelegramUser(initData);

    const user = await this.prisma.user.upsert({
      where: { telegramId: telegramUser.id },
      create: {
        telegramId: telegramUser.id,
        firstName: telegramUser.firstName,
        lastName: telegramUser.lastName,
        status: 'PENDING',
      },
      update: {},
      select: {
        id: true,
        telegramId: true,
        firstName: true,
        lastName: true,
        birthDate: true,
        gender: true,
        bio: true,
        city: true,
        country: true,
        interests: true,
        status: true,
        isVerified: true,
        photos: {
          orderBy: { position: 'asc' },
          select: {
            id: true,
            url: true,
            position: true,
            approved: true,
          },
        },
      },
    });

    if (user.status === 'BLOCKED' || user.status === 'DELETED') {
      throw new ForbiddenException('Ushbu profil foydalanish uchun yopilgan');
    }

    return { user };
  }

  async getProfile(initData: string) {
    const telegramUser = this.getTelegramUser(initData);

    const user = await this.prisma.user.findUnique({
      where: { telegramId: telegramUser.id },
      select: {
        id: true,
        telegramId: true,
        firstName: true,
        lastName: true,
        birthDate: true,
        gender: true,
        bio: true,
        city: true,
        country: true,
        interests: true,
        status: true,
        isVerified: true,
        photos: {
          orderBy: { position: 'asc' },
          select: {
            id: true,
            url: true,
            position: true,
            approved: true,
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Avval Telegram orqali tizimga kiring',
      );
    }

    return { user };
  }

  async updateProfile(initData: string, body: any) {
    const telegramUser = this.getTelegramUser(initData);

    const existing = await this.prisma.user.findUnique({
      where: { telegramId: telegramUser.id },
      select: { id: true, status: true },
    });

    if (!existing) {
      throw new UnauthorizedException(
        'Avval Telegram orqali tizimga kiring',
      );
    }

    if (existing.status === 'BLOCKED' || existing.status === 'DELETED') {
      throw new ForbiddenException('Ushbu profil tahrirlash uchun yopilgan');
    }

    const data: any = {};

    if (typeof body.firstName === 'string') {
      data.firstName = body.firstName.trim().slice(0, 100);
    }

    if (typeof body.lastName === 'string') {
      data.lastName = body.lastName.trim().slice(0, 100) || null;
    }

    if (typeof body.bio === 'string') {
      data.bio = body.bio.trim().slice(0, 500);
    }

    if (typeof body.city === 'string') {
      data.city = body.city.trim().slice(0, 100);
    }

    if (typeof body.country === 'string') {
      data.country = body.country.trim().slice(0, 100);
    }

    if (body.birthDate === null || body.birthDate === '') {
      data.birthDate = null;
    } else if (typeof body.birthDate === 'string') {
      const date = new Date(body.birthDate);

      if (Number.isNaN(date.getTime())) {
        throw new UnauthorizedException('Tug‘ilgan sana noto‘g‘ri');
      }

      data.birthDate = date;
    }

    if (['WOMAN', 'MAN', 'OTHER'].includes(body.gender)) {
      data.gender = body.gender;
    }

    if (
      Array.isArray(body.interests) &&
      body.interests.length <= 30 &&
      body.interests.every(
        (item: unknown) => typeof item === 'string',
      )
    ) {
      data.interests = body.interests
        .map((item: string) => item.trim().slice(0, 50))
        .filter(Boolean);
    }

    const user = await this.prisma.user.update({
      where: { id: existing.id },
      data,
      select: {
        id: true,
        telegramId: true,
        firstName: true,
        lastName: true,
        birthDate: true,
        gender: true,
        bio: true,
        city: true,
        country: true,
        interests: true,
        status: true,
        isVerified: true,
        photos: {
          orderBy: { position: 'asc' },
          select: {
            id: true,
            url: true,
            position: true,
            approved: true,
          },
        },
      },
    });

    return { user };
  }
}
