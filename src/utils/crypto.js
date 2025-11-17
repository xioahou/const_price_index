import CryptoJS from "crypto-js";
import { AES_KEY, AES_IV } from '@/config/cryptoConfig'
export function encryptAES(plainText) {
  const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plainText), AES_KEY, {
    iv: AES_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString(); // 输出 Base64 格式字符串
}
