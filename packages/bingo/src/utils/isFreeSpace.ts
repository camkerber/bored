import {FREE_SPACE_SENTINEL} from "./constants";

export function isFreeSpace(value: string): boolean {
  return value.trim().toLowerCase() === FREE_SPACE_SENTINEL;
}
