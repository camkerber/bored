import {Suspense} from "react";
import {CircularProgress} from "@mui/material";

export const withSuspense = (node: React.ReactNode) => (
  <Suspense fallback={<CircularProgress size={50} sx={{mt: 10}} />}>
    {node}
  </Suspense>
);
