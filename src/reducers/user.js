import { LOGINSUCCESS, LOGINFAIL } from '../constants/login/login'
import { getCache } from '../utils/cache'

const userCacheKey = 'cnode-user'
const userCache = getCache(userCacheKey) // 读取缓存数据
// const USER_STATE = { ...userCache }

const USER_STATE = {
    cacheKey: "cnode-user",
    accesstoken: "728913eb-ec0a-44ce-adfe-a1b68616df7a",
    loginname: "",
    avatar_url: ""
}

export default function user(preState = USER_STATE, action) {
    switch (action.type) {
        case LOGINSUCCESS:
            return { ...preState, ...action }
        case LOGINFAIL:
            return { ...preState, accesstoken: action.accesstoken, loginname: action.loginname, avatar_url: action.avatar_url }
        default:
            return { ...preState }
    }
}