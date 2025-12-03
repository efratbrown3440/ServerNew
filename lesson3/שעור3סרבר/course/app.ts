import express from 'express';
import weekDaysRouter from './weekDays/weekDays.router';
import courseRouter from './course.router';
const app = express();

// מאפשר לקבל נתונים ב‑JSON ב‑body
app.use(express.json());
app.use('/courses', courseRouter); 
app.use('/days', weekDaysRouter);


// רישום ה‑Router
app.use('/weekDays', weekDaysRouter);

export default app;


