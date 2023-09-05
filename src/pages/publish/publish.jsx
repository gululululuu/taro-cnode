import Taro, { useReady } from "@tarojs/taro";
import { Button, Input, Picker, Textarea, View } from "@tarojs/components";
import './publish.less'
import { useSelector } from "react-redux";
import { useState } from "react";
import { showToast } from "../../utils/toast";
import { postJSON } from "../../utils/request";
import api from '../../constants/api/api'

export default function Publish() {
    const categories = useSelector(state => state.menu.categories)
    const accesstoken = useSelector(state => state.user.accesstoken)
    const topicInfo = useSelector(state => state.topicList.topicInfo)
    const [currentCategory, setCurrentCategory] = useState(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const isEdit = Taro.getCurrentInstance().router.params.edit == '1';

    useReady(() => {
        if (isEdit) {
            setTitle(topicInfo.title)
            setContent(topicInfo.content)
        }
    })

    const getSelectedCategory = (event) => {
        const index = event.detail.value
        setCurrentCategory(categories[index])
    }

    const getTitle = (event) => {
        console.log(event);
        setTitle(event.detail.value)
    }

    const getContent = (event) => {
        setContent(event.detail.value)
    }

    const submit = async () => {
        if (!currentCategory || !title || !content) {
            showToast('话题的类别、标题或者内容不能为空')
            return
        }
        const params = { accesstoken, title, content, tab: 'dev' }
        let res = null;
        if (isEdit) {
            params['topic_id'] = topicInfo.id
            res = await postJSON(api.updateTopic, params)
        } else {
            res = await postJSON(api.createTopic, params)
        }
        if (res.data.success) {
            // 返回首页
            Taro.navigateBack({ delta: parseInt(Taro.getCurrentPages().length + 1) })
        } else {
            showToast(res.data.error_msg)
        }

    }

    return (
        <View className="publish">
            <Picker mode="selector" onChange={getSelectedCategory} range={categories} rangeKey="value">
                <View className="publish-select">{currentCategory ? currentCategory.value : '请选择话题类别'}</View>
            </Picker>
            <Input value={title} onInput={getTitle} className="publish-input-title" placeholder="标题字数五字以上" />
            <Textarea value={content} onInput={getContent} className="publish-content" placeholder="请输入话题内容" />
            <Button onClick={submit} className="publish-btn">提交</Button>
        </View>
    )
}