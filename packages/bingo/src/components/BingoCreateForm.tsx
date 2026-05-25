import {Alert, Box, Button, Stack, Typography} from "@mui/material";
import {BingoCreateLayout} from "./BingoCreateLayout";
import {BingoInputsList} from "./BingoInputsList";
import {BingoLivePreview} from "./BingoLivePreview";
import {BingoSubmitOverlay} from "./BingoSubmitOverlay";
import {useBingoCreateForm} from "../hooks/useBingoCreateForm";
import {useCreateBingoSubmit} from "../hooks/useCreateBingoSubmit";

export const BingoCreateForm = () => {
  const {
    form,
    hasFreeSpace,
    onToggleFreeSpace,
    scatterMap,
    totalNeeded,
    canSubmit,
    checkboxLocked,
  } = useBingoCreateForm();
  const {submitting, submitError, submit} = useCreateBingoSubmit(hasFreeSpace);

  const onSubmit = form.handleSubmit(submit);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        pb: 6,
      }}
    >
      <Stack
        component="form"
        onSubmit={onSubmit}
        spacing={3}
        sx={{width: "100%", maxWidth: 960}}
      >
        <Typography variant="h4" component="h1" sx={{textAlign: "center"}}>
          Create a bingo board
        </Typography>
        {submitError ? <Alert severity="error">{submitError}</Alert> : null}

        <BingoCreateLayout
          inputs={
            <BingoInputsList
              register={form.register}
              errors={form.formState.errors}
              totalNeeded={totalNeeded}
              hasFreeSpace={hasFreeSpace}
              checkboxLocked={checkboxLocked}
              onToggleFreeSpace={onToggleFreeSpace}
            />
          }
          preview={
            <BingoLivePreview
              control={form.control}
              scatterMap={scatterMap}
              hasFreeSpace={hasFreeSpace}
            />
          }
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={submitting || !canSubmit}
        >
          Create Board
        </Button>
      </Stack>
      <BingoSubmitOverlay open={submitting} />
    </Box>
  );
};
