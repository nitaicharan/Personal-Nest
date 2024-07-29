import { Test, TestingModule } from '@nestjs/testing';
import { ListUsecase } from './list';
import { IUserPersistency } from 'src/application/persistencies/user';

const mockPersistency: Partial<Record<keyof IUserPersistency, jest.Mock>> = {
  list: jest.fn(),
};

describe('ListUsecase', () => {
  describe('execute', () => {
    let usecase: ListUsecase;
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          ListUsecase,
          {
            provide: IUserPersistency,
            useValue: mockPersistency,
          },
        ],
      }).compile();

      usecase = module.get<ListUsecase>(ListUsecase);
    });

    it('should retrieve users', async () => {
      mockPersistency.list?.mockResolvedValue([]);

      await usecase.execute(expect.anything());
      expect(mockPersistency.list).toHaveBeenCalled();
    });
  });
});
