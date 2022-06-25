import * as React from 'react';
import {NavLink} from "react-router-dom";
import {setMessages, setUnreadMessages} from "../../redux/messages_reducer";
import {useSelector} from "react-redux";
import {rootState} from "../../redux/redux_store";

const Dialog = (props) => {
    let path = '/dialogs/' + props.id;
    let selectedFriend = useSelector((state: rootState) => state.dialogs.selectedFriend);


    const setLocalMessages = () => {
        props.dispatch(setMessages(props.id));
        props.setCurrentUser(props.id);
    }

    return (
        <div className={selectedFriend === props.id? 'dialog_friend_selected' :'dialog_friend'} onClick={()=> setLocalMessages()} >
            <div className='dialogImg'><img src={props.avatar} className='dialogImg'/></div>
            <div className='friend_name'><NavLink to={path}>{props.name}</NavLink></div>
            <div className='friend_info'>Last activity: {props.lastUserActivityDate}<br/>
            new messages: {props.hasNewMessages? ' yes': ' no'}</div>

        </div>
    )
}

export default Dialog;