import BookingModel from "../../../domain/model/booking.model";
import { BookingStatus, IBooking } from "../../../domain/entity/booking";
import { IBookingRepo } from "./interface/IBookingRepo";

export class BookingRepo implements IBookingRepo {
    async createBooking(booking: IBooking): Promise<IBooking> {
        const newBooking = await BookingModel.create(booking);
        return newBooking;
    }

    async confirmBooking(bookingId: string): Promise<IBooking | null> {
        const booking = await BookingModel.findOneAndUpdate({ _id: bookingId }, { bookingStatus: "CONFIRMED" });
        return booking;
    }

    async getBookings(): Promise<IBooking[]> {
        const bookings = await BookingModel.find();
        return bookings;
    }

    async getBookingsByParentId(parentId: string): Promise<IBooking[]> {
        const bookings = await BookingModel.find({ parentId });
        return bookings;
    }

    async getBookingsByStudentIdAndParentId(studentId: string, parentId: string): Promise<IBooking[]> {
        const bookings = await BookingModel.find({ studentId, parentId }).populate("slotId").populate("courseId");
        return bookings;
    }

    async getBookingsByStudentId(studentId: string, status: BookingStatus): Promise<IBooking[]> {
        console.log("repo student id : ", studentId, " status : ", status);
        const bookings = await BookingModel.find({ studentId, bookingStatus: status });
        return bookings;
    }
}