"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./User/user.module");
const room_module_1 = require("./Room/room.module");
const Room_entity_1 = require("./Room/Entity/Room.entity");
const auth_module_1 = require("./Auth/auth.module");
const User_entity_1 = require("./User/Entity/User.entity");
const booking_module_1 = require("./Booking/booking.module");
const Booking_entity_1 = require("./Booking/Entity/Booking.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'HOhodbDB@2025@.',
                database: 'hotel',
                entities: [Room_entity_1.RoomEntity, User_entity_1.UserEntity, Booking_entity_1.BookingEntity],
                synchronize: true,
            }),
            user_module_1.UserModule,
            room_module_1.RoomModule,
            auth_module_1.AuthModule,
            booking_module_1.BookingModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map