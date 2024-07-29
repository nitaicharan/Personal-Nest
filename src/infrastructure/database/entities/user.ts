import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base';
import { ArticleEntity } from './article';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  image?: string;

  @OneToMany(() => ArticleEntity, (article) => article.author)
  articles: ArticleEntity[];
}
