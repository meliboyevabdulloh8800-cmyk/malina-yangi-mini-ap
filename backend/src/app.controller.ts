import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AdminGuard } from './auth/admin.guard';

@Controller()
export class AppController {
  constructor(private service: AppService) {}

  @Get('health')
  health() {
    return this.service.health();
  }

  @Get('profiles')
  profiles() {
    return this.service.profiles();
  }

  @UseGuards(AdminGuard)
  @Get('admin/overview')
  overview() {
    return this.service.counts();
  }
}
