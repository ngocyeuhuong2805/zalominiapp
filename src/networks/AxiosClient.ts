import axios from 'axios';
import queryString from 'query-string';
import { appInfo } from '../constants/AppInFo';

const AxiosClient = axios.create({
  baseURL: appInfo.BASE_URL,
  paramsSerializer: params => queryString.stringify(params),
});

AxiosClient.interceptors.request.use(async (config: any) => {
  config.headers = {
    Authorization: '',
    Accept: 'application/json',
    ...config.headers,
  };

  // If the request is a file upload, remove the content-type header
  // to allow Axios to set the correct boundary for multipart/form-data
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  return config;
});

AxiosClient.interceptors.response.use(
  (response) => {
    if (response.data && response.status === 200) {
      // Log the response data directly
      return response.data;
    }
    throw new Error('Error');
  },
  (error) => {
    console.log(`Error api: ${error}`);
    throw new Error(error.response);
  },
);

export default AxiosClient;



// import axios from 'axios';
// import queryString from 'query-string';
// import { appInfo } from '../constants/AppInFo';

// const AxiosClient = axios.create({
//   baseURL: appInfo.BASE_URL,
//   paramsSerializer: params => queryString.stringify(params),
// });

// AxiosClient.interceptors.request.use(async (config:any) => {
//   config.headers = {
//     ...config.headers,
//     Authorization: '',
//     Accept: 'application/json',
//   };

//   return config;
// });

// AxiosClient.interceptors.response.use(
//   res => {
//     if (res.data && res.status === 200) {
//       return res.data;
//     }
//     throw new Error('Error');
//   },
//   error => {
//     console.log(`Error api ${JSON.stringify(error)}`);
//     throw new Error(error.response);
//   },
// );

// // Add CORS handling
// AxiosClient.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized errors here
//     }
//     return Promise.reject(error);
//   }
// );

// export default AxiosClient;