import { GameInstant } from "../models/GameInstant";

export const DefaultGameFromApi: GameInstant = {
  idGameInstant: "1800",
  namePoilicy: "",
  descPolicy: "",
  imageBranch: "https://i.ibb.co/6P1JfgC/FPT-Polytechnic-1.png",
  gameInstantName: "Game mẫu",
  imageBackground: "https://i.ibb.co/ZNJtYj2/msg5176974528-183.jpg",
  imageBackgroundCampaign: "https://i.ibb.co/ZNJtYj2/msg5176974528-183.jpg",
  color: "Green",
  wintype: "",
  deepLink: "",
  openTime: "",
  closeTime: "2024-05-31T09:50:47.865+07:00",
  createdBy: "1",
  totalCanJoin: 1
};
export const DefaultQuesionsFromApi = [
  {
    id: "1",
    order: 1,
    questionText: "ối Zồi oii thường nằm ở đâu",
    result: "Tâm trí",
    plans: ["Tâm trí", "ngoài đường", "trong nhà", "trong phòng"],
    url: "https://i.ibb.co/V9fyPpn/images-16.jpg",
  },
  {
    id: "2",
    order: 2,
    questionText: "Cuộc đời ỏ đâu",
    result: "Gan",
    plans: ["Tim", "Phổi", "Gan", "Mạch máu"],
    url: "https://i.ibb.co/V9fyPpn/images-16.jpg",
  },
  {
    id: "3",
    order: 3,
    questionText: "",
    result: "B",
    plans: ["A", "B", "C", "D"],
    url: "https://i.ibb.co/V9fyPpn/images-16.jpg",
  },
];
export const DefaultPrizeFromApi = [
  {
    id: "1",
    title: "Giải nhất",
    quantity: 0,
    desc: "Đây là giải nhất aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    imageUrl: "https://i.ibb.co/PY7hPBY/Fifa-world-cup-org.jpg",
    priceName: "Tik Top"
  },
  {
    id: "2",
    title: "Giải nhì",
    quantity: 0,
    desc: "Đây là giải nhì aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    imageUrl: "https://i.ibb.co/pd2vq9G/10f13510774061-560eadfde5b61.png",
    priceName: "Tik Top"
  },
];

export const DefaultTaskFromApi = [
  {
    id: "1",
    title: "Chia sẻ cho 3 người bạn",
    quantityRequire: 3,
    type: "SHARE",
    oaId: ""
  },
  {
    id: "2",
    title: "Follow OA của nhãn hàng",
    quantityRequire: 1,
    type: "FOLLOW",
    oaId: ""
  },
  {
    id: "3",
    title: "Đi thăm trang chủ",
    quantityRequire: 3,
    type: "FOLLOW",
    oaId: ""
  },
];

export const DefaultUserJoinFromApi = {
  idUserJoin: "45811991919",
  luckyNumber: 128,
  phoneNumberReceiver: "",
  deeplinkShare: "https://zalo.me/link/zapps/1283969289473929311?idUserJoin=45811991919",
};

export const DefaultUserTaskFromApi = [
  {
    idTask: "1",
    curentQuantity: 1,
    status: true,
    taskName: "Chia sẻ cho 3 người bạn",
    quantityRequire: 3,
    oaId: "1229012901",
    type: "SHARE"
  },
  {
    idTask: "2",
    curentQuantity: 1,
    status: true,
    taskName: "Follow OA của nhãn hàng",
    quantityRequire: 1,
    oaId: "1229012901",
    type: "FOLLOW"
  },
  {
    idTask: "3",
    curentQuantity: 1,
    status: true,
    taskName: "Follow OA của GiGi",
    quantityRequire: 1,
    oaId: "1229012901",
    type: "FOLLOW"
  },
];