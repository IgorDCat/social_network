import * as React from "react";
import {ChangeEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {rootState} from "../redux/redux_store";
import {changeProfileStatus, setProfileStatus} from "../redux/profile_reducer";

export const ProfileStatus = (props) => {

    const status = useSelector((state: rootState) => state.profile.status);
    const auth = useSelector((state: rootState) => state.profile.authData);
    const submitInfo = useSelector((state: rootState) => state.profile.submitInfo);
    const dispatch = useDispatch();
    let [editMode, setEditMode] = useState(false);
    let [statusText, setStatusText] = useState(status);

    useEffect(() => {
        updateComponent()
    }, [status, auth.id, props.match]);

    useEffect(() => {
        timeOut()
    }, [submitInfo]);

    const updateComponent = () => {
        if (props.match) {
            dispatch(setProfileStatus(props.match.params.userId));
            setStatusText(status);
        } else {
            if (auth.id) dispatch(setProfileStatus(auth.id));
            setStatusText(status);
        }
    }

    const editStatusToggle = (action: string) => {
        if (!props.match) {
            if (action === 'active') {
                setEditMode(true)
            } else {
                setEditMode(false)
            }
        }
    }

    const changeThisStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setStatusText(e.currentTarget.value)
    }

    const statusStyle = () => {
        if (!props.match) return 'status'
    }

    const timeOut = () => {
       if (submitInfo) setTimeout(()=>props.setSubmitInfo(null),5000)
    }
    return (
        <div>
            {!editMode ?
                <div className={statusStyle()} onClick={() => editStatusToggle('active')}>
                    <span className='statusSpan'> {statusText ? statusText :
                        <span className='no_active'>----------</span>} </span>
                </div>
                :
                <div>
                    <input autoFocus={true} value={statusText} onChange={(e) => changeThisStatus(e)}/>
                    <button onClick={() => {
                        editStatusToggle('nonactive');
                        dispatch(changeProfileStatus(statusText));
                        setStatusText(statusText)
                    }}>
                        save
                    </button>
                </div>

            } <div className='login_error'>{!submitInfo? null : submitInfo }
            </div>

        </div>
    )
}
