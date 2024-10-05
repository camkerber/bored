import {useGetWordleDictionary} from "@bored/api";
import {WordleProvider} from "@bored/providers";
import {Wordle} from "./components";
import {CircularProgress} from "@mui/material";

export const WordleWrapper = () => {
  const {data, loading} = useGetWordleDictionary();

  return (
    <>
      {!loading && data ? (
        <WordleProvider wordleDict={data}>
          <Wordle />
        </WordleProvider>
      ) : (
        <CircularProgress size={50} />
      )}
    </>
  );
};
