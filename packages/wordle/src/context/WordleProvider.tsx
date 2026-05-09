import {
  getCompletedWordles,
  setCompletedWordles,
  getRandomArrayItem,
  clearWordleCompletions,
  useNavigateToWordlePath,
  WordleDictionary,
  WordleGame as WordleBoard,
  WordleGuess,
  CharGuessStatus,
} from "@bored/utils";
import {useSnackbar} from "notistack";
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import {DELETE_STRING, SUBMIT_STRING, ALL_KEYS, DICT_LENGTH} from "../utils";

export interface WordleGameContext {
  charsNotInWord: ReadonlySet<string>;
  guesses: WordleBoard;
  gameCompleted: boolean;
  openResultsModal: boolean;
  wordToGuess: string;
  wordleDict: WordleDictionary;
  setOpenResultsModal: (open: boolean) => void;
  handleNewChar: (char: string) => void;
  handleGetNewWord: () => void;
}

export const WordleContext = createContext<WordleGameContext | undefined>(
  undefined,
);

const createEmptyRow = (): WordleGuess => [
  {character: "", status: CharGuessStatus.Unguessed},
  {character: "", status: CharGuessStatus.Unguessed},
  {character: "", status: CharGuessStatus.Unguessed},
  {character: "", status: CharGuessStatus.Unguessed},
  {character: "", status: CharGuessStatus.Unguessed},
];

const createEmptyBoard = (): WordleBoard => [
  createEmptyRow(),
  createEmptyRow(),
  createEmptyRow(),
  createEmptyRow(),
  createEmptyRow(),
  createEmptyRow(),
];

interface ClassifiedGuess {
  row: WordleGuess;
  newCorrect: string[];
  newNotInWord: string[];
}

const classifyGuess = (
  guess: WordleGuess,
  target: string,
  globalCorrect: ReadonlySet<string>,
): ClassifiedGuess => {
  const targetChars = target.split("");
  const targetSet = new Set(targetChars);
  const row: WordleGuess = [
    {...guess[0]},
    {...guess[1]},
    {...guess[2]},
    {...guess[3]},
    {...guess[4]},
  ];

  const localCorrect = new Set<string>();
  const wrongPosition = new Set<string>();
  const newCorrect: string[] = [];
  const newNotInWord: string[] = [];

  for (let i = 0; i < row.length; i++) {
    if (targetChars[i] === row[i].character) {
      row[i].status = CharGuessStatus.Correct;
      localCorrect.add(row[i].character);
      newCorrect.push(row[i].character);
    }
  }

  for (let i = 0; i < row.length; i++) {
    if (row[i].status === CharGuessStatus.Correct) continue;
    const ch = row[i].character;
    if (!targetSet.has(ch)) {
      row[i].status = CharGuessStatus.NotInTheWord;
      newNotInWord.push(ch);
    } else if (
      !localCorrect.has(ch) &&
      !globalCorrect.has(ch) &&
      !wrongPosition.has(ch)
    ) {
      row[i].status = CharGuessStatus.WrongPosition;
      wrongPosition.add(ch);
    } else {
      row[i].status = CharGuessStatus.NotInTheWord;
    }
  }

  return {row, newCorrect, newNotInWord};
};

const markRowCorrect = (guess: WordleGuess): WordleGuess => [
  {...guess[0], status: CharGuessStatus.Correct},
  {...guess[1], status: CharGuessStatus.Correct},
  {...guess[2], status: CharGuessStatus.Correct},
  {...guess[3], status: CharGuessStatus.Correct},
  {...guess[4], status: CharGuessStatus.Correct},
];

const replaceRow = (
  board: WordleBoard,
  index: number,
  row: WordleGuess,
): WordleBoard => {
  const next = [...board] as WordleBoard;
  next[index] = row;
  return next;
};

const resolveInitialWord = (
  wordleDict: WordleDictionary,
  wordIndexFromRoute: string,
): string => {
  const keys = Object.keys(wordleDict);
  if (keys.length === 0) return "";

  if (Number(wordIndexFromRoute) > DICT_LENGTH) {
    return (getRandomArrayItem(keys) ?? keys[0]).toUpperCase();
  }

  const found = Object.entries(wordleDict).find(
    ([, idx]) => idx === wordIndexFromRoute,
  )?.[0];
  return found ? found.toUpperCase() : "";
};

export interface WordleProviderProps extends PropsWithChildren {
  wordleDict: WordleDictionary;
  wordIndexFromRoute: string;
}

export const WordleProvider = ({
  wordleDict,
  wordIndexFromRoute,
  children,
}: WordleProviderProps) => {
  const {enqueueSnackbar} = useSnackbar();
  const navigateTo = useNavigateToWordlePath();

  const [charsNotInWord, setCharsNotInWord] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const [globalCorrectLetters, setGlobalCorrectLetters] = useState<string[]>(
    [],
  );
  const [guessedWords, setGuessedWords] = useState<string[]>([]);
  const [wordToGuess, setWordToGuess] = useState<string>(() =>
    resolveInitialWord(wordleDict, wordIndexFromRoute),
  );
  const [guessCount, setGuessCount] = useState<number>(0);
  const [charCount, setCharCount] = useState<number>(0);
  const [guesses, setGuesses] = useState<WordleBoard>(() => createEmptyBoard());

  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [openResultsModal, setOpenResultsModal] = useState<boolean>(false);
  const finishTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getRandomWord = (): string | undefined => {
    const allWords = Object.keys(wordleDict);
    const completedGames = getCompletedWordles();
    if (completedGames?.length === DICT_LENGTH) {
      clearWordleCompletions();
      return getRandomArrayItem(allWords);
    }
    const available = completedGames
      ? allWords.filter((w) => !completedGames.includes(w))
      : allWords;
    return getRandomArrayItem(available.length > 0 ? available : allWords);
  };

  const resetGame = () => {
    if (finishTimerRef.current) {
      clearTimeout(finishTimerRef.current);
      finishTimerRef.current = null;
    }
    setGuessCount(0);
    setCharCount(0);
    setGameCompleted(false);
    setCharsNotInWord(new Set());
    setGuessedWords([]);
    setGlobalCorrectLetters([]);
    setGuesses(createEmptyBoard());
  };

  const handleGetNewWord = () => {
    resetGame();
    const word = getRandomWord();
    if (word) {
      setWordToGuess(word.toUpperCase());
      navigateTo(wordleDict[word]);
    }
  };

  const finishGame = () => {
    if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
    finishTimerRef.current = setTimeout(() => {
      setOpenResultsModal(true);
      setGameCompleted(true);
      finishTimerRef.current = null;
    }, 1800);
  };

  useEffect(
    () => () => {
      if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
    },
    [],
  );

  const handleGuess = () => {
    const currentRow = guesses[guessCount];
    const userGuess = currentRow.map((c) => c.character).join("");

    if (guessedWords.includes(userGuess)) {
      enqueueSnackbar("Word was already guessed", {
        key: "word-already-guessed",
        variant: "info",
        autoHideDuration: 2000,
      });
      return;
    }

    if (!(userGuess.toLowerCase() in wordleDict)) {
      enqueueSnackbar("Word cannot be guessed", {
        key: "word-not-in-dict",
        variant: "info",
        autoHideDuration: 2000,
      });
      return;
    }

    if (userGuess === wordToGuess) {
      setGuesses((prev) =>
        replaceRow(prev, guessCount, markRowCorrect(prev[guessCount])),
      );
      setCompletedWordles(wordToGuess);
      finishGame();
      setGuessCount((prev) => prev + 1);
      setCharCount(0);
      return;
    }

    const {row, newCorrect, newNotInWord} = classifyGuess(
      currentRow,
      wordToGuess,
      new Set(globalCorrectLetters),
    );

    setGuesses((prev) => replaceRow(prev, guessCount, row));
    setGuessedWords((prev) => [...prev, userGuess]);
    if (newCorrect.length > 0) {
      setGlobalCorrectLetters((prev) => [...prev, ...newCorrect]);
    }
    if (newNotInWord.length > 0) {
      setCharsNotInWord((prev) => {
        const next = new Set(prev);
        for (const c of newNotInWord) next.add(c);
        return next;
      });
    }
    setGuessCount((prev) => {
      const next = prev + 1;
      if (next === 6) finishGame();
      return next;
    });
    setCharCount(0);
  };

  const handleNewChar = (char: string) => {
    if (guessCount === 6) return;

    if (char === SUBMIT_STRING) {
      if (charCount !== 5) {
        enqueueSnackbar("Each guess must be 5 letters", {
          key: "guess-too-short",
          variant: "info",
          autoHideDuration: 2000,
        });
        return;
      }
      handleGuess();
      return;
    }

    if (char === DELETE_STRING) {
      if (charCount === 0) return;
      setGuesses((prev) => {
        const row = [...prev[guessCount]] as WordleGuess;
        row[charCount - 1] = {...row[charCount - 1], character: ""};
        return replaceRow(prev, guessCount, row);
      });
      setCharCount((prev) => prev - 1);
      return;
    }

    if (charCount === 5) return;

    setGuesses((prev) => {
      const row = [...prev[guessCount]] as WordleGuess;
      row[charCount] = {...row[charCount], character: char};
      return replaceRow(prev, guessCount, row);
    });
    setCharCount((prev) => prev + 1);
  };

  const onNewChar = useEffectEvent((char: string) => handleNewChar(char));

  useEffect(() => {
    const handleUserType = (event: KeyboardEvent) => {
      const key = event.key;
      const char =
        key === "Enter"
          ? SUBMIT_STRING
          : key === "Backspace"
            ? DELETE_STRING
            : key.toUpperCase();

      if (char === SUBMIT_STRING) event.preventDefault();

      if (ALL_KEYS.includes(char)) {
        onNewChar(char);
      }
    };

    window.addEventListener("keydown", handleUserType);
    return () => window.removeEventListener("keydown", handleUserType);
  }, []);

  const wordleGame: WordleGameContext = {
    charsNotInWord,
    guesses,
    gameCompleted,
    openResultsModal,
    wordToGuess,
    wordleDict,
    setOpenResultsModal,
    handleNewChar,
    handleGetNewWord,
  };

  return (
    <WordleContext.Provider value={wordleGame}>
      {children}
    </WordleContext.Provider>
  );
};
