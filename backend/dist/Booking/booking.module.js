"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const booking_service_1 = require("./booking.service");
const bookings_controller_1 = require("./bookings.controller");
const User_entity_1 = require("../User/Entity/User.entity");
const Room_entity_1 = require("../Room/Entity/Room.entity");
const Booking_entity_1 = require("./Entity/Booking.entity");
let BookingModule = class BookingModule {
};
exports.BookingModule = BookingModule;
exports.BookingModule = BookingModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Booking_entity_1.BookingEntity, User_entity_1.UserEntity, Room_entity_1.RoomEntity])],
        providers: [booking_service_1.BookingService],
        controllers: [bookings_controller_1.BookingController],
    })
], BookingModule);
//# sourceMappingURL=booking.module.js.map