import {useConnectionsGameContext} from "@bored/providers";
import Tile from "./Tile";

const Tiles = () => {
  const {options} = useConnectionsGameContext();

  return (
    <>
      {options.map((option) => {
        return <Tile key={option} option={option} />;
      })}
    </>
  );
};

export default Tiles;
