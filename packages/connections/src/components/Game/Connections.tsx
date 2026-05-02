import {Navigate, useParams} from "react-router-dom";
import {useGetGameById} from "@bored/api";
import {GameWrapper} from "./GameWrapper";
import {Header} from "./Header";
import {DEFAULT_GAME_ID} from "../../utils";
import {ConnectionsGameProvider} from "../../context";

interface GameProps {
  gameId: string;
}

const Game = ({gameId}: GameProps) => {
  const {data} = useGetGameById(gameId);

  return (
    <>
      <Header title={data.title} author={data.author} />
      <ConnectionsGameProvider key={gameId} game={data}>
        <GameWrapper />
      </ConnectionsGameProvider>
    </>
  );
};

export const Connections = () => {
  const params = useParams();

  if (!params?.gameId) return <Navigate to={DEFAULT_GAME_ID} replace={false} />;

  return <Game gameId={params.gameId} />;
};
