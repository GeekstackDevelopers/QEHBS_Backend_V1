import { SlotModel } from "../../../domain/model/slot.model";
import { ISlots } from "../../../domain/entity/slot";
import { ISlotRepository } from "./interface/ISlotRepo";

export class SlotRepository implements ISlotRepository {
  async createSlot(slot: Partial<ISlots>): Promise<ISlots> {
    const created = await SlotModel.create(slot);
    return created;
  }

  async increaseBookedSeats(id: string, bookedSeats: number): Promise<ISlots | null> {
    const updated = await SlotModel.findOneAndUpdate(
      { _id: id },
      { bookedSeats: bookedSeats },
      { new: true }
    );
    return updated;
  }

  async findSlotByCourseAndTime(
    courseId: string,
    slotDate: Date,
    startTime: string
  ): Promise<ISlots | null> {
    return SlotModel.findOne({
      courseId,
      slotDate,
      startTime,
    });
  }

  async findHostConflict(
    hostName: string,
    slotDate: Date,
    startTime: string,
    endTime: string
  ): Promise<ISlots | null> {
    return SlotModel.findOne({
      hostName,
      slotDate,
      isActive: true,
      $expr: {
        $and: [
          { $lt: ["$startTime", endTime] },
          { $gt: ["$endTime", startTime] },
        ],
      },
    });
  }

  async getSlotsByCourseIdAndWeekNumber(courseId: string, weekNumber: number): Promise<ISlots[]> {
    const slots = await SlotModel.find({ courseId, weekNumber });
    return slots;
  }

  async getSlotsWithSlotIds(slotIds: string[]): Promise<ISlots[]> {
    const slotsWithQuizzes = await SlotModel.find({
    _id: { $in: slotIds },
    isActive: true,
  })
    .select("quizIds weekNumber slotDate startTime endTime courseId")
    .populate({
      path: "quizIds",
      select: "title description duration totalMarks category", // customize
    })
    .populate({
      path: "courseId",
      select: "name description", // customize
    })
    .lean();

    return slotsWithQuizzes;
  }

  async getSlots(): Promise<ISlots[]> {
    const slots = await SlotModel.find()
      .populate("courseId", {name: 1})
      .populate("quizIds");

    return slots;
  }

  async getSlotsByCourseId(courseId: string): Promise<ISlots[]> {
    const slots = await SlotModel.find({ courseId });
    return slots;
  }

  async getSlotById(id: string): Promise<ISlots | null> {
    const slot = await SlotModel.findById(id);
    return slot;
  }
}
