import {shuffleArray, Category, Connection} from "@bored/utils";

const ALL_CATEGORIES = Object.values(Category);

export const initializeOptions = (connections: Connection[]): string[] =>
  shuffleArray(connections.flatMap((connection) => connection.options));

export const buildGuessKey = (selections: string[]): string =>
  [...selections].sort().join(" ");

export interface GuessEvaluation {
  bestCategory: Category;
  bestCount: number;
  guessesByColor: Category[];
}

export const evaluateGuess = (
  selections: string[],
  connections: Connection[],
): GuessEvaluation => {
  const count: Record<Category, number> = {
    [Category.Yellow]: 0,
    [Category.Green]: 0,
    [Category.Blue]: 0,
    [Category.Purple]: 0,
  };
  const guessesByColor: Category[] = [];

  selections.forEach((selection) => {
    connections.forEach((connection) => {
      if (connection.options.includes(selection)) {
        count[connection.category] += 1;
        guessesByColor.push(connection.category);
      }
    });
  });

  const bestCategory = ALL_CATEGORIES.reduce((a, b) =>
    count[a] > count[b] ? a : b,
  );

  return {bestCategory, bestCount: count[bestCategory], guessesByColor};
};

export const unsolvedCategories = (solved: Category[]): Category[] =>
  ALL_CATEGORIES.filter((category) => !solved.includes(category));

export const optionsForCategory = (
  connections: Connection[],
  category: Category,
): string[] =>
  connections.find((connection) => connection.category === category)?.options ??
  [];
