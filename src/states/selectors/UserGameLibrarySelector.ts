import { selector, selectorFamily } from "recoil";
import { GameInstant } from "../../models/GameInstant";
import { UserGameLibraryAtom } from "../atoms/UserGameLibraryAtom";

//Lấy cả đối tượng game cần edit ra
export const gameExampleSelector = selector<GameInstant[]>({
    key: 'gameExampleSelector',
    get: ({ get }) => {
      const gameData = get(UserGameLibraryAtom);
      return gameData;
    },
    set: ({ get, set }, newValue: GameInstant[]) => {
        set(UserGameLibraryAtom, newValue as GameInstant[]);
      },
  });
  
// Lấy danh sách tên chính sách của game ở thư viện user
export const ListGameNamePoilicyUserLibrarySelector = selector<string[]>({
    key: 'ListGameNamePoilicyUserLibrarySelector',
    get: ({ get }) => {
      const gameDatas = get(UserGameLibraryAtom);
      return gameDatas.map(gameData=>gameData.namePoilicy);
    },
  });

// Lấy  tên chính sách của game theo id ở thư viện user
export const gameNamePoilicyUserLibrarySelector = selectorFamily<string, string >({
    key: 'gameNamePoilicyUserLibrarySelector',
    get: (Id: string) => ({ get }) => {
        const datas= get(UserGameLibraryAtom);
        const id = parseInt(Id || "")
        return datas[id].namePoilicy;
    },
  });

// Lấy danh sách miểu tả của chính sách của game ở thư viện user
export const ListGameDescPoilicUserLibrarySelector = selector<string[]>({
    key: 'ListGameDescPoilicUserLibrarySelector',
    get: ({ get }) => {
      const gameDatas = get(UserGameLibraryAtom);
      return gameDatas.map(gameData=>gameData.descPolicy);
    },
  });

// Lấy  mô tả chính sách của game theo id ở thư viện user
export const gameDescPoilicyUserLibrarySelector = selectorFamily<string, string >({
    key: 'gameDescPoilicyUserLibrarySelector',
    get: (Id: string) => ({ get }) => {
        const datas= get(UserGameLibraryAtom);
        const id = parseInt(Id || "")
        return datas[id].descPolicy;
    },
  });

// Lấy danh sách ảnh brand của game ở thư viện User
export const ListGameImageBranchUserLibrarySelector = selector<string[]>({
    key: 'ListGameImageBranchUserLibrarySelectorr',
    get: ({ get }) => {
      const gameDatas = get(UserGameLibraryAtom);
      return gameDatas.map(gameData=>gameData.imageBranch);
    },
  });

// Lấy  ảnh brand của game theo id ở thư viện user
export const gameImageBrandchUserLibrarySelector = selectorFamily<string, string >({
    key: 'gameImageBrandchUserLibrarySelector',
    get: (Id: string) => ({ get }) => {
        const datas= get(UserGameLibraryAtom);
        const id = parseInt(Id || "")
        return datas[id].imageBranch;
    },
  });

// Lấy danh sách tên của game ở thư viện user
export const ListGameInstantNameUserLibrarySelector = selector<string[]>({
    key: 'ListGameInstantNameUserLibrarySelector',
    get: ({ get }) => {
      const gameDatas = get(UserGameLibraryAtom);
      return gameDatas.map(gameData=>gameData.gameInstantName);
    },
  });

// Lấy  tên của game theo id ở thư viện user
export const gameInstantNameUserLibrarySelector = selectorFamily<string, string >({
    key: 'gameInstantNameUserLibrarySelector',
    get: (Id: string) => ({ get }) => {
        const datas= get(UserGameLibraryAtom);
        const id = parseInt(Id || "")
        return datas[id].gameInstantName;
    },
  });

// Lấy danh sách ảnh background của game ở thư viện user
export const ListGameImageBackgroundUserLibrarySelector = selector<string[]>({
    key: 'ListGameImageBackgroundUserLibrarySelector',
    get: ({ get }) => {
      const gameDatas = get(UserGameLibraryAtom);
      return gameDatas.map(gameData=>gameData.imageBackground);
    },
  });

// Lấy  ảnh background của game theo id ở thư viện User
export const gameImageBackgroundUserLibrarySelector = selectorFamily<string, string >({
    key: 'gameImageBackgroundExampleSelector',
    get: (Id: string) => ({ get }) => {
        const datas= get(UserGameLibraryAtom);
        const id = parseInt(Id || "")
        return datas[id].imageBackground;
    },
  });

  // Lấy danh sách Ảnh splashscreen game background của game ở thư viện User
