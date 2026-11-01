import {
  Body,
  Controller,
  Get,
  Headers,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('request-otp')
  requestOtp(@Body() body: { phone: string }) {
    return this.authService.requestOtp(body.phone);
  }

  @Post('verify-otp')
  verifyOtp(
    @Body() body: { phone: string; code: string },
  ) {
    return this.authService.verifyOtp(body.phone, body.code);
  }

  @Post('admin/telegram')
  adminTelegramLogin(@Body() body: { initData: string }) {
    return this.authService.adminTelegramLogin(body.initData);
  }

  @Post('telegram')
  telegramLogin(@Body() body: { initData: string }) {
    return this.authService.telegramLogin(body.initData);
  }

  @Get('profile')
  getProfile(
    @Headers('x-telegram-init-data') initData: string,
  ) {
    return this.authService.getProfile(initData);
  }

  @Patch('profile')
  updateProfile(
    @Headers('x-telegram-init-data') initData: string,
    @Body() body: any,
  ) {
    return this.authService.updateProfile(initData, body);
  }
}
