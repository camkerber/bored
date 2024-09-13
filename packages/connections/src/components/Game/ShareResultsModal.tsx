import {Button, Typography} from "@mui/material";
import {useSnackbar} from "notistack";
import {useMemo} from "react";
import {useConnectionsGameContext} from "@bored/providers";
import "@bored/styles";
import {CategoryV2} from "@bored/utils";
import {Modal} from "@bored/ui";

const CATEGORY_SQUARE_MAP: Record<CategoryV2, string> = {
  [CategoryV2.Yellow]: "\u{1F7E8}",
  [CategoryV2.Green]: "\u{1F7E9}",
  [CategoryV2.Blue]: "\u{1F7E6}",
  [CategoryV2.Purple]: "\u{1F7EA}",
};

interface ShareResultsModalProps {
  open: boolean;
  onClose: () => void;
}

const ShareResultsModal = ({open, onClose}: ShareResultsModalProps) => {
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

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(resultsString)
      .then(() => {
        enqueueSnackbar("Results copied", {
          variant: "success",
        });
      })
      .catch(() => {
        enqueueSnackbar("Failed to copy results", {
          variant: "error",
        });
      });
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
        <Button onClick={handleCopyToClipboard} variant="outlined" sx={{mt: 2}}>
          Copy to Clipboard
        </Button>
      </>
    </Modal>
  );
};

export default ShareResultsModal;
