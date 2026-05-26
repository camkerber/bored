import {useState} from "react";
import {shareLinkOrText} from "@bored/utils";

export function useShareBingoBoard(boardId: string | undefined) {
  const [shareNote, setShareNote] = useState<string | null>(null);

  const onShare = async () => {
    if (!boardId) return;
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/bingo/${boardId}`
        : `/bingo/${boardId}`;
    await shareLinkOrText(
      {
        title: "Bingo",
        text: "Start a board for my bingo game",
        url,
      },
      () => setShareNote("Link copied!"),
    );
  };

  return {onShare, shareNote};
}
