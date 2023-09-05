import Taro, { useReady } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import './detail.less'
import { useDispatch, useSelector } from "react-redux";
import { getTopicInfo, markLiked } from '../../actions/topicList'
import { getJSON, postJSON } from '../../utils/request'
import { showToast } from '../../utils/toast'
import api from '../../constants/api/api'
import TopicInfo from '../../components/topicInfo/topicInfo'
import Replies from '../../components/topicInfo/replies'
import ReplyContent from '../../components/topicInfo/replyContent'
import { useEffect, useState } from "react";
import { checkTopicAuthorName } from "../../utils/topic";
import { getCache } from "../../utils/cache";

export default function Detail() {
    const dispatch = useDispatch();
    const topicInfo = useSelector(state => state.topicList.topicInfo);
    const replies = useSelector(state => state.topicList.replies);
    const accesstoken = useSelector(state => state.user.accesstoken);
    const cacheKey = useSelector(state => state.user.cacheKey)
    const isLiked = useSelector(state => state.topicList.isLiked);
    const topicId = Taro.getCurrentInstance().router.params.topicId; // 获取页面传参
    const [isShowReplyContent, setIsShowReplyContent] = useState(false)
    const [curUser, setCurUser] = useState(null)
    const user = getCache(cacheKey)
    useReady(() => {
        getDetail()
    })

    // 当点赞状态发生改变，重新获取数据并渲染页面
    useEffect(() => {
        getDetail()
    }, [isLiked, isShowReplyContent])

    const getDetail = async () => {
        const params = { id: topicId, mdrender: true, accesstoken }
        const res = await getJSON(api.getTopicInfo + topicId, params)
        if (res && res.data && res.data.success) {
            console.log(res.data);
            dispatch(getTopicInfo(res.data.data))
        } else {
            showToast("数据请求失败，请稍后重试")
        }
    }

    const markReplyLiked = async (item) => {
        if (!checkUser()) return
        const params = { accesstoken }
        const res = await postJSON(api.reply + item.id + "/ups", params)
        if (res && res.data && res.data.success) {
            dispatch(markLiked())
        } else {
            showToast("点赞失败，请稍后重试")
        }
    }

    const replyOK = (replyContent) => {
        if (postReplyContent(replyContent)) {
            setIsShowReplyContent(false)
            // getDetail()
        }
    }

    const replyCancel = () => {
        setIsShowReplyContent(false)
    }

    const postReplyContent = async (contentValue) => {
        const content = curUser ? "@" + checkTopicAuthorName(curUser.author) + " " + contentValue : contentValue
        const reply_id = curUser ? curUser.id : ""
        const params = { accesstoken, content, reply_id }
        const res = await postJSON(api.replyTopic + topicId + "/replies", params)
        setCurUser(null)
        if (res && res.data && res.data.success) {
            return true
        } else {
            showToast("回复失败")
        }
        return false
    }

    const checkUser = () => {
        if (!user) {
            setTimeout(() => {
                showToast('请先登录')
            }, 1000)
            Taro.navigateTo({ url: '/pages/login/login' })
            return false
        }
        return true
    }

    const replyToUser = (item) => {
        if (!item) return
        if (!checkUser()) return
        setIsShowReplyContent(true)
        setCurUser(item)
    }

    const handleReplyBtnClick = () => {
        if (!checkUser()) return
        setIsShowReplyContent((isShow) => { return !isShow })
    }

    return (
        <View className="detail">
            {isShowReplyContent ? <ReplyContent onOK={replyOK} onCancel={replyCancel} /> : ''}
            <TopicInfo topicInfo={topicInfo} />
            <Replies replies={replies} onMarkLiked={markReplyLiked} onReplyToUser={replyToUser} />
            {!isShowReplyContent ?
                <Button onClick={() => handleReplyBtnClick()} className="detail-btn">回复</Button>
                : ''}
        </View>
    )
}