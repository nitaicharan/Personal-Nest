import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user';
import { IUserPersistency } from 'src/application/persistencies/user';
import { UserEntity } from './entities/user';

const services = [
  {
    provide: IUserPersistency,
    useClass: UserRepository,
  },
];
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: services,
  exports: services,
})
export class DatabaseModule {}
