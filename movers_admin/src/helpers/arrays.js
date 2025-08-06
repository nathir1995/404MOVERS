export const diffArrays = (A, B) => {
  const aMinusB = A.filter((item) => !B.includes(item));
  const bMinusA = B.filter((item) => !A.includes(item));
  return { aMinusB, bMinusA };
};
