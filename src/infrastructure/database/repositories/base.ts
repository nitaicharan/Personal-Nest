import { Injectable } from '@nestjs/common';
import { BaseModel } from 'src/domain/models/base';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseEntity } from '../entities/base';
import { PaginationModel } from 'src/domain/models/pagination';
import { PaginationMetadataModel } from 'src/domain/models/pagination-metadata';

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

  async list(
    pagination: PaginationMetadataModel,
  ): Promise<PaginationModel<Model>> {
    const [entities, total] = await this.repository.findAndCount({
      skip: pagination.offset,
      take: pagination.limit,
    });
    const data = entities.map(this.toModel);
    const pages = total / pagination.limit;
    const rest = total % pagination.limit;

    return {
      ...pagination,
      data,
      pages: pages + rest,
    };
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
