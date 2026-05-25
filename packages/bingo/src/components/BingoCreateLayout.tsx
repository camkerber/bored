import type {ReactNode} from "react";
import {Box, useMediaQuery, useTheme} from "@mui/material";

interface BingoCreateLayoutProps {
  inputs: ReactNode;
  preview: ReactNode;
}

export const BingoCreateLayout = ({
  inputs,
  preview,
}: BingoCreateLayoutProps) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isDesktop ? "row" : "column",
        gap: 3,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isDesktop ? (
        <>
          <Box sx={{flex: "1 1 0", minWidth: 0, maxWidth: 380}}>{inputs}</Box>
          <Box
            sx={{
              position: "sticky",
              top: 16,
              alignSelf: "start",
              flex: "1 1 0",
              minWidth: 0,
              maxWidth: 560,
            }}
          >
            {preview}
          </Box>
        </>
      ) : (
        <>
          {preview}
          {inputs}
        </>
      )}
    </Box>
  );
};
