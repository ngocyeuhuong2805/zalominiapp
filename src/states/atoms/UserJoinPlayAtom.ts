import { atom } from "recoil";
import { UserJoin } from "../../models/UserJoin";

export const UserJoinPlayAtom = atom<UserJoin>({
  key: "UserJoinPlayAtom",
  default: {
    idUserJoin: "",
    luckyNumber: 0,
    phoneNumberReceiver: "",
    deeplinkShare: ""
  }
});