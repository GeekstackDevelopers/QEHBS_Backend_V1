import { ICourse } from "../../../../domain/entity/course";

export interface ICourseRepository {
  create(data: Partial<ICourse>): Promise<ICourse>;
  findById(id: string): Promise<ICourse | null>;
  findAll(filter?: any): Promise<ICourse[]>;
  updateById(id: string, data: Partial<ICourse>): Promise<ICourse | null>;
  deleteById(id: string): Promise<boolean>;
}
