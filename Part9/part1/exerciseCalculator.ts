interface result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface argsRes {
  arg1: number[];
  arg2: number;
}

const argsParse2 = (args: Array<string>): argsRes => {
  if (args.length < 12) throw new Error('Not enough arguments');
  if (args.length > 12) throw new Error('Too much args');
  const values = args.slice(2);
  const filteredVal = values.map((val) => {
    if (isNaN(Number(val))) {
      throw new Error('Provided values is not number');
    }
    return Number(val);
  });

  console.log(filteredVal);

  return {
    arg1: filteredVal.slice(1),
    arg2: filteredVal[0],
  };
};

export const calculateExercises = (
  exerciseArr: number[],
  target: number
): result => {
  let avghrs =
    exerciseArr.reduce((acc, curr) => acc + curr) / exerciseArr.length;
  const returnRes = {
    periodLength: exerciseArr.length,
    trainingDays: exerciseArr.filter((elem) => elem !== 0).length,
    success: avghrs > target ? true : false,
    rating: 2,
    ratingDescription: 'could do better',
    target: target,
    average: avghrs,
  };
  return returnRes;
};

try {
  const { arg1, arg2 } = argsParse2(process.argv);
  console.log(calculateExercises(arg1, arg2));
} catch (e) {
  console.log('Error, something,message:', e.message);
}
