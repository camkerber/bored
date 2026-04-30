export const delay = (time: number) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  new Promise((resolve, _reject) => setTimeout(resolve, time));
