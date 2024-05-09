import { Test, TestingModule } from '@nestjs/testing';
import { StatScheduleService } from './stat-schedule.service';

describe('StatScheduleService', () => {
  let service: StatScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatScheduleService],
    }).compile();

    service = module.get<StatScheduleService>(StatScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
