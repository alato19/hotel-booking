import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './User/user.module';
import { RoomModule } from './Room/room.module';
import { AuthModule } from './Auth/auth.module';
import { BookingModule } from './Booking/booking.module';

@Module({
  imports: [
    // Load environment variables BEFORE TypeORM config
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,

      // Automatically register all entities (important for production)
      autoLoadEntities: true,

      synchronize: false,

      // Enable SSL on Render / disable locally
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false }
          : false,
    }),

    UserModule,
    RoomModule,
    AuthModule,
    BookingModule,
  ],
})
export class AppModule {}
