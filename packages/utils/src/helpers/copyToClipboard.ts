export const copyToClipboard = async (
  textToCopy: string,
  onResolve?: () => void,
  onReject?: () => void,
) => {
  try {
    await navigator.clipboard.writeText(textToCopy);
    onResolve?.();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    onReject?.();
  }
};
