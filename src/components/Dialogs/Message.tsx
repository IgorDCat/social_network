import * as React from 'react';
import dateformat from "dateformat";

const Message = (props) => {

    let messageHour = dateformat(props.addedAt, "H");
    messageHour = Number(messageHour) + 3;    //on the server is wrong time
    if (messageHour >= 24) messageHour = messageHour - 24;
    let messageDate = dateformat(props.addedAt, ":MM:ss dS mmmm, yyyy");

    let currentUserId = 0
    if (props.myId !== props.senderId) {
        currentUserId = props.senderId
    } else {
        currentUserId = props.recipientId
    }

    return (<div className='dialog_message'>
        <div className='message_title'>
            <div><b>{props.senderName}</b></div>
            <div className='end'>{messageHour + messageDate}
                {props.myId === props.senderId ? (props.viewed ? ' //' : ' (not viewed)') : null}</div>
            <div className='deleteMessage' onClick={() => props.onDeleteMessage(props.id, currentUserId)}> X</div>
        </div>
        <div>{props.message}</div>

    </div>)
}

export default Message;