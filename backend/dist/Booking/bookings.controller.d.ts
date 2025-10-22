import { BookingService } from './booking.service';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    createBooking(body: {
        userId: number;
        roomId: number;
    }): Promise<{
        message: string;
        booking: import("./Entity/Booking.entity").BookingEntity;
    }>;
    catch(error: any): void;
    getAllBookings(): Promise<import("./Entity/Booking.entity").BookingEntity[]>;
    getUserBookings(id: number): Promise<any>;
}
