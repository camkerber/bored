import {SolvedCategories} from "./SolvedCategories";
import {Tiles} from "./Tiles";
import {useConnectionsGameContext} from "@bored/providers";

export const Board = () => {
  const {solvedCategories} = useConnectionsGameContext();

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
