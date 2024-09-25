import {useGetPageOfGames} from "@bored/api";
import {Button, Container} from "@mui/material";
import {useEffect} from "react";
import {Header, GamesList} from "./components";
// import {clearCompletedGames, getCompletedGames} from "@bored/utils";

export const Archive = () => {
  const {data, getNextPage, canPageForward} = useGetPageOfGames(20);
  // const [resultsCleared, setResultsCleared] = useState<boolean>(false);
  // const [showClearButton, setShowClearButton] = useState<boolean>(false);

  // const completedGames = getCompletedGames();

  // useEffect(() => {
  //   if (resultsCleared) {
  //     setShowClearButton(false);
  //   }

  //   data?.forEach((game) => {
  //     if (completedGames.some((gameId) => gameId === game.id)) {
  //       setShowClearButton(true);
  //     }
  //   });
  // }, [completedGames, data, resultsCleared]);

  // const handleClearResults = () => {
  //   clearCompletedGames();
  //   setResultsCleared(true);
  // };

  useEffect(() => {
    getNextPage()
      .then(() => {})
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="archives-container">
      <Header />
      <GamesList games={data} resultsCleared={false} />
      {canPageForward ? (
        <Button size="large" variant="outlined" sx={{mt: 2}}>
          Load more games
        </Button>
      ) : null}
      {/* TODO: add back the below once actual results are saved 
      and the completed categories are shown when a game is loaded  */}
      {/* {showClearButton ? (
        <Button
          size="large"
          variant="outlined"
          sx={{mt: 2}}
          onClick={handleClearResults}
        >
          Clear game results
        </Button>
      ) : null} */}
    </Container>
  );
};
