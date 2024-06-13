import { selector } from "recoil";
import { getUserInfo } from "zmp-sdk";
import { ScreenFlowAtom } from "../atoms/ScreenFlowAtom";

export const ScreenFlowSelector = selector<string>({
  key: "ScreenFlowSelector",
  get: ({ get }) => {
    const gameData = get(ScreenFlowAtom);
    return gameData;
  },
  set: ({ get, set }, newValue) => {
    set(ScreenFlowAtom, newValue as string)
  }
});