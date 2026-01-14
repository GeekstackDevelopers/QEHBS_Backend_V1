import { ISlots } from "../../../../domain/entity/slot";

export interface ISlotRepository {
  createSlot(slot: Partial<ISlots>): Promise<ISlots>;
  getSlotById(id: string): Promise<ISlots | null>;
  increaseBookedSeats(id: string, bookedSeats: number): Promise<ISlots | null>;
  findSlotByCourseAndTime(
    courseId: string,
    slotDate: Date,
    startTime: string
  ): Promise<ISlots | null>;
  getSlots(): Promise<ISlots[]>;
  getSlotsByCourseIdAndWeekNumber(
    courseId: string,
    weekNumber: number
  ): Promise<ISlots[]>;
  findHostConflict(
    hostName: string,
    slotDate: Date,
    startTime: string,
    endTime: string
  ): Promise<ISlots | null>;
  getSlotsWithSlotIds(slotIds: string[]): Promise<ISlots[]>;
  getSlotsByCourseId(courseId: string): Promise<ISlots[]>;
}
