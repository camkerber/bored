import {
  GameV2,
  CreateGameFormAction,
  CreateGameFormActionType,
  ConnectionV2,
} from "@bored/utils";
import {CREATE_GAME_FORM_CONTEXT_DEFAULT} from "./constants";

export const formReducer = (
  state: GameV2,
  action: CreateGameFormAction,
): GameV2 => {
  switch (action.type) {
    case CreateGameFormActionType.ResetForm: {
      return {...CREATE_GAME_FORM_CONTEXT_DEFAULT.newGame};
    }
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
