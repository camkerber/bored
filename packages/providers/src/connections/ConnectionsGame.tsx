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
  setCompletedGames,
  shuffleArray,
  CategoryV2,
  ConnectionV2,
  GameV2,
} from "@bored/utils";

export interface ConnectionsGame {
  activeGame: GameV2;
  submit: () => void;
  options: string[];
  shuffleOptions: () => void;
  selections: string[];
  selectOption: (option: string) => void;
  selectionsComplete: boolean;
  incorrectGuessCount: number;
  solvedCategories: CategoryV2[];
  gameCompleted: boolean;
  shareableResults: CategoryV2[]; // every 4 elements is one guess
  showShareResultsModal: boolean;
  setShowShareResultsModal: (show: boolean) => void;
}

const DEFAULT_CONNECTIONS_GAME: ConnectionsGame = {
  activeGame: {} as GameV2,
  submit: () => {},
  options: [],
  shuffleOptions: () => {},
  selections: [],
  selectOption: () => {},
  selectionsComplete: false,
  incorrectGuessCount: 0,
  solvedCategories: [],
  gameCompleted: false,
  shareableResults: [],
  showShareResultsModal: false,
  setShowShareResultsModal: () => {},
};

export const ConnectionsGameContext = createContext(DEFAULT_CONNECTIONS_GAME);

const initializeOptions = (connections: ConnectionV2[]): string[] => {
  let allOptions: string[] = [];
  connections.forEach((connection) => {
    allOptions = [...allOptions, ...connection.options];
  });
  return shuffleArray(allOptions) as string[];
};

interface ConnectionsGameProviderProps extends PropsWithChildren {
  game: GameV2;
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
  const [selectionsComplete, setSelectionsComplete] = useState<boolean>(false);
  const [incorrectGuessCount, setIncorrectGuessCount] = useState<number>(0);
  const [solvedCategories, setSolvedCategories] = useState<CategoryV2[]>([]);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [shareableResults, setShareableResults] = useState<CategoryV2[]>([]);
  const [showShareResultsModal, setShowShareResultsModal] =
    useState<boolean>(false);

  // reset board for new game
  useEffect(() => {
    setOptions(() => initializeOptions(game.connections));
    setSelections([]);
    setSelectionsComplete(false);
    setIncorrectGuessCount(0);
    setSolvedCategories([]);
    setGameCompleted(false);
    setShareableResults([]);
    setShowShareResultsModal(false);
  }, [game]);

  // end game on max incorrect guesses
  useEffect(() => {
    if (incorrectGuessCount === 4) {
      setOptions([]);
      setSolvedCategories((prevSolvedCats) => {
        const unsolvedCats = Object.values(CategoryV2).filter(
          (category) => !prevSolvedCats.includes(category),
        );
        return [...prevSolvedCats, ...unsolvedCats];
      });
      setShowShareResultsModal(true);
    }
  }, [incorrectGuessCount]);

  const shuffleOptions = useCallback(() => {
    setOptions((prevOptions) => shuffleArray(prevOptions) as string[]);
  }, []);

  const handleSelectOption = useCallback((option: string) => {
    setSelections((prevSelections) => {
      let newSelections = [];
      if (!prevSelections.includes(option)) {
        newSelections = [...prevSelections, option];
      } else {
        newSelections = prevSelections.filter(
          (prevSelection) => prevSelection !== option,
        );
      }
      if (newSelections.length === 4) {
        setSelectionsComplete(true);
      }
      return newSelections;
    });
  }, []);

  const handleCompletedCategory = useCallback(
    (category: CategoryV2) => {
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
    const count: Record<CategoryV2, number> = {
      [CategoryV2.Yellow]: 0,
      [CategoryV2.Green]: 0,
      [CategoryV2.Blue]: 0,
      [CategoryV2.Purple]: 0,
    };

    const guessesByColor: CategoryV2[] = [];
    selections.forEach((selection) => {
      game.connections.forEach((connection) => {
        if (connection.options.includes(selection)) {
          count[connection.category] += 1;
          guessesByColor.push(connection.category);
        }
      });
    });
    const bestCategory = Object.keys(count).reduce((a, b) =>
      count[a as CategoryV2] > count[b as CategoryV2] ? a : b,
    );
    const bestCount = count[bestCategory as CategoryV2];

    // save guesses for sharing
    setShareableResults((prevGuesses) => [...prevGuesses, ...guessesByColor]);

    // show results to user
    if (bestCount === 4) {
      handleCompletedCategory(bestCategory as CategoryV2);
    } else if (bestCount === 3) {
      setIncorrectGuessCount((prevGuessCount) => ++prevGuessCount);
      enqueueSnackbar("One away...", {
        key: Math.random(),
        variant: "info",
      });
    } else {
      setIncorrectGuessCount((prevGuessCount) => ++prevGuessCount);
      enqueueSnackbar("Not quite...", {
        key: Math.random(),
        variant: "info",
      });
    }
  }, [enqueueSnackbar, game.connections, handleCompletedCategory, selections]);

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
    ],
  );

  return (
    <ConnectionsGameContext.Provider value={connectionsGame}>
      {children}
    </ConnectionsGameContext.Provider>
  );
};
