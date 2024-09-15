import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import {
  CategoryV2,
  ConnectionV2,
  CreateGameFormAction,
  CreateGameFormActionType,
  GameFormField,
  GameFormFieldValidity,
  GameV2,
} from "@bored/utils";

const FORM_VALIDITY_MAP: GameFormFieldValidity = {
  [GameFormField.Title]: false,
  [GameFormField.Author]: true,
  [GameFormField.YellowName]: false,
  [GameFormField.GreenName]: false,
  [GameFormField.BlueName]: false,
  [GameFormField.PurpleName]: false,
  [GameFormField.YellowOptions]: false,
  [GameFormField.GreenOptions]: false,
  [GameFormField.BlueOptions]: false,
  [GameFormField.PurpleOptions]: false,
};

export interface CreateGameForm {
  formIsValid: boolean;
  newGame: GameV2;
  updateGameForm: (action: CreateGameFormAction) => void;
  setFormFieldValid: (isValid: boolean, formField: GameFormField) => void;
}

const CREATE_GAME_FORM_CONTEXT_DEFAULT: CreateGameForm = {
  formIsValid: false,
  newGame: {
    id: "",
    title: "",
    author: "",
    connections: [
      {
        category: CategoryV2.Yellow,
        description: "",
        options: [],
      },
      {
        category: CategoryV2.Green,
        description: "",
        options: [],
      },
      {
        category: CategoryV2.Blue,
        description: "",
        options: [],
      },
      {
        category: CategoryV2.Purple,
        description: "",
        options: [],
      },
    ],
  },
  updateGameForm: () => {},
  setFormFieldValid: () => {},
};

export const CreateGameFormContext = createContext(
  CREATE_GAME_FORM_CONTEXT_DEFAULT,
);

const reducer = (state: GameV2, action: CreateGameFormAction): GameV2 => {
  switch (action.type) {
    case CreateGameFormActionType.ChangeTitle: {
      return {
        ...state,
        title: action.payload.newTitle as string,
      };
    }
    case CreateGameFormActionType.ChangeAuthor: {
      return {
        ...state,
        author: action.payload.newAuthor as string,
      };
    }
    case CreateGameFormActionType.ChangeCategoryName: {
      const newCategoryNamePayload = action.payload.newCategoryName;
      if (newCategoryNamePayload) {
        const otherConnections: ConnectionV2[] = [];
        // @ts-expect-error assignment to empty object
        let currentConnection: ConnectionV2 = {};
        state.connections.forEach((connection) => {
          if (connection.category !== newCategoryNamePayload.category) {
            otherConnections.push(connection);
          } else {
            currentConnection = connection;
          }
        });

        return {
          ...state,
          connections: [
            ...otherConnections,
            {
              ...currentConnection,
              description: newCategoryNamePayload.newName,
            },
          ],
        };
      } else {
        throw Error('Property "connection" is missing from payload.');
      }
    }
    case CreateGameFormActionType.ChangeCategoryOptions: {
      const newCategoryOptionsPayload = action.payload.newCategoryOptions;
      if (newCategoryOptionsPayload) {
        const otherConnections: ConnectionV2[] = [];
        // @ts-expect-error assignment to empty object
        let currentConnection: ConnectionV2 = {};
        state.connections.forEach((connection) => {
          if (connection.category !== newCategoryOptionsPayload.category) {
            otherConnections.push(connection);
          } else {
            currentConnection = connection;
          }
        });

        return {
          ...state,
          connections: [
            ...otherConnections,
            {
              ...currentConnection,
              options: [...newCategoryOptionsPayload.newOptions],
            },
          ],
        };
      } else {
        throw Error('Property "option" is missing from payload.');
      }
    }
  }
};

export const CreateGameFormProvider = ({children}: PropsWithChildren) => {
  const [formIsValid, setFormIsValid] = useState<boolean>(false);
  const [formFieldValidity, setFormFieldValidity] =
    useState<GameFormFieldValidity>(FORM_VALIDITY_MAP);

  const [state, dispatch] = useReducer(
    reducer,
    CREATE_GAME_FORM_CONTEXT_DEFAULT.newGame,
  );

  useEffect(() => {
    setFormIsValid(
      Object.values(formFieldValidity).every((formField) => formField),
    );
  }, [formFieldValidity]);

  const setFormFieldValid = useCallback(
    (isValid: boolean, formField: GameFormField) => {
      setFormFieldValidity((prevState) => ({
        ...prevState,
        [formField]: isValid,
      }));
    },
    [],
  );

  const createGameForm = useMemo(() => {
    return {
      formIsValid,
      newGame: state,
      updateGameForm: dispatch,
      setFormFieldValid,
    };
  }, [formIsValid, setFormFieldValid, state]);

  return (
    <CreateGameFormContext.Provider value={createGameForm}>
      {children}
    </CreateGameFormContext.Provider>
  );
};
