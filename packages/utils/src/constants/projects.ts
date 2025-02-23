enum Project {
  Connections = "connections",
  Wordle = "wordle",
  ReactFirebaseDB = "react-firebase-db",
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
  [Project.ReactFirebaseDB]: {
    name: "Firebase RTDB for React",
    path: "https://www.npmjs.com/package/@camkerber/react-firebase-db",
    pathIsHref: true,
    action: "Click to see this package in npm",
    description:
      "This is a package that exports a provider and other helpers to expedite the set up of Firebase Realtime Database for React projects. I use it for this website :)",
  },
};
