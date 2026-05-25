import {useEffect, useRef} from "react";
import {Box, CircularProgress} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {ApiError, mintBingoUserBoard} from "@bored/api";

export const BingoBoardRoute = () => {
  const {boardId} = useParams<{boardId: string}>();
  const navigate = useNavigate();
  const ran = useRef(false);

  useEffect(() => {
    if (!boardId || ran.current) return;
    ran.current = true;
    void (async () => {
      try {
        const result = await mintBingoUserBoard(boardId);
        navigate(`/bingo/${result.boardId}/user/${result.userId}`, {
          replace: true,
          state: result,
        });
      } catch (err) {
        if (
          err instanceof ApiError &&
          (err.status === 404 || err.status === 410 || err.status === 400)
        ) {
          navigate("/bingo/expired", {replace: true});
          return;
        }
        navigate("/bingo/expired", {replace: true});
      }
    })();
  }, [boardId, navigate]);

  return (
    <Box sx={{display: "flex", justifyContent: "center", mt: 10}}>
      <CircularProgress />
    </Box>
  );
};
