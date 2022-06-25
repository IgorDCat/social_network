import * as React from 'react';
import {useEffect} from 'react';
import './App.scss';
import Navbar from './components/Navbar';
import {Route, Routes} from "react-router-dom";
import {UsersComponent} from "./components/Users/Users";
import LoginPage from "./components/login/Login";
import Settings from "./components/settings/Settings";
import {useDispatch, useSelector} from "react-redux";
import {initializeAppThunk} from "./redux/app_reducer";
import Preloader from "./components/Preloader";
import {ChatPage} from "./components/Chat/chatPage";
import Dialogs from "./components/Dialogs/Dialogs";
import Profile from "./components/Profile/Profile";
import {rootState} from "./redux/redux_store";
import Header from "./components/Header/Header";
import Friends from "./components/Friends";


export const App = () => {

    let initialized = useSelector((state: rootState) => state.app.initialized);
    let dialogs = useSelector((state: rootState) => state.dialogs);
    let state = useSelector((state: rootState) => state);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppThunk())
    }, [])


    if (initialized === false) return <Preloader/>
    return (
        <div className='app_wrapper'>
            <Header/>
            <Navbar dialogs={dialogs}/>
            <Routes>

                <Route path='/dialogs/*' element={<Dialogs/>}/>

                <Route path='/profile/*' element={<Profile/>}/>
                <Route path='' element={<Profile/>}/>
                <Route path='/login' element={<LoginPage state={state}/>}/>
                <Route path='/chat' element={<ChatPage/>}/>
                <Route path='/friends' element={<Friends/>}/>
                <Route path='/users/*' element={<UsersComponent isShowFriendsActive={false}/>}/>
                <Route path='/settings' element={<Settings state={state}/>}/>

            </Routes>

        </div>
    );
}
