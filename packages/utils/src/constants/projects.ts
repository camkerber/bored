enum Project {
  Connections = "connections",
  Wordle = "wordle",
  Spotify = "spotify",
  Dsa = "dsa",
  Watcher = "watcher",
  Bingo = "bingo",
}

export interface ProjectDetails {
  name: string;
  path: string;
  pathIsHref: boolean;
  action: string;
  description: string;
}

export const PROJECTS_MAP: Record<Project, ProjectDetails> = {
  [Project.Bingo]: {
    name: "Bingo",
    path: Project.Bingo,
    pathIsHref: false,
    action: "Click to create a bingo board",
    description:
      "Build a custom 5x5 bingo board and share an interactive copy — each player gets their own randomized board and marks spaces as they go.",
  },
  [Project.Watcher]: {
    name: "What are we watching?",
    path: Project.Watcher,
    pathIsHref: false,
    action: "Click to find a movie or show to watch together",
    description:
      "Two people add movies or shows, swipe through the combined list, and find what to watch together.",
  },
  [Project.Dsa]: {
    name: "Data Structures + Algorithms",
    path: Project.Dsa,
    pathIsHref: false,
    action: "Click to explore data structures and algorithms",
    description:
      "Interactive visualizations of the algorithms and data structures published in my @camkerber/typescript-dsa package.",
  },
  [Project.Connections]: {
    name: "Connections",
    path: Project.Connections,
    pathIsHref: false,
    action: "Click to play connections",
    description:
      "Based on the NYT game: Connections. Players are shown a 4x4 grid of words and have four tries to guess all groups of four.",
  },
  [Project.Wordle]: {
    name: "Wordle",
    path: Project.Wordle,
    pathIsHref: false,
    action: "Click to play wordle",
    description:
      "Based on the NYT game: Wordle. Players are given 6 attempts to guess a 5-letter word. There is a limited dictionary of words to guess from.",
  },
  [Project.Spotify]: {
    name: "Spotify Charts",
    path: Project.Spotify,
    pathIsHref: false,
    action: "Click to see your top Spotify artists/songs",
    description:
      "Utilizes the Spotify Web API to find your top artists and songs. Spotify now requires manual registration of just 5 users, so this project is essentially dead :(",
  },
};
