import {useState} from "react";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {
  Alert,
  Autocomplete,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import {markWatcherReady, submitWatcherEntries} from "@bored/api";
import {useWatcherSessionContext} from "../context";
import {STREAMING_SERVICES} from "../utils/streamingServices";
import {MovieShow, SessionMode} from "../utils/types";

interface FormValues {
  entries: MovieShow[];
}

const newEntry = (): MovieShow => ({
  id:
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `entry-${Math.random().toString(36).slice(2, 10)}`,
  title: "",
  description: "",
  service: "",
});

const limitsForMode = (mode: SessionMode) =>
  mode === "solo-entry" ? {min: 2, max: 10} : {min: 1, max: 5};

export const SessionForm = ({waiting}: {waiting: boolean}) => {
  const {sessionId, participantToken, mode, refreshState} =
    useWatcherSessionContext();
  const formMode: SessionMode = mode ?? "dual-entry";
  const {min, max} = limitsForMode(formMode);

  const {control, register, handleSubmit, formState} = useForm<FormValues>({
    defaultValues: {
      entries: Array.from({length: min}, () => newEntry()),
    },
    mode: "onChange",
  });
  const {fields, append, remove} = useFieldArray({control, name: "entries"});

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (values) => {
    if (!sessionId || !participantToken) return;
    setError(null);
    setSubmitting(true);
    try {
      const cleaned = values.entries.map((e) => ({
        id: e.id,
        title: e.title.trim(),
        description: e.description?.trim() || undefined,
        service: e.service?.trim() || undefined,
      }));
      await submitWatcherEntries(sessionId, participantToken, cleaned);
      await markWatcherReady(sessionId, participantToken);
      await refreshState();
      // Leave `submitting` true on success — the parent will swap to the
      // waiting/matching view once state propagates, unmounting this form.
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not submit entries");
      setSubmitting(false);
    }
  });

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        mt: 4,
        px: 2,
        pb: 6,
      }}
    >
      <Stack
        component="form"
        onSubmit={onSubmit}
        spacing={3}
        sx={{width: "100%", maxWidth: 560}}
      >
        <Typography variant="h5" component="h2" textAlign="center">
          Add your movies / shows
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {formMode === "solo-entry"
            ? `You're filling this out solo — add ${min}–${max} options.`
            : `You and your partner each add ${min}–${max} options.`}
        </Typography>

        {error ? <Alert severity="error">{error}</Alert> : null}

        <Stack spacing={2}>
          {fields.map((field, index) => (
            <Stack
              key={field.id}
              spacing={1.5}
              sx={{p: 2, border: 1, borderColor: "divider", borderRadius: 1}}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="subtitle2" sx={{flex: 1}}>
                  Movie/Show {index + 1}
                </Typography>
                <IconButton
                  aria-label={`Remove movie/show ${index + 1}`}
                  onClick={() => remove(index)}
                  disabled={fields.length <= min || waiting}
                  size="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
              <TextField
                label="Title"
                required
                fullWidth
                {...register(`entries.${index}.title`, {
                  required: "Title is required",
                })}
                error={!!formState.errors.entries?.[index]?.title}
                helperText={formState.errors.entries?.[index]?.title?.message}
              />
              <TextField
                label="Description (optional)"
                fullWidth
                multiline
                minRows={1}
                {...register(`entries.${index}.description`)}
              />
              <Controller
                control={control}
                name={`entries.${index}.service`}
                render={({field: serviceField}) => (
                  <Autocomplete
                    freeSolo
                    value={serviceField.value ?? ""}
                    options={STREAMING_SERVICES as readonly string[]}
                    onChange={(_e, value) => serviceField.onChange(value ?? "")}
                    onInputChange={(_e, value) => serviceField.onChange(value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Streaming service (optional)"
                      />
                    )}
                  />
                )}
              />
            </Stack>
          ))}
        </Stack>

        <Button
          type="button"
          startIcon={<AddIcon />}
          onClick={() => append(newEntry())}
          disabled={fields.length >= max || waiting}
        >
          Add another movie/show
        </Button>

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={submitting || waiting || !formState.isValid}
        >
          Ready to match!
        </Button>
      </Stack>

      <Backdrop
        open={waiting || submitting}
        sx={{
          position: "absolute",
          color: "#fff",
          zIndex: 1,
          flexDirection: "column",
          gap: 2,
          borderRadius: 1,
        }}
      >
        <CircularProgress color="inherit" />
        <Typography>
          {submitting && !waiting
            ? "Saving your picks..."
            : "Waiting for your partner to finish..."}
        </Typography>
      </Backdrop>
    </Box>
  );
};
