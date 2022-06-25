import * as React from 'react';
import {NavLink} from "react-router-dom";
import Friends from "./Friends";
import {useDispatch, useSelector} from "react-redux";
import {rootState} from "../redux/redux_store";
import {setUnreadMessages} from "../redux/messages_reducer";
import {useEffect} from "react";


const Navbar = (props) => {
    const dispatch = useDispatch();

    let unreadMessages = useSelector((state: rootState) => state.dialogs.unreadMessages);

    useEffect(()=>{
        dispatch(setUnreadMessages())
    },[unreadMessages])

    if(unreadMessages==null) dispatch(setUnreadMessages())

    return (
        <nav className='nav'>
            <NavLink to ='/profile'>
                <div className='nav_link'>Profile</div>
            </NavLink>
            <NavLink to='/dialogs/'>
                <div className='nav_link'>Messages {unreadMessages? '('+unreadMessages+')' : null}</div>
            </NavLink>
            <NavLink to='/chat/'>
                <div className='nav_link'>Chat</div>
            </NavLink>
            <NavLink to='/friends/'>
                <div className='nav_link'>Friends</div>
            </NavLink>
            <NavLink to='/settings'>
                <div className='nav_link'>Settings</div>
            </NavLink>
            <NavLink to='/users'>
                <div className='nav_link'>Users</div>
            </NavLink>
            <br/>
        </nav>
    )
}


export default Navbar;