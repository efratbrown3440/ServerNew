import express, { Request, Response } from 'express';
import { CourseService } from "./course.service";

const router = express.Router();
const courseService = new CourseService();

router.get('/', (req: Request, res: Response) => {
  res.json(courseService.getAllcourses());
});

router.get('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const course = courseService.getCourseById(id);
  if (course)
    res.json(course);
  else
    res.status(404).send('Course not found');
});

router.post('/', (req: Request, res: Response) => {
  const { name, numofHours, days } = req.body;
  const newCourse = courseService.addCourse(name, numofHours, days);
  res.status(201).json(newCourse);
});

router.put('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  const updated = courseService.updateCourse(id, name);

  if (updated)
    res.json(updated);
  else
    res.status(404).send('Course not found');
});

router.delete('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = courseService.deleteCourse(id);

  if (deleted)
    res.sendStatus(204);
  else
    res.status(404).send('Course not found');
});

export default router;
