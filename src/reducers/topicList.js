import { GETTOPICLIST, GETNEXTTOPICLIST, GETTOPICINFO, MARKLIKED } from "../constants/topicList/topicList";

const TOPICLIST_STATE = {
    page: 1,
    limit: 20,
    list: [],
    topicInfo: {},
    replies: [],
    isLiked: false
}

export default function topicList(preState = TOPICLIST_STATE, action) {
    switch (action.type) {
        case MARKLIKED:
            return { ...preState, isLiked: !preState.isLiked }
        case GETTOPICLIST:
            return { ...preState, list: action.list, page: 1 }
        case GETNEXTTOPICLIST:
            return { ...preState, list: [...preState.list, ...action.list], page: action.page }
        case GETTOPICINFO:
            return { ...preState, replies: action.topicInfo.replies, topicInfo: { ...action.topicInfo, replies: null } }
        default:
            return { ...preState }
    }
}