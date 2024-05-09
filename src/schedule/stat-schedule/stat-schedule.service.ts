import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { StatService } from 'src/api/stat/stat.service';

//https://docs.nestjs.com/techniques/task-scheduling
/*
    * * * * * *
    | | | | | |
    | | | | | day of week
    | | | | months
    | | | day of month
    | | hours
    | minutes
    seconds (optional)
*/

@Injectable()
export class StatScheduleService {
    constructor(
        private readonly statService:StatService,
    ){}
    private readonly logger = new Logger(StatScheduleService.name);

    @Cron(CronExpression.EVERY_10_SECONDS)
    async handleCron() { 
        this.statService.create();
        this.logger.debug('Stats: ', await this.statService.getStats());
    }
}
