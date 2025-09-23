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
  HttpStatus
} from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomDto } from './DTO/Room.dto';


@Controller('room')
export class RoomController {
  constructor(private readonly roomService:RoomService) {}

  @Post('create')
  public async createRoom(@Body() body: RoomDto) {
    try {
      return await this.roomService.create(body);
    } catch (error) {
      throw new HttpException('Could not create room', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteRoom(@Param('id') id: number) {
    return this.roomService.remove(id);
  }

  @Patch(':id')
  async updateRoom(
    @Param('id') id: number,
    @Body() updateRoom: RoomDto
  ) {
    return this.roomService.update(id, updateRoom);
  }

  @Get('all')
  public async getAllRooms() {
    try {
      return await this.roomService.findAll();
    } catch (error) {
      throw new HttpException(
        'Error from server',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
