const COMPLETED_GAMES_KEY = "completedGames";

export const getCompletedGames = (): string[] => {
  const itemValue = localStorage.getItem(COMPLETED_GAMES_KEY);
  if (itemValue) {
    return JSON.parse(itemValue) as string[];
  } else {
    return [];
  }
};

export const setCompletedGames = (gameId: string) => {
  const currentCompletedGames = getCompletedGames();

  if (currentCompletedGames.includes(gameId)) return;

  const newCompletedGames = [...currentCompletedGames, gameId];
  localStorage.setItem(COMPLETED_GAMES_KEY, JSON.stringify(newCompletedGames));
};

export const clearCompletedGames = () => {
  localStorage.removeItem(COMPLETED_GAMES_KEY);
};
