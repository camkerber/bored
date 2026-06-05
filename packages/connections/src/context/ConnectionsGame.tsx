import {useSnackbar} from "notistack";
import {createContext, PropsWithChildren, useEffect, useState} from "react";
import {setCompletedGames, shuffleArray, Category, Game} from "@bored/utils";
import {
  buildGuessKey,
  evaluateGuess,
  initializeOptions,
  optionsForCategory,
  unsolvedCategories,
} from "../utils";

const MAX_MISTAKES = 4;
const TOTAL_CATEGORIES = 4;
const FLASH_DURATION_MS = 600;
const SHAKE_DURATION_MS = 500;
const RESULTS_REVEAL_DELAY_MS = 1000;

export interface ConnectionsGameState {
  activeGame: Game;
  options: string[];
  selections: string[];
  selectionsComplete: boolean;
  incorrectGuessCount: number;
  solvedCategories: Category[];
  gameCompleted: boolean;
  shareableResults: Category[]; // every 4 elements is one guess
  shakeAnimation: boolean;
  flashCategory: Category | null;
}

export interface ConnectionsGameActions {
  submit: () => void;
  shuffleOptions: () => void;
  selectOption: (option: string) => void;
}

export const ConnectionsGameStateContext = createContext<
  ConnectionsGameState | undefined
>(undefined);

export const ConnectionsGameActionsContext = createContext<
  ConnectionsGameActions | undefined
>(undefined);

interface ConnectionsGameProviderProps extends PropsWithChildren {
  game: Game;
}

export const ConnectionsGameProvider = ({
  game,
  children,
}: ConnectionsGameProviderProps) => {
  const {enqueueSnackbar} = useSnackbar();

  const [options, setOptions] = useState<string[]>(() =>
    initializeOptions(game.connections),
  );
  const [selections, setSelections] = useState<string[]>([]);
  const [pastGuesses, setPastGuesses] = useState<string[]>([]);
  const [incorrectGuessCount, setIncorrectGuessCount] = useState<number>(0);
  const [solvedCategories, setSolvedCategories] = useState<Category[]>([]);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [shareableResults, setShareableResults] = useState<Category[]>([]);
  const [shakeAnimation, setShakeAnimation] = useState<boolean>(false);
  const [flashCategory, setFlashCategory] = useState<Category | null>(null);

  const shuffleOptions = () => {
    setOptions((prevOptions) => shuffleArray(prevOptions));
  };

  const selectOption = (option: string) => {
    setSelections((prevSelections) =>
      prevSelections.includes(option)
        ? prevSelections.filter((prevSelection) => prevSelection !== option)
        : [...prevSelections, option],
    );
  };

  // Out of mistakes: reveal the remaining categories and end the game.
  const endGame = () => {
    setOptions([]);
    setSolvedCategories((prev) => [...prev, ...unsolvedCategories(prev)]);
    setGameCompleted(true);
  };

  const submit = () => {
    const guessKey = buildGuessKey(selections);
    if (pastGuesses.includes(guessKey)) {
      enqueueSnackbar("You've already made that guess", {
        key: "duplicate-guess",
        variant: "info",
        preventDuplicate: true,
        autoHideDuration: 2000,
      });
      return;
    }
    setPastGuesses((prev) => [...prev, guessKey]);

    const {bestCategory, bestCount, guessesByColor} = evaluateGuess(
      selections,
      game.connections,
    );

    // save guesses for sharing
    setShareableResults((prev) => [...prev, ...guessesByColor]);

    if (bestCount === 4) {
      // flash the winning row; the reveal/clear happens in an effect so the
      // timer can be cancelled if the player navigates away mid-animation.
      setFlashCategory(bestCategory);
      return;
    }

    const newCount = incorrectGuessCount + 1;
    setIncorrectGuessCount(newCount);
    setShakeAnimation(true);
    enqueueSnackbar(bestCount === 3 ? "One away..." : "Not quite...", {
      key: bestCount === 3 ? "one-away" : "not-quite",
      variant: "info",
      preventDuplicate: true,
      autoHideDuration: 2000,
    });
    if (newCount === MAX_MISTAKES) endGame();
  };

  // Reveal a fully-correct guess after the flash animation finishes.
  useEffect(() => {
    if (flashCategory === null) return;
    const category = flashCategory;
    const timer = setTimeout(() => {
      const completedOptions = optionsForCategory(game.connections, category);
      setSelections([]);
      setOptions((prev) =>
        prev.filter((option) => !completedOptions.includes(option)),
      );
      setSolvedCategories((prev) => [...prev, category]);
      setFlashCategory(null);
    }, FLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, [flashCategory, game.connections]);

  // Reset the shake animation once it has played.
  useEffect(() => {
    if (!shakeAnimation) return;
    const timer = setTimeout(() => setShakeAnimation(false), SHAKE_DURATION_MS);
    return () => clearTimeout(timer);
  }, [shakeAnimation]);

  // All categories solved: persist completion and reveal results after
  // a short pause so the final row's reveal is visible first. The loss path
  // (endGame) sets `gameCompleted` in the same commit, so this is skipped there
  // and the game is only ever marked completed on a win.
  useEffect(() => {
    if (solvedCategories.length < TOTAL_CATEGORIES || gameCompleted) return;
    setCompletedGames(game.id);
    const timer = setTimeout(
      () => setGameCompleted(true),
      RESULTS_REVEAL_DELAY_MS,
    );
    return () => clearTimeout(timer);
  }, [solvedCategories.length, gameCompleted, game.id]);

  const selectionsComplete = selections.length === 4;

  const state: ConnectionsGameState = {
    activeGame: game,
    options,
    selections,
    selectionsComplete,
    incorrectGuessCount,
    solvedCategories,
    gameCompleted,
    shareableResults,
    shakeAnimation,
    flashCategory,
  };

  const actions: ConnectionsGameActions = {
    submit,
    shuffleOptions,
    selectOption,
  };

  return (
    <ConnectionsGameActionsContext.Provider value={actions}>
      <ConnectionsGameStateContext.Provider value={state}>
        {children}
      </ConnectionsGameStateContext.Provider>
    </ConnectionsGameActionsContext.Provider>
  );
};
