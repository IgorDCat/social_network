import React, {useState} from 'react';

const Post = (props) => {
    let [likes, setLikes] = useState(0)

    return (
        <div className='post'>
            <div className='miniava'>
                <img src="https://cdn.kwork.ru/files/avatar/large/44/2299957-4.jpg"/>
            </div>

            <div className='message'>
                <label>{props.message} </label>
            </div>
            <div className='like'>
                <button onClick={()=> setLikes(prev => prev+1)} id='like_button'>Like! ({likes})</button>
            </div>
        </div>
    )
}

export default Post;