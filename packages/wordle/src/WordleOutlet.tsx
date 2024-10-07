import {useGetWordleDictionary} from "@bored/api";
import {DICT_LENGTH, WordleProvider} from "@bored/providers";
import {Wordle} from ".";
import {CircularProgress} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useNavigateToWordlePath} from "@bored/utils";

export const WordleOutlet = () => {
  const params = useParams();
  const navigate = useNavigate();
  const navigateTo = useNavigateToWordlePath();
  const {data, loading} = useGetWordleDictionary();
  const [wordIndex, setWordIndex] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (data) {
      if (params?.wordValue && !wordIndex) {
        navigateTo(params?.wordValue);
        setWordIndex(params?.wordValue);
      } else {
        if (!wordIndex) {
          // get random index
          const idx = Math.floor(Math.random() * DICT_LENGTH);
          navigate(idx.toString());
          setWordIndex(idx.toString());
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      {!loading && data && wordIndex ? (
        <WordleProvider wordleDict={data} wordIndexFromRoute={wordIndex}>
          <Wordle />
        </WordleProvider>
      ) : (
        <CircularProgress size={50} />
      )}
    </>
  );
};
