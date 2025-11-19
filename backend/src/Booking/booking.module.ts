import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';

import { BookingEntity } from './Entity/Booking.entity';
import { UserEntity } from '../User/Entity/User.entity';
import { RoomEntity } from '../Room/Entity/Room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookingEntity, UserEntity, RoomEntity])],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}
