import * as React from 'react';
import {UsersComponent} from "./Users/Users";

const Friends = () => {

    return (
        <div>
            <UsersComponent isShowFriendsActive={true}/>
        </div>
    )
}

export default Friends;
