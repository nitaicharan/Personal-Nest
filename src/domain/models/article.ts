import { BaseModel } from './base';
import { UserModel } from './user';

export class ArticleModel extends BaseModel {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  author: UserModel;
}
