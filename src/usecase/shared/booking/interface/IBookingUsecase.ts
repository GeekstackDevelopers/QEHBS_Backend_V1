import { IBooking } from "../../../../domain/entity/booking";
import { IApiResponse } from "../../../../shared/constant/constant";


export interface IBookingResponse extends IApiResponse {
    booking: IBooking
}

export interface IBookingsResponse extends IApiResponse {
    bookings: IBooking[]
}

export interface IBookingUsecase {
    createBooking(slotId: string, parentId: string, studentId: string, courseId: string): Promise<IBookingResponse>;
    confirmBooking(bookingId: string): Promise<IBookingResponse>
    getBookings(): Promise<IBookingsResponse>;
    getStudentBookings(studentId: string, parentId: string): Promise<IBookingsResponse>
    
}