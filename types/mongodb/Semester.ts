import { ICredential } from "./Default";

interface Semester {
    start_date: Date;
    end_date: Date;
    section_number: 1 | 2;
}

export type ISemester = Semester;

export type ISemesterJsonMongodb = ISemester & ICredential;