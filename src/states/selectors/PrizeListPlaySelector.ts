import { selector, selectorFamily } from "recoil";
import { Prize } from "../../models/Prize";
import { PrizeListPlayAtom } from "../atoms/PrizeListPlayAtom";

//Set tất cả đối tượng giải thưởng play
export const PrizeAddListPlaySelector = selector<Prize[]>({
    key: 'PrizeAddListPlaySelector',
    get: ({ get }) => {
      const PrizeData = get(PrizeListPlayAtom);
      return PrizeData;
    },
    set: ({ get, set }, newValue: Prize[]) => {
        set(PrizeListPlayAtom, newValue as Prize[]);
      },
  });
    
//set title của giải thưởng
export const PrizeListPlayTitleSelector = selectorFamily<string, string>({
  key: 'PrizeListPlayTitleSelector',
  get: (id: string) => ({ get }) => {
      const PrizeData = get(PrizeListPlayAtom);
      const index = parseInt(id || "", 10);
      return PrizeData[index].title;
  },
});

//set mô tả của giải thưởng
export const PrizeListPlayDescSelector = selectorFamily<string, string>({
    key: 'PrizeListPlayDescSelector',
    get: (id: string) => ({ get }) => {
        const PrizeData = get(PrizeListPlayAtom);
        const index = parseInt(id || "", 10);
        return PrizeData[index].desc;
    },
});
  
//set hình ảnh của giải thưởng
export const PrizeListPlayImageUrlSelector = selectorFamily<string, string>({
    key: 'PrizeListPlayImageUrlSelector',
    get: (id: string) => ({ get }) => {
        const PrizeData = get(PrizeListPlayAtom);
        const index = parseInt(id || "", 10);
        return PrizeData[index].imageUrl;
    },
});
  
 