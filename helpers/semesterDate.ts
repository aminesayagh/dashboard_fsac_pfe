import { ISemesterJsonMongodb } from 'types/mongodb/Semester';

export function isWithinSemester(date: Date,semester: ISemesterJsonMongodb): boolean {
    return date >= semester.start_date && date <= semester.end_date;
}

export function findSemester(date: Date, semesters: ISemesterJsonMongodb[]): ISemesterJsonMongodb | undefined {
    return semesters.find((semester) => isWithinSemester(date, semester));
}

export function generateAccademicYear(semester: ISemesterJsonMongodb): `${number}/${number}` {
    if(semester.section_number == 1) {
        return `${semester.start_date.getFullYear() + 1}/${semester.start_date.getFullYear()}`
    } else if(semester.section_number == 2){
        return `${semester.end_date.getFullYear()}/${semester.end_date.getFullYear() - 1}`
    }
    throw new Error('Section number must be 1 or 2');
}