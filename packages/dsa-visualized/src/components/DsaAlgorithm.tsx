import {Suspense} from "react";
import {Navigate, useParams} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import {ALGORITHMS} from "../registry";
import {DsaPageShell} from "./DsaPageShell";

export const DsaAlgorithm = () => {
  const {slug} = useParams<{slug: string}>();
  const entry = slug ? ALGORITHMS[slug] : undefined;

  if (!entry) {
    return <Navigate to="/dsa" replace />;
  }

  const Visualizer = entry.visualizer;
  const chips = [`Time: ${entry.timeComplexity}`];
  if (entry.spaceComplexity) {
    chips.push(`Space: ${entry.spaceComplexity}`);
  }

  return (
    <DsaPageShell
      title={entry.name}
      description={entry.description}
      chips={chips}
    >
      <Suspense fallback={<CircularProgress size={32} />}>
        <Visualizer />
      </Suspense>
    </DsaPageShell>
  );
};
