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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingEntity = void 0;
const typeorm_1 = require("typeorm");
const User_entity_1 = require("../../User/Entity/User.entity");
const Room_entity_1 = require("../../Room/Entity/Room.entity");
let BookingEntity = class BookingEntity {
    id;
    user;
    room;
    createdAt;
    confirmed;
};
exports.BookingEntity = BookingEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BookingEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.UserEntity),
    __metadata("design:type", User_entity_1.UserEntity)
], BookingEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Room_entity_1.RoomEntity, (room) => room.bookings, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'roomId' }),
    __metadata("design:type", Room_entity_1.RoomEntity)
], BookingEntity.prototype, "room", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BookingEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], BookingEntity.prototype, "confirmed", void 0);
exports.BookingEntity = BookingEntity = __decorate([
    (0, typeorm_1.Entity)('booking')
], BookingEntity);
//# sourceMappingURL=Booking.entity.js.map