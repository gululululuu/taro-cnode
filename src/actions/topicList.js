import { GETTOPICLIST, GETNEXTTOPICLIST, GETTOPICINFO, MARKLIKED, REPLYCONTENT } from '../constants/topicList/topicList';
/******** 直接返回数据，不在此写逻辑，否则中间件报错 *********/
// 获取首页列表数据 
export const getTopicList = (list) => {
    return {
        type: GETTOPICLIST,
        list
    }
}
// 获取下一页数据
export const getNextTopicList = (list, page) => {
    return {
        type: GETNEXTTOPICLIST,
        list,
        page
    }
}
// 获取某个话题详情
export const getTopicInfo = (topicInfo) => {
    return {
        type: GETTOPICINFO,
        topicInfo
    }
}

// 给评论点赞
export const markLiked = () => {
    return {
        type: MARKLIKED
    }
}