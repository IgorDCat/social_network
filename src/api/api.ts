import * as axios from "axios";
import {authDatatype, profilePageType} from "../redux/profile_reducer";
import {usersObjType} from "../redux/users_reducer";

const instance = axios.default.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'api-key': '66bfbba3-284f-450b-864d-22557dffaf23'}      //powerwolf
   // headers: {'api-key': '45004f15-ef31-41d5-8ed9-ee5d11dd136d'}
});


export const api = {
    getUsersApi: (page = 1, count = 10, friend = false) => {
        return instance.get<string, getUsersApiType>(`users?page=${page}&count=${count}&friend=${friend}`).then(response => {
            return response
        })
    },

    getProfileApi: (userId: number) => {
        return instance.get<string, getProfileApiType>(`profile/${userId}`).then(response => {
            return response
        })
    },

    followUserApi: (userId: number) => {
        return instance.post<string, authApiType>(`follow/${userId}`, {}).then(response => {
            return response
        })
    },

    unfollowUserApi: (userId: number) => {
        return instance.delete<string, authApiType>(`follow/${userId}`).then(response => {
            return response
        })
    },

    authApi: () => {
        return instance.get<string, authApiType>(`auth/me`).then(response => {
            return response
        })
    },

    getProfileStatusApi: (userId: number) => {
        return instance.get<string, getProfileStatusApiType>(`profile/status/${userId}`).then(response => {
            return response
        })
    },

    changeProfileStatusApi: (status: string) => {
        return instance.put<object, authApiType>(`profile/status`, {status: status}).then(response => {
            return response
        })
    },

    loginApi: (email: string, password: string, rememberMe = false, captcha: boolean = false) => {
        return instance.post<loginApiType, authApiType>(`auth/login`, {
            email: email,
            password: password,
            rememberMe: rememberMe,
            captcha: captcha
        }).then(response => {
            return response
        })
    },

    logoutApi: () => {
        return instance.delete<string, authApiType>(`auth/login`).then(response => {
            return response
        })
    },

    changeProfileInfoApi: (profileObj: object) => {
        return instance.put<object, authApiType>(`profile`, profileObj).then(response => {
            return response
        })
    },

    sendMainImg: (photo: Blob) => {
        const formData = new FormData();
        formData.append('image', photo);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return response
        })
    },

    getCaptcha: () => {
        return instance.get<string, captchaResponseType>(`security/get-captcha-url`).then(response => {
            return response.data.url
        })
    },
}

export const apiDialogs = {
    getAllDialogs: () => {
        return instance.get(`dialogs`).then(response => {
            return response
        })
    },

    sendMessageToFriend: (userId, body : string) => {
        return instance.post(`dialogs/${userId}/messages`, {body: body}).then(response => {
            return response
        })
    },

    startChatWithFriend: (userId) => {
        return instance.put(`dialogs/${userId}`, {}).then(response => {
            return response
        })
    },
    getMessagesOfFriend: (userId, page = 1, count = 20) => {
        return instance.get(`dialogs/${userId}/messages?page=${page}&count=${count}`).then(response => {
            return response
        })
    },
    getNewMessages: () => {
        return instance.get(`dialogs/messages/new/count`).then(response => {
            return response
        })
    },
    deleteMessage: (messageId) => {
        return instance.delete(`dialogs/messages/${messageId}`).then(response => {
            return response
        })
    },
}

/////////////////////////////////////// types

type getUsersApiType = {
    data: {
        error: null | string
        items: Array<usersObjType>
        totalCount: number
    }
    status: number
}

type getProfileApiType = {
    data: profilePageType
}

export type authApiType = {
    data: {
        data: authDatatype
        resultCode: number
        messages: Array<string> | null
    }
}

type getProfileStatusApiType = {
    data: string
}

type loginApiType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: boolean
}

type captchaResponseType = {
    data: {
        url: string
    }
}