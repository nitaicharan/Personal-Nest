import { Column, Entity, JoinTable, ManyToOne } from 'typeorm';
import { UserEntity } from './user';
import { BaseEntity } from './base';

@Entity('articles')
export class ArticleEntity extends BaseEntity {
  @Column()
  slug: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  body: string;

  @Column({ type: 'varchar', nullable: true })
  tagList: string[];

  @Column({ default: false })
  favorited: boolean;

  @Column({ default: 0, name: 'favorites_count' })
  favoritesCount: number;

  @ManyToOne(() => UserEntity, (user) => user.articles)
  @JoinTable({ name: 'author_id' })
  author: UserEntity;
}
