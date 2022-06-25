const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';

export type postsDataType = {
        id: number | null
        postMessage: string | null
        likesCount: number | null
    }

export type initialPostStateType = {
    postsData: Array<postsDataType>
    newPostText: string | null
}

let initialState: initialPostStateType = {
    postsData: [
        {id: 1, postMessage: 'My 1st post', likesCount: 12},
        {id: 2, postMessage: 'My 2nd post', likesCount: 22},
    ],
    newPostText: ''
}

type addPostActionCreatorType =
    { type: typeof ADD_POST, newPostMessage: string }

export function addPostActionCreator(text): addPostActionCreatorType {
    return {type: ADD_POST, newPostMessage: text}
}

const posts_reducer = (state = initialState, action): initialPostStateType => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {id: 3, postMessage: action.newPostMessage, likesCount: 0};
            return  {...state,
                postsData: [newPost, ...state.postsData]};
        }
        default:
            return state;
    }
}

export default posts_reducer;