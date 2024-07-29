import { Module } from '@nestjs/common';
import { UsersController } from './infrastructure/controllers/users';
import { CreateUsecase } from './application/usecases/users/create';
import { DeleteUsecase } from './application/usecases/users/delete';
import { FindUsecase } from './application/usecases/users/find';
import { ListUsecase } from './application/usecases/users/list';
import { UpdateUsecase } from './application/usecases/users/update';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasource } from './infrastructure/database/datasource';
import { DatabaseModule } from './infrastructure/database/database.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsMiddleware } from './infrastructure/middlewares/all-exception';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forRoot({
      ...datasource,
      autoLoadEntities: true,
    }),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsMiddleware,
    },
    CreateUsecase,
    UpdateUsecase,
    ListUsecase,
    FindUsecase,
    DeleteUsecase,
  ],
})
export class AppModule {}
