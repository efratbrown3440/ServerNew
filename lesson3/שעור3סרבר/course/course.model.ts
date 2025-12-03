let nextId = 1;

export class Course{
   id : number;
   name:string;
   numofHours:number;
   days:string[];


  constructor(name: string, numofHours: number, days: string[]) {
    this.id = nextId++;
    this.name = name;
    this.numofHours = numofHours;
    this.days = days;
  }
  }