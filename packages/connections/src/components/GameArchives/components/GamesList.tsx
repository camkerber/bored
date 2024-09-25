import {GameV2} from "@bored/utils";
import {List, Paper} from "@mui/material";
import {GameButton} from "./GameButton";

interface GamesProps {
  games: GameV2[] | null;
  resultsCleared: boolean;
}

export const GamesList = ({games, resultsCleared}: GamesProps) => {
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
              resultsCleared={resultsCleared}
            />
          );
        })}
      </List>
    </Paper>
  );
};
