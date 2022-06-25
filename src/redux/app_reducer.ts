import {api} from "../api/api";

const INITIALIZE_APP = 'INITIALIZE_APP';

export type initialAppStateType = {
    initialized: boolean
    id: null | number
}

const initialState: initialAppStateType = {
    initialized: false,
    id: null
};

type initializeAppType = {
    type: typeof INITIALIZE_APP
    id: number | null
}

export const initializeApp = (id: number | null): initializeAppType => {
    return {type: INITIALIZE_APP, id: id}
};

export const initializeAppThunk = () => (dispatch) => {
    api.authApi().then(response => {
        dispatch(initializeApp(response.data.data?.id))
    })
}

const app_reducer = (state = initialState, action): initialAppStateType => {

    switch (action.type) {
        case INITIALIZE_APP: {
            return {...state, initialized: true, id: action.id};
        }
        default:
            return state;
    }
}

export default app_reducer;
