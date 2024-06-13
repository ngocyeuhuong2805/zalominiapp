import { selector, selectorFamily } from "recoil";
import { UserJoin } from "../../models/UserJoin";
import { UserJoinPlayAtom } from "../atoms/UserJoinPlayAtom";

//Set người vào trò chơi
export const UserJoinSelector = selector<UserJoin>({
  key: 'UserJoinSelector',
  get: ({ get }) => {
    const userAnswer = get(UserJoinPlayAtom);
    return userAnswer;
  },
  set: ({ get, set }, newValue: UserJoin) => {
    set(UserJoinPlayAtom, newValue as UserJoin)
  }
});

//Set và get số may mắn của người chơi
export const UserJoinLuckyNumberSelector = selector<number>({
  key: 'UserJoinLuckyNumberSelector',
  get: ({ get }) => {
    const userJoin = get(UserJoinPlayAtom);
    return userJoin.luckyNumber;
  },
  set: ({ get, set }, newValue: number) => {
    const userJoin = get(UserJoinPlayAtom);
    set(UserJoinPlayAtom, {
      ...userJoin,
      luckyNumber: newValue
    })
  }
});

//Set số điện thoại nhân của người chơi
export const UserJoinPhoneNumberReceiverSelector = selector<string>({
  key: 'UserJoinPhoneNumberReceiverSelector',
  get: ({ get }) => {
    const userJoin = get(UserJoinPlayAtom);
    return userJoin.phoneNumberReceiver;
  },
  set: ({ get, set }, newValue: string) => {
    const userJoin = get(UserJoinPlayAtom);
    set(UserJoinPlayAtom, {
      ...userJoin,
      phoneNumberReceiver: newValue
    })
  }
});

//Set deeplink share của người chơi
export const UserJoinDeeplinkShareSelector = selector<string>({
  key: 'UserJoinDeeplinkShareSelector',
  get: ({ get }) => {
    const userJoin = get(UserJoinPlayAtom);
    return userJoin.deeplinkShare;
  },
  set: ({ get, set }, newValue: string) => {
    const userJoin = get(UserJoinPlayAtom);
    set(UserJoinPlayAtom, {
      ...userJoin,
      deeplinkShare: newValue
    })
  }
});

