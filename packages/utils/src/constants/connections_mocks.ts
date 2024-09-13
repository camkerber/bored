import { CategoryV2, GameV2 } from "../types/connections";

export const GAME_TEMPLATE_V2: GameV2 = {
  id: "67",
  title: "NYT Archive #67",
  connections: [
    {
      category: CategoryV2.Yellow,
      description: "desserts",
      options: ["cake", "cobbler", "pie", "tart"],
    },
    {
      category: CategoryV2.Green,
      description: "occupational surnames",
      options: ["fisher", "mason", "miller", "smith"],
    },
    {
      category: CategoryV2.Blue,
      description: "alter deceptively",
      options: ["distort", "doctor", "fudge", "twist"],
    },
    {
      category: CategoryV2.Purple,
      description: "square ____",
      options: ["dance", "meal", "one", "root"],
    },
  ],
};
