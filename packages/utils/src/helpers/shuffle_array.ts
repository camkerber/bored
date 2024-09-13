// Knuth shuffle algorithm
export const shuffleArray = (inputArr: Array<unknown>) => {
  const newArray = [...inputArr];
  let currentIndex = newArray.length;

  // while there are still elements to shuffle
  while (currentIndex != 0) {
    // pick a remaining element
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // swap with the current element
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }
  return newArray;
};
