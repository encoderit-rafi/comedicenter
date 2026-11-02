import { atom } from "recoil";

export const previousPageState = atom<string | null>({
  key: "previousPage",
  default: null,
});
