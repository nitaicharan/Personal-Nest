import { ArticleController } from './article.controller';
import { Test } from '@nestjs/testing';

describe('ArticleController', () => {
  let controller: ArticleController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ArticleController],
    }).compile();

    controller = module.get<ArticleController>(ArticleController);
  });

  describe('findAll', () => {
    it('should return an array of Article', async () => {
      expect(controller.findAll()).toEqual([]);
    });
  });
});
