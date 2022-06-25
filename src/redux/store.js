import React from 'react';
import messages_reducer from "./messages_reducer";
import posts_reducer from "./posts_reducer";

let store = {

    callSubscriber() {
        console.log('rerenderEntireTree')
    },

    subscribe(listener) {
        this.callSubscriber = listener;
    },

    _state: {
        posts: {
            postsData: [
                {id: 1, postMessage: 'My 1st post', likesCount: 12},
                {id: 2, postMessage: 'My 2nd post', likesCount: 22},
            ],
            newPostText: ''
        },
        dialogs: {
            dialogsData: [
                {
                    id: 1,
                    name: 'friend1',
                    avatar: 'https://sun9-78.userapi.com/impg/jNfPuXmsj7u6DCGLYkZ6rQWm00tXV-yUWpmb6g/J-WaQIKBAAc.jpg?size=604x604&quality=96&sign=df38060cbaa926b0ae13de5c961613d9&type=album'
                },
                {
                    id: 2,
                    name: 'friend2',
                    avatar: 'https://avatars.mds.yandex.net/get-pdb/1645430/6845e32c-a6ef-47dc-815f-4d5a47663649/s1200?webp=false'
                },
                {id: 3, name: 'friend3', avatar: 'https://i01.fotocdn.net/s108/94b3d78f7f5fc7f3/user_l/2381673902.jpg'}
            ],
            messagesData: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How are you?'},
                {id: 3, message: 'yo'}
            ],
            newMessageText: '',
        }
},

    getState() {
        return this._state
    },

    dispatch(action) {
       this._state.dialogs = messages_reducer(this._state.dialogs, action);
       this._state.posts = posts_reducer(this._state.posts, action);
       this.callSubscriber(this._state);
    }
};

export default store;