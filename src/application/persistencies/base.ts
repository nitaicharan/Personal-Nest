import { BaseModel } from 'src/domain/models/base';
import { PaginationModel } from 'src/domain/models/pagination';
import { PaginationMetadataModel } from 'src/domain/models/pagination-metadata';

export interface IBasePersistency<Model extends BaseModel> {
  create(model: Omit<Model, keyof BaseModel>): Promise<Model>;
  list(pagination: PaginationMetadataModel): Promise<PaginationModel<Model>>;
  update(id: string, model: Partial<Model>): Promise<Model[]>;
  delete(id: string): Promise<Model>;
  find(id: string): Promise<Model>;
}
