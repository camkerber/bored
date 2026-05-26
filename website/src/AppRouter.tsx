import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {App} from "./App";
import {Home} from "@bored/ui";
import {ErrorPage, withSuspense} from "@bored/ui";
import {PROJECTS_MAP} from "@bored/utils";
import {Connections, Archive} from "@bored/connections";
import {Wordle} from "@bored/wordle";
import {Spotify, SpotifyCallback} from "@bored/spotify";
import {Watcher} from "@bored/watcher";
import {
  Bingo,
  BingoExpired,
  UserBoardScreen,
  bingoMintLoader,
  bingoUserBoardLoader,
} from "@bored/bingo";
import {
  DsaLanding,
  DsaAlgorithm,
  DsaDataStructure,
} from "@bored/dsa-visualized";

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
      {
        path: `${PROJECTS_MAP.dsa.path}`,
        element: withSuspense(<DsaLanding />),
      },
      {
        path: `${PROJECTS_MAP.dsa.path}/algorithm/:slug`,
        element: withSuspense(<DsaAlgorithm />),
      },
      {
        path: `${PROJECTS_MAP.dsa.path}/data-structure/:slug`,
        element: withSuspense(<DsaDataStructure />),
      },
      {
        path: `${PROJECTS_MAP.watcher.path}`,
        element: withSuspense(<Watcher />),
      },
      {
        path: `${PROJECTS_MAP.bingo.path}`,
        element: withSuspense(<Bingo />),
      },
      {
        path: `${PROJECTS_MAP.bingo.path}/expired`,
        element: withSuspense(<BingoExpired />),
      },
      {
        path: `${PROJECTS_MAP.bingo.path}/:boardId`,
        loader: bingoMintLoader,
        element: null,
      },
      {
        path: `${PROJECTS_MAP.bingo.path}/:boardId/user/:userId`,
        loader: bingoUserBoardLoader,
        element: withSuspense(<UserBoardScreen />),
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
