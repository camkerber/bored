import {useGetWordleDictionary} from "@bored/api";
import {WordleProvider} from "@bored/providers";
import {Wordle} from "./components";
import {CircularProgress} from "@mui/material";
import {useParams} from "react-router-dom";

export const WordleWrapper = () => {
  const params = useParams();
  const {data, loading} = useGetWordleDictionary();

  return (
    <>
      {!loading && data ? (
        <WordleProvider
          wordleDict={data}
          wordIndexFromRoute={params?.wordValue ?? undefined}
        >
          <Wordle />
        </WordleProvider>
      ) : (
        <CircularProgress size={50} />
      )}
    </>
  );
};
