import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.less'
import Menu from '../../components/menu/menu'
import TopicList from '../../components/topicList/topicList'
export default function Index() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='index'>
      <Menu />
      <TopicList />
    </View>
  )
}
