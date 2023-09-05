import Taro from "@tarojs/taro";
import { Button, Textarea, View } from "@tarojs/components";
import './replyContent.less'
import { useState } from "react";
import { showToast } from "../../utils/toast";

export default function ReplyContent(props) {
    const { onOK, onCancel } = props
    const [content, setContent] = useState('')

    const getContent = (evevt) => {
        console.log(evevt.detail.value);
        setContent(evevt.detail.value)
    }

    const replyOK = () => {
        if (content === '') {
            showToast("请先输入回复内容~")
            return
        }
        onOK && onOK(content)
    }

    const replyCancel = () => {
        onCancel && onCancel()
    }


    return (
        <View className="reply-content-area">
            <View className="reply-content-container">
                <Textarea onInput={getContent} className="reply-content-text" placeholder="请输入回复内容" />
                <View className="reply-content-btn">
                    <Button onClick={replyOK} className="btn ok">确定</Button>
                    <Button onClick={replyCancel} className="btn">取消</Button>
                </View>
            </View>
        </View>
    )
}