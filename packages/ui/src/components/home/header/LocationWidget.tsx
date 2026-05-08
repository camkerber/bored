import {Button} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";

export const LocationWidget = () => (
  <Button disableRipple disableTouchRipple sx={{cursor: "default"}}>
    <PlaceIcon />
    Colorado
  </Button>
);
