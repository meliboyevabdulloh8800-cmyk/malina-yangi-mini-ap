import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

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

  @Get('admin/overview')
  overview() {
    return this.service.counts();
  }
}
