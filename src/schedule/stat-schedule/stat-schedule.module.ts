import { Module } from '@nestjs/common';
import { StatScheduleService } from './stat-schedule.service';
import { StatModule } from 'src/api/stat/stat.module';

@Module({
  imports:[StatModule],
  providers: [StatScheduleService],
  exports:[StatScheduleService]
})
export class StatScheduleModule {}
