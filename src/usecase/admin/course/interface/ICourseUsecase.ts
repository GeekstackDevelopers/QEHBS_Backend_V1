// src/domain/usecases/course.usecase.interface.ts
import { ICourse } from "../../../../domain/entity/course";
import { IApiResponse } from "../../../../shared/constant/constant";
export interface ICoursesReponse extends IApiResponse {
    courses: ICourse[]
}

export interface ICourseReponse extends IApiResponse {
    course: ICourse
}
export interface ICourseUseCase {
  createCourse(data: Partial<ICourse>, file?: any): Promise<ICourseReponse>;
  getAllCourses(filter?: Partial<ICourse>): Promise<ICoursesReponse>;
  getCourseById(courseId: string): Promise<ICourseReponse>;
  updateCourse(courseId: string, data: Partial<ICourse>): Promise<ICourseReponse>;
  deleteCourse(courseId: string): Promise<void>;
}
