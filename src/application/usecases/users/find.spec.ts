import { Test, TestingModule } from '@nestjs/testing';
import { FindUsecase } from './find';
import { IUserPersistency } from 'src/application/persistencies/user';
import { UserModel } from 'src/domain/models/user';

describe('FindUsecase', () => {
  describe('execute', () => {
    const mockPersistency: Partial<Record<keyof IUserPersistency, jest.Mock>> =
      {
        find: jest.fn(),
      };
    let usecase: FindUsecase;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          FindUsecase,
          {
            provide: IUserPersistency,
            useValue: mockPersistency,
          },
        ],
      }).compile();

      usecase = module.get(FindUsecase);
    });

    it(`should throw exception in case user doesn't existe`, async () => {
      mockPersistency.find?.mockResolvedValue(null);
      await expect(() => usecase.execute('')).rejects.toThrow();

      expect(mockPersistency.find).toHaveBeenCalled();
    });

    it(`should return saved user in case it exists`, async () => {
      const id = 'user-id';
      mockPersistency.find?.mockResolvedValue({ id } as UserModel);

      const model = await usecase.execute(id);
      expect(model.id).toEqual(id);
    });
  });
});
