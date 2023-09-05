import Taro from "@tarojs/taro";
import { Image, Text, View } from "@tarojs/components";
import { checkTopicAuthorAvatar, checkTopicAuthorName } from '../../utils/topic'
import { formatTime } from "../../utils/time";
import './panel.less'

export default function Panel(props) {
    const { sourceData, title } = props

    const gotoDetail = (item) => {
        Taro.navigateTo({ url: '/pages/detail/detail?topicId=' + item.id })
    }

    return (
        <View className="panel">
            <View className="panel-title">{title}</View>
            <View className="panel-list">
                {sourceData.map(item => {
                    return (
                        <View onClick={() => gotoDetail(item)} className="item-container" key={item.id}>
                            <Image className="item-image" src={checkTopicAuthorAvatar(item.author)} />
                            <Text className="item-title">{item.title}</Text>
                            <Text>{formatTime(item.last_reply_at)}</Text>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}