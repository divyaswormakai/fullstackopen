import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello full stack');
});

app.get('/bmi/:height/:weight', (req, res) => {
  try {
    let { height, weight } = req.params;
    if (!isNaN(Number(weight)) && !isNaN(Number(height))) {
      let result = calculateBmi(Number(weight), Number(height));
      res.send({
        result: result,
        weight: Number(weight),
        height: Number(height),
      });
    } else {
      throw new Error('asdfas');
    }
  } catch (e) {
    res.send('Malformatted parameters');
  }
});

app.post('/exercise', (req, res) => {
  try {
    console.log('HMMM');
    let body = req.body;
    console.log(body);
    const exercises: number[] = body.daily_exercises;
    const target: number = body.target;
    let returnVal = calculateExercises(exercises, target);
    res.send(returnVal);
  } catch (e) {
    res.send({ err: e.message });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
