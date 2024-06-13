import { selector, selectorFamily } from "recoil";
import { UserLogin } from "../../models/UserLogin";
import { UserJoinPlayAtom } from "../atoms/UserJoinPlayAtom";
import { UserLoginAtom } from "../atoms/UserLoginAtom";

//set id user vào trò chơi
export const UserLoginSelector = selector<UserLogin>({
  key: 'UserLoginSelector',
  get: ({ get }) => {
    const login = get(UserLoginAtom);
    return login;
  },
  set: ({ get, set }, newValue: UserLogin) => {
    set(UserLoginAtom, newValue as UserLogin)
  }
});


// get id user vào trò chơi
export const UserLoginIdSelector = selector<string>({
  key: 'UserLoginIdSelector',
  get: ({ get }) => {
    const login = get(UserLoginAtom);
    return login.idUserLogin;
  },
});