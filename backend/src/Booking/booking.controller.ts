import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './DTO/create-booking.dto';
import { JwtAuthGuard } from '../Guard/jwt-auth.guard';
import { RolesGuard } from '../Guard/roles.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';

@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async create(@Body() body: CreateBookingDto) {
    return this.bookingService.createBooking(body);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get('all')
  public async getAllBookings(): Promise<any> {
    try {
      const result = await this.bookingService.findAll();
      return result;
    } catch (error) {
      throw new HttpException(
        'Error from server',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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

  // Approve new bookings by Admin
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch(':id/approve')
  async confirmBooking(@Param('id') id: number) {
    return this.bookingService.confirmBooking(id);
  }
}
