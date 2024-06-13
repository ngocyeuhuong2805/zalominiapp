export interface UserInfoResponse {
  zaloId: string;
  idByOA: string | null;
  followedOA: boolean;
  name: string;
  avatar: string | null;
  isSensitive: boolean;
  refCode: string;
  _id: string; // Đây mới là id user
  createdDate: string;
  createdBy: string | null;
  lastUpdatedDate: string | null;
  lastUpdatedBy: string | null;
  isDeleted: boolean;
}