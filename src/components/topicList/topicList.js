import Taro, { useReady } from "@tarojs/taro";
import { ScrollView } from "@tarojs/components";
import { getTopicList, getNextTopicList } from '../../actions/topicList'
import { useDispatch, useSelector } from "react-redux";
import api from '../../constants/api/api';
import { getJSON } from '../../utils/request'
import Topic from "./topic";

export default function TopicList() {
    const dispatch = useDispatch()
    const curTopic = useSelector(state => state.topicList)
    const type = useSelector(state => state.menu.currentCategory.key)
    const topicList = useSelector(state => state.topicList.list)
    // 页面未加载完时获取第一页数据
    useReady(async () => {
        const list = await getSourceData(1)
        getList(list)
    })
    // 获取第一页数据
    const getList = (list) => {
        dispatch(getTopicList(list))
    }
    // 获取下一页数据
    const getNextList = (list, page) => {
        dispatch(getNextTopicList(list, page))
    }
    // 获取当前page页面的数据
    const getSourceData = async (page) => {
        const { limit } = curTopic
        const res = await getJSON(api.getTopics, { page, limit, tab: type })
        let list = []
        if (res && res.data) {
            if (res.data.success) {
                list = res.data.data
            }
        }
        return list
    }
    // 监听滑到底部动作触发加载下一页数据
    const onScrollToLower = async () => {
        const { page } = curTopic
        const list = await getSourceData((page + 1))
        let pages = page
        if (list.length > 0) {
            pages = page + 1
            getNextList(list, pages)
        }
    }


    return (
        <ScrollView style={'height: 700PX'} scrollY onScrollToLower={onScrollToLower}>
            {topicList && topicList.map(item => <Topic key={item.id} item={item} />)}
        </ScrollView>
    )
}