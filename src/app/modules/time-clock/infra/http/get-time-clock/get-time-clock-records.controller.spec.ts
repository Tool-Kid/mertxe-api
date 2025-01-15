import { Test, TestingModule } from '@nestjs/testing';
import { GetTimeClockRecordsController } from './get-time-clock-records.controller';

describe('GetTimeClockRecordsController', () => {
  let controller: GetTimeClockRecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetTimeClockRecordsController],
    }).compile();

    controller = module.get<GetTimeClockRecordsController>(
      GetTimeClockRecordsController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
