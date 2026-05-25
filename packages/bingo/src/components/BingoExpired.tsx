import {Box, Button, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const BingoExpired = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{display: "flex", justifyContent: "center", mt: 6, px: 2}}>
      <Stack
        spacing={3}
        sx={{width: "100%", maxWidth: 420, textAlign: "center"}}
      >
        <Typography variant="h4" component="h1">
          This board does not exist or has expired
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/bingo")}
        >
          Create a new board
        </Button>
      </Stack>
    </Box>
  );
};
