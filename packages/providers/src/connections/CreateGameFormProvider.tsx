import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import {
  CreateGameForm,
  CreateGameFormActionType,
  delay,
  FormResetSignal,
  GameFormField,
  GameFormFieldValidity,
} from "@bored/utils";
import {formReducer} from "./formReducer";
import {CREATE_GAME_FORM_CONTEXT_DEFAULT, FORM_VALIDITY_MAP} from "./constants";
import {CreateGameFormContext} from "./useCreateGameFormContext";

export const CreateGameFormProvider = ({children}: PropsWithChildren) => {
  const [formIsValid, setFormIsValid] = useState<boolean>(false);
  const [formFieldValidity, setFormFieldValidity] =
    useState<GameFormFieldValidity>(FORM_VALIDITY_MAP);
  const [formResetSignal, setFormResetSignal] =
    useState<FormResetSignal>("static");

  const [state, dispatch] = useReducer(
    formReducer,
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

  const resetForm = useCallback(async () => {
    setFormResetSignal("reset");
    setFormIsValid(false);
    setFormFieldValidity(FORM_VALIDITY_MAP);
    dispatch({
      type: CreateGameFormActionType.ResetForm,
      payload: {resetForm: true},
    });
    await delay(500);
    setFormResetSignal("static");
  }, []);

  const createGameForm: CreateGameForm = useMemo(() => {
    return {
      formIsValid,
      newGame: state,
      updateGameForm: dispatch,
      setFormFieldValid,
      resetForm,
      formResetSignal,
    };
  }, [formIsValid, setFormFieldValid, state, resetForm, formResetSignal]);

  return (
    <CreateGameFormContext.Provider value={createGameForm}>
      {children}
    </CreateGameFormContext.Provider>
  );
};
