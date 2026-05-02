import {GuessBoard} from "./GuessBoard";
import {Keyboard} from "./Keyboard";
import {ResultsModal} from "./ResultsModal";
import {Actions} from "./Actions";
import {useGetWordleDictionary} from "@bored/api";
import {WordleProvider} from "../context";
import {DICT_LENGTH} from "../utils";
import {Navigate, useParams} from "react-router-dom";
import {useState} from "react";

export const Game = () => {
  return (
    <>
      <GuessBoard />
      <Keyboard />
      <ResultsModal />
      <Actions />
    </>
  );
};

export const Wordle = () => {
  const params = useParams();
  const {data} = useGetWordleDictionary();
  const [wordIndex] = useState<string>(
    () =>
      params?.wordValue ?? Math.floor(Math.random() * DICT_LENGTH).toString(),
  );

  if (!params?.wordValue) {
    return <Navigate to={wordIndex} replace />;
  }

  return (
    <WordleProvider wordleDict={data} wordIndexFromRoute={wordIndex}>
      <Game />
    </WordleProvider>
  );
};