export const ListGameimageBackgroundCampaignUserLibrarySelector = selector<string[]>({
    key: 'ListGameimageBackgroundCampaignUserLibrarySelector',
    get: ({ get }) => {
      const gameDatas = get(UserGameLibraryAtom);
      return gameDatas.map(gameData=>gameData.imageBackgroundCampaign);
    },
  });

// Lấy  ảnh splashscreen của game  theo id ở thư viện User
export const gameimageBackgroundCampaignExampleSelector = selectorFamily<string, string >({
    key: 'gameimageBackgroundCampaignExampleSelector',
    get: (Id: string) => ({ get }) => {
        const datas= get(UserGameLibraryAtom);
        const id = parseInt(Id || "")
        return datas[id].imageBackgroundCampaign;
    },
  });

  // Lấy danh sách màu của game ở thư viện User
  export const ListGameColorUserLibrarySelector = selector<string[]>({
    key: 'ListGameColorExampleSelector',
    get: ({ get }) => {
      const gameDatas = get(UserGameLibraryAtom);
      return gameDatas.map(gameData=>gameData.color);
    },
  });

// Lấy màu của game theo id ở thư viện User
export const gameColorUserLibrarySelector = selectorFamily<string, string >({
    key: 'gameColorUserLibrarySelector',
    get: (Id: string) => ({ get }) => {
        const datas= get(UserGameLibraryAtom);
        const id = parseInt(Id || "")
        return datas[id].color;
    },
  });


   //Lấy danh sách thể loại của game ở thưu viện User
   export const ListGameWWinTypeUserLibrarySelector = selector<string[]>({
    key: 'ListGameWWinTypeUserLibrarySelector',
    get: ({ get }) => {
      const gameDatas = get(UserGameLibraryAtom);
      return gameDatas.map(gameData=>gameData.wintype)
    },
  });

  //Lấy thể loại trò chơi của game ở thư viện User
  export const gameWWinTypeUserLibrarySelector = selectorFamily<string,string>({
    key: 'gameWWinTypeUserLibrarySelector',
    get:(Id:string)=> ({ get }) => {
        const datas= get(UserGameLibraryAtom);
        const id = parseInt(Id || "")
        return datas[id].wintype;
    },
  });

  //Lấy danh sách deep link trò chơi của game ở thư viện User
  export const ListGameDeepLinkUserLibrarySelector = selector<string[]>({
    key: 'ListGameDeepLinkUserLibrarySelector',
    get: ({ get }) => {
      const gameDatas = get(UserGameLibraryAtom);
      return gameDatas.map(gameData=>gameData.deepLink)
    },
  });

  //Lấy deep link trò chơi của game ở thư viện User
  export const gameDeepLinkUserLibrarySelector = selectorFamily<string,string>({
    key: 'gameDeepLinkUserLibrarySelector',
    get:(Id:string)=> ({ get }) => {
        const datas= get(UserGameLibraryAtom);
        const id = parseInt(Id || "")
        return datas[id].deepLink;
    },
  });
  
  //Lấy danh sách thời gian bắt đầu trò chơi của game ở thư viện User
  export const ListGameOpenTimeUserLibrarySelector = selector<string[]>({
    key: 'ListGameOpenTimeUserLibrarySelector',
    get: ({ get }) => {
      const gameDatas = get(UserGameLibraryAtom);
      return gameDatas.map(gameData=>gameData.openTime)
    },
  });
  
  //Lấy thời gian bắt đầu trò chơi của game ở thư viện User
  export const gameOpenTimeUserLibrarySelector = selectorFamily<string,string>({
    key: 'gameOpenTimeUserLibrarySelector',
    get:(Id:string)=> ({ get }) => {
        const datas= get(UserGameLibraryAtom);
        const id = parseInt(Id || "")
        return datas[id].openTime;
    },
  });

  //Lấy danh sách thời gian kết thúc trò chơi của game ở thưu viện User
  export const ListGameCloseTimeUserLibrarySelector = selector<string[]>({
    key: 'ListGameCloseTimeUserLibrarySelector',
    get: ({ get }) => {
      const gameDatas = get(UserGameLibraryAtom);
      return gameDatas.map(gameData=>gameData.closeTime)
    },
  });

  //Lấy thời gian kết thúc trò chơi của game ở thư viện User
  export const gameCloseTimeUserLibrarySelector = selectorFamily<string,string>({
    key: 'gameCloseTimeUserLibrarySelector',
    get:(Id:string)=> ({ get }) => {
        const datas= get(UserGameLibraryAtom);
        const id = parseInt(Id || "")
        return datas[id].closeTime;
    },
  });