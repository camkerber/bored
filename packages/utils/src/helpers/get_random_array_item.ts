export const getRandomArrayItem = (array: Array<unknown>) => {
  return array[Math.floor(Math.random() * array.length)];
};
