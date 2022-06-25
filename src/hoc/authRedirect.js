import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {useMatch} from "react-router";


export const AuthRedirect = (Component) => {



    class RedirectComponent extends React.Component {
        componentDidMount() {

        }

        render() {
            return <Component {...this.props}/>
        }
    }


    const mapStateToProps = (state) => ({
        state: state
    })
    let ConnectedComponent = connect(mapStateToProps)(RedirectComponent)
    return RedirectComponent
}



export default AuthRedirect