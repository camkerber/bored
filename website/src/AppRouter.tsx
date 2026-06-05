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
  DsaLanding,
  DsaAlgorithm,
  DsaDataStructure,
} from "@bored/dsa-visualized";

const loadBingo = () => import("@bored/bingo");

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
        lazy: async () => ({Component: (await loadBingo()).Bingo}),
      },
      {
        path: `${PROJECTS_MAP.bingo.path}/expired`,
        lazy: async () => ({Component: (await loadBingo()).BingoExpired}),
      },
      {
        path: `${PROJECTS_MAP.bingo.path}/:boardId`,
        lazy: async () => ({loader: (await loadBingo()).bingoMintLoader}),
      },
      {
        path: `${PROJECTS_MAP.bingo.path}/:boardId/user/:userId`,
        lazy: async () => {
          const m = await loadBingo();
          return {loader: m.bingoUserBoardLoader, Component: m.UserBoardScreen};
        },
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
