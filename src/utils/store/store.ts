import {applyMiddleware, compose, createStore} from "redux";
// @ts-ignore
import {logger} from "redux-logger/src";
// import {persistStore, persistReducer} from "redux-persist";
// import storage from 'redux-persist/lib/storage'
// import thunk from 'redux-thunk'
import {rootReducer} from "./root";

// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: ['userStore', 'authStore']
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [logger]
const enhancers = compose(applyMiddleware(...middleWares))
export const store = createStore(rootReducer, undefined, enhancers)
// export const persistor = persistStore(store)