import {useSnackbar} from "notistack";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  setCompletedGames,
  shuffleArray,
  Category,
  Connection,
  Game,
} from "@bored/utils";

export interface ConnectionsGame {
  activeGame: Game;
  submit: () => void;
  options: string[];
  shuffleOptions: () => void;
  selections: string[];
  selectOption: (option: string) => void;
  selectionsComplete: boolean;
  incorrectGuessCount: number;
  solvedCategories: Category[];
  gameCompleted: boolean;
  shareableResults: Category[]; // every 4 elements is one guess
  showShareResultsModal: boolean;
  setShowShareResultsModal: (show: boolean) => void;
  shakeAnimation: boolean;
  flashCategory: Category | null;
}

export const ConnectionsGameContext = createContext<
  ConnectionsGame | undefined
>(undefined);

const initializeOptions = (connections: Connection[]): string[] => {
  let allOptions: string[] = [];
  connections.forEach((connection) => {
    allOptions = [...allOptions, ...connection.options];
  });
  return shuffleArray(allOptions);
};

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
  const [showShareResultsModal, setShowShareResultsModal] =
    useState<boolean>(false);
  const [shakeAnimation, setShakeAnimation] = useState<boolean>(false);
  const [flashCategory, setFlashCategory] = useState<Category | null>(null);

  const shuffleOptions = useCallback(() => {
    setOptions((prevOptions) => shuffleArray(prevOptions));
  }, []);

  const handleSelectOption = useCallback((option: string) => {
    setSelections((prevSelections) => {
      if (!prevSelections.includes(option)) {
        return [...prevSelections, option];
      }
      return prevSelections.filter((prevSelection) => prevSelection !== option);
    });
  }, []);

  const handleCompletedCategory = useCallback(
    (category: Category) => {
      setSelections([]);

      // remove options of completed category from options state
      const completedCategoryOptions = game.connections.find(
        (connection) => connection.category === category,
      )?.options;
      setOptions((prevOptions) =>
        prevOptions.filter(
          (option) => !completedCategoryOptions?.includes(option),
        ),
      );

      setSolvedCategories((prevSolvedCats) => {
        // game completed
        if (prevSolvedCats.length === 3) {
          setGameCompleted(true);
          setCompletedGames(game.id);
          setTimeout(() => {
            setShowShareResultsModal(true);
          }, 1000);
        }
        return [...prevSolvedCats, category];
      });
    },
    [game.connections, game.id],
  );

  const handleSubmit = useCallback(() => {
    // find category with the most correct guesses
    const count: Record<Category, number> = {
      [Category.Yellow]: 0,
      [Category.Green]: 0,
      [Category.Blue]: 0,
      [Category.Purple]: 0,
    };

    const guessKey = [...selections].sort().join(" ");
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

    const guessesByColor: Category[] = [];
    selections.forEach((selection) => {
      game.connections.forEach((connection) => {
        if (connection.options.includes(selection)) {
          count[connection.category] += 1;
          guessesByColor.push(connection.category);
        }
      });
    });
    const categories = Object.keys(count) as Category[];
    const bestCategory = categories.reduce((a, b) =>
      count[a] > count[b] ? a : b,
    );
    const bestCount = count[bestCategory];

    // save guesses for sharing
    setShareableResults((prevGuesses) => [...prevGuesses, ...guessesByColor]);

    // show results to user
    const endGame = () => {
      setGameCompleted(true);
      setOptions([]);
      setSolvedCategories((prevSolvedCats) => {
        const unsolvedCats = Object.values(Category).filter(
          (category) => !prevSolvedCats.includes(category),
        );
        return [...prevSolvedCats, ...unsolvedCats];
      });
      setShowShareResultsModal(true);
    };

    if (bestCount === 4) {
      setFlashCategory(bestCategory);
      setTimeout(() => {
        setFlashCategory(null);
        handleCompletedCategory(bestCategory);
      }, 600);
    } else if (bestCount === 3) {
      const newCount = incorrectGuessCount + 1;
      setIncorrectGuessCount(newCount);
      setShakeAnimation(true);
      setTimeout(() => setShakeAnimation(false), 500);
      enqueueSnackbar("One away...", {
        key: "one-away",
        variant: "info",
        preventDuplicate: true,
        autoHideDuration: 2000,
      });
      if (newCount === 4) endGame();
    } else {
      const newCount = incorrectGuessCount + 1;
      setIncorrectGuessCount(newCount);
      setShakeAnimation(true);
      setTimeout(() => setShakeAnimation(false), 500);
      enqueueSnackbar("Not quite...", {
        key: "not-quite",
        variant: "info",
        preventDuplicate: true,
        autoHideDuration: 2000,
      });
      if (newCount === 4) endGame();
    }
  }, [
    enqueueSnackbar,
    game.connections,
    handleCompletedCategory,
    incorrectGuessCount,
    selections,
    pastGuesses,
  ]);

  const selectionsComplete = selections.length === 4;

  const connectionsGame: ConnectionsGame = useMemo(
    () => ({
      activeGame: game,
      submit: handleSubmit,
      options,
      shuffleOptions,
      selections,
      selectOption: handleSelectOption,
      selectionsComplete,
      incorrectGuessCount,
      solvedCategories,
      gameCompleted,
      shareableResults,
      showShareResultsModal,
      setShowShareResultsModal,
      shakeAnimation,
      flashCategory,
    }),
    [
      game,
      gameCompleted,
      handleSelectOption,
      handleSubmit,
      incorrectGuessCount,
      options,
      selections,
      selectionsComplete,
      shareableResults,
      showShareResultsModal,
      shuffleOptions,
      solvedCategories,
      shakeAnimation,
      flashCategory,
    ],
  );

  return (
    <ConnectionsGameContext.Provider value={connectionsGame}>
      {children}
    </ConnectionsGameContext.Provider>
  );
};
