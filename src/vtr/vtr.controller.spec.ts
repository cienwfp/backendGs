import { Test, TestingModule } from '@nestjs/testing';
import { VtrController } from './vtr.controller';
import { VtrService } from './vtr.service';

describe('VtrController', () => {
  let controller: VtrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VtrController],
      providers: [VtrService],
    }).compile();

    controller = module.get<VtrController>(VtrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
