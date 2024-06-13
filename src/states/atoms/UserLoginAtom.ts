import { atom } from "recoil";
import { UserLogin } from "../../models/UserLogin";

export const UserLoginAtom = atom<UserLogin>({
  key: "UserLoginAtom",
  default: {
    idUserLogin: "",
    followedOA: false,
    name: "",
    avatar: "",
    refCode: "",
    zaloId: ""
  }
});