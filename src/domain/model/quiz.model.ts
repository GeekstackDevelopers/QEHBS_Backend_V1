import { Schema, model, Types } from "mongoose";
import { IQuiz } from "../entity/quiz";
import { AgeGroup } from "../entity/course";

const quizSchema = new Schema<IQuiz>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    createdByAdminId: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    ageGroup: {
      type: String,
      enum: Object.values(AgeGroup),
      required: true,
    },

    weekNumber: {
      type: Number,
      required: true,
      min: 1,
    },

    totalQuestions: {
      type: Number,
      required: true,
      min: 1,
    },

    marksPerQuestion: {
      type: Number,
      required: true,
      min: 1,
    },

    durationMinutes: {
      type: Number,
      required: true,
      min: 1,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const QuizModel = model<IQuiz>("Quiz", quizSchema);

export default QuizModel;
