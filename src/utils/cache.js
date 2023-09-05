import Taro from "@tarojs/taro";

// 添加缓存
export const setCache = (key, value) => {
    let content = value
    if (typeof value == 'object') {
        content = JSON.stringify(value)
    }
    Taro.setStorageSync(key, content)
}

// 读取缓存
export const getCache = (key) => {
    let content = Taro.getStorageSync(key)
    if (content) {
        return JSON.parse(content)
    }
    return null
}