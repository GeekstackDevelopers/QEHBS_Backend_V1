import { BookingStatus, IBooking } from "../../../../domain/entity/booking";

export interface IBookingRepo {
    createBooking(booking: IBooking): Promise<IBooking>;
    confirmBooking(bookingId: string): Promise<IBooking | null>;
    getBookings(): Promise<IBooking[]>;
    getBookingsByStudentId(studentId: string, status: BookingStatus): Promise<IBooking[]>
    getBookingsByParentId(parentId: string): Promise<IBooking[]>
    getBookingsByStudentIdAndParentId(studentId: string, parentId: string): Promise<IBooking[]>
}