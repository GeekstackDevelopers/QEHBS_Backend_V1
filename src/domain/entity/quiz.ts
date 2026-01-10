import { Types } from "mongoose";
import { AgeGroup } from "./course";

export interface IQuiz {
    _id?: string;
    courseId: Types.ObjectId;
    title: string;
    description: string;
    createdByAdminId: Types.ObjectId;
    ageGroup: AgeGroup;
    weekNumber: number;
    totalQuestions: number;
    marksPerQuestion: number;
    durationMinutes: number;
    isPublished: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}