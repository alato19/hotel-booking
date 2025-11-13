"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Booking_entity_1 = require("./Entity/Booking.entity");
const Room_entity_1 = require("../Room/Entity/Room.entity");
let BookingService = class BookingService {
    bookingRepository;
    roomRepository;
    constructor(bookingRepository, roomRepository) {
        this.bookingRepository = bookingRepository;
        this.roomRepository = roomRepository;
    }
    async createBooking(body) {
        const { userId, roomId } = body;
        const room = await this.roomRepository.findOne({ where: { id: roomId } });
        if (!room)
            throw new common_1.HttpException('Room not found', common_1.HttpStatus.NOT_FOUND);
        if (room.isBooked)
            throw new common_1.HttpException('Room already booked', common_1.HttpStatus.CONFLICT);
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
    async findAll() {
        return this.bookingRepository.find({
            relations: ['room'],
            order: { createdAt: 'DESC' },
        });
    }
    async getBookingsByUser(userId) {
        return this.bookingRepository.find({
            where: { user: { id: userId } },
            relations: ['room'],
            order: { createdAt: 'DESC' },
        });
    }
    async deleteBooking(id) {
        const booking = await this.bookingRepository.findOne({
            where: { id },
            relations: ['room'],
        });
        if (!booking) {
            throw new common_1.HttpException('Booking not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (booking.room) {
            booking.room.isBooked = false;
            await this.roomRepository.save(booking.room);
        }
        await this.bookingRepository.remove(booking);
        return { message: 'Booking cancelled successfully', bookingId: id };
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Booking_entity_1.BookingEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(Room_entity_1.RoomEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BookingService);
//# sourceMappingURL=booking.service.js.map