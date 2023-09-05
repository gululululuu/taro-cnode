import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import './topic.less'
import { Image } from "@tarojs/components";
import { formatTime } from "../../utils/time";
import { checkTopicAuthorName, checkTopicAuthorAvatar } from "../../utils/topic";

export default function Topic(props) {
    const { item } = props
    const gotoDetail = () => {
        Taro.navigateTo({ url: '/pages/detail/detail?topicId=' + item.id })
    }
    return (
        <View className="topic" onClick={gotoDetail}>
            <Image className="avatar" src={checkTopicAuthorAvatar(item.author)} />
            <View className="right">
                <View className="top">
                    {item.top ? <Text className="type">置顶</Text> : item.tab == "share" ? <Text className="type blue">分享</Text> : <Text className="type orange">问答</Text>}
                    <Text className="title">{item.title}</Text>
                </View>
                <View className="bottom">
                    <Text>{checkTopicAuthorName(item.author)}</Text>
                    <Text>{item.reply_count + "/" + item.visit_count}</Text>
                    <Text>{"创建时间 " + formatTime(item.create_at)}</Text>
                </View>
            </View>
        </View>
    )
}