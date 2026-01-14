import { Types } from "mongoose";
import { AgeGroup } from "./course";

export interface IStudent {
    _id?: string,
    parent: Types.ObjectId,
    name: string,
    nickName: string;
    dob: string;
    gender: string;
    username: string;
    emergencyContact: string;
    password: string;
    email: string;
    profilePhoto: string;
    avatarPhoto: string;
    ageGroup: AgeGroup;
    concentOfPublicy: boolean;
}