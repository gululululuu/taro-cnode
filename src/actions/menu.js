import { SHOWDRAWER, HIDEDRAWER, CHANGECATEGORY } from '../constants/menu/menu'

// 显示抽屉
export const showDrawer = () => {
    return {
        type: SHOWDRAWER
    }
}

// 隐藏抽屉
export const hideDrawer = () => {
    return {
        type: HIDEDRAWER
    }
}

// 隐藏抽屉
export const changeCategory = (curData) => {
    return {
        type: CHANGECATEGORY,
        currentCategory: curData
    }
}