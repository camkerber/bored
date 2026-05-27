import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {createBingoBoard} from "@bored/api";
import {FREE_SPACE_SENTINEL} from "../utils/constants";
import type {BingoFormValues} from "./useBingoCreateForm";

export function useCreateBingoSubmit(hasFreeSpace: boolean) {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submit = async (values: BingoFormValues) => {
    setSubmitError(null);
    setSubmitting(true);
    try {
      const trimmed = values.entries.map((e) => e.value.trim());
      const payload = hasFreeSpace
        ? [...trimmed, FREE_SPACE_SENTINEL]
        : trimmed;
      const trimmedName = values.name.trim();
      const result = await createBingoBoard(payload, trimmedName || undefined);
      navigate(`/bingo/${result.boardId}/user/${result.userId}`, {
        replace: true,
      });
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Could not create board");
      setSubmitting(false);
    }
  };

  return {submitting, submitError, submit};
}
