import { BaseModel } from 'src/domain/models/base';

export interface IBasePersistency<Model extends BaseModel> {
  create(model: Omit<Model, keyof BaseModel>): Promise<Model>;
  list(): Promise<Model[]>;
  update(id: string, model: Partial<Model>): Promise<Model[]>;
  delete(id: string): Promise<Model>;
  find(id: string): Promise<Model>;
}
