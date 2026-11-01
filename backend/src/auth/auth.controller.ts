import { Body, Controller, Post } from '@nestjs/common';
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
}