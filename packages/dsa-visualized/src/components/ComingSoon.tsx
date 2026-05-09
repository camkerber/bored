import {Box, Typography} from "@mui/material";

export const ComingSoon = () => (
  <Box
    sx={{
      border: "1px dashed",
      borderColor: "divider",
      borderRadius: 2,
      p: 4,
      textAlign: "center",
    }}
  >
    <Typography variant="h6">Visualizer coming soon</Typography>
    <Typography variant="body2" sx={{mt: 1, color: "text.secondary"}}>
      The implementation lives in <code>@camkerber/typescript-dsa</code>; the
      interactive visualization is on the way.
    </Typography>
  </Box>
);
