import { BaseModel } from './base';

export class UserModel extends BaseModel {
  name: string;
  username: string;
  email: string;
  bio?: string;
  image?: string;
}
