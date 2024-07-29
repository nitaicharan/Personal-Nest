import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users';

@Module({
  controllers: [UsersController],
  imports: [],
})
export class AppModule {}
