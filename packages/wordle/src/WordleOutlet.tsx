import {useGetWordleDictionary} from "@bored/api";
import {DICT_LENGTH, WordleProvider} from "@bored/providers";
import {Wordle} from ".";
import {Navigate, useParams} from "react-router-dom";
import {useState} from "react";

export const WordleOutlet = () => {
  const params = useParams();
  const {data} = useGetWordleDictionary();
  const [wordIndex] = useState<string>(
    () => params?.wordValue ?? Math.floor(Math.random() * DICT_LENGTH).toString(),
  );

  if (!params?.wordValue) {
    return <Navigate to={wordIndex} replace />;
  }

  return (
    <WordleProvider wordleDict={data} wordIndexFromRoute={wordIndex}>
      <Wordle />
    </WordleProvider>
  );
};
