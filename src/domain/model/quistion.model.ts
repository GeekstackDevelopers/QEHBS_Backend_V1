import { Schema, model } from "mongoose";
import { IQuestion } from "../entity/question";

const optionSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      trim: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const questionSchema = new Schema<IQuestion>(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      type: [optionSchema],
      required: true,
      validate: {
        validator: function (options: { key: string; text: string }[]) {
          return options.length >= 2;
        },
        message: "A question must have at least 2 options",
      },
    },

    quizId: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
      index: true,
    },
    correctOption: {
      type: String,
      select: false,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const QuestionModel = model<IQuestion>("Question", questionSchema);