import { Test, TestingModule } from '@nestjs/testing';
import { CreateUsecase } from './create';
import { IUserPersistency } from 'src/application/persistencies/user';
import { UserModel } from 'src/domain/models/user';

const mockPersistency: Partial<Record<keyof IUserPersistency, jest.Mock>> = {
  findByUsernameOrEmail: jest.fn(),
  create: jest.fn(),
};

describe('CreateUseCase', () => {
  let usecase: CreateUsecase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUsecase,
        {
          provide: IUserPersistency,
          useValue: mockPersistency,
        },
      ],
    }).compile();

    usecase = module.get<CreateUsecase>(CreateUsecase);
  });

  describe('execute', () => {
    it('should throw an exception when a user with the unique values already exists', async () => {
      const user1 = 'existing-username';

      mockPersistency.findByUsernameOrEmail?.mockReturnValueOnce(
        Promise.resolve([
          {
            username: user1,
          } as UserModel,
        ]),
      );

      const user2 = 'existing-email';
      mockPersistency.findByUsernameOrEmail?.mockReturnValueOnce(
        Promise.resolve([
          {
            email: user2,
          } as UserModel,
        ]),
      );

      await expect(() =>
        usecase.execute(<UserModel>{ username: user1 }),
      ).rejects.toThrow();

      await expect(() =>
        usecase.execute(<UserModel>{ email: user2 }),
      ).rejects.toThrow();
    });

    it('should persist the user if the properties are valid.', async () => {
      mockPersistency.findByUsernameOrEmail?.mockReturnValueOnce(
        Promise.resolve([]),
      );

      mockPersistency.create?.mockReturnValueOnce({} as UserModel);

      await usecase.execute(<UserModel>{});
      expect(mockPersistency.create).toHaveBeenCalled();
    });
  });
});
