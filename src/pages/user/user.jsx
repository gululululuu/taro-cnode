import Taro, { useReady } from "@tarojs/taro";
import { Button, View } from "@tarojs/components";
import { useSelector } from "react-redux";
import Head from "../../components/head/head";
import Panel from "../../components/user/panel";
import { useState } from "react";
import { getJSON } from '../../utils/request'
import api from '../../constants/api/api'
import { showToast } from '../../utils/toast'
import Empty from "../../components/empty/empty";
import './user.less'

export default function User() {
    const avatar_url = useSelector(state => state.user.avatar_url) || null
    const loginname = useSelector(state => state.user.loginname) || null
    const [recentTopics, setRecentTopics] = useState([])
    const [recentReplies, setRecentReplies] = useState([])

    useReady(() => {
        getUserInformation()
    })

    const getUserInformation = async () => {
        const res = await getJSON(api.getUserInfo + loginname);
        console.log(res);
        const data = res.data.data
        if (res && res.data && res.data.success) {
            setRecentTopics(data.recent_topics)
            setRecentReplies(data.recent_replies)
        } else {
            showToast('获取话题详情失败')
        }
    }

    const gotoPublish = () => {
        Taro.redirectTo({ url: '/pages/publish/publish' })
    }

    return (
        <View className="user">
            <Head avatar_url={avatar_url} loginname={loginname} />
            {recentTopics.length > 0 ? <Panel title={'最近参与的话题'} sourceData={recentTopics} /> : <Empty />}
            {recentReplies.length > 0 ? <Panel title={'最近回复的话题'} sourceData={recentReplies} /> : <Empty />}
            <Button onClick={() => gotoPublish()} className="user-publish-btn">发布话题</Button>
        </View>
    )
}