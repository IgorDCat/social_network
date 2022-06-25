import * as React from "react";
import Post from './Post';
import {postsDataType} from "../../redux/posts_reducer";

type propsType = {
    postsData: Array<postsDataType>
}

const PostArea = (props: propsType) => {
    let postElement = props.postsData.map( elem => <Post key={elem.id} message = {elem.postMessage} likes={elem.likesCount}/>);
    return (
        <div className ='post_area'>
            {postElement}
        </div>
    )
}

export default PostArea;