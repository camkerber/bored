import {
  WordleDictionary,
  WordleGame as WordleBoard,
  CharGuessStatus,
  getCompletedWordles,
  setCompletedWordles,
  getRandomArrayItem,
  clearWordleCompletions,
  useNavigateToWordlePath,
} from "@bored/utils";
import {useSnackbar} from "notistack";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  WORDLE_MAP,
  DELETE_STRING,
  SUBMIT_STRING,
  ALL_KEYS,
  DICT_LENGTH,
} from "./constants";

export interface WordleGameContext {
  charsNotInWord: string[];
  guesses: WordleBoard;
  gameCompleted: boolean;
  openResultsModal: boolean;
  wordToGuess: string;
  wordleDict: WordleDictionary;
  setOpenResultsModal: (open: boolean) => void;
  handleNewChar: (char: string) => void;
  handleGetNewWord: () => void;
}

const DEFAULT_WORDLE_CONTEXT: WordleGameContext = {
  charsNotInWord: [],
  guesses: WORDLE_MAP,
  gameCompleted: false,
  openResultsModal: false,
  wordToGuess: "",
  wordleDict: {},
  setOpenResultsModal: () => {},
  handleNewChar: () => {},
  handleGetNewWord: () => {},
};

export const WordleContext = createContext(DEFAULT_WORDLE_CONTEXT);

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

  const [charsNotInWord, setCharsNotInWord] = useState<string[]>([]);
  const [globalCorrectLetters, setGlobalCorrectLetters] = useState<string[]>(
    [],
  );
  const [guessedWords, setGuessedWords] = useState<string[]>([]);

  const [wordToGuess, setWordToGuess] = useState<string>("");
  const [guessCount, setGuessCount] = useState<number>(0);
  const [charCount, setCharCount] = useState<number>(0);
  const [guesses, setGuesses] = useState<WordleBoard>(WORDLE_MAP);

  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [openResultsModal, setOpenResultsModal] = useState<boolean>(false);

  const getRandomWord = useCallback((): string | undefined => {
    if (wordleDict) {
      const randomWord = getRandomArrayItem(Object.keys(wordleDict));
      const completedGames = getCompletedWordles();
      if (completedGames) {
        // all wordles complete
        if (completedGames.length === DICT_LENGTH) {
          clearWordleCompletions();
          return randomWord;
        } else if (completedGames.includes(randomWord)) {
          getRandomWord();
        } else {
          return randomWord;
        }
      } else {
        return randomWord;
      }
    }
  }, [wordleDict]);

  const handleGetNewWord = useCallback(() => {
    // reset
    setGuessCount(0);
    setCharCount(0);
    setGameCompleted(false);
    setCharsNotInWord([]);
    setGuessedWords([]);
    setGlobalCorrectLetters([]);

    // find new game
    const word = getRandomWord();
    if (word) {
      console.log(word.toUpperCase());
      setWordToGuess(word.toUpperCase());
      navigateTo(wordleDict[word]);
    }

    setGuesses((prevState) => {
      prevState.forEach((row) => {
        row.forEach((charObj) => {
          charObj.character = "";
          charObj.status = CharGuessStatus.Unguessed;
        });
      });
      return prevState;
    });
  }, [getRandomWord, navigateTo, wordleDict]);

  const handleGuess = useCallback(() => {
    // build word from guesses
    const currentGuess = guesses[guessCount];
    const userGuess = currentGuess
      .map((charObj) => {
        return charObj.character;
      })
      .join("");

    if (guessedWords.includes(userGuess)) {
      // INTERACT: word already guessed
      enqueueSnackbar("Word was already guessed", {
        key: Math.random(),
        variant: "info",
        autoHideDuration: 2000,
      });
      return;
    }

    if (wordleDict && !(userGuess.toLowerCase() in wordleDict)) {
      enqueueSnackbar("Word cannot be guessed", {
        key: Math.random(),
        variant: "info",
        autoHideDuration: 2000,
      });
      return;
    }

    if (userGuess === wordToGuess) {
      // INTERACT: success
      setGuesses((prevGuesses) => {
        for (let i = 0; i < prevGuesses[guessCount].length; i++) {
          prevGuesses[guessCount][i].status = CharGuessStatus.Correct;
        }
        return prevGuesses;
      });
      const completions = getCompletedWordles();
      if (completions) {
        setCompletedWordles(wordToGuess);
      } else {
        setCompletedWordles(wordToGuess);
      }
      setTimeout(() => {
        setOpenResultsModal(true);
        setGameCompleted(true);
      }, 1000);
    } else {
      setGuessedWords((prevWords) => [...prevWords, userGuess]);
      // update character status
      setGuesses((prevGuesses) => {
        const activeGuess = prevGuesses[guessCount];
        const wordToGuessAsArray = wordToGuess.split("");
        const localCorrectLetters: string[] = [];
        const wrongPositionLetters: string[] = [];

        // mark correct letters
        activeGuess.forEach((charObj, i) => {
          wordToGuessAsArray.forEach((charToGuess, j) => {
            if (charToGuess === charObj.character && i === j) {
              prevGuesses[guessCount][i].status = CharGuessStatus.Correct;
              localCorrectLetters.push(prevGuesses[guessCount][i].character);
              setGlobalCorrectLetters((prevLetters) => [
                ...prevLetters,
                prevGuesses[guessCount][i].character,
              ]);
            }
          });
        });

        // mark wrong position letters (only first one)
        activeGuess.forEach((charObj, i) => {
          // letter is in the word, has not been marked correct, and has not been marked as in the wrong position
          if (
            wordToGuessAsArray.includes(charObj.character) &&
            !localCorrectLetters.includes(charObj.character) &&
            !globalCorrectLetters.includes(charObj.character) &&
            !wrongPositionLetters.includes(charObj.character)
          ) {
            prevGuesses[guessCount][i].status = CharGuessStatus.WrongPosition;
            wrongPositionLetters.push(charObj.character);
          } else {
            prevGuesses[guessCount][i].status = CharGuessStatus.NotInTheWord;
          }
        });

        // re-mark correct letters
        activeGuess.forEach((charObj, i) => {
          wordToGuessAsArray.forEach((charToGuess, j) => {
            if (charToGuess === charObj.character && i === j) {
              prevGuesses[guessCount][i].status = CharGuessStatus.Correct;
              localCorrectLetters.push(prevGuesses[guessCount][i].character);
              setGlobalCorrectLetters((prevLetters) => [
                ...prevLetters,
                prevGuesses[guessCount][i].character,
              ]);
            }
          });
        });

        // mark not in word letters
        activeGuess.forEach((charObj, i) => {
          if (!wordToGuessAsArray.includes(charObj.character)) {
            prevGuesses[guessCount][i].status = CharGuessStatus.NotInTheWord;
            setCharsNotInWord((prevState) => [
              ...prevState,
              prevGuesses[guessCount][i].character,
            ]);
          }
        });

        return prevGuesses;
      });
    }

    setGuessCount(guessCount + 1);
    setCharCount(0);
  }, [
    globalCorrectLetters,
    wordleDict,
    enqueueSnackbar,
    guessCount,
    guessedWords,
    guesses,
    wordToGuess,
  ]);

  const handleNewChar = useCallback(
    (char: string) => {
      // game already complete
      if (guessCount === 6) {
        return;
      }

      if (char === SUBMIT_STRING) {
        if (charCount !== 5) {
          // INTERACT: word is incomplete
          enqueueSnackbar("Each guess must be 5 letters", {
            key: Math.random(),
            variant: "info",
            autoHideDuration: 2000,
          });
          return;
        }
        handleGuess(); // submit guess
        return;
      } else if (charCount === 5 && char !== DELETE_STRING) {
        // max characters reached
        return;
      }

      setGuesses((prevGuesses) => {
        if (char === DELETE_STRING) {
          // cannot delete before 0
          if (charCount === 0) {
            return prevGuesses;
          }

          // delete last character from current guess
          prevGuesses[guessCount][charCount - 1].character = "";
          setCharCount(charCount - 1);
          return prevGuesses;
        } else {
          // add new character to current guess
          prevGuesses[guessCount][charCount].character = char;
          setCharCount(charCount + 1);
          return prevGuesses;
        }
      });
    },
    [charCount, enqueueSnackbar, guessCount, handleGuess],
  );

  const handleUserType = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key;
      const char =
        key === "Enter"
          ? SUBMIT_STRING
          : key === "Backspace"
            ? DELETE_STRING
            : key.toUpperCase();

      if (ALL_KEYS.includes(char)) {
        handleNewChar(char);
      }
    },
    [handleNewChar],
  );

  const getSpecificWord = (numValue: string): string => {
    let word = "";
    if (Number(numValue) > DICT_LENGTH) {
      return getRandomWord() ?? wordleDict[69];
    }

    Object.keys(wordleDict).forEach((key) => {
      if (wordleDict[key] === numValue.toString()) {
        word = key;
      }
    });
    return word;
  };

  useEffect(() => {
    const word = getSpecificWord(wordIndexFromRoute);
    if (word) {
      console.log(word.toUpperCase());
      setWordToGuess(word.toUpperCase());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (guessCount === 6) {
      setGameCompleted(true);
    }
  }, [guessCount]);

  useEffect(() => {
    window.addEventListener("keydown", handleUserType);

    return () => {
      window.removeEventListener("keydown", handleUserType);
    };
  }, [handleUserType]);

  const wordleGame: WordleGameContext = useMemo(
    () => ({
      charsNotInWord,
      guesses,
      gameCompleted,
      openResultsModal,
      wordToGuess,
      wordleDict,
      setOpenResultsModal,
      handleNewChar,
      handleGetNewWord,
    }),
    [
      charsNotInWord,
      gameCompleted,
      guesses,
      handleGetNewWord,
      handleNewChar,
      openResultsModal,
      wordToGuess,
      wordleDict,
    ],
  );

  return (
    <WordleContext.Provider value={wordleGame}>
      {children}
    </WordleContext.Provider>
  );
};
