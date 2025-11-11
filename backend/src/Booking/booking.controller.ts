import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './DTO/create-booking.dto';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async create(@Body() body: CreateBookingDto) {
    return this.bookingService.createBooking(body);
  }

  @Get('by-user/:userId')
  async getByUser(@Param('userId') userId: number) {
    return this.bookingService.getBookingsByUser(userId);
  }

  // 🆕 DELETE endpoint for booking cancellation
  @Delete(':id')
  async deleteBooking(@Param('id') id: number) {
    try {
      return await this.bookingService.deleteBooking(id);
    } catch (error) {
      throw new HttpException(
        'Failed to delete booking',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
