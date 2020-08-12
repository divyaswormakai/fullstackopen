const calculateBmi = (mass: number, height: number): string => {
  const bmi = (mass * 100 * 100) / (height * height);
  let result = '';
  if (bmi < 20) {
    result = 'UnderWeight';
  } else if (bmi > 25) {
    result = 'OverWeight';
  } else {
    result = 'Normal';
  }
  console.log(bmi);

  return `${result} (${mass}, ${height})`;
};

console.log(calculateBmi(76, 165));
