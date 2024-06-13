// Nguyên mẫu game dùng để chơi, sửa
export interface GameInstant {
  idGameInstant: string,
  namePoilicy: string,//Thể lệ
  descPolicy: string,
  imageBranch: string, // Ảnh logo
  gameInstantName: string,
  imageBackground: string, // Ảnh nền game
  imageBackgroundCampaign: string, // Ảnh splashscreen game
  color: string, //Màu theme chính
  wintype: string, //Loại trò chơi
  deepLink: string,
  openTime: string,
  closeTime: string,
  createdBy: string,
  totalCanJoin: number
}