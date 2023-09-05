import { useLaunch } from '@tarojs/taro'
import { Provider } from 'react-redux'
// import configStore from './store'
import { store, persistor } from './store'
import './app.less'
import 'taro-ui/dist/style/index.scss'
import { PersistGate } from 'redux-persist/integration/react'
// import '@tarojs/async-await'

function App({ children }) {
  // const store = configStore()
  useLaunch(() => {
    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default App
