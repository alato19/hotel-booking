import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { UserEntity } from 'src/User/Entity/User.entity';
import { RoomEntity } from 'src/Room/Entity/Room.entity';
import { BookingEntity } from './Entity/Booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookingEntity, UserEntity, RoomEntity])],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}
