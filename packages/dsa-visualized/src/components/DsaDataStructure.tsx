import {Navigate, useParams} from "react-router-dom";
import {Box, Stack, Typography} from "@mui/material";
import {DATA_STRUCTURES} from "../registry";
import {DsaPageShell} from "./DsaPageShell";
import {ComingSoon} from "./ComingSoon";

export const DsaDataStructure = () => {
  const {slug} = useParams<{slug: string}>();
  const entry = slug ? DATA_STRUCTURES[slug] : undefined;

  if (!entry) {
    return <Navigate to="/dsa" replace />;
  }

  const Visualizer = entry.visualizer;

  return (
    <DsaPageShell title={entry.name} description={entry.description}>
      {Visualizer ? <Visualizer /> : <ComingSoon />}
      <Box sx={{mt: 4}}>
        <Typography variant="h6" sx={{fontWeight: 600, mb: 1}}>
          Operations
        </Typography>
        <Stack spacing={1}>
          {entry.operations.map((op) => (
            <Box
              key={op.name}
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "baseline",
                borderBottom: "1px solid",
                borderColor: "divider",
                pb: 1,
              }}
            >
              <Typography
                component="code"
                sx={{fontFamily: "monospace", minWidth: 96, fontWeight: 600}}
              >
                {op.name}
              </Typography>
              <Typography variant="body2" sx={{flex: 1}}>
                {op.description}
              </Typography>
              {op.complexity && (
                <Typography variant="caption" color="text.secondary">
                  {op.complexity}
                </Typography>
              )}
            </Box>
          ))}
        </Stack>
      </Box>
    </DsaPageShell>
  );
};
