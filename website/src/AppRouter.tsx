import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./App";
import {Home} from "@bored/home";
import {ErrorPage} from "@bored/ui";
import {PROJECTS_MAP} from "@bored/utils";
import {AuthenticationInit} from "@bored/ui";
import {Connections, GameCreator, Archive} from "@bored/connections";
import {WordleWrapper} from "@bored/wordle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: `${PROJECTS_MAP.connections.path}/:gameId?`,
        element: (
          <AuthenticationInit>
            <Connections />
          </AuthenticationInit>
        ),
      },
      {
        path: `${PROJECTS_MAP.connections.path}/create`,
        element: <GameCreator />,
      },
      {
        path: `${PROJECTS_MAP.connections.path}/archive`,
        element: (
          <AuthenticationInit>
            <Archive />
          </AuthenticationInit>
        ),
      },
      {
        path: `${PROJECTS_MAP.wordle.path}/:wordValue?`,
        element: (
          <AuthenticationInit>
            <WordleWrapper />
          </AuthenticationInit>
        ),
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
