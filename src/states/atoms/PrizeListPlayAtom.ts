import { atom } from "recoil";
import { Prize } from "../../models/Prize";

export const PrizeListPlayAtom = atom<Prize[]>({
  key: "PrizeListPlayAtom",
  default: [
    {
      id: "",
      title: "",
      quantity: 0,
      desc: "",
      imageUrl: "",
      priceName: "",
    }
  ]
});