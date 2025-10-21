import { BookingEntity } from 'src/Booking/Entity/Booking.entity';
export declare class UserEntity {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    bookings: BookingEntity[];
}
