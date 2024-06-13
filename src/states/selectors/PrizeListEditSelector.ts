import { selector, selectorFamily } from "recoil";
import { Prize } from "../../models/Prize";
import { PrizeListEditAtom } from "../atoms/PrizeListEditAtom";


//Set tất cả đối tượng giải thưởng cần edit ra
export const PrizeAddListEditSelector = selector<Prize[]>({
  key: 'PrizeAddListEditSelector',
  get: ({ get }) => {
    const PrizeData = get(PrizeListEditAtom);
    return PrizeData;
  },
  set: ({ get, set }, newValue: Prize[]) => {
    set(PrizeListEditAtom, newValue as Prize[]);
  },
});

//Set id vào cho giải thưởng 

//set title của giải thưởng
export const PrizeListEditTitleSelector = selectorFamily<string, string>({
  key: 'PrizeListEditTitleSelector',
  get: (id: string) => ({ get }) => {
    const PrizeData = get(PrizeListEditAtom);
    const index = parseInt(id || "", 10);
    return PrizeData[index - 1].title;
  },
  set: (id: string) => ({ get, set }, newValue: string) => {
    const currentPrizeData = get(PrizeListEditAtom);
    const updatedGameData = currentPrizeData.map((prize, i) =>
      prize.id === id ? { ...prize, title: newValue } : prize
    );
    set(PrizeListEditAtom, updatedGameData);
  },
});

// set quantity của phần thưởng

//set mô tả của giải thưởng
export const PrizeListEditDescSelector = selectorFamily<string, string>({
  key: 'PrizeListEditDescSelector',
  get: (id: string) => ({ get }) => {
    const PrizeData = get(PrizeListEditAtom);
    const index = parseInt(id || "", 10);
    return PrizeData[index - 1].desc;
  },
  set: (id: string) => ({ get, set }, newValue: string) => {
    const currentPrizeData = get(PrizeListEditAtom);
    const updatedGameData = currentPrizeData.map((prize, i) =>
      prize.id === id ? { ...prize, desc: newValue } : prize
    );
    set(PrizeListEditAtom, updatedGameData);
  },
});

//set hình ảnh của giải thưởng
export const PrizeListEditImageUrlSelector = selectorFamily<string, string>({
  key: 'PrizeListEditImageUrlSelector',
  get: (id: string) => ({ get }) => {
    const PrizeData = get(PrizeListEditAtom);
    const index = parseInt(id || "", 10);
    return PrizeData[index - 1].imageUrl;
  },
  set: (id: string) => ({ get, set }, newValue: string) => {
    const currentPrizeData = get(PrizeListEditAtom);
    const updatedGameData = currentPrizeData.map((prize, i) =>
      prize.id === id ? { ...prize, imageUrl: newValue } : prize
    );
    set(PrizeListEditAtom, updatedGameData);
  },
});

// thêm phần tử mới vào sau phần tử cuối của prize
export const AddPrizeListSelector = selector({
  key: 'AddPrizeListSelector',
  get: ({ get }) => {
    const gameData = get(PrizeListEditAtom);
    return gameData;
  },
  set: ({ get, set }) => {
    let gameData: Prize[] = get(PrizeListEditAtom);
    const newPrize: Prize = {
      id: "",
      title: "",
      quantity: 0,
      desc: "",
      imageUrl: "",
      priceName: ""
    };
    gameData = [...gameData, newPrize]; // Append the new prize
    set(PrizeListEditAtom, gameData);
  },
});

