import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingEntity } from './Entity/Booking.entity';
import { RoomEntity } from 'src/Room/Entity/Room.entity';
import { CreateBookingDto } from './DTO/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
  ) {}

  async createBooking(body: CreateBookingDto) {
    const { userId, roomId } = body;

    const room = await this.roomRepository.findOne({ where: { id: roomId } });
    if (!room) throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
    if (room.isBooked)
      throw new HttpException('Room already booked', HttpStatus.CONFLICT);

    const booking = this.bookingRepository.create({
      user: { id: userId },
      room: { id: roomId },
      confirmed: true,
    });

    await this.bookingRepository.save(booking);
    room.isBooked = true;
    await this.roomRepository.save(room);

    return booking;
  }

  async getBookingsByUser(userId: number) {
    return this.bookingRepository.find({
      where: { user: { id: userId } },
      relations: ['room'],
      order: { createdAt: 'DESC' },
    });
  }

  // 🆕 Delete booking and mark room as available again
  async deleteBooking(id: number) {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['room'],
    });

    if (!booking) {
      throw new HttpException('Booking not found', HttpStatus.NOT_FOUND);
    }

    // Mark room as available again
    if (booking.room) {
      booking.room.isBooked = false;
      await this.roomRepository.save(booking.room);
    }

    await this.bookingRepository.remove(booking);

    return { message: 'Booking cancelled successfully', bookingId: id };
  }
}
