import {copyToClipboard} from "./copy_to_clipboard";
import {isMobile} from "react-device-detect";

type ShareLinkOrTextData = Omit<ShareData, "text"> & {text: string};

export const shareLinkOrText = async (
  data: ShareLinkOrTextData,
  onResolve?: () => void,
  onReject?: () => void,
) => {
  if (!isMobile) {
    await copyToClipboard(data.text, onResolve, onReject);
    return;
  }

  try {
    await navigator.share({
      title: data?.title,
      text: data.text,
      url: data?.url,
    });
    onResolve?.();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    onReject?.();
  }
};
