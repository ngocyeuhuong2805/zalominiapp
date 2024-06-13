import { selector, selectorFamily } from "recoil";
import { GameInstant } from "../../models/GameInstant";
import { GameEditAtom } from "../atoms/GameEditAtom";


//Lấy cả đối tượng game cần edit ra
export const gameEditSelector = selector<GameInstant>({
  key: 'gameEditSelector',
  get: ({ get }) => {
    const gameData = get(GameEditAtom);
    return gameData;
  },
  set: ({ get, set }, newValue: GameInstant) => {
    set(GameEditAtom, newValue as GameInstant)
  }
});

//Lấy game cần edit theo id

//Lấy tên tiêu đề của game cần edit
export const gameEditNameSelector = selector<string>({
  key: 'gameEditNameSelector',
  get: ({ get }) => {
    const gameData = get(GameEditAtom);
    return gameData ? gameData.gameInstantName : "Tiêu đề game";
  },

  set: ({ get, set }, newValue: string) => {
    const currentGameData = get(GameEditAtom);

    const updatedGameData = {
      ...currentGameData!,
      gameInstantName: newValue,
    };

    set(GameEditAtom, updatedGameData as GameInstant);
  },
});

//Lấy tên thể lệ của game cần edit
export const gameNamePoilicySelector = selector<string>({
  key: 'gameNamePoilicySelector',
  get: ({ get }) => {
    const gameData = get(GameEditAtom);
    return gameData ? gameData.namePoilicy : "THỂ LỆ CHƯƠNG TRÌNH";
  },

  set: ({ get, set }, newValue: string) => {
    const currentGameData = get(GameEditAtom);

    const updatedGameData = {
      ...currentGameData!,
      namePolicy: newValue,
    };

    set(GameEditAtom, updatedGameData as GameInstant);
  },
});

//Lấy mô tả của thể lệ của game cần edit
export const gameDescPolicySelector = selector<string>({
  key: 'gameDescPoilicySelector',
  get: ({ get }) => {
    const gameData = get(GameEditAtom);
    return gameData.descPolicy
  },

  set: ({ get, set }, newValue: string) => {
    const currentGameData = get(GameEditAtom);

    const updatedGameData = {
      ...currentGameData!,
      descPolicy: newValue,
    };

    set(GameEditAtom, updatedGameData as GameInstant);
  },
});

//Lấy anh logo của game cần edit
export const gameImageBranchSelector = selector<string>({
  key: 'gameImageBranchSelector',
  get: ({ get }) => {
    const gameData = get(GameEditAtom);
    return gameData.imageBranch || ""
  },

  set: ({ get, set }, newValue: string) => {
    const currentGameData = get(GameEditAtom);

    const updatedGameData = {
      ...currentGameData!,
      imageBranch: newValue,
    };

    set(GameEditAtom, updatedGameData as GameInstant);
  },
});

//Lấy anh background của game cần edit
export const gameImageBackgroundSelector = selector<string>({
  key: 'gameImageBackgroundSelector',
  get: ({ get }) => {
    const gameData = get(GameEditAtom);
    return gameData.imageBackground
  },

  set: ({ get, set }, newValue: string) => {
    const currentGameData = get(GameEditAtom);

    const updatedGameData = {
      ...currentGameData!,
      imageBackground: newValue,
    };

    set(GameEditAtom, updatedGameData as GameInstant);
  },
});

//Lấy anh background spashscreen của game cần edit
export const gameImageBackgroundCampaignSelector = selector<string>({
  key: 'gameImageBackgroundCampaignSelector',
  get: ({ get }) => {
    const gameData = get(GameEditAtom);
    return gameData.imageBackgroundCampaign
  },

  set: ({ get, set }, newValue: string) => {
    const currentGameData = get(GameEditAtom);

    const updatedGameData = {
      ...currentGameData!,
      imageBackgroundCampaign: newValue,
    };

    set(GameEditAtom, updatedGameData as GameInstant);
  },
});

//Lấy màu của game cần edit
export const gameColorSelector = selector<string>({
  key: 'gameColorSelector',
  get: ({ get }) => {
    const gameData = get(GameEditAtom);
    return gameData.color
  },

  set: ({ get, set }, newValue: string) => {
    const currentGameData = get(GameEditAtom);

    const updatedGameData = {
      ...currentGameData!,
      color: newValue,
    };

    set(GameEditAtom, updatedGameData as GameInstant);
  },
});

//Lấy loại trò chơi của game cần edit
export const gameWinTypeSelector = selector<string>({
  key: 'gameWinTypeSelector',
  get: ({ get }) => {
    const gameData = get(GameEditAtom);
    return gameData.wintype
  },

  set: ({ get, set }, newValue: string) => {
    const currentGameData = get(GameEditAtom);

    const updatedGameData = {
      ...currentGameData!,
      wintype: newValue,
    };

    set(GameEditAtom, updatedGameData as GameInstant);
  },
});

//Lấy deep link trò chơi của game cần edit
export const gameDeepLinkSelector = selector<string>({
  key: 'gameDeepLinkSelector',
  get: ({ get }) => {
    const gameData = get(GameEditAtom);
    return gameData.deepLink
  },
  set: ({ get, set }, newValue: string) => {
    const currentGameData = get(GameEditAtom);

    const updatedGameData = {
      ...currentGameData!,
      deepLink: newValue,
    };

    set(GameEditAtom, updatedGameData as GameInstant);
  },
});

//Lấy thời gian bắt đầu trò chơi của game cần edit
export const gameOpenTimeSelector = selector<string>({
  key: 'gameOpenTimeSelector',
  get: ({ get }) => {
    const gameData = get(GameEditAtom);
    return gameData.openTime
  },
  set: ({ get, set }, newValue: string) => {
    const currentGameData = get(GameEditAtom);

    const updatedGameData = {
      ...currentGameData!,
      openTime: newValue,
    };

    set(GameEditAtom, updatedGameData as GameInstant);
  },
});

//Lấy thời gian kết thúc trò chơi của game cần edit
export const gameCloseTimeSelector = selector<string>({
  key: 'gameCloseTimeSelector',
  get: ({ get }) => {
    const gameData = get(GameEditAtom);
    return gameData.closeTime
  },
  set: ({ get, set }, newValue: string) => {
    const currentGameData = get(GameEditAtom);

    const updatedGameData = {
      ...currentGameData!,
      closeTime: newValue,
    };

    set(GameEditAtom, updatedGameData as GameInstant);
  },
});