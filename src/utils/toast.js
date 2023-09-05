import Taro from "@tarojs/taro"
export const showToast = (title) => {
    Taro.showToast({ title, icon: 'none' })
}