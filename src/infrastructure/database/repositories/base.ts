import { Injectable } from '@nestjs/common';
import { BaseModel } from 'src/domain/models/base';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseEntity } from '../entities/base';

@Injectable()
export abstract class BaseRepository<
  Model extends BaseModel,
  Entity extends BaseEntity,
> {
  constructor(protected readonly repository: Repository<Entity>) {}

  async create(model: Model): Promise<Model> {
    const temp = this.repository.create(this.fromModel(model));
    const entity = await this.repository.save(temp);

    return this.toModel(entity);
  }

  async list(): Promise<Model[]> {
    const entities = await this.repository.find();

    return entities.map(this.toModel);
  }

  async delete(id: string) {
    this.repository.softDelete(id);
  }

  async find(id: string): Promise<Model | null> {
    const entity = await this.repository.findOneBy({
      id: id,
    } as FindOptionsWhere<Entity>);

    if (!entity) return entity;
    return this.toModel(entity);
  }

  async update(id: string, model: Model): Promise<void> {
    const tmp = this.fromModel(model);
    this.repository.update({ id } as any, tmp as any);
  }

  abstract fromModel(model: Model): Entity;
  abstract toModel(entity: Entity): Model;
}
