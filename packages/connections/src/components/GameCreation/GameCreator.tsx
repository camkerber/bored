import {Container, Grid, Typography} from "@mui/material";
import {useState} from "react";
import {CreateGameFormProvider} from "@bored/providers";
import {useNavigateToConnectionsPath} from "@bored/utils";
import BoardPreview from "./BoardPreview";
import GameForm from "./Form/GameForm";
import ProtectionModal from "./ProtectionModal";

export const GameCreator = () => {
  const [openProtectionModal, setOpenProtectionModal] = useState<boolean>(true);
  const navigateTo = useNavigateToConnectionsPath();

  const handleCloseProtectionModal = (correctPassword: boolean) => {
    if (correctPassword) {
      setOpenProtectionModal(false);
    } else {
      navigateTo("cam-1");
    }
  };

  return (
    <CreateGameFormProvider>
      <ProtectionModal
        open={openProtectionModal}
        onClose={handleCloseProtectionModal}
      />
      <Container sx={{pl: 0, pr: 0}}>
        <Typography variant="h3">Create a Game</Typography>
        <Grid container spacing={4}>
          <GameForm />
          <BoardPreview />
        </Grid>
      </Container>
    </CreateGameFormProvider>
  );
};
