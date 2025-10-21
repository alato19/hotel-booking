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
const User_entity_1 = require("../User/Entity/User.entity");
const Room_entity_1 = require("../Room/Entity/Room.entity");
let BookingService = class BookingService {
    bookingRepo;
    userRepo;
    roomRepo;
    constructor(bookingRepo, userRepo, roomRepo) {
        this.bookingRepo = bookingRepo;
        this.userRepo = userRepo;
        this.roomRepo = roomRepo;
    }
    async createBooking(userId, roomId) {
        const user = await this.userRepo.findOneBy({ id: userId });
        const room = await this.roomRepo.findOneBy({ id: roomId });
        if (!user || !room) {
            throw new common_1.NotFoundException('User or Room not found');
        }
        if (room.isBooked) {
            throw new common_1.NotFoundException('Room already booked');
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
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Booking_entity_1.BookingEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(User_entity_1.UserEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(Room_entity_1.RoomEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BookingService);
//# sourceMappingURL=booking.service.js.map