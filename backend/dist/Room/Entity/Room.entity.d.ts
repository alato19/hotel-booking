import { BookingEntity } from 'src/Booking/Entity/Booking.entity';
export declare class RoomEntity {
    id: number;
    title: string;
    description: string;
    price: number;
    maxPeople: number;
    hasBalcony: boolean;
    oceanView: boolean;
    tvService: boolean;
    availableFrom: string;
    availableTo: string;
    isBooked: boolean;
    isPublished: boolean;
    bookings: BookingEntity[];
}
