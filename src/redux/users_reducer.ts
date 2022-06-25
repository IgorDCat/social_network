import {api} from "../api/api";
import {appDispatch} from "./redux_store";
import {thunkType} from "./profile_reducer";
import {createBrowserHistory} from "history";

const SET_USERS = 'SET_USERS';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SELECT_PAGE = 'SELECT_PAGE';
const SET_TOTAL_COUNT_PAGES = 'SET_TOTAL_COUNT_PAGES';
const TO_SHOW_PRELOADER = 'TO_SHOW_PRELOADER';
const DISABLE_FOLLOWING_BUTTON_TOGGLE = 'DISABLE_FOLLOWING_BUTTON_TOGGLE';


type initialStateType = {
    users: Array<usersObjType>
    selectedPage: number | null
    count: number
    totalCount: number
    is_shown_preloader: boolean
    followingInProgressList: Array<number>
}

export type usersObjType = {
    followed: boolean
        id: number | null
        name: string | null
        status: string | null
        uniqueUrlName: string | null
        photos: {
            large: string | null
            small: string | null
        }
}

let initialState: initialStateType = {
    users: [],
    selectedPage: 1,  //номер выбранной страницы
    count: 10,  //кол-во item на странице
    totalCount: 0,
    is_shown_preloader: true,
    followingInProgressList: [],
}

/////////////////////////////////////// types
type followUserType = {
    type: typeof FOLLOW, id: number
}
type unfollowUserType = {
    type: typeof UNFOLLOW, id: number
}
type setUsersType = {
    type: typeof SET_USERS, users: Array<usersObjType>
}
type selectPageType = {
    type: typeof SELECT_PAGE, selectedPage: number
}
type setTotalCountPagesType = {
    type: typeof SET_TOTAL_COUNT_PAGES, totalCount: number
}
type toShowPreloaderType = {
    type: typeof TO_SHOW_PRELOADER, is_shown_preloader: boolean
}
type disableFollowingButtonToggleType = {
    type: typeof DISABLE_FOLLOWING_BUTTON_TOGGLE, isFollowingInProgress: boolean, userId: number
}

type actionTypes = followUserType | unfollowUserType | setUsersType | selectPageType | setTotalCountPagesType |
    toShowPreloaderType | disableFollowingButtonToggleType

export const followUser = (id: number): followUserType =>  {
    return {type: FOLLOW, id: id}
}

export const unfollowUser = (id: number):unfollowUserType => {
    return {type: UNFOLLOW, id: id}
}

export const setUsers = (users: Array<usersObjType>): setUsersType => {
    return {type: SET_USERS, users: users}
}

export const selectPage = (selectedPage): selectPageType => {
    return {type: SELECT_PAGE, selectedPage: selectedPage}
}

export const setTotalCountPages = (totalCount: number): setTotalCountPagesType => {
    return {type: SET_TOTAL_COUNT_PAGES, totalCount: totalCount}
}

export const toShowPreloader = (is_shown_preloader: boolean): toShowPreloaderType => {
    return {type: TO_SHOW_PRELOADER, is_shown_preloader: is_shown_preloader}
}

export const disableFollowingButtonToggle = (isFollowingInProgress, userId): disableFollowingButtonToggleType => {
    return {type: DISABLE_FOLLOWING_BUTTON_TOGGLE, isFollowingInProgress: isFollowingInProgress, userId: userId}
}



export const getUsersThunk = (page: number, count: number, friend: boolean): thunkType =>  (dispatch: appDispatch) => {
        api.getUsersApi(page, count, friend).then(response => {
            dispatch(setUsers(response.data.items));
            dispatch(setTotalCountPages(response.data.totalCount));
            dispatch(toShowPreloader(false));
        });
}

const followUnfollowToggle = (followUserDispatch: ()=> void, followUserApi, userId): thunkType => async (dispatch: appDispatch) => {
    dispatch(disableFollowingButtonToggle(true, userId));
        followUserApi(userId).then(response => {
            if (response.status === 200) {
                followUserDispatch()
            }
            dispatch(disableFollowingButtonToggle(false, userId))
        })
}

export const onFollowUser = (userId: number): thunkType => {
    return (dispatch) => {
        const followUserApi = () => api.followUserApi(userId);
        dispatch(followUnfollowToggle(()=>dispatch(followUser(userId)), followUserApi, userId));
    }
}

export const onUnfollowUser = (userId: number): thunkType => {
    return (dispatch) => {
        const followUserApi = () => api.unfollowUserApi(userId);
        dispatch(followUnfollowToggle(()=>dispatch(unfollowUser(userId)), followUserApi, userId))
    }
}

export const onPageSelected = (page: number, count: number, friend: boolean): thunkType => {
    return async (dispatch: appDispatch) => {
        dispatch(toShowPreloader(true));
        let response = await api.getUsersApi(page, count, friend)
        dispatch(setUsers(response.data.items));
        dispatch(toShowPreloader(false));
        dispatch(selectPage(page))
    }
}

const users_reducer = (state = initialState, action: actionTypes): initialStateType => {

    switch (action.type) {
        case SET_USERS: {
            return {...state, users: action.users};
        }
        case SELECT_PAGE: {
            return {...state, selectedPage: action.selectedPage};
        }
        case SET_TOTAL_COUNT_PAGES: {
            return {...state, totalCount: action.totalCount};
        }
        case TO_SHOW_PRELOADER: {
            return {...state, is_shown_preloader: action.is_shown_preloader};
        }
        case FOLLOW: {
            return {...state, ...state.users.map(u => {
                    if (action.id === u.id) {
                        return u.followed = true}
                })
            };
        }
        case UNFOLLOW: {
            return {...state, ...state.users.map(u => {
                    if (action.id === u.id) {
                        return u.followed = false}
                })
            };
        }
        case DISABLE_FOLLOWING_BUTTON_TOGGLE: {
            return {...state, followingInProgressList: action.isFollowingInProgress
                    ? [...state.followingInProgressList, action.userId]
                    : state.followingInProgressList.filter(id => id != action.userId)
            };
        }
        default:
            return state;
    }
}

export default users_reducer;