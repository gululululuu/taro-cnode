import Taro, { useReady } from "@tarojs/taro";
import { Button, Input, View } from "@tarojs/components";
import Head from "../../components/head/head";
import './login.less'
import { useState } from "react";
import { showToast } from '../../utils/toast'
import { useDispatch, useSelector } from "react-redux";
import { postJSON } from "../../utils/request";
import api from "../../constants/api/api";
import { handleLoginFail, handleLoginSuccess } from "../../actions/login";
import { getCache, setCache } from "../../utils/cache";

export default function Login() {
    const [token, setToken] = useState(null)
    const dispatch = useDispatch()
    const cacheKey = useSelector(state => state.user.cacheKey)

    useReady(() => {
        checkAccessTokenIsExist()
    })

    const checkAccessTokenIsExist = () => {
        // const loginInfo = JSON.parse(Taro.getStorageSync('userInfo'))
        const loginInfo = getCache(cacheKey)
        if (!loginInfo) return
        dispatch(handleLoginSuccess(loginInfo))
        Taro.redirectTo({ url: '/pages/user/user' })
    }

    const getAccessToken = (event) => {
        setToken(event.detail.value)
    }

    const handleLogin = async () => {
        if (!token) {
            showToast('请先输入AccessToken')
            return
        } else {
            console.log('登录');
            const flag = await checkAccessToken()
            if (flag) {
                Taro.redirectTo({ url: '/pages/user/user' })
            }
        }
    }

    const checkAccessToken = async () => {
        const params = { accesstoken: token }
        const res = await postJSON(api.checkToken, params)
        if (res && res.data && res.data.success) {
            const { loginname, avatar_url } = res.data
            const loginObj = { accesstoken: token, loginname, avatar_url }
            dispatch(handleLoginSuccess(loginObj))
            // Taro.setStorageSync('userInfo', JSON.stringify(loginObj))
            setCache(cacheKey, loginObj)
            return true
        } else {
            showToast("登录失败，请确认access token")
            dispatch(handleLoginFail({ accesstoken: null, loginname: null, avatar_url: null }))
            return false
        }
    }

    return (
        <View className="login">
            <Head />
            <View className="login-body">
                <Input onInput={getAccessToken} className="login-input" placeholder="请输入accessToken" />
                <Button onClick={handleLogin} className="login-btn">登录</Button>
            </View>
        </View>
    )
}