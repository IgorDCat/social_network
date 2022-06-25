import {addPostActionCreator} from "../../redux/posts_reducer";
import Posts from "./Posts";
import {connect} from "react-redux";
import {appDispatch, rootState} from "../../redux/redux_store";

type mapStateToPropsType = {
    newPostText: string
}

const mapStateToProps = (state: rootState): mapStateToPropsType => ({
    newPostText: state.posts.newPostText
})

const mapDispatchToProps = (dispatch: appDispatch) => {
    return {
        addPostAction: (text: string) => {
            dispatch(addPostActionCreator(text));
        }
    }
}

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default PostsContainer;