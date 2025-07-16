import {useConnectionsGameContext} from "@bored/providers";
import {CategoryV2} from "@bored/utils";
import {Paper, Typography, useMediaQuery, useTheme} from "@mui/material";
import {COLOR_MAP} from "../../../utils";

export const SolvedCategories = () => {
  const {solvedCategories, activeGame} = useConnectionsGameContext();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const getConnection = (category: CategoryV2) =>
    activeGame.connections.find(
      (connection) => connection.category === category,
    );

  const joinAllOptions = (category: CategoryV2) => {
    const connection = getConnection(category);
    const names = connection?.options.map((option) => option) ?? [];
    return names.join(", ").toUpperCase();
  };

  return (
    <>
      {solvedCategories.map((category) => {
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
              {getConnection(category)?.description?.toUpperCase()}
            </Typography>
            <Typography variant="body2" color="black">
              {joinAllOptions(category)}
            </Typography>
          </Paper>
        );
      })}
    </>
  );
};
