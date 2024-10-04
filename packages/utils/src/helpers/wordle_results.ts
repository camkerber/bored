const COMPLETED_WORDLES_KEY = "wordleCompletions";

export const getCompletedWordles = (): string[] => {
  const itemValue = localStorage.getItem(COMPLETED_WORDLES_KEY);
  if (itemValue) {
    return JSON.parse(itemValue) as string[];
  } else {
    return [];
  }
};

export const setCompletedWordles = (word: string) => {
  const currentCompletedGames = getCompletedWordles();

  if (currentCompletedGames.includes(word)) return;

  const newCompletedGames = [...currentCompletedGames, word];
  localStorage.setItem(
    COMPLETED_WORDLES_KEY,
    JSON.stringify(newCompletedGames),
  );
};

export const clearWordleCompletions = () => {
  localStorage.removeItem(COMPLETED_WORDLES_KEY);
};
