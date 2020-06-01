import { Test, TestingModule } from '@nestjs/testing';
import { RipsController } from './rips.controller';

describe('Rips Controller', () => {
  let controller: RipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RipsController],
    }).compile();

    controller = module.get<RipsController>(RipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
