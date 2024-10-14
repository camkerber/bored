export const generateId = () => {
  const unixTimestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 10000);
  return "C" + unixTimestamp + "-G-" + randomNum;
};
