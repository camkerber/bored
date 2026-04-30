import {WordleDictionary} from "@bored/utils";
import {useApiQuery} from "./useApiQuery";

export const useGetWordleDictionary = () =>
  useApiQuery<WordleDictionary>("/api/wordle-dictionary");
