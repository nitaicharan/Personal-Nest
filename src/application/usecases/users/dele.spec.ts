import { Test, TestingModule } from '@nestjs/testing';
import { IUserPersistency } from 'src/application/persistencies/user';
import { DeleteUsecase } from './delete';

describe('DeleteUsecase', () => {
  describe('execute', () => {
    const mockPersistency: Partial<Record<keyof IUserPersistency, jest.Mock>> =
      {
        find: jest.fn(),
        delete: jest.fn(),
      };
    let usecase: DeleteUsecase;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          DeleteUsecase,
          {
            provide: IUserPersistency,
            useValue: mockPersistency,
          },
        ],
      }).compile();

      usecase = module.get(DeleteUsecase);
    });

    it(`should throw exception in case user doesn't existe`, async () => {
      mockPersistency.find?.mockResolvedValue(null);
      await expect(() => usecase.execute('')).rejects.toThrow();

      expect(mockPersistency.find).toHaveBeenCalled();
    });

    it(`should delete saved user in case it exists`, async () => {
      mockPersistency.find?.mockResolvedValue({});

      await usecase.execute('');
      expect(mockPersistency.delete).toHaveBeenCalled();
    });
  });
});
