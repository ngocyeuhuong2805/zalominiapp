import { selector, selectorFamily } from "recoil";
import { GameSample } from "../../models/GameSample";
import { ListSampleGameAtom } from "../atoms/ListSampleGameAtom";

//Lấy cả đối tượng game cần edit ra
export const gameExampleSelector = selector<GameSample[]>({
  key: 'gameExampleSelector',
  get: ({ get }) => {
    const gameData = get(ListSampleGameAtom);
    return gameData;
  },
  set: ({ get, set }, newValue: GameSample[]) => {
    set(ListSampleGameAtom, newValue as GameSample[]);
  },
});


// Lấy danh sách ảnh brand của game example
export const ListGameImageBranchExampleSelector = selector<string[]>({
  key: 'ListGameImageBranchExampleSelector',
  get: ({ get }) => {
    const gameDatas = get(ListSampleGameAtom);
    return gameDatas.map(gameData => gameData.imageBranch);
  },
});

// Lấy  ảnh brand của game example theo id
export const gameImageBrandchExampleSelector = selectorFamily<string, string>({
  key: 'gameImageBrandExampleSelector',
  get: (Id: string) => ({ get }) => {
    const datas = get(ListSampleGameAtom);
    const id = parseInt(Id || "")
    return datas[id].imageBranch;
  },
});

// Lấy danh sách tên của game example
export const ListGameInstantNameExampleSelector = selector<string[]>({
  key: 'ListGameInstantNameExampleSelector',
  get: ({ get }) => {
    const gameDatas = get(ListSampleGameAtom);
    return gameDatas.map(gameData => gameData.gameInstantName);
  },
});

// Lấy  tên của game example theo id
export const gameInstantNameExampleSelector = selectorFamily<string, string>({
  key: 'gameInstantNameExampleSelector',
  get: (Id: string) => ({ get }) => {
    const datas = get(ListSampleGameAtom);
    const id = parseInt(Id || "")
    return datas[id].gameInstantName;
  },
});

// Lấy danh sách Ảnh splashscreen game background của game example
export const ListGameimageBackgroundCampaignExampleSelector = selector<string[]>({
  key: 'ListGameimageBackgroundCampaignExampleSelector',
  get: ({ get }) => {
    const gameDatas = get(ListSampleGameAtom);
    return gameDatas.map(gameData => gameData.imageBackgroundCampaign);
  },
});

// Lấy  ảnh splashscreen của game example theo id
export const gameimageBackgroundCampaignExampleSelector = selectorFamily<string, string>({
  key: 'gameimageBackgroundCampaignExampleSelector',
  get: (Id: string) => ({ get }) => {
    const datas = get(ListSampleGameAtom);
    const id = parseInt(Id || "")
    return datas[id].imageBackgroundCampaign;
  },
});

// Lấy danh sách màu của game example
export const ListGameColorExampleSelector = selector<string[]>({
  key: 'ListGameColorExampleSelector',
  get: ({ get }) => {
    const gameDatas = get(ListSampleGameAtom);
    return gameDatas.map(gameData => gameData.color);
  },
});

// Lấy màu của game example theo id
export const gameColorExampleSelector = selectorFamily<string, string>({
  key: 'gameColorExampleSelectorr',
  get: (Id: string) => ({ get }) => {
    const datas = get(ListSampleGameAtom);
    const id = parseInt(Id || "")
    return datas[id].color;
  },
});

