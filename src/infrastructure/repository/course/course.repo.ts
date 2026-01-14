import { CourseModel } from "../../../domain/model/course.model";
import { ICourse } from "../../../domain/entity/course";
import { ICourseRepository } from "./interface/ICourseRepo";
export class CourseRepository implements ICourseRepository {
  
  async create(data: Partial<ICourse>): Promise<ICourse> {
    const course = new CourseModel(data);
    return await course.save();
  }

  async findById(id: string): Promise<ICourse | null> {
    return await CourseModel.findById(id);
  }

  async findAll(filter: Partial<ICourse> = {}): Promise<ICourse[]> {
    return await CourseModel.find(filter).sort({ createdAt: -1 });
  }



  async findByYear(ageGroup: string): Promise<ICourse[]> {
    return await CourseModel.find({ageGroup });
  }

  async updateById(
    id: string,
    data: Partial<ICourse>
  ): Promise<ICourse | null> {
    return await CourseModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<boolean> {
    const res = await CourseModel.findByIdAndDelete(id);
    return !!res;
  }
}
