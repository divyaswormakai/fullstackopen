interface result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exerciseArr: number[], target: number) => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
