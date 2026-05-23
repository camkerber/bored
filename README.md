# Bored — Personal Portfolio

A pnpm monorepo for [camkerber.dev](https://camkerber.dev): a React 19 + TypeScript 6 single-page portfolio that hosts a handful of small interactive projects (Connections clone, Wordle clone, Spotify Charts, DSA visualizer, "What Are We Watching" co-op picker).

## Stack

- **React 19** with the **React Compiler** (Babel plugin via `@rolldown/plugin-babel`)
- **Vite 8** dev server / bundler
- **TypeScript 6**
- **React Router v6** (`createBrowserRouter`)
- **MUI v9** + **Emotion** for components and styling
- **SWR** for data fetching and polling
- **Notistack** for snackbars
- **pnpm workspaces** — one consumer app (`website/`) and a set of internal packages (`packages/*`)

## Architecture at a glance

```
                                  ┌──────────────────────────────────┐
                                  │            website/              │
                                  │     root, providers, router      │
                                  └─────────────┬────────────────────┘
                                                │ route → screen
        ┌───────────────────────┬───────────────┼────────────────┬──────────────────────┐
        ▼                       ▼               ▼                ▼                      ▼
 ┌─────────────┐        ┌─────────────┐  ┌─────────────┐  ┌────────────────┐   ┌─────────────┐
 │ connections │        │   wordle    │  │   spotify   │  │ dsa-visualized │   │   watcher   │
 └──────┬──────┘        └──────┬──────┘  └──────┬──────┘  └────────┬───────┘   └──────┬──────┘
        │                      │                │                  │                  │
        ▼                      ▼                ▼                  ▼                  ▼
 ┌─────────────────────────────────────────────────────────────────────────────────────────┐
 │                                       @bored/ui                                         │
 │                                   basic UI components                                   │
 └────────────────────────────────────────────┬────────────────────────────────────────────┘
                                              ▼
 ┌─────────────────────────────────────────────────────────────────────────────────────────┐
 │                                      @bored/utils                                       │
 │                            constants, helpers, hooks, types                             │
 └─────────────────────────────────────────────────────────────────────────────────────────┘

                       ┌──────────────────────────────────────┐       ┌──────────────────┐
                       │              @bored/api              │──────▶│  bored-backend   │
                       │           API request hooks          │ HTTP  │  (sibling repo)  │
                       └──────────────────────────────────────┘       └──────────────────┘
```

## Layout

```
bored/
├── website/                      # the deployed app
│   ├── src/
│   │   ├── main.tsx              # React root, MUI ThemeProvider, SnackbarProvider, Analytics
│   │   ├── AppRouter.tsx         # createBrowserRouter, routes keyed off PROJECTS_MAP
│   │   ├── App.tsx               # shell: ReturnHome + <Outlet>
│   │   ├── theme.ts              # MUI theme (Space Grotesk, squared corners)
│   │   └── index.css             # global keyframes + layout primitives
│   ├── vite.config.ts            # @vitejs/plugin-react + reactCompilerPreset via Babel
│   └── package.json              # depends on every @bored/* workspace package
├── packages/
│   ├── utils/                    # @bored/utils  — foundation, no other @bored/* deps
│   ├── ui/                       # @bored/ui     — shared components, depends on utils
│   ├── api/                      # @bored/api    — apiClient + SWR hooks
│   ├── connections/              # @bored/connections
│   ├── wordle/                   # @bored/wordle
│   ├── spotify/                  # @bored/spotify
│   ├── dsa-visualized/           # @bored/dsa-visualized
│   └── watcher/                  # @bored/watcher
├── pnpm-workspace.yaml
└── package.json                  # delegates dev/build to the website filter
```

## Routing

[website/src/AppRouter.tsx](website/src/AppRouter.tsx) defines every route. Project paths are driven by `PROJECTS_MAP` in [packages/utils/src/constants/projects.ts](packages/utils/src/constants/projects.ts), so adding a new screen is:

1. Create a package under `packages/<name>/` exporting its top-level screen.
2. Register the slug in `PROJECTS_MAP`.
3. Add a route entry in `AppRouter.tsx` and wrap the element in `withSuspense`.

All non-Home screens render through `withSuspense` (a `<Suspense>` boundary with a centered `CircularProgress` fallback) so feature packages can use suspense-mode SWR queries directly.

## Package responsibilities

| Package                 | Role                                                                                                                                                                                                                                                                                               | Depends on           |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `@bored/utils`          | Cross-package constants (`PROJECTS_MAP`), helpers (`shuffleArray`, `copyToClipboard`, `shareLinkOrText`, results formatters), hooks (`useDebounce`, navigate helpers), and types for each game                                                                                                     | —                    |
| `@bored/ui`             | Shared UI: `Home`, `ProjectsCarousel`, `ReturnHome`, `ErrorPage`, `Modal`, `withSuspense`, carousel primitives                                                                                                                                                                                     | `@bored/utils`       |
| `@bored/api`            | Single `apiClient` that unwraps `{success, data, error}` envelopes from `bored-backend`, throwing typed `ApiError`. SWR-based hooks: `useApiQuery` (suspense), `useApiPollingQuery` (interval). Per-feature request modules (`useWatcherRequests`, `useGetAllGames`, `useGetSpotifyTopArtists`, …) | `@bored/utils`       |
| `@bored/connections`    | NYT Connections clone. `ConnectionsGameContext` owns selection/guess state; `GameArchives` lists prior puzzles. Game data fetched via `@bored/api`                                                                                                                                                 | `ui`, `utils`, `api` |
| `@bored/wordle`         | Wordle clone. `WordleContext` owns the board, keyboard state, and tile-flip animations; dictionary fetched via `@bored/api`                                                                                                                                                                        | `ui`, `utils`, `api` |
| `@bored/spotify`        | Spotify Charts. Browser-side OAuth (PKCE) under `auth/`, `SpotifyAuthProvider` context, top artists/tracks views; talks directly to `accounts.spotify.com` for tokens and to `bored-backend` for chart endpoints                                                                                   | `utils`, `api`       |
| `@bored/dsa-visualized` | Interactive visualizers (sorts, trees, heap, trie, queue, …) for algorithms published in the `@camkerber/typescript-dsa` npm package. A `registry` maps slugs → visualizer components                                                                                                              | `ui`, `utils`        |
| `@bored/watcher`        | "What Are We Watching" co-op session: two participants submit movie/show entries, swipe through the combined deck, and see matches. `WatcherSessionProvider` tracks `sessionId` / `participantToken` / `slot` and consumes `useWatcherSessionState` (5s SWR poll)                                  | `ui`, `utils`, `api` |

## Data flow

1. **Read-mostly screens** (Connections, Wordle, Spotify) use `useApiQuery` in suspense mode — `withSuspense` covers the loading state.
2. **Realtime / multi-party screens** (Watcher) use `useApiPollingQuery`, which keys on `["polling", path, headers]` and re-fetches every 5s; the context layer surfaces the polled state alongside imperative actions (`startSession`, `joinSession`, `submitEntries`, …).
3. **Auth-bearing requests** carry the participant token via the `x-participant-token` header (`withParticipantToken` helper) or, for Spotify, a bearer token from `getValidAccessToken()` — which transparently refreshes via PKCE.
4. The backend always responds with a `{success, data | error, message, timestamp}` envelope; `apiRequest` in [packages/api/src/apiClient.ts](packages/api/src/apiClient.ts) validates the envelope and throws a typed `ApiError` carrying status, code, and details.

## Conventions

- **Package exports:** each `packages/*/src/index.ts` re-exports its public surface (typically `./components`, sometimes `./context`, `./utils`, `./auth`). Cross-package imports always go through the top-level package name (`@bored/utils`, not deep paths).
- **Context per feature:** every interactive game/feature owns its own React context provider in `<pkg>/src/context/`. The context exposes both derived state and the imperative actions used by child components — screens stay declarative.
- **Styling:** MUI for components, Emotion for ad-hoc styles, and a small global stylesheet ([website/src/index.css](website/src/index.css)) for shared layout primitives (`.flex-center`, game grids, tile animations).
- **Lazy boundaries:** route elements are wrapped in `withSuspense` rather than relying on `React.lazy` per package — feature packages can throw data promises via SWR's suspense mode without wiring their own boundary.

## Commands

```bash
pnpm dev         # vite dev server on 127.0.0.1
pnpm build       # tsc -b && vite build (website only)
pnpm lint        # eslint across the monorepo, max 0 warnings
pnpm prettier    # format the repo
```

## Environment

`website/.env.local` holds `VITE_API_URL` (defaults to `http://localhost:3000`), `VITE_SPOTIFY_CLIENT_ID`, and `VITE_SPOTIFY_REDIRECT_URI`. The backend lives in the sibling repo at [/Users/cam/Repos/bored-backend](../bored-backend).
