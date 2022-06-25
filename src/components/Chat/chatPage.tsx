import * as React from "react";
import {useState} from "react";

export const ChatPage = () => {
let [likes, setLikes] = useState(0)
    return <div>
        {likes+' '}
            <button onClick={()=>setLikes(prev=> prev+1)}>like</button>
    </div>
}
