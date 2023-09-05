import { SHOWDRAWER, HIDEDRAWER, CHANGECATEGORY } from "../constants/menu/menu"
const MENU_STATE = {
    categories: [
        { key: 'all', value: '全部' },
        { key: 'good', value: '精华' },
        { key: 'share', value: '分享' },
        { key: 'ask', value: '问答' },
        { key: 'job', value: '招聘' },
        { key: 'dev', value: '客户端测试' }
    ],
    currentCategory: { key: 'all', value: '全部' },
    showDrawer: false
}

export default function menu(preState = MENU_STATE, action) {
    switch (action.type) {
        case SHOWDRAWER:
            return { ...preState, showDrawer: true }
        case HIDEDRAWER:
            return { ...preState, showDrawer: false }
        case CHANGECATEGORY:
            return { ...preState, currentCategory: action.currentCategory }
        default:
            return { ...preState }
    }
}