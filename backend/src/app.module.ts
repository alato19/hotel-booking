import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './User/user.module';
import { RoomModule } from './Room/room.module';
import { AuthModule } from './Auth/auth.module';
import { BookingModule } from './Booking/booking.module';

console.log('ENV CHECK DB_HOST:', process.env.DB_HOST);
console.log('ENV CHECK DB_PORT:', process.env.DB_PORT);
console.log('ENV CHECK DB_USER:', process.env.DB_USER);
console.log('ENV CHECK DB_PASS:', process.env.DB_PASS);
console.log('ENV CHECK DB_NAME:', process.env.DB_NAME);

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
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
