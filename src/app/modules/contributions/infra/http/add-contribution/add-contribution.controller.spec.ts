import { Test, TestingModule } from '@nestjs/testing';
import { AddContributionController } from './add-contribution.controller';

describe('AddContributionController', () => {
  let controller: AddContributionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddContributionController],
    }).compile();

    controller = module.get<AddContributionController>(
      AddContributionController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
