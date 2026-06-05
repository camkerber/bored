import {SolvedCategories} from "./SolvedCategories";
import {Tiles} from "./Tiles";
import {useConnectionsGameState} from "../../../context";

export const Board = () => {
  const {solvedCategories} = useConnectionsGameState();

  return (
    <>
      <SolvedCategories />
      <div
        className="connections-game-board"
        style={{
          gridTemplateRows: `repeat(${4 - solvedCategories.length}, 1fr)`,
        }}
      >
        <Tiles />
      </div>
    </>
  );
};
