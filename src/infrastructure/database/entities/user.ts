import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base';

@Entity()
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
}
