import { IStudentJsonMongodb } from "../mongodb/Student";
import { IProfessorJsonMongodb } from "../mongodb/Professor";
import { IUserFromJsonMongodbWithoutPassword } from "../mongodb/User";

export type TGetMe = IUserFromJsonMongodbWithoutPassword & {
    dataRole: IProfessorJsonMongodb | IStudentJsonMongodb;
}