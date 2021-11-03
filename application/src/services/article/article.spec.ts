import { Test } from "@nestjs/testing";
import { ArticleService } from "./article.service";

describe('ArticleService', () => {
    let service: ArticleService;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [ArticleService],
        }).compile();

        service = module.get(ArticleService);
    });

    describe('fetchArticles', () => {
        it('should return empty array', async () => {
            expect(service.fetchArticles()).toEqual([]);
        });
    })
});