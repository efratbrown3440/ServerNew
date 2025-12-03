import express, { Request, Response as Resp } from 'express'; 
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;


const savedValues: { [key: string]: number } = {
  pi: 3.14,
  e: 2.718
};


function getValue(param: any): number | null {
  if (!param) return null;
  const cleaned = String(param).trim().toLowerCase(); // מסיר רווחים ומוודא מחרוזת
  if (!isNaN(Number(cleaned))) return parseFloat(cleaned);
  if (savedValues.hasOwnProperty(cleaned)) return savedValues[cleaned];
  return null;
}


// פעולות חיבור, חיסור, כפל, חילוק
app.get('/api/add', (req, res) => {
  const num1 = getValue(req.query.num1 as string);
  const num2 = getValue(req.query.num2 as string);

  if (num1 === null || num2 === null) return res.send('ערך אחד או יותר לא חוקיים');

  res.send(`תוצאה: ${num1 + num2}`);
});


app.get('/api/sub', (req, res) => {
  const num1 = Number(req.query.num1 )

  const num2 = Number(req.query.num2 )
;
  if (num1 === null || num2 === null) return res.send('ערך אחד או יותר לא חוקיים');
  res.send(`תוצאה: ${num1 - num2}`);
});

app.get('/api/mul', (req, res) => {
  const num1 = Number(req.query.num1 as string | undefined)
  const num2 = Number(req.query.num2 as string | undefined)
  if (num1 === null || num2 === null) return res.send('ערך אחד או יותר לא חוקיים');
  res.send(`תוצאה: ${num1 * num2}`);
});

app.get('/api/div', (req, res) => {
  const num1 = Number(req.query.num1 as string | undefined)
   const num2 = Number(req.query.num2 as string | undefined)

  if (num1 === null || num2 === null) return res.send('ערך אחד או יותר לא חוקיים');
  if (num2 === 0) return res.send('אי אפשר לחלק באפס');
  res.send(`תוצאה: ${num1 / num2}`);
});
// POST → מוסיף ערך חדש
// קבלת כל הערכים
app.get('/api/allValues', (req, res) => {
  res.json(savedValues);
});

// קבלת ערך לפי שם
app.get('/api/value/:name', (req, res) => {
  const name = req.params.name.toLowerCase();
  const value = savedValues[name];
  if (value === undefined)
    return res.status(404).send('לא נמצא ערך כזה');
  res.json({ [name]: value });
});

// הוספת ערך חדש
app.post('/value', (req, res ) => {
    const key = (req.query.key as string);
    const value = Number(req.query.value);

    if (!key || isNaN(value))
        return res.status(400).send('חובה לשלוח key ו-value תקינים');

    if (savedValues[key])
        return res.status(409).send(`הערך "${key}" כבר קיים`);

    savedValues[key] = value;
    res.send(`נוסף ערך חדש: ${key} = ${value}`);
});

// עדכון ערך קיים
app.put('/api/value', (req, res) => {
  const name = (req.query.name as string)?.toLowerCase();
  const value = Number(req.query.value);
  if (!name || isNaN(value)) return res.status(400).send('פרמטרים לא תקינים');
  if (savedValues[name] === undefined) return res.status(404).send('אין ערך כזה לעדכן');
  savedValues[name] = value;
  res.send(`הערך ${name} עודכן ל-${value}`);
});

// מחיקת ערך
app.delete('/api/value', (req, res) => {
  const name = (req.query.name as string)?.toLowerCase();
  if (!name) return res.status(400).send('חסר שם למחיקה');
  if (savedValues[name] === undefined) return res.status(404).send('אין ערך כזה למחוק');
  delete savedValues[name];
  res.send(`הערך ${name} נמחק בהצלחה`);
});



// האזנה לשרת
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

