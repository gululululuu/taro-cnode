import Taro from "@tarojs/taro";
import { Image, Text, View } from "@tarojs/components";
import './head.less'

export default function Head(props) {
    const { avatar_url, loginname } = props
    return (
        <View className="head">
            <Image className="head-bg" src={require('../../assets/img/loginBG.jpg')} />
            <Image className="head-fg" src={avatar_url ? avatar_url : require('../../assets/img/login-avatar.jpeg')} />
            {loginname ? <Text className="head-name">{loginname}</Text> : ""}
        </View>
    )
}