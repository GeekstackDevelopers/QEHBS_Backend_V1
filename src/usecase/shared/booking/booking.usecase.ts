import { BookingStatus, BookingType, IBooking } from "../../../domain/entity/booking";
import { IBookingRepo } from "../../../infrastructure/repository/booking/interface/IBookingRepo";
import { convertStringToObjectId, HTTPStatusCode } from "../../../shared/constant/constant";
import { CustomError } from "../../../shared/constant/customError";
import { ISlotUsecase } from "../slot/interface/ISlotUsecase";
import { IBookingResponse, IBookingUsecase, IBookingsResponse } from "./interface/IBookingUsecase";
import { ICourseUseCase } from "../course/interface/ICourseUsecase";

export class BookingUsecase implements IBookingUsecase {
    constructor(private readonly bookingRepo: IBookingRepo, private readonly slotUsecase: ISlotUsecase, private readonly courseUseCase: ICourseUseCase) {}

    async createBooking(slotId: string, parentId: string, studentId: string, courseId: string): Promise<IBookingResponse> {
        const isSlotAvailable = await this.slotUsecase.getSlotAvailabilityById(slotId);

        if(!isSlotAvailable) {
            throw new CustomError(HTTPStatusCode.BAD_REQUEST, "There is no available slot for this course");
        }

        const courseRes = await this.courseUseCase.getCourseById(courseId);

        if(!courseRes || !courseRes.course) {
            throw new CustomError(HTTPStatusCode.BAD_REQUEST, "There is no course with this id");
        }


        const paymentRequired = courseRes.course.isFree ? false : true;

        const booking: IBooking = {
            slotId: convertStringToObjectId(slotId),
            bookedAt: new Date(),
            bookingStatus: BookingStatus.PENDING,
            bookingType: BookingType.ONLINE,
            paymentRequired,
            parentId: convertStringToObjectId(parentId),
            courseId: convertStringToObjectId(courseId),
            studentId: convertStringToObjectId(studentId)
        } 

        const createdBooking = await this.bookingRepo.createBooking(booking);

        return {
            booking: createdBooking,
            msg: "Booking created successfully",
            success: true
        }
    }

    async confirmBooking(bookingId: string): Promise<IBookingResponse> {
        const booking = await this.bookingRepo.confirmBooking(bookingId);

        if(!booking) {
            throw new CustomError(HTTPStatusCode.BAD_REQUEST, "There is no booking with this id");
        }
        
        const updatedSlot = await this.slotUsecase.increaseBookedSeats(booking.slotId.toString());
        if(!updatedSlot) {
            throw new CustomError(HTTPStatusCode.BAD_REQUEST, "There is no available slot for this course");
        }
        
        return {
            booking,
            msg: "Booking confirmed successfully",
            success: true
        }
    }

    async getStudentBookings(studentId: string, parentId: string): Promise<IBookingsResponse> {
        const classes = await this.bookingRepo.getBookingsByStudentIdAndParentId(studentId, parentId);

        return {
            bookings: classes,
            msg: "Bookings fetched successfully",
            success: true
        }
    }

    async getBookings(): Promise<IBookingsResponse> {
        const bookings = await this.bookingRepo.getBookings();

        return {
            bookings,
            msg: "Bookings fetched successfully",
            success: true
        }
    }


}