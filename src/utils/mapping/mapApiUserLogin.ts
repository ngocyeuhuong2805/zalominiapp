import { UserLoginApiResponse } from "../../models/ApiResponse/UserLoginApiResponse";
import { UserInfoResponse } from "../../models/ResponseModels/UserInfoResponse";
import { UserLogin } from "../../models/UserLogin";

//Detail của nhiệm vụ đã hoàn thành user join
export const mapUserLoginDetail = (response: UserLoginApiResponse) => {
  let item = response.data
  let newData: UserLogin = {
    idUserLogin: item._id,
    followedOA: item.followedOA,
    name: item.name,
    avatar: item.avatar,
    refCode: item.refCode,
    zaloId: item.zaloId
  };
  return newData;
}