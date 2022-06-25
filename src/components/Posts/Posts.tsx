import * as React from "react";
import {ChangeEvent, useState} from "react";



const Posts = (props) => {

    let [text, setText] = useState('');

    const addPost = () => {
        let date = new Date();
        props.addPostAction('-'+date.toLocaleString() +'- '+ text);
        setText('')
    };

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.currentTarget.value)
    };

    return (
        <div className="posts">
            <div><textarea onChange={(e) => onPostChange(e)} placeholder='whats new?'
                           value={text}/></div>
            <div>
                <button onClick={() => addPost()}>Add post</button>
            </div>
        </div>
    )
}
export default Posts;