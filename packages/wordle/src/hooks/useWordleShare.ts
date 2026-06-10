import {shareLinkOrText} from "@bored/utils";
import {useSnackbar} from "notistack";

type ShareData = Parameters<typeof shareLinkOrText>[0];

export const useWordleShare = () => {
  const {enqueueSnackbar} = useSnackbar();

  return (data: ShareData) =>
    shareLinkOrText(
      data,
      () =>
        enqueueSnackbar("Results copied", {
          variant: "success",
        }),
      () =>
        enqueueSnackbar("Failed to copy results", {
          variant: "error",
        }),
    );
};
