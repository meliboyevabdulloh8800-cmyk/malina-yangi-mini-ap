import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private otpStore = new Map<
    string,
    { hash: string; expiresAt: number }
  >();

  constructor(private jwtService: JwtService) {}

  async requestOtp(phone: string) {
    const code = String(
      Math.floor(100000 + Math.random() * 900000),
    );

    const hash = await bcrypt.hash(code, 10);

    this.otpStore.set(phone, {
      hash,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    // Hozircha test rejimi: SMS o‘rniga kod qaytariladi.
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
}