import Taro from "@tarojs/taro";
import { View, Image, Text, RichText } from "@tarojs/components";
import { checkTopicAuthorAvatar, checkTopicAuthorName } from "../../utils/topic";
import { fromNowTime } from "../../utils/time";
import { isLiked } from "../../utils/image";
import "./replies.less"

const isWeapp = process.env.TARO_ENV == 'weapp'

export default function Replies(props) {
    const { replies, onMarkLiked, onReplyToUser } = props
    const markLiked = (item) => {
        onMarkLiked && onMarkLiked(item)
    }

    const replyToUser = (item) => {
        onReplyToUser && onReplyToUser(item)
    }
    return (
        <View className="topic-replies">
            {
                replies && replies.map((item, index) => {
                    return (
                        <View className="reply" key={item.id}>
                            <Image className="reply-avatar" src={checkTopicAuthorAvatar(item.author)} />
                            <View className="reply-right">
                                <View className="reply-body">
                                    <View className="reply-top">
                                        <Text>{checkTopicAuthorName(item.author)}</Text>
                                        <Text>{(index + 1) + "楼"}</Text>
                                        <Text>{fromNowTime(item.create_at)}</Text>
                                        <View className="reply-liked">
                                            <Image onClick={() => markLiked(item)} className="icon" src={isLiked(item.is_uped)} />
                                            <Text className="liked-text">{item.ups.length}</Text>
                                            <Image onClick={() => replyToUser(item)} className="icon" src={require("../../assets/img/share.png")} />
                                        </View>
                                    </View>
                                </View>
                                <View className="reply-content">
                                    {isWeapp ? <RichText nodes={item.content} /> : <View dangerouslySetInnerHTML={{ __html: item.content }} />}
                                </View>
                            </View>
                        </View>
                    )
                })
            }
        </View>
    )
}