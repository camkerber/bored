enum Project {
  Connections = "connections",
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
};
