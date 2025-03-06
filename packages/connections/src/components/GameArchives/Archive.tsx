import {useGetAllGames} from "@bored/api";
import {CircularProgress, Container} from "@mui/material";
import {ListHeader, GamesList} from "./components";

export const Archive = () => {
  const {data, loading} = useGetAllGames();

  return (
    <Container className="archives-container">
      <ListHeader />
      {loading ? (
        <CircularProgress size={50} />
      ) : (
        <GamesList games={data} resultsCleared={false} />
      )}
    </Container>
  );
};
