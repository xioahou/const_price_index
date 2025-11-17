import CryptoJS from "crypto-js";
export const AES_KEY = CryptoJS.enc.Utf8.parse("1234567890abcdef");

// AES iv（16 字节）
export const AES_IV = CryptoJS.enc.Utf8.parse("abcdef1234567890");
