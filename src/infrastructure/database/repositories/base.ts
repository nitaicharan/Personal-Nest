import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
    try {
      const temp = this.repository.create(this.fromModel(model));
      const entity = await this.repository.save(temp);

      return this.toModel(entity);
    } catch (error) {
      console.error(typeof error, error);

      throw new InternalServerErrorException(error.message);
    }
  }

  async list(
    pagination: PaginationMetadataModel,
  ): Promise<PaginationModel<Model>> {
    try {
      const [entities, total] = await this.repository.findAndCount({
        skip: pagination.offset,
        take: pagination.limit,
      });

      const data = entities.map(this.toModel);
      const pages = Math.ceil(total / pagination.limit) + 1;
      const page = Math.floor(pagination.offset / pagination.limit) + 1;

      return {
        data,
        pagination: {
          ...pagination,
          page,
          pages,
        },
      };
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: string) {
    try {
      this.repository.softDelete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async find(id: string): Promise<Model | null> {
    try {
      const entity = await this.repository.findOneBy({
        id: id,
      } as FindOptionsWhere<Entity>);

      if (!entity) return entity;
      return this.toModel(entity);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, model: Model): Promise<void> {
    try {
      const tmp = this.fromModel(model);
      this.repository.update({ id } as any, tmp as any);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  abstract fromModel(model: Model): Entity;
  abstract toModel(entity: Entity): Model;
}
