import {shareLinkOrText} from "@bored/utils";
import IosShareIcon from "@mui/icons-material/IosShare";
import {IconButton} from "@mui/material";
import {useSnackbar} from "notistack";

interface ShareGameButtonProps {
  gameTitle: string;
}

const ShareGameButton = ({gameTitle}: ShareGameButtonProps) => {
  const {enqueueSnackbar} = useSnackbar();

  const handleCopyToClipboard = async () => {
    await shareLinkOrText(
      {
        title: "Cam is bored: Connections",
        text: gameTitle,
        url: window.location.href,
      },
      () =>
        enqueueSnackbar("Link copied to clipboard", {
          variant: "success",
        }),
      () =>
        enqueueSnackbar("Failed to copy link. Please try again.", {
          variant: "error",
        }),
    );
  };

  return (
    <IconButton onClick={handleCopyToClipboard}>
      <IosShareIcon />
    </IconButton>
  );
};

export default ShareGameButton;
