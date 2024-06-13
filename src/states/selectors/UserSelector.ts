import { selector } from "recoil";
import { getUserInfo } from "zmp-sdk";

//Mostly to test
export const UserSelector = selector({
  key: "user",
  get: () =>
    getUserInfo({
      avatarType: "normal",
    }),
});