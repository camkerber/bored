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
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/AddCircleOutlined";
import {markWatcherReady, submitWatcherEntries} from "@bored/api";
import {useWatcherSession} from "../context";
import {STREAMING_SERVICES} from "../utils/streamingServices";
import {MovieShow, SessionMode} from "../utils/types";

interface FormValues {
  entries: MovieShow[];
}

const newEntry = (): MovieShow => ({
  id: crypto.randomUUID(),
  title: "",
  description: "",
  service: "",
});

const limitsForMode = (mode: SessionMode) =>
  mode === "solo-entry" ? {min: 2, max: 10} : {min: 1, max: 5};

export const SessionForm = ({waiting}: {waiting: boolean}) => {
  const {sessionId, participantToken, mode, refreshState} = useWatcherSession();
  const formMode: SessionMode = mode ?? "dual-entry";
  const {min, max} = limitsForMode(formMode);

  // Built once on mount — react-hook-form only reads defaultValues initially,
  // and the entry count is fixed for the form's lifetime.
  const [defaultEntries] = useState(() =>
    Array.from({length: min}, () => newEntry()),
  );
  const {control, register, handleSubmit, formState} = useForm<FormValues>({
    defaultValues: {entries: defaultEntries},
    mode: "onChange",
  });
  const {fields, append, remove} = useFieldArray({control, name: "entries"});

  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = handleSubmit(async (values) => {
    if (!sessionId || !participantToken) return;
    setError(null);
    const cleaned = values.entries.map((e) => ({
      id: e.id,
      title: e.title.trim(),
      description: e.description?.trim() || undefined,
      service: e.service?.trim() || undefined,
    }));
    try {
      await submitWatcherEntries(sessionId, participantToken, cleaned);
      await markWatcherReady(sessionId, participantToken);
      setSubmitted(true);
      await refreshState();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not submit entries");
    }
  });

  // Hold the backdrop open after a successful submit until the parent swaps
  // us out for the waiting/matching view.
  const submitting = formState.isSubmitting || submitted;

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
        <Typography
          variant="h5"
          component="h2"
          sx={{
            textAlign: "center",
          }}
        >
          Add your movies / shows
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            textAlign: "center",
          }}
        >
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
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: "center",
                }}
              >
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
                    options={STREAMING_SERVICES}
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
