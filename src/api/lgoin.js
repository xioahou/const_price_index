import instance from "@/utils/request";

// 登录
export const loginApi = (data) => {

  return instance({
    url: 'login',
    method: 'post',

    data
  })
}
export const changePasswordApi = (data) => {
  return instance({
    url: 'Users/updatePassword',
    method: 'post',
    data
  })
}
//免密登录
export const loginNowTkApi = (data) => {
  return instance({
    url: "chang_token",
    method: "post",
    data
  })
}
