import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsersThunk, onFollowUser, onPageSelected, onUnfollowUser} from "../../redux/users_reducer";
import style from "./users.module.scss";
import userPhoto from '../../assets/images/userPhoto.png'
import {NavLink} from "react-router-dom";
import {rootState} from "../../redux/redux_store";
import Preloader from "../Preloader";
import {Dispatch} from "redux";


export const UsersComponent = (props) => {

    const dispatch = useDispatch();
    const is_shown_preloader = useSelector((state: rootState) => state.users.is_shown_preloader);
    const selectedPage = useSelector((state: rootState) => state.users.selectedPage);
    const count = useSelector((state: rootState) => state.users.count);
    const totalCount = useSelector((state: rootState) => state.users.totalCount);
    //let [isShowFriendsActive, setIsShowFriendsActive] = useState(false)

   useEffect(() => {
        dispatch(getUsersThunk(selectedPage, count, props.isShowFriendsActive));
    }, [props.isShowFriendsActive])


/*    const ShowFriendsCheckbox = () => {
        const showHideFriends = async () => {
            if (selectedPage !== 1) await dispatch(onPageSelected(1, count, isShowFriendsActive));
            setIsShowFriendsActive(prev => !prev)
        }
        return <div><input type='checkbox' onClick={() => showHideFriends()}/> show only friends</div>
    }*/

    return (<div>
            {is_shown_preloader ? <Preloader/> : null}
            <div className='page_numbers'>
                <Paginator totalCount={totalCount} count={count} selectedPage={selectedPage}
                           isShowFriendsActive={props.isShowFriendsActive} dispatch={dispatch}/>

            </div>
            <UserElement/>
        </div>
    );
}


type paginatorPropsType = {
    totalCount: number
    dispatch: Dispatch<any>
    count: number
    isShowFriendsActive?: boolean
    selectedPage: number
}

export const Paginator: React.FC<paginatorPropsType> = (props) => {
    let [portionNumber, setPortionNumber] = useState(1)
    const portionSize = 20;
    const leftPageInPortion = (portionNumber - 1) * (portionSize);
    const totalCountPages = Math.ceil(props.totalCount / 10);

    const rightPageInPortion = () => {
        let rightPage = portionNumber * portionSize;
        if (rightPage > totalCountPages) rightPage = totalCountPages;
        return rightPage
    }
    let pagesArr = [];
    for (let i = leftPageInPortion + 1; i <= rightPageInPortion(); i++) {
        pagesArr.push(<span onClick={() => {
            props.dispatch(onPageSelected(i, props.count, props.isShowFriendsActive));
        }}
                            className={props.selectedPage == i ? 'selected_page_number' : 'non_selected_page_number'}
                            key={i}>{' ' + i + ' '}</span>)
    }
    const buttonPrevDisable = () => {
        if (leftPageInPortion === 0) return true
    }
    const buttonNextDisable = () => {
        if (rightPageInPortion() === totalCountPages) return true
    }
    const buttonNext = (<button key='next' disabled={buttonNextDisable()}
                                onClick={() => setPortionNumber(prev => prev + 1)}> next </button>);
    const buttonPrev = (<button key='prev' disabled={buttonPrevDisable()}
                                onClick={() => setPortionNumber(prev => prev - 1)}> prev </button>);
    pagesArr.push(' ', buttonNext, ' ... ', totalCountPages);
    pagesArr.unshift(buttonPrev, ' ');
    return (<div>
        {pagesArr}
    </div>)
}

export const UserElement = () => {
    const users = useSelector((state: rootState) => state.users.users);
    const followingInProgressList = useSelector((state: rootState) => state.users.followingInProgressList);
    const dispatch = useDispatch();

    return <div>
        {users.map(u => <div className={style.users} key={u.id}>
                <NavLink to={'/profile/' + u.id}>
                    <div><img src={u.photos.small != null ? u.photos.small : userPhoto} className={style.user_img} alt=''/>
                    </div>
                </NavLink>
                <div className={style.description}>
                    <div className={style.title}> {u.name}</div>
                    <div> id: {u.id} </div>
                    {u.status && <div>Status: {u.status} </div>}
                    <button disabled={followingInProgressList.some(id => id === u.id)}
                            onClick={() => u.followed ? dispatch(onUnfollowUser(u.id)) : dispatch(onFollowUser(u.id))}>
                        {u.followed ? 'unfollow' : 'follow'}
                    </button>
                </div>
            </div>
        )}
        </div>
}