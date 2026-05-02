import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {App} from "./App";
import {Home} from "@bored/ui";
import {ErrorPage, withSuspense} from "@bored/ui";
import {PROJECTS_MAP} from "@bored/utils";
import {Connections, Archive} from "@bored/connections";
import {Wordle} from "@bored/wordle";
import {Spotify, SpotifyCallback} from "@bored/spotify";

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
        element: withSuspense(<Connections />),
      },
      {
        path: `${PROJECTS_MAP.connections.path}/archive`,
        element: withSuspense(<Archive />),
      },
      {
        path: `${PROJECTS_MAP.wordle.path}/:wordValue?`,
        element: withSuspense(<Wordle />),
      },
      {
        path: `${PROJECTS_MAP.spotify.path}`,
        element: withSuspense(<Spotify />),
      },
      {
        path: `${PROJECTS_MAP.spotify.path}/callback`,
        element: <SpotifyCallback />,
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
