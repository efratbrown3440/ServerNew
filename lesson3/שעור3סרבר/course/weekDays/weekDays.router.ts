import express, { Request, Response } from 'express';
import { DaysService } from './days.service';

const router = express.Router();


router.post('/:id/addDay', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { day } = req.body;
  if (!day) return res.status(400).json({ error: "Day is required" });

  const success = DaysService.addDayToCourse(id, day);
  if (!success) return res.status(404).json({ error: "Course not found" });

  res.json({ message: "Day added successfully" });
});

router.put('/:id/updateDays', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { days } = req.body;
  if (!days || !Array.isArray(days)) return res.status(400).json({ error: "Days array is required" });

  const success = DaysService.updateDaysForCourse(id, days);
  if (!success) return res.status(404).json({ error: "Course not found" });

  res.json({ message: "Days updated successfully" });
});

router.delete('/:id/removeDay', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { day } = req.body;
  if (!day) return res.status(400).json({ error: "Day is required" });

  const success = DaysService.removeDayFromCourse(id, day);
  if (!success) return res.status(404).json({ error: "Course not found" });

  res.json({ message: "Day removed successfully" });
});

router.get('/allDaysWithCourses', (req: Request, res: Response) => {
  const result = DaysService.getAllDaysWithCourses();
  res.json(result);
});

router.get('/:day', (req: Request, res: Response) => {
  const { day } = req.params;
  const courses = DaysService.getCoursesByDay(day as string);
  res.json(courses);
});

export default router;
