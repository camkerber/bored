import {useGetAllGames} from "@bored/api";
import {Container} from "@mui/material";
import {ListHeader, GamesList} from "./components";

export const Archive = () => {
  const {data} = useGetAllGames();

  return (
    <Container className="archives-container">
      <ListHeader />
      <GamesList games={data} resultsCleared={false} />
    </Container>
  );
};
