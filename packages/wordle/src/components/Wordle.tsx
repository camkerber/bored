import {useCallback, useEffect, useState} from "react";
import {
  ALL_KEYS,
  CharGuessStatus,
  DELETE_STRING,
  SUBMIT_STRING,
  WORDLE_MAP,
  WordleGame,
} from "../utils";
import {GuessBoard} from "./GuessBoard";
import {Keyboard} from "./Keyboard";
import {useGetWordleDictionary} from "@bored/api";
import {
  getRandomArrayItem,
  getCompletedWordles,
  setCompletedWordles,
} from "@bored/utils";
import {Button, CircularProgress} from "@mui/material";
import {ResultsModal} from "./ResultsModal";
import {useSnackbar} from "notistack";

export const Wordle = () => {
  const {data, loading} = useGetWordleDictionary();

  const [openResultsModal, setOpenResultsModal] = useState<boolean>(false);
  const {enqueueSnackbar} = useSnackbar();

  const [guessCount, setGuessCount] = useState<number>(0);
  const [charCount, setCharCount] = useState<number>(0);
  const [guesses, setGuesses] = useState<WordleGame>(WORDLE_MAP);
  const [wordToGuess, setWordToGuess] = useState<string>("");
  const [guessedWords, setGuessedWords] = useState<string[]>([]);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [charsNotInWord, setCharsNotInWord] = useState<string[]>([]);
  const [globalCorrectLetters, setGlobalCorrectLetters] = useState<string[]>(
    [],
  );

  const handleGetNewWord = () => {
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
  };

  const getRandomWord = useCallback((): string | undefined => {
    if (!loading && data) {
      const randomWord = getRandomArrayItem(Object.values(data));
      const completedGames = getCompletedWordles();
      if (completedGames) {
        if (completedGames.includes(randomWord)) {
          getRandomWord();
        } else {
          return randomWord;
        }
      } else {
        return randomWord;
      }
    }
  }, [data, loading]);

  useEffect(() => {
    const word = getRandomWord();
    if (word) {
      console.log(word.toUpperCase());
      setWordToGuess(word.toUpperCase());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (guessCount === 6) {
      setGameCompleted(true);
    }
  }, [guessCount]);

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
      });
      return;
    }

    if (data && !(userGuess.toLowerCase() in data)) {
      enqueueSnackbar("Word cannot be guessed", {
        key: Math.random(),
        variant: "info",
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
      setGameCompleted(true);
      const completions = getCompletedWordles();
      if (completions) {
        setCompletedWordles(wordToGuess);
      } else {
        setCompletedWordles(wordToGuess);
      }
      setTimeout(() => {
        setOpenResultsModal(true);
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
    data,
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

  useEffect(() => {
    window.addEventListener("keydown", handleUserType);

    return () => {
      window.removeEventListener("keydown", handleUserType);
    };
  }, [handleUserType]);

  return (
    <>
      {loading ? (
        <CircularProgress size={50} />
      ) : (
        <>
          <GuessBoard guesses={guesses} />
          <Keyboard
            onNewChar={handleNewChar}
            gameCompleted={gameCompleted}
            charsNotInWord={charsNotInWord}
          />
          <ResultsModal
            open={openResultsModal}
            onClose={() => setOpenResultsModal(false)}
            onGetNewWord={handleGetNewWord}
            guesses={guesses}
          />
          {gameCompleted ? (
            <Button
              size="large"
              variant="outlined"
              sx={{mb: 3}}
              onClick={handleGetNewWord}
            >
              New Game
            </Button>
          ) : null}
        </>
      )}
    </>
  );
};
