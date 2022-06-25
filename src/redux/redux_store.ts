import {applyMiddleware, combineReducers, createStore} from "redux";
import posts_reducer from "./posts_reducer";
import messages_reducer from "./messages_reducer";
import users_reducer from "./users_reducer";
import profile_reducer from "./profile_reducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import app_reducer from "./app_reducer";

const rootReducer = combineReducers ({
    dialogs: messages_reducer,
    posts: posts_reducer,
    users: users_reducer,
    profile: profile_reducer,
    form: formReducer,
    app: app_reducer,
});

export type rootState = ReturnType<typeof store.getState>
export type appDispatch = typeof store.dispatch


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;   //для разработки

let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));    //для разработки

//let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));   // для продакшена
// @ts-ignore
window.__store__ = store;

export default store;