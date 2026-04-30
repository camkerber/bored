import {Button, Typography} from "@mui/material";
import {useSnackbar} from "notistack";
import {useMemo} from "react";
import {useConnectionsGameContext} from "@bored/providers";
import {shareLinkOrText} from "@bored/utils";
import {Modal} from "@bored/ui";
import {isMobile} from "react-device-detect";
import {CATEGORY_SQUARE_MAP} from "../../utils";

interface ShareResultsModalProps {
  open: boolean;
  onClose: () => void;
}

export const ShareResultsModal = ({open, onClose}: ShareResultsModalProps) => {
  const {enqueueSnackbar} = useSnackbar();
  const {shareableResults: results, activeGame} = useConnectionsGameContext();

  const resultsString = useMemo(() => {
    const allGuesses = [];
    for (let i = 0; i < results.length; i++) {
      const category = results[i];
      allGuesses.push(CATEGORY_SQUARE_MAP[category]);
      const position = i + 1;
      if (position % 4 === 0 && position !== results.length) {
        allGuesses.push("\n");
      }
    }
    return `${activeGame.title}\n${allGuesses.join("")}`;
  }, [results, activeGame.title]);

  const handleShare = async () => {
    await shareLinkOrText(
      {
        text: resultsString,
      },
      () =>
        enqueueSnackbar("Results copied", {
          variant: "success",
        }),
      () =>
        enqueueSnackbar("Failed to copy results", {
          variant: "error",
        }),
    );
  };

  return (
    <Modal open={open} onClose={onClose} showCloseButton>
      <>
        <Typography variant="h6" mb={2}>
          Share your results
        </Typography>
        <pre id="camnections-results" className="share-results-content">
          {resultsString}
        </pre>
        <Button onClick={handleShare} variant="outlined" sx={{mt: 2}}>
          {isMobile ? "Share" : "Copy to clipboard"}
        </Button>
      </>
    </Modal>
  );
};
