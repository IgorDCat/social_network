import * as React from "react";
import {useEffect, useState} from 'react';
import PostArea from "../Posts/PostArea";
import PostsContainer from "../Posts/PostsContainer";
import {Navigate, NavLink, useMatch} from "react-router-dom";
import {ProfileStatus} from "../ProfileStatus";
import mainPhoto from '../../assets/images/user_cat.png';
import {useDispatch, useSelector} from "react-redux";
import {setDialogs, startChat} from "../../redux/messages_reducer";
import {ProfileInfo} from "./Profile_info";
import {rootState} from "../../redux/redux_store";
import {sendMainImage, setProfileInfoThunk, setSubmitInfo} from "../../redux/profile_reducer";


const Profile = () => {

    const dispatch = useDispatch();
    const photo = useSelector((state: rootState) => state.profile.profilePage.photos.large);
    const app = useSelector((state: rootState) => state.app);
    const postsData = useSelector((state: rootState) => state.posts.postsData);
    const authData = useSelector((state: rootState) => state.profile.authData);
    const userId = useSelector((state: rootState) => state.profile.profilePage.userId);

    const match = useMatch('/profile/:userId');
    let [mainImg, setMainImg] = useState(photo);

    useEffect(() => {
        dispatch(setProfileInfoThunk(authData.id, match))
    }, [match])

    const changeMainImg = () => {
        if (photo) setMainImg(photo)
    }

    useEffect(() => {
        changeMainImg()
    }, [mainImg])


    if (!app.id && app.initialized === true) return <Navigate to='/login'/>;

    const onSendMainImage = async (e) => {
        await dispatch(sendMainImage(e.currentTarget.files[0]))
    }

    const mainImageStyle = () => {
        if (!match) return 'thumbs'
        else return 'avatar'
    }

    const startChatRedirect = () => {
        // @ts-ignore
        dispatch(startChat(match.params.userId));
        dispatch(setDialogs())
    }

    return (
        <div className='content'>

            <div>
                <ProfileStatus match={match} setSubmitInfo={dispatch(setSubmitInfo)}/>
            </div>

            <div className={mainImageStyle()}>
                <img
                    src={!match ? (photo || mainPhoto) : (photo || mainPhoto)} className={mainImageStyle()} alt=''/>
                {!match ?
                    <div className="caption">
                        <span className="title">Change photo:</span>
                        <span className="info"><input className='change_main_img' type={"file"}
                                                      onChange={(e) => onSendMainImage(e)} accept="image/*"/></span>
                    </div>
                    : <NavLink to='/dialogs/'>
                        <button onClick={() => startChatRedirect()}>Send message</button>
                    </NavLink>}
            </div>

            <ProfileInfo/>

            <PostsContainer/>
            <PostArea postsData={postsData}/>

        </div>
    )
}


export default Profile;