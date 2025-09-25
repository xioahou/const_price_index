
import { defineStore } from 'pinia'
import { getToken, getUserId, removeToken, setToken, setUserId, removeUserId, getUserInfo, setUserInfo } from '@/utils/setToken'
// 定义 Pinia Store
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: getToken() || '',  // 从 localStorage 中获取 token
    user: getUserId() || null,  // 用户信息
    userName: '',
    userAll: getUserInfo() || {}
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,  // 判断是否已经登录
  },
  actions: {
    setToken(token) {
      this.token = token;
      setToken(token);  // 存储 token
    },
    removeToken() {
      this.token = '';
      removeToken();  // 删除 token
    },
    setInfo(info) {
      this.userAll = info
      setUserInfo(info)
    },
    setUser(user) {
      setUserId(user)
    },
    setUserName(userName) {
      this.userName = userName
    },
    removeUser() {
      removeUserId()
    },
  },
});
