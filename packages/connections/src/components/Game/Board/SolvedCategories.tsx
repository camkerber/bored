import {useConnectionsGameContext} from "../../../context";
import {Paper, Typography, useMediaQuery, useTheme} from "@mui/material";
import {COLOR_MAP} from "../../../utils";

export const SolvedCategories = () => {
  const {solvedCategories, activeGame} = useConnectionsGameContext();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {solvedCategories.map((category) => {
        const connection = activeGame.connections.find(
          (c) => c.category === category,
        );
        if (!connection) return null;

        return (
          <Paper
            key={category}
            sx={{backgroundColor: COLOR_MAP[category]}}
            elevation={0}
            className="connections-revealed-category"
          >
            <Typography
              variant={smallScreen ? "body1" : "h6"}
              sx={{textAlign: "center", fontWeight: "bold"}}
              color="black"
            >
              {connection.description.toUpperCase()}
            </Typography>
            <Typography variant="body2" color="black">
              {connection.options.join(", ").toUpperCase()}
            </Typography>
          </Paper>
        );
      })}
    </>
  );
};
