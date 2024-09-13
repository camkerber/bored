import {Button, TextField, Typography} from "@mui/material";
import {useCallback, useState} from "react";
import {useEnterGameCreationPassword} from "@bored/api";
import {Modal} from "@bored/ui";

interface ProtectionModalProps {
  open: boolean;
  onClose: (correctPassword: boolean) => void;
}

const ProtectionModal = ({open, onClose}: ProtectionModalProps) => {
  const {enterWithPassword, error} = useEnterGameCreationPassword();
  const [passwordGuess, setPasswordGuess] = useState<string>("");

  const attemptEntry = useCallback(async () => {
    const canEnter = await enterWithPassword(passwordGuess);
    if (canEnter) {
      onClose(true);
    }
  }, [enterWithPassword, onClose, passwordGuess]);

  return (
    <Modal open={open} onClose={() => onClose(false)}>
      <>
        <Typography variant="body1" mb={3}>
          Until I configure data validation rules in Firebase I am password
          protecting this feature. If you want to try it out before then, please
          reach out to me.
        </Typography>
        <TextField
          label="Enter password"
          fullWidth
          value={passwordGuess}
          helperText={error?.message}
          onChange={(e) => setPasswordGuess(e.target.value)}
          error={!!error?.message}
        />
        <Button sx={{mt: 3}} variant="contained" onClick={attemptEntry}>
          Let me in!
        </Button>
      </>
    </Modal>
  );
};

export default ProtectionModal;
