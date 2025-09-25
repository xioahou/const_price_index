const TOKEN_NAME = "di_deu";
const USER_NAME = "user_name";
const USER_INFO = "user_info"
export const setToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token)
}
export const getToken = () => {
  return localStorage.getItem(TOKEN_NAME)
}
export const removeToken = () => {
  localStorage.removeItem(TOKEN_NAME)
}

const USER_ID = "user_id";
export const setUserId = (id) => {
  localStorage.setItem(USER_ID, id)
}
export const getUserId = () => {
  return localStorage.getItem(USER_ID)
}
export const removeUserId = () => {
  localStorage.removeItem(USER_ID)
}

export const setUserName = (name) => {
  localStorage.setItem(USER_NAME, name)
}
export const getUserName = () => {
  return localStorage.getItem(USER_NAME)
}
export const removeUserName = () => {
  localStorage.removeItem(USER_NAME)
}

export const setUserInfo = (user) => {
  localStorage.setItem(USER_INFO, JSON.stringify(user))
}
export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem(USER_INFO))
}
export const removeUserInfo = () => {
  localStorage.removeItem(USER_INFO)
}
