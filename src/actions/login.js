import { LOGINSUCCESS, LOGINFAIL } from '../constants/login/login'

export const handleLoginSuccess = (params) => {
    const { accesstoken, loginname, avatar_url } = params
    return {
        type: LOGINSUCCESS,
        accesstoken,
        loginname,
        avatar_url
    }
}

export const handleLoginFail = (params) => {
    const { accesstoken, loginname, avatar_url } = params
    return {
        type: LOGINFAIL,
        accesstoken,
        loginname,
        avatar_url
    }
}