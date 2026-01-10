export enum CourseType {
    TRIAL = "trial",
    NORMAL = "normal",
}
export enum AgeGroup {
    YR4 = "yr4",
    YR5 = "yr5",
}
export interface ICourse  {
  _id?: string;
  generatedId: string;
  description: string;
  coverImage: string;
  courseType: CourseType;
  ageGroup: AgeGroup;
  name: string;
  isActive: boolean;
  isFree: boolean;
  currency: string;
  price: number;
}
