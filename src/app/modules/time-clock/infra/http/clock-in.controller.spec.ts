import { Test, TestingModule } from '@nestjs/testing';
import { ClockInController } from '../../../clock-in/clock-in.controller';

describe('ClockInController', () => {
  let controller: ClockInController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClockInController],
    }).compile();

    controller = module.get<ClockInController>(ClockInController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
