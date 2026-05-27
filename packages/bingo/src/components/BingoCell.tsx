import {alpha, Box, styled} from "@mui/material";
import {cellFontSize} from "../utils/cellFontSize";

interface StyledBoxProps {
  label: string;
  interactive: boolean;
  marked: boolean;
  freeSpace: boolean;
}

const StyledBox = styled(Box)<StyledBoxProps>(
  ({theme, label, interactive, marked, freeSpace}) => ({
    position: "relative",
    width: "100%",
    height: "100%",
    minWidth: 0,
    minHeight: 0,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    textWrap: "auto",
    padding: "4px",
    fontSize: cellFontSize(label.length),
    lineHeight: 1.15,
    wordBreak: "break-word",
    userSelect: "none",
    cursor: interactive ? "pointer" : "default",
    backgroundColor: theme.palette.background.paper,
    color: marked ? theme.palette.common.white : theme.palette.text.primary,
    fontStyle: freeSpace ? "italic" : "normal",
    "&::before": {
      content: '""',
      position: "absolute",
      inset: "2px",
      borderRadius: "6px",
      backgroundColor: marked ? theme.palette.secondary.light : "transparent",
      transition: "background-color 120ms ease",
      pointerEvents: "none",
    },
    "@media (hover: hover)": {
      "&:hover::before": interactive
        ? {
            backgroundColor: marked
              ? alpha(theme.palette.secondary.light, 0.5)
              : theme.palette.secondary.light,
          }
        : undefined,
      "&:hover": {
        color: interactive
          ? theme.palette.common.white
          : theme.palette.text.primary,
      },
    },
  }),
);

interface BingoCellProps {
  value: string;
  marked: boolean;
  freeSpace: boolean;
  onClick?: () => void;
}

export const BingoCell = ({
  value,
  marked,
  freeSpace,
  onClick,
}: BingoCellProps) => {
  const interactive = typeof onClick === "function" && !freeSpace;
  return (
    <StyledBox
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-pressed={interactive ? marked : undefined}
      onClick={interactive ? onClick : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      label={value}
      interactive={interactive}
      marked={marked}
      freeSpace={freeSpace}
    >
      <Box component="span" sx={{position: "relative", zIndex: 1}}>
        {value}
      </Box>
    </StyledBox>
  );
};
