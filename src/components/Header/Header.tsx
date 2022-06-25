import * as React from 'react';
import {NavLink} from "react-router-dom";
import cat_logo from '../../assets/images/cat-logo.png';
import {useDispatch, useSelector} from "react-redux";
import {rootState} from "../../redux/redux_store";
import {toLogoutUser} from "../../redux/profile_reducer";
import {initializeApp} from "../../redux/app_reducer";

const Header = () => {
    let classOfLogoutButton = 'login_form_button'
    const login = useSelector((state: rootState) => state.profile.authData.login);
    const dispatch = useDispatch()

    const hideLogoutButton = () => {
        classOfLogoutButton = 'hide_button'
        return 'log-in'
    }

    const onLogout = async () => {
        await dispatch(toLogoutUser());
        dispatch(initializeApp(null))
    }
    return (
        <header className='header'>
            <div>
                <img src={cat_logo}/>
            </div>
            <div className="social_netw_name">
                CAT SOCIAL NETWORK
            </div>
            <span className='login_header'>

                    {login? login + ' ' : hideLogoutButton()}

                 <NavLink to='/login'>
                <button className={classOfLogoutButton} onClick={()=> onLogout()}>log out</button>
                 </NavLink>
            </span>
        </header>
    )
}
export default Header;
