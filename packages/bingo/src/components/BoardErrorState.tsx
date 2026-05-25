import {Alert, Container} from "@mui/material";

interface BoardErrorStateProps {
  message: string;
}

export const BoardErrorState = ({message}: BoardErrorStateProps) => (
  <Container maxWidth="sm" sx={{mt: 6}} disableGutters>
    <Alert severity="error">{message}</Alert>
  </Container>
);
