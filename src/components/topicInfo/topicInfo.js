import Taro from "@tarojs/taro";
import { View, RichText, Text, Image } from "@tarojs/components";
import './topicInfo.less'
import { checkTopicAuthorName } from "../../utils/topic";
import { formatTime } from "../../utils/time"

export default function TopicInfo(props) {
    const { topicInfo } = props

    const editTopic = () => {
        Taro.redirectTo({ url: '/pages/publish/publish?edit=1' })
    }

    return (
        <View className="topic-info">
            <View className="topic-info-header">
                <View className="topic-info-title">
                    {topicInfo.top ? <Text className="type">置顶</Text> : topicInfo.tab == "share" ? <Text className="type blue">分享</Text> : <Text className="type orange">问答</Text>}
                    <Text>{topicInfo.title}</Text>
                </View>
                <View className="topic-info-bottom">
                    <Text>{formatTime(topicInfo.create_at)}</Text>
                    <Text>{checkTopicAuthorName(topicInfo.author)}</Text>
                    <Text>{topicInfo.visit_count + "次访问"}</Text>
                </View>
                <View className="topic-edit">
                    <Image onClick={editTopic} className="edit-img" src={require('../../assets/img/edit.png')} />
                </View>
            </View>
            <RichText nodes={topicInfo.content} />
        </View>
    )
}