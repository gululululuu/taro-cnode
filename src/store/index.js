import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'

const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose

const middlewares = [
    thunkMiddleware
]

if (process.env.NODE_ENV === 'development' && process.env.TARO_ENV !== 'quickapp') {
    middlewares.push(require('redux-logger').createLogger())
}

const enhancer = composeEnhancers(
    applyMiddleware(...middlewares),
    // other store enhancers if any
)

const storageConfig = {
    key: 'root', // 必须有的
    storage: storageSession, // 缓存机制
    blacklist: [] // 在 reducer 里面不需要持久化的数据列表
}

const myPersistReducer = persistReducer(storageConfig, rootReducer);

// export default function configStore() {
//     const store = createStore(myPersistReducer, enhancer)
//     return store
// }
export const store = createStore(myPersistReducer, enhancer)
export const persistor = persistStore(store);
