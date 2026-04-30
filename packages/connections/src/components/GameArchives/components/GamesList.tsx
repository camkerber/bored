import {useMemo} from "react";
import {Game, getCompletedGames} from "@bored/utils";
import {List, Paper} from "@mui/material";
import {GameButton} from "./GameButton";

interface GamesProps {
  games: Game[] | null;
  resultsCleared: boolean;
}

export const GamesList = ({games, resultsCleared}: GamesProps) => {
  const completedGameIds = useMemo(
    () => new Set(getCompletedGames()),
    [],
  );

  if (!games) {
    return null;
  }

  return (
    <Paper elevation={2} className="games-paper">
      <List>
        {games.map((game) => {
          return (
            <GameButton
              key={game.id}
              game={game}
              isCompleted={resultsCleared || completedGameIds.has(game.id)}
            />
          );
        })}
      </List>
    </Paper>
  );
};
