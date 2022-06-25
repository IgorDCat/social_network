import * as React from 'react';
import {useSelector} from "react-redux";
import {rootState} from "../../redux/redux_store";


export const ProfileInfo = () => {
    const fullName = useSelector((state: rootState) => state.profile.profilePage.fullName);
    const aboutMe = useSelector((state: rootState) => state.profile.profilePage.aboutMe);
    const lookingForAJobDescription = useSelector((state: rootState) => state.profile.profilePage.lookingForAJobDescription);
    const contacts = useSelector((state: rootState) => state.profile.profilePage.contacts);

    return <div className="profile_info">
        <div id='user_name'>Name: {fullName}</div>
        <br/> <br/>
        About me: {aboutMe || ' -'} <br/>
        My professional skills: {lookingForAJobDescription || ' -'} <br/>
        <br/>

        {Object.keys(contacts).map(key => {
            if (contacts[key]) {
                return <div key={key}> {key}: {contacts[key]}</div>
            }
        })}
    </div>
}