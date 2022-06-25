import {api} from "../api/api";
import {stopSubmit, reset} from "redux-form";
import {appDispatch, rootState} from "./redux_store";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";


export type initialStateType = {
    profilePage: profilePageType
    authData: authDatatype
    isAuth: boolean
    status: null | string
    captchaURL: null | string
    submitInfo: null | string
}

export type profilePageType = {
        aboutMe: null | string
        fullName: null | string
        lookingForAJob: boolean
        lookingForAJobDescription: null | string
        userId: null | number
        contacts: {
            facebook: null | string
            github: null | string
            instagram: null | string
            mainLink: null | string
            twitter: null | string
            vk: null | string
            website: null | string
            youtube: null | string
        },
        photos: photosType
    }

type photosType = {
    small: null | string
    large: null | string}

export type authDatatype = {
        email: null | string
        id: null | number
        login: null | string
    }


const initialState: initialStateType = {
    profilePage: {
        aboutMe: null,
        fullName: null,
        lookingForAJob: false,
        lookingForAJobDescription: null,
        userId: null,
        contacts: {
            facebook: null,
            github: null,
            instagram: null,
            mainLink: null,
            twitter: null,
            vk: null,
            website: null,
            youtube: null
        },
        photos: {
            small: null,
            large: null,
        },
    },
    authData: {
        email: null,
        id: null,
        login: null
    },
    isAuth: false,
    status: '',
    captchaURL: null,
    submitInfo: null,
};


const setAuth = (authData: authDatatype) => {
    return {type: 'SET_AUTH', authData: authData}
};
const setProfile = (profile: profilePageType) => {
    return {type: 'SET_PROFILE', profile: profile}
};
const setStatus = (status: string) => {
    return {type: 'SET_STATUS', status: status}
};
const changeStatus = (status: string) => {
    return {type: 'CHANGE_STATUS', status: status}
};
const setMainImage = (photos: photosType) => {
    return {type: 'CHANGE_MAIN_IMAGE', photos: photos}
};
const setCaptcha = (captchaURL: string) => {
    return {type: 'SET_CAPTCHA', captchaURL: captchaURL}
};

export const setSubmitInfo = (submitInfo: null | string) => {
    return {type: 'SET_SUBMIT_INFO', submitInfo: submitInfo}
};

export const setProfileStatus = (userId: number) => {
    return async (dispatch: appDispatch) => {
        let response = await api.getProfileStatusApi(userId)
            dispatch(setStatus(response.data));
    }
};

export const changeProfileStatus = (status: string) => {
    return async (dispatch: appDispatch) => {
        let response = await api.changeProfileStatusApi(status)
        if (response.data.resultCode === 0) {
        dispatch(changeStatus(status));}
        else dispatch(setSubmitInfo(response.data.messages[0]))
    }
};

export const setAuthUser = (): thunkType => {
    return async (dispatch) => {
        let response = await api.authApi()
        if (response.data.resultCode === 0) {
            dispatch(setAuth(response.data.data));
        } else dispatch(setAuth({email: null, id: null, login: null}))
    }
};

export type thunkType = ThunkAction<void, rootState, unknown, AnyAction>


export const toLoginUser = (email: string, password: string, rememberMe: boolean, captcha: boolean): thunkType =>
    async (dispatch) => {
    let response = await api.loginApi(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        await dispatch(reset('login'));
        await dispatch(setAuthUser())
    } else {
        if (response.data.resultCode === 10) {
            let captchaURL = await api.getCaptcha();
            dispatch(setCaptcha(captchaURL))
        }
        dispatch(stopSubmit('login', {password: response.data.messages[0]}))
    }

}

export const toLogoutUser = () => async (dispatch) => {
    await api.logoutApi()
    dispatch(setAuthUser())
}

export const setProfileInfoThunk = (id: number, match): thunkType => async (dispatch) => {
    let userId;
    if (id) userId = id
    let response = await api.authApi()
    if (response.data.resultCode === 0) {
        userId = response.data.data.id;
        await dispatch(setAuth(response.data.data));

        if (match) {
            userId = match.params.userId
        }
        let response1 = await api.getProfileApi(userId)
        dispatch(setProfile(response1.data))
        return response1.data
    }
}

export const sendMainImage = (image: Blob) => async (dispatch) => {
    let response = await api.sendMainImg(image)
    dispatch(setMainImage(response.data.data.photos.large))
}

export const changeProfileInfo = (profileObj) => async (dispatch) => {
    let response = await api.changeProfileInfoApi(profileObj);
    if (response.data.resultCode === 0) {
        dispatch(setProfile(profileObj));
        dispatch(setSubmitInfo('Success!'))
    } else dispatch(stopSubmit('profileInfo', {_error: response.data.messages[0]}))
}

const profile_reducer = (state = initialState, action): initialStateType => {
    switch (action.type) {
        case 'SET_PROFILE': {
            return {...state, profilePage: action.profile};
        }
        case 'SET_AUTH': {
            return {...state, authData: action.authData};
        }
        case 'SET_STATUS': {
            return {...state, status: action.status};
        }
        case 'CHANGE_STATUS': {
            return {...state, status: action.status};
        }
        case 'CHANGE_MAIN_IMAGE': {
            return {...state, profilePage: {...state.profilePage, photos: action.photos} }
        }
        case 'SET_CAPTCHA': {
            return {...state, captchaURL: action.captchaURL};
        }
        case 'SET_SUBMIT_INFO': {
            return {...state, submitInfo: action.submitInfo};
        }
        default:
            return state;
    }
}

export default profile_reducer;
