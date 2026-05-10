import {Box, Button, CircularProgress, Stack, Typography} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {shareLinkOrText} from "@bored/utils";
import {useSnackbar} from "notistack";

export interface WaitingForPartnerProps {
  title: string;
  message: string;
  shareCode?: string;
}

export const WaitingForPartner = ({
  title,
  message,
  shareCode,
}: WaitingForPartnerProps) => {
  const {enqueueSnackbar} = useSnackbar();

  const handleShareCode = async () => {
    if (shareCode) {
      await shareLinkOrText(
        {
          title: "What are we watching?",
          text: `Join my session with this code: ${shareCode}`,
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
    }
  };

  return (
    <Box sx={{display: "flex", justifyContent: "center", mt: 6, px: 2}}>
      <Stack
        spacing={3}
        sx={{maxWidth: 420, textAlign: "center"}}
        alignItems="center"
      >
        <CircularProgress />
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
        {shareCode ? (
          <Box>
            <Typography variant="overline" color="text.secondary">
              Share this code
            </Typography>
            <Typography
              variant="h3"
              component="div"
              sx={{letterSpacing: 4, fontFamily: "monospace"}}
            >
              {shareCode}
            </Typography>
            <Button onClick={handleShareCode} sx={{mt: 1}}>
              <ContentCopyIcon />
              Share Code
            </Button>
          </Box>
        ) : null}
      </Stack>
    </Box>
  );
};
