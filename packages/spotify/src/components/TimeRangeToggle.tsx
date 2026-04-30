import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {SpotifyTimeRange} from "@bored/utils";

interface TimeRangeToggleProps {
  value: SpotifyTimeRange;
  onChange: (next: SpotifyTimeRange) => void;
}

const OPTIONS: {value: SpotifyTimeRange; label: string}[] = [
  {value: "short_term", label: "Last 4 weeks"},
  {value: "medium_term", label: "Last 6 months"},
  {value: "long_term", label: "All time"},
];

export const TimeRangeToggle = ({value, onChange}: TimeRangeToggleProps) => {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(_, next: SpotifyTimeRange | null) => {
        if (next) onChange(next);
      }}
      size="small"
      color="primary"
    >
      {OPTIONS.map((option) => (
        <ToggleButton key={option.value} value={option.value}>
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
