import Taro from "@tarojs/taro";
import { Image, Text, View } from "@tarojs/components";
import { AtDrawer } from 'taro-ui';
import './menu.less'
import { useDispatch, useSelector } from 'react-redux';
import { changeCategory, hideDrawer, showDrawer } from "../../actions/menu";
import { getTopicList } from "../../actions/topicList";
import api from '../../constants/api/api';
import { getJSON } from '../../utils/request'

export default function Menu() {
    const dispatch = useDispatch()
    const categories = useSelector((state) => state.menu.categories)
    const title = useSelector((state) => state.menu.currentCategory.value)
    const isShowDrawer = useSelector((state) => state.menu.showDrawer)
    // 打开抽屉
    const showMenu = () => {
        dispatch(showDrawer())
    }
    // 关闭抽屉
    const closeMenu = () => {
        dispatch(hideDrawer())
    }
    // 获取抽屉元素
    const getItems = (data) => {
        return data.map(item => item.value)
    }
    // 点击抽屉元素
    const drawerItemClick = async (index) => {
        dispatch(changeCategory(categories[index]))
        const list = await getSourceData(categories[index].key)
        dispatch(getTopicList(list))
    }
    // 获取当前类别主题的数据
    const getSourceData = async (type) => {
        const res = await getJSON(api.getTopics, { page: 1, limit: 20, tab: type })
        let list = []
        if (res && res.data) {
            if (res.data.success) {
                list = res.data.data
            }
        }
        return list
    }

    const gotoLogin = () => {
        Taro.navigateTo({ url: "/pages/login/login" })
    }

    return (
        <View className="menu">
            {isShowDrawer ? <AtDrawer className="menu-drawer" onClose={closeMenu} onItemClick={drawerItemClick} show={isShowDrawer} items={getItems(categories)} /> : ''}
            <Image onClick={showMenu} className="image"
                src={!isShowDrawer ? require('../../assets/img/showMenu.png') : require('../../assets/img/hideMenu.png')} />
            <Text>{title}</Text>
            <Image onClick={gotoLogin} className="image" src={require('../../assets/img/user.png')} />
        </View>
    )
}
