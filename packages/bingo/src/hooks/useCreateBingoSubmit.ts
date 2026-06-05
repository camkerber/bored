import {useActionState} from "react";
import {useNavigate} from "react-router-dom";
import {createBingoBoard} from "@bored/api";
import {FREE_SPACE_SENTINEL} from "../utils/constants";
import type {BingoFormValues} from "./useBingoCreateForm";

export function useCreateBingoSubmit(hasFreeSpace: boolean) {
  const navigate = useNavigate();

  const [submitError, submit, submitting] = useActionState<
    string | null,
    BingoFormValues
  >(async (_prev, values) => {
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
      return null;
    } catch (e) {
      return e instanceof Error ? e.message : "Could not create board";
    }
  }, null);

  return {submitting, submitError, submit};
}
