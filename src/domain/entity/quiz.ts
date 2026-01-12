import { Types } from "mongoose";
import { AgeGroup } from "./course";

export enum Category {
    COMPREHENSION1 = "comprehension1",
    COMPREHENSION2 = "comprehension2",
    PUNCTUATION = "punctuation",
    SPELLING = "spelling",
    GRAMMER = "grammer",
    CREATIVE_WRITING = "creativeWriting",
}
export interface IQuiz {
    _id?: string;
    courseId: Types.ObjectId;
    title: string;
    description: string;
    category: string;
    createdByAdminId: Types.ObjectId;
    ageGroup: AgeGroup;
    weekNumber: number;
    totalQuestions: number;
    marksPerQuestion: number;
    durationMinutes: number;
    thumbnailImage: string;
    isPublished: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}