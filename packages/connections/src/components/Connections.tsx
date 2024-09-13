import {CircularProgress} from "@mui/material";
import {useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import {useGetGameById, useGetNewGame} from "@bored/api";
import {ConnectionsGameProvider} from "@bored/providers";
import {useNavigateToConnectionsPath} from "@bored/utils";
import ErrorView from "./ErrorView";
import GameWrapper from "./Game/GameWrapper";
import Header from "./Header";

const DEFAULT_GAME_ID = "204";

export const Connections = () => {
  const params = useParams();
  const [currentGameId, setCurrentGameId] = useState<string>(
    params?.gameId ?? DEFAULT_GAME_ID,
  );
  const navigateTo = useNavigateToConnectionsPath();

  const {
    data,
    error: getGameError,
    loading,
    refetch,
  } = useGetGameById(currentGameId);
  const {getNewGame, error: newGameError} = useGetNewGame();

  const handleGetNewGame = async () => {
    const fetchedGameId = await getNewGame(currentGameId);
    const newGameId = fetchedGameId ?? DEFAULT_GAME_ID;
    navigateTo(newGameId);
    setCurrentGameId(newGameId);
    await refetch(newGameId);
  };

  return (
    <>
      <Header title={data?.title} author={data?.author} />
      {params?.gameId ? (
        <>
          {!loading && data ? (
            <ConnectionsGameProvider game={data}>
              <GameWrapper onGetNewGame={handleGetNewGame} />
            </ConnectionsGameProvider>
          ) : null}
        </>
      ) : (
        <Navigate to={DEFAULT_GAME_ID} replace={false} />
      )}
      <ErrorView
        getGameError={getGameError}
        newGameError={newGameError}
        onGetNewGame={handleGetNewGame}
      />
      {loading ? <CircularProgress size={100} sx={{mt: 10}} /> : null}
    </>
  );
};
