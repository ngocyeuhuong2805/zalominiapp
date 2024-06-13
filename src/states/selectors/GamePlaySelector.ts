import { selector, selectorFamily } from "recoil";
import { GameInstant } from "../../models/GameInstant";
import { GamePlayAtom } from "../atoms/GamePlayAtom";

//Lấy cả đối tượng game cần edit ra
export const gamePlaySelector = selector<GameInstant>({
  key: 'gamePlaySelector',
  get: ({ get }) => {
    const gameData = get(GamePlayAtom);
    return gameData;
  },
  set: ({ get, set }, newValue: GameInstant) => {
    set(GamePlayAtom, newValue as GameInstant)
  }
});

// Lấy  tên chính sách của game play theo id
export const gameNamePoilicyPlaySelector = selector<string>({
  key: 'gameNamePoilicyPlaySelector',
  get: ({ get }) => {
    const data = get(GamePlayAtom);
    return data.namePoilicy;
  },
});

// Lấy  mô tả chính sách của game play theo id
export const gameDescPoilicyPlaySelector = selector<string>({
  key: 'gameDescPoilicyPlaySelector',
  get: ({ get }) => {
    const data = get(GamePlayAtom);
    return data.descPolicy;
  },
});

// Lấy  ảnh brand của game play theo id
export const gameImageBrandPlaySelector = selector<string>({
  key: 'gameImageBrandPlaySelector',
  get: ({ get }) => {
    const data = get(GamePlayAtom);
    return data.imageBranch;
  },
  set: ({ get, set }, newValue: string) => {
    const currentGameData = get(GamePlayAtom);

    const updatedGameData = {
      ...currentGameData!,
      imageBranch: newValue,
    };

    set(GamePlayAtom, updatedGameData as GameInstant);
  },
});

// Lấy  tên của game play theo id
export const gameInstantNamePlaySelector = selector<string>({
  key: 'gameInstantNamePlaySelector',
  get: ({ get }) => {
    const data = get(GamePlayAtom);
    return data.gameInstantName;
  },
});

// Lấy  ảnh background của game play theo id
export const gameImageBackgroundPlaySelector = selector<string>({
  key: 'gameImageBackgroundPlaySelector',
  get: ({ get }) => {
    const data = get(GamePlayAtom)
    return data.imageBackground;
  },
});

// Lấy  ảnh splashscreen của game play theo id
export const gameImageBackgroundCampaignPlaySelector = selector<string>({
  key: 'gameImageBackgroundCampaignPlaySelector',
  get: ({ get }) => {
    const data = get(GamePlayAtom);
    return data.imageBackgroundCampaign;
  },
});

// Lấy màu của game play theo id
export const gameColorPlaySelector = selector<string>({
  key: 'gameColorPlaySelector',
  get: ({ get }) => {
    const data = get(GamePlayAtom)
    return data.color;
  },
});

// Lấy thể loại của game play theo id
export const gameWinTypePlaySelector = selector<string>({
  key: 'gameWinTypePlaySelector',
  get: ({ get }) => {
    const data = get(GamePlayAtom);
    return data.wintype;
  },
});

// Lấy deepLink của game play theo id
export const gameDeepLinkPlaySelector = selector<string>({
  key: 'gameDeepLinkPlaySelector',
  get: ({ get }) => {
    const data = get(GamePlayAtom);
    return data.deepLink;
  },
});
export const gameIdSelector = selector<string>({
  key: 'gameIdSelector',
  get: ({ get }) => {
    const data = get(GamePlayAtom);
    return data.idGameInstant;
  },
});

// Lấy thời giam bắt đầu của game play theo id
export const gameOpenTimePlaySelector = selector<string>({
  key: 'gameOpenTimePlaySelector',
  get: ({ get }) => {
    const data = get(GamePlayAtom);
    return data.openTime;
  },
});

// Lấy thời gian đóng của game play theo id
export const gameCloseTimePlaySelector = selector<string>({
  key: 'gameCloseTimePlaySelector',
  get: ({ get }) => {
    const data = get(GamePlayAtom);
    return data.closeTime;
  },
});
