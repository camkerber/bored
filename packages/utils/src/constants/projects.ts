enum Project {
  Connections = "connections",
  Wordle = "wordle",
  Spotify = "spotify",
}

export interface ProjectDetails {
  name: string;
  path: string;
  pathIsHref: boolean;
  action: string;
  description: string;
}

export const PROJECTS_MAP: Record<Project, ProjectDetails> = {
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
      "Utilizes the Spotify Web API to find your top artists and songs over specified time periods. Spotify now requires me to manually register users, so this project is essentially dead :(",
  },
};
