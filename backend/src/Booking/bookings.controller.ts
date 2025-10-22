import {
  Controller,
  Post,
  Body,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { BookingService } from './booking.service';
ss;

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  public async createBooking(@Body() body: { userId: number; roomId: number }) {
    return await this.bookingService.createBooking(body.userId, body.roomId);
  }
  catch(error) {
    throw new HttpException('Booking failed', HttpStatus.BAD_REQUEST);
  }

  @Get('all')
  public async getAllBookings() {
    return await this.bookingService.getAll();
  }

  @Get('by-user/:id')
  public async getUserBookings(@Param('id') id: number): Promise<any> {
    return await this.bookingService.getUserBook(id);
  }
}
