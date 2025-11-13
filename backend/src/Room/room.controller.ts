import {
  Body,
  Controller,
  Get,
  Query,
  Param,
  Patch,
  Post,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomDto } from './DTO/Room.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/Guard/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/Guard/jwt-auth.guard';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('all')
  public async getAllRooms(): Promise<any> {
    try {
      const result = await this.roomService.findAll();
      return {
        result,
        status: 200,
      };
    } catch (error) {
      throw new HttpException(
        'Error from server',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('create')
  public async createRoom(@Body() body: RoomDto) {
    try {
      return await this.roomService.create(body);
    } catch (error) {
      throw new HttpException('Could not create room', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  async updateRoom(@Param('id') id: number, @Body() updateRoom: RoomDto) {
    return this.roomService.update(id, updateRoom);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async deleteRoom(@Param('id') id: number) {
    return this.roomService.remove(id);
  }
}
