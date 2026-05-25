import {Container} from "@mui/material";
import {BingoCreateForm} from "./BingoCreateForm";

export const Bingo = () => (
  <Container maxWidth="lg" sx={{pb: 2}} disableGutters>
    <BingoCreateForm />
  </Container>
);
