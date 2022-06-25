import * as React from 'react';
import {Input} from "../../utils/validate";
import {Field, reduxForm} from "redux-form";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {rootState} from "../../redux/redux_store";
import {changeProfileInfo} from "../../redux/profile_reducer";

const Settings = (props) => {
    let app = useSelector((state: rootState) => state.app);
    let userId = useSelector((state: rootState) => state.profile.profilePage.userId);
    const dispatch = useDispatch()

    if (!app.id && app.initialized === true) return <Navigate to='/login'/>;
    if (!userId) return <Navigate to='/profile'/>;



    const onSubmit = (formData) => {
        dispatch(changeProfileInfo(formData))
    }
return (
        <div>
            <h2>Profile Info</h2>

            <div>
                <ProfileInfoForm onSubmit={onSubmit} state={props.state} initialValues={props.state.profile.profilePage}/>
            </div>
        </div>
    )
}

let ProfileInfoForm = (props) => {

    const {handleSubmit} = props
    return <form onSubmit={handleSubmit}>

        <div>About me: <Field name="aboutMe" placeholder='About me' component={Input} type='text' Typefield='input'/>
        </div>
        <div><Field name="lookingForAJob" component='input' type='checkbox'/> Looking for a job?</div>
        <div>My professional skills: <Field name="lookingForAJobDescription" placeholder='My professional skills'
                                            component={Input} type='text' Typefield='input'/></div>
        <div>Full name<Field name="fullName" placeholder='Full name' component={Input} type='text' Typefield='input'/>
        </div>

        <div>{Object.keys(props.state.profile.profilePage.contacts).map(key => {
            return <div key={key + '1'}>{key}: <Field name={'contacts.' + key} placeholder={key} component={Input}
                                                      type='text' Typefield='input' key={key}/></div>
        })}
        </div>
        <button className='login_form_button' type='submit'>save</button>
        <span className='login_error'>{props.error ? ' ' + props.error : null}</span>
        <div className='success'>{props.state.profile.submitInfo ? ' success!' : null}</div>
    </form>
}

ProfileInfoForm = reduxForm({
    form: 'profileInfo'
})(ProfileInfoForm)

export default Settings;