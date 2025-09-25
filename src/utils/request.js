import axios from "axios";
import { getToken, removeToken, removeUserName } from '@/utils/setToken'
import router from '@/router/index'

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 3000,
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  const token = getToken()
  if (token) {
    config.headers['token'] = token
  }
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么


  if (response.data.code === 401) {
    removeToken()
    removeUserName()
    router.push('/login')

  }


  return response.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});


export default instance;
