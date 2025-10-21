import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingEntity } from './Entity/Booking.entity';
import { UserEntity } from 'src/User/Entity/User.entity';
import { RoomEntity } from 'src/Room/Entity/Room.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private bookingRepo: Repository<BookingEntity>,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    @InjectRepository(RoomEntity)
    private roomRepo: Repository<RoomEntity>,
  ) {}

  async createBooking(userId: number, roomId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });
    const room = await this.roomRepo.findOneBy({ id: roomId });

    if (!user || !room) {
      throw new NotFoundException('User or Room not found');
    }

    if (room.isBooked) {
      throw new NotFoundException('Room already booked');
    }

    const booking = this.bookingRepo.create({ user, room, confirmed: true });
    await this.bookingRepo.save(booking);

    room.isBooked = true;
    await this.roomRepo.save(room);

    return { message: 'Booking successful', booking };
  }

  async getAll() {
    return this.bookingRepo.find();
  }
}
