import {Box, Typography} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";

export const LocationWidget = () => (
  <Box className="flex-center">
    <PlaceIcon />
    <Typography variant="body2" color="primary" fontWeight={500}>
      Colorado
    </Typography>
  </Box>
);
