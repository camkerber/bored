enum Project {
  Connections = "connections",
  Wordle = "wordle",
}

interface ProjectDetails {
  name: string;
  path: string;
  action: string;
  description: string;
}

export const PROJECTS_MAP: Record<Project, ProjectDetails> = {
  [Project.Connections]: {
    name: "Connections",
    path: "connections",
    action: "Click to play connections",
    description:
      "Based on the NYT game: Connections. Players are shown a 4x4 grid of words and have four tries to guess all groups of four.",
  },
  [Project.Wordle]: {
    name: "Wordle",
    path: "wordle",
    action: "Click to play wordle",
    description:
      "Based on the NYT game: Wordle. Players are given 6 attempts to guess a 5-letter word. There is a limited dictionary of words to guess from.",
  },
};
