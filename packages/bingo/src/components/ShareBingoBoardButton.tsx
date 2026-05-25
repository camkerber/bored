import {Button, Stack, Typography} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

interface ShareBingoBoardButtonProps {
  onShare: () => void;
  note: string | null;
}

export const ShareBingoBoardButton = ({
  onShare,
  note,
}: ShareBingoBoardButtonProps) => (
  <Stack
    direction="row"
    spacing={2}
    sx={{justifyContent: "center", alignItems: "center"}}
  >
    <Button
      variant="outlined"
      color="secondary"
      startIcon={<ShareIcon />}
      onClick={onShare}
    >
      Share this game
    </Button>
    {note ? (
      <Typography variant="body2" sx={{color: "text.secondary"}}>
        {note}
      </Typography>
    ) : null}
  </Stack>
);
