import AxiosClient from "./AxiosClient";

class AuthAPI {
  HandleCallApi= async (
    url: string,
    data?: any,
    method?: 'get' | 'post' | 'put' | 'delete',
  ) => {
    return await AxiosClient(`${url}`, {
      method: method ?? 'get',
      data,
    });
  };
}

const ApiNetWork = new AuthAPI();
export default ApiNetWork;


