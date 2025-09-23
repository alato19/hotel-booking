import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './User/user.module';
import { RoomModule } from './Room/room.module';
import { RoomEntity } from './Room/Entity/Room.entity';

@Module({
  imports: [
     TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'HOhodbDB@2025@.',
      database: 'hotel',
      entities: [RoomEntity],
      synchronize: true,
    }),
    UserModule,
    RoomModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
