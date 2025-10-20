import { Controller, Post, Body, Get } from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async createBooking(@Body() body: { userId: number; roomId: number }) {
    return await this.bookingService.createBooking(body.userId, body.roomId);
  }

  @Get()
  async getAllBookings() {
    return await this.bookingService.getAll();
  }
}
