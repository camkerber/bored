export enum CharGuessStatus {
  Unguessed = "unguessed",
  WrongPosition = "wrong_position",
  NotInTheWord = "not_in_the_word",
  Correct = "correct",
}

export interface WordleCharacter {
  character: string;
  status: CharGuessStatus;
}

export type WordleGuess = [
  WordleCharacter,
  WordleCharacter,
  WordleCharacter,
  WordleCharacter,
  WordleCharacter,
];

export type WordleGame = [
  WordleGuess,
  WordleGuess,
  WordleGuess,
  WordleGuess,
  WordleGuess,
  WordleGuess,
];
