import { Test, TestingModule } from '@nestjs/testing';
import { ClockOutController } from '../clock-out.controller';

describe('ClockOutController', () => {
  let controller: ClockOutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClockOutController],
    }).compile();

    controller = module.get<ClockOutController>(ClockOutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
