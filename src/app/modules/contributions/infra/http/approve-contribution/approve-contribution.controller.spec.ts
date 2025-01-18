import { Test, TestingModule } from '@nestjs/testing';
import { ApproveContributionController } from './approve-contribution.controller';

describe('ApproveContributionController', () => {
  let controller: ApproveContributionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApproveContributionController],
    }).compile();

    controller = module.get<ApproveContributionController>(
      ApproveContributionController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
