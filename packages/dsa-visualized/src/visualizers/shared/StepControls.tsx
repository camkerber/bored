import {Box, Button, Slider, Stack, Typography} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import ShuffleIcon from "@mui/icons-material/Shuffle";

interface Runner {
  index: number;
  total: number;
  isPlaying: boolean;
  isFinished: boolean;
  speedMs: number;
  step: () => void;
  back: () => void;
  play: () => void;
  pause: () => void;
  reset: () => void;
  setSpeedMs: (ms: number) => void;
}

interface Props {
  runner: Runner;
  onShuffle?: () => void;
  caption?: string;
}

export const StepControls = ({runner, onShuffle, caption}: Props) => (
  <>
    <Stack direction="row" sx={{mt: 2, flexWrap: "wrap", gap: 1}}>
      <Button
        variant="contained"
        startIcon={runner.isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        onClick={runner.isPlaying ? runner.pause : runner.play}
      >
        {runner.isPlaying ? "Pause" : "Play"}
      </Button>
      <Button
        variant="outlined"
        startIcon={<SkipPreviousIcon />}
        onClick={runner.back}
        disabled={runner.index === 0}
      >
        Back
      </Button>
      <Button
        variant="outlined"
        startIcon={<SkipNextIcon />}
        onClick={runner.step}
        disabled={runner.isFinished}
      >
        Step
      </Button>
      <Button
        variant="outlined"
        startIcon={<RestartAltIcon />}
        onClick={runner.reset}
      >
        Reset
      </Button>
      {onShuffle && (
        <Button
          variant="outlined"
          startIcon={<ShuffleIcon />}
          onClick={onShuffle}
        >
          Shuffle
        </Button>
      )}
    </Stack>
    <Box sx={{mt: 3, maxWidth: 320}}>
      <Typography variant="caption" sx={{color: "text.secondary"}}>
        Speed
      </Typography>
      <Slider
        value={400 - runner.speedMs}
        min={50}
        max={380}
        onChange={(_, v) => runner.setSpeedMs(400 - (v as number))}
      />
    </Box>
    <Typography
      variant="caption"
      sx={{display: "block", mt: 1, color: "text.secondary"}}
    >
      Step {runner.index + 1} of {runner.total}
      {caption ? ` — ${caption}` : ""}
    </Typography>
  </>
);
