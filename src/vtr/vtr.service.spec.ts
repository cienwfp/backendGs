import { Test, TestingModule } from '@nestjs/testing';
import { VtrService } from './vtr.service';

describe('VtrService', () => {
  let service: VtrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VtrService],
    }).compile();

    service = module.get<VtrService>(VtrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
