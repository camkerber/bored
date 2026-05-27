import {useState, useTransition} from "react";
import {useFieldArray, useForm} from "react-hook-form";
import {BOARD_SIZE} from "../utils/constants";
import {buildScatterMap} from "../utils/scatterAssignments";

export interface BingoFormValues {
  name: string;
  entries: {value: string}[];
}

const inputCountFor = (hasFreeSpace: boolean) =>
  hasFreeSpace ? BOARD_SIZE - 1 : BOARD_SIZE;

const makeBlanks = (count: number) =>
  Array.from({length: count}, () => ({value: ""}));

const randomSeed = () => (Math.random() * 0x7fffffff) | 0 || 1;

export function useBingoCreateForm() {
  const [hasFreeSpace, setHasFreeSpace] = useState(true);
  const [scatterSeed, setScatterSeed] = useState(randomSeed);
  const [, startTransition] = useTransition();

  const form = useForm<BingoFormValues>({
    defaultValues: {name: "", entries: makeBlanks(inputCountFor(true))},
    mode: "onChange",
  });
  const {replace} = useFieldArray({control: form.control, name: "entries"});

  const totalNeeded = inputCountFor(hasFreeSpace);
  const scatterMap = buildScatterMap(totalNeeded, hasFreeSpace, scatterSeed);

  const onToggleFreeSpace = (next: boolean) => {
    if (next === hasFreeSpace) return;
    const target = inputCountFor(next);
    const current = form.getValues("entries") ?? [];
    const trimmed = current
      .map((e) => e?.value ?? "")
      .filter((v) => v.trim().length > 0);
    const sliced = trimmed.slice(0, target);
    const nextEntries = sliced
      .concat(
        Array.from({length: Math.max(0, target - sliced.length)}, () => ""),
      )
      .map((value) => ({value}));
    startTransition(() => {
      setHasFreeSpace(next);
      setScatterSeed(randomSeed());
      replace(nextEntries);
    });
  };

  const canSubmit = form.formState.isValid;
  const checkboxLocked = !hasFreeSpace && canSubmit;

  return {
    form,
    hasFreeSpace,
    onToggleFreeSpace,
    scatterMap,
    totalNeeded,
    canSubmit,
    checkboxLocked,
  };
}
