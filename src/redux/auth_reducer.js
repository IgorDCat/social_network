/*import {api} from "../api/api";

const SET_AUTH = 'SET_AUTH';

let initialState = {
    authData: {

    }
};

export const setAuth = (authData) => {
    return {type: SET_AUTH, authData: authData}
};

export const setAuthUser = (authData) => {
    return (dispatch) => {
        api.authApi().then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuth(response.data.data));
                return authData
            }
        })
    }
}

const auth_reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH: {
            return {...state, authData: action.authData};
        }
        default:
            return state;
    }
}

export default auth_reducer;*/




