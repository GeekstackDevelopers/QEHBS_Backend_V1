import { Types } from "mongoose";

export interface IQuestion {
  text: string;
  options: {
    key: string;
    text: string;
  }[];
  quizId: Types.ObjectId;
  correctOption: string;
  explanation: string;
}
