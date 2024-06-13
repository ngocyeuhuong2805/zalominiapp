import { atom } from "recoil";
import { Prize } from "../../models/Prize";

export const PrizeListEditAtom = atom<Prize[]>({
  key: "PrizeListEditAtom",
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