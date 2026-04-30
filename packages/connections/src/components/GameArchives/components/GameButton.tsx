import {Game, useNavigateToConnectionsPath} from "@bored/utils";
import {ListItemButton, ListItemText, Tooltip} from "@mui/material";
import {useCallback, useState} from "react";
import CheckIcon from "@mui/icons-material/Check";

interface GameButtonProps {
  game: Game;
  isCompleted: boolean;
}

export const GameButton = ({game, isCompleted}: GameButtonProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const navigateTo = useNavigateToConnectionsPath();

  const handleOpen = useCallback(() => {
    if (isCompleted) setOpen(true);
  }, [isCompleted]);

  const handleClose = useCallback(() => setOpen(false), []);

  const handleClick = useCallback(
    () => navigateTo(game.id),
    [navigateTo, game.id],
  );

  return (
    <Tooltip
      title="You already completed this game"
      placement="right"
      arrow
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
    >
      <ListItemButton component="a" onClick={handleClick}>
        <ListItemText>{game.title}</ListItemText>
        {isCompleted ? <CheckIcon sx={{ml: 1}} /> : null}
      </ListItemButton>
    </Tooltip>
  );
};
