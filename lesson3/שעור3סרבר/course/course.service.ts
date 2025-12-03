import { Course } from "./course.model";
 


export class CourseService {
  public courses: Course[] = [];
  

// הוספת קורס
  addCourse(name: string, numofHours: number, days: string[]): Course {
    const newCourse = new Course(name, numofHours, days);
    this.courses.push(newCourse);
    return newCourse;
  }
   getCourseById(id:number){
    return this.courses.find(Course=> Course.id===id)
   }
   getAllcourses():Course[] {
     return  this.courses;
   }
    updateCourse(id:number,name?: string, numofHours?: number, days?: string[]): Course | undefined{
    const course = this.getCourseById(id);
    if(!course)return undefined;
     
    if(name!==undefined)course.name=name;
    if(numofHours!==undefined)course.numofHours=numofHours;
    if(days!==undefined)course.days=days
   
    return course;
   }
   deleteCourse(id:number):boolean{
    const index=this.courses.findIndex(Course=> Course.id===id)
    if(index==undefined)
        return false;
    
    this.courses.splice(index)
    return true;
   }
}
