import {useConnectionsGameContext} from "@bored/providers";
import SolvedCategory from "./SolvedCategory";

const SolvedCategories = () => {
  const {solvedCategories} = useConnectionsGameContext();

  return (
    <>
      {solvedCategories.map((category) => {
        return <SolvedCategory key={category} category={category} />;
      })}
    </>
  );
};

export default SolvedCategories;
