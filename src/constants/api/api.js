const rootPath = 'https://cnodejs.org/api/v1';
const api = {
    getTopics: rootPath + '/topics', // 获取主题首页
    getTopicInfo: rootPath + '/topic/', // 获取主题详情 + /:id
    getUserInfo: rootPath + '/user/', // 获取用户详情 + /:loginname
    getMessageUnRead: rootPath + '/message/count', // 获取未读消息数
    checkToken: rootPath + '/accesstoken', // 验证用户token
    createTopic: rootPath + '/topics', // 新建话题
    replyTopic: rootPath + '/topic/', // 新建评论 + /:topic_id/replies
    reply: rootPath + '/reply/', // 为评论点赞 + /:reply_id/ups
    updateTopic: rootPath + '/topics/update', // 编辑主题
}

export default api;