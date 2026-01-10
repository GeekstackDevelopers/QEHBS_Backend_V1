import { ICourse } from "../../../domain/entity/course";
import {
  ICourseUseCase,
  ICoursesReponse,
  ICourseReponse,
} from "./interface/ICourseUsecase";
import { CustomError } from "../../../shared/constant/customError";
import { ICourseRepository } from "../../../infrastructure/repository/course/interface/ICourseRepo";
import { uploadSingleImage } from "../../../interface/middleware/image.upload.middleware";
export class CourseUseCase implements ICourseUseCase {
  constructor(private readonly courseRepo: ICourseRepository) {}

  async createCourse(
    data: Partial<ICourse>,
    file?: any
  ): Promise<ICourseReponse> {
    let imageUrl = "";

    if (file) {
      imageUrl = await uploadSingleImage(file, "corseCoverImage");
    }
    if (!data.name || !data.description) {
      throw new CustomError(400, "Course name and description are required");
    }

    if (!data.isFree && (!data.price || data.price <= 0)) {
      throw new CustomError(400, "Paid course must have a valid price");
    }

    const course = await this.courseRepo.create({
      ...data,
      coverImage: imageUrl, 
    });
    return {
      course,
      msg: "Course created successfully",
      success: true,
    };
  }

  async getAllCourses(filter?: Partial<ICourse>): Promise<ICoursesReponse> {
    const courses = await this.courseRepo.findAll(filter);
    return {
      courses,
      msg: "Courses fetched successfully",
      success: true,
    };
  }

  async getCourseById(courseId: string): Promise<ICourseReponse> {
    const course = await this.courseRepo.findById(courseId);

    if (!course) {
      throw new CustomError(404, "Course not found");
    }

    if (!course.isActive) {
      throw new CustomError(403, "Course is inactive");
    }

    return {
      course,
      msg: "Course fetched successfully",
      success: true,
    };
  }

  async updateCourse(
    courseId: string,
    data: Partial<ICourse>
  ): Promise<ICourseReponse> {
    const updated = await this.courseRepo.updateById(courseId, data);

    if (!updated) {
      throw new CustomError(404, "Course not found");
    }

    return {
      course: updated,
      msg: "Course updated successfully",
      success: true,
    };
  }

  async deleteCourse(courseId: string): Promise<void> {
    const deleted = await this.courseRepo.deleteById(courseId);

    if (!deleted) {
      throw new CustomError(404, "Course not found");
    }
  }
}
