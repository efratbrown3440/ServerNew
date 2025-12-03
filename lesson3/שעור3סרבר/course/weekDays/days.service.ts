import { Course } from '../course.model';

const courses: Course[] = [
  new Course("Math", 3, ["Monday", "Wednesday"]),
  new Course("English", 2, ["Tuesday", "Thursday"]),
  new Course("Science", 4, ["Monday", "Friday"])
];

export class DaysService {

  static getAllCourses(): Course[] {
    return courses;
  }

  static getCourseById(id: number): Course | undefined {
    return courses.find(c => c.id === id);
  }

  static getCoursesByDay(day: string): Course[] {
    return courses.filter(c => c.days.includes(day));
  }

  static addDayToCourse(id: number, day: string): boolean {
    const course = this.getCourseById(id);
    if (!course) return false;
    if (!course.days.includes(day)) {
      course.days.push(day);
    }
    return true;
  }

  static updateDaysForCourse(id: number, days: string[]): boolean {
    const course = this.getCourseById(id);
    if (!course) return false;
    course.days = days;
    return true;
  }

  static removeDayFromCourse(id: number, day: string): boolean {
    const course = this.getCourseById(id);
    if (!course) return false;
    course.days = course.days.filter(d => d !== day);
    return true;
  }

  static getAllDaysWithCourses(): Record<string, Course[]> {
    const result: Record<string, Course[]> = {};
    const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    weekDays.forEach(day => {
      result[day] = this.getCoursesByDay(day);
    });
    return result;
  }

}

