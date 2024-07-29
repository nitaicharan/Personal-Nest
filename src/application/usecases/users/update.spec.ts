import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUsecase } from './update';
import { IUserPersistency } from 'src/application/persistencies/user';
import { UserModel } from 'src/domain/models/user';

const mockPersistency: Partial<Record<keyof IUserPersistency, jest.Mock>> = {
  find: jest.fn(),
  findByUsernameOrEmail: jest.fn(),
  update: jest.fn(),
};

describe('UpdateUsecase', () => {
  describe('execut', () => {
    let usecase: UpdateUsecase;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UpdateUsecase,
          {
            provide: IUserPersistency,
            useValue: mockPersistency,
          },
        ],
      }).compile();

      usecase = module.get(UpdateUsecase);
    });

    it('should throw exception if user does not exist', async () => {
      const id = 'user-id';
      mockPersistency.find?.mockResolvedValue(null);

      await expect(() => usecase.execute(id, {})).rejects.toThrow();
      expect(mockPersistency.find).toHaveBeenCalledWith(id);
    });
    it('should throw exception if another user exists with the same email or username', async () => {
      const id = 'check-id';
      const username = 'johndoe';
      const email = 'johndoe@test.com';

      mockPersistency.find?.mockResolvedValue({ id });
      mockPersistency.findByUsernameOrEmail?.mockResolvedValue([
        <UserModel>{ id: 'different-id', username, email: 'another' },
        <UserModel>{ id: 'another-different-id', username: 'another', email },
      ]);

      await expect(() => usecase.execute(id, {})).rejects.toThrow();
    });

    it('should persist user after all validations', async () => {
      const id = 'johndoe-id';
      const username = 'change-username';

      mockPersistency.find?.mockResolvedValue({
        id,
        irrelevant: 'value',
      });
      mockPersistency.findByUsernameOrEmail?.mockResolvedValue([]);

      await usecase.execute(id, { username });
      expect(mockPersistency.update).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ username }),
      );
    });
  });
});
