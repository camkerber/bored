import {
  GameV2,
  getCompletedGames,
  useNavigateToConnectionsPath,
} from "@bored/utils";
import {ListItemButton, ListItemText, Tooltip} from "@mui/material";
import {useMemo, useState} from "react";
import CheckIcon from "@mui/icons-material/Check";

interface GameButtonProps {
  game: GameV2;
  resultsCleared: boolean;
}

export const GameButton = ({game, resultsCleared}: GameButtonProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const navigateTo = useNavigateToConnectionsPath();
  const completedGames = getCompletedGames();

  const isCompleted = useMemo(() => {
    if (resultsCleared) {
      return true;
    } else {
      return completedGames.includes(game.id);
    }
  }, [completedGames, game.id, resultsCleared]);

  const handleOpen = () => {
    if (isCompleted) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  return (
    <Tooltip
      title="You already completed this game"
      placement="right"
      arrow
      open={open}
      onOpen={handleOpen}
      onClose={() => setOpen(false)}
    >
      <ListItemButton
        key={game.id}
        component="a"
        onClick={() => navigateTo(game.id)}
      >
        <ListItemText>{game.title}</ListItemText>
        {isCompleted ? <CheckIcon sx={{ml: 1}} /> : null}
      </ListItemButton>
    </Tooltip>
  );
};
