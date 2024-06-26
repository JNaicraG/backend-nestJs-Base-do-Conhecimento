import { Controller, Get, Post } from '@nestjs/common';
import { StatService } from './stat.service';

@Controller('stats')
export class StatController {
  constructor(private readonly statService: StatService) {}

  @Get()
  findAll(){
    return this.statService.getStats();
  }

  //@Post() //proósitos de teste, somente. Será usado o service somente no scheduler.
  //create(){
  //  return this.statService.create();
  //}
}
