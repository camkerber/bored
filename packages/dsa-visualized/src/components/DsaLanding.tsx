import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {ALGORITHMS, DATA_STRUCTURES} from "../registry";
import type {AlgorithmEntry, DataStructureEntry} from "../registry";

const Section = ({
  title,
  entries,
  basePath,
  renderChip,
}: {
  title: string;
  entries: (AlgorithmEntry | DataStructureEntry)[];
  basePath: string;
  renderChip: (
    entry: AlgorithmEntry | DataStructureEntry,
  ) => string | undefined;
}) => {
  const navigate = useNavigate();

  return (
    <Box sx={{mt: 4}}>
      <Typography variant="h5" sx={{fontWeight: 600, mb: 2}}>
        {title}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
        }}
      >
        {entries.map((entry) => {
          const chip = renderChip(entry);
          const ready = Boolean(entry.visualizer);
          return (
            <Card key={entry.slug} elevation={2}>
              <CardActionArea
                onClick={() => navigate(`${basePath}/${entry.slug}`)}
                sx={{height: "100%", alignItems: "stretch"}}
              >
                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{mb: 1}}
                  >
                    <Typography variant="h6" component="div">
                      {entry.name}
                    </Typography>
                    <Chip
                      size="small"
                      label={ready ? "Interactive" : "Soon"}
                      color={ready ? "primary" : "default"}
                      variant={ready ? "filled" : "outlined"}
                    />
                  </Stack>
                  {chip && <Chip label={chip} size="small" sx={{mb: 1}} />}
                  <Typography variant="body2" color="text.secondary">
                    {entry.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export const DsaLanding = () => {
  return (
    <Box sx={{maxWidth: 1100, mx: "auto", px: 2, py: 3}}>
      <Typography variant="h4" component="h1" sx={{fontWeight: 600}}>
        DSA Visualized
      </Typography>
      <Typography variant="body1" sx={{mt: 1, color: "text.secondary"}}>
        Interactive visualizations of the algorithms and data structures
        published in the <code>@camkerber/typescript-dsa</code> package. Pick
        one to step through it.
      </Typography>
      <Section
        title="Algorithms"
        entries={Object.values(ALGORITHMS)}
        basePath="/dsa/algorithm"
        renderChip={(entry) =>
          "timeComplexity" in entry ? entry.timeComplexity : undefined
        }
      />
      <Section
        title="Data Structures"
        entries={Object.values(DATA_STRUCTURES)}
        basePath="/dsa/data-structure"
        renderChip={() => undefined}
      />
    </Box>
  );
};
