import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello full stack');
});

app.get('/bmi/:height/:weight', (req, res) => {
  try {
    let bmiDetails = req.params;
    if (
      !isNaN(Number(bmiDetails.weight)) &&
      !isNaN(Number(bmiDetails.height))
    ) {
      let result = calculateBmi(
        Number(bmiDetails.weight),
        Number(bmiDetails.height)
      );
      bmiDetails.res = result;
      res.send(bmiDetails);
    } else {
      throw new Error('asdfas');
    }
  } catch (e) {
    res.send('Malformatted parameters');
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
