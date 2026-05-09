import {Box, Button, Chip, Stack, Typography} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";
import type {ReactNode} from "react";

interface Props {
  title: string;
  description: string;
  chips?: string[];
  children: ReactNode;
}

export const DsaPageShell = ({title, description, chips, children}: Props) => {
  const navigate = useNavigate();

  return (
    <Box sx={{width: "100%", maxWidth: 960, mx: "auto", px: 2, py: 3, minWidth: 0, overflowX: "hidden", boxSizing: "border-box"}}>
      <Button
        size="small"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/dsa")}
        sx={{mb: 2}}
      >
        All algorithms & data structures
      </Button>
      <Typography variant="h4" component="h1" sx={{fontWeight: 600}}>
        {title}
      </Typography>
      {chips && chips.length > 0 && (
        <Stack direction="row" spacing={1} sx={{mt: 1, flexWrap: "wrap"}}>
          {chips.map((chip) => (
            <Chip key={chip} label={chip} size="small" />
          ))}
        </Stack>
      )}
      <Typography variant="body1" sx={{mt: 2, color: "text.secondary"}}>
        {description}
      </Typography>
      <Box sx={{mt: 4}}>{children}</Box>
    </Box>
  );
};
