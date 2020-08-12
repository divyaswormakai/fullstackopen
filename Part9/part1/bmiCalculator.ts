interface Details {
  mass: number;
  height: number;
}

const argsParse = (args: Array<string>): Details => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too much args');
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      mass: Number(args[2]),
      height: Number(args[3]),
    };
  } else {
    throw new Error('Provided values are not numbers');
  }
};

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

try {
  const { mass, height } = argsParse(process.argv);
  console.log(calculateBmi(mass, height));
} catch (e) {
  console.log('Error, something,message:', e.message);
}
