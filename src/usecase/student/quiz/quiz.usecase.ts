import { BookingStatus } from "../../../domain/entity/booking";
import { IBookingRepo } from "../../../infrastructure/repository/booking/interface/IBookingRepo";
import { IQuizRepository } from "../../../infrastructure/repository/quiz/interface/IQuizRepo";
import { ISlotRepository } from "../../../infrastructure/repository/slot/interface/ISlotRepo";
import { IQuizUsecase, IQuizzesReponse } from "./interface/IQuizUsecase";

export class QuizUsecase implements IQuizUsecase {
  constructor(
    private readonly slotRepository: ISlotRepository,
    private readonly bookingRepository: IBookingRepo
  ) {}


  async getSlotCompletedQuizes(studentId: string): Promise<IQuizzesReponse> {
    const completedBookings =
      await this.bookingRepository.getBookingsByStudentId(
        studentId,
        BookingStatus.COMPLETED
      );

      console.log("completedBookings:", completedBookings);
    if (!completedBookings.length) {
      return {
        quizzes: [],
        msg: "No completed slots found",
        success: true,
      };
    }

    const completedSlotIds = completedBookings.map((booking) => booking.slotId);

    const slotsWithQuizzes = await this.slotRepository.getSlotsWithSlotIds(
      completedSlotIds.map((id) => id.toString())
    );

    const quizzes = slotsWithQuizzes.flatMap((slot) =>
      slot.quizIds.map((quiz: any) => ({
        ...quiz,
        slotInfo: {
          slotId: slot._id,
          weekNumber: slot.weekNumber,
          slotDate: slot.slotDate,
          startTime: slot.startTime,
          endTime: slot.endTime,
        },
        courseInfo: slot.courseId,
      }))
    );

    return {
      quizzes,
      msg: "Quizzes fetched successfully",
      success: true,
    }
  }
}
