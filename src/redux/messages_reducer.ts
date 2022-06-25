import {apiDialogs} from "../api/api";
import {reset} from "redux-form";

const SET_DIALOGS: string = 'SET_DIALOGS';
const SET_MESSAGES: string = 'SET_MESSAGES';
const SELECT_FRIEND: string = 'SELECT_FRIEND';
const SET_NUMBER_OF_UNREAD_MESSAGES: string = 'SET_NUMBER_OF_UNREAD_MESSAGES';

type dialogsDataType = {
    id: number
    userName: string
    photos: {
        small: string | null
    }
    hasNewMessages: boolean
    lastUserActivityDate: string
    lastDialogActivityDate: string
}
type messagesDataType = {
    senderId: number
    recipientId: number
    senderName: string
    id: string        //id of message
    body: string        //text of message
    addedAt: string
    viewed: boolean
}
type initialStateType = {
    dialogsData: Array<dialogsDataType>
    messagesData: Array<messagesDataType>
    selectedFriend: number
    unreadMessages: number | null
}

let initialState: initialStateType = {
    dialogsData: [],
    messagesData: [],
    selectedFriend: 0,
    unreadMessages: null
}

function setReceivedDialogs(dialogsData: Array<dialogsDataType>) {
    return {type: SET_DIALOGS, dialogsData: dialogsData}
}

export function setMessagesResponse(messagesData: Array<messagesDataType>) {
    return {type: SET_MESSAGES, messagesData: messagesData}
}

function selectFriend(selectedFriend: number) {
    return {type: SELECT_FRIEND, selectedFriend: selectedFriend}
}

export function setNumberOfUnreadMessages(unreadMessages: number) {
    return {type: SET_NUMBER_OF_UNREAD_MESSAGES, unreadMessages: unreadMessages}
}

export const sendMessageThunk = (userId, body: string) => async (dispatch) => {
    let response = await apiDialogs.sendMessageToFriend(userId, body);
    if (response.data.resultCode === 0) {
        await dispatch(reset('DialogTextFieldForm'))
    }
    await dispatch(setMessages(userId));
}

export const setDialogs = () => async (dispatch) => {
    let response = await apiDialogs.getAllDialogs();
    await dispatch(setReceivedDialogs(response.data));
}
export const setMessages = (userID: number, unreadMessages?) => async (dispatch) => {
    let response = await apiDialogs.getMessagesOfFriend(userID);
    await dispatch(setMessagesResponse(response.data.items));
    dispatch(selectFriend(userID));
    if(unreadMessages !==0|| unreadMessages !== undefined) dispatch(setUnreadMessages())
}
export const startChat = (userID: number) => async (dispatch) => {
    let response = await apiDialogs.startChatWithFriend(userID);
    await dispatch(setDialogs())
    await dispatch(setMessagesResponse(response.data.items));
}
export const deleteMessage = (messageID: number, currentUserId: number) => async (dispatch) => {
    await apiDialogs.deleteMessage(messageID);
    await dispatch(setMessages(currentUserId));
}
export const setUnreadMessages = () => async (dispatch) => {
    let response = await apiDialogs.getNewMessages();
    dispatch(setNumberOfUnreadMessages(response.data))
}

const messages_reducer = (state = initialState, action): initialStateType => {

    switch (action.type) {
        case SET_MESSAGES: {
            return {
                ...state, messagesData: action.messagesData
            }
        }
        case SET_DIALOGS: {
            return {
                ...state, dialogsData: action.dialogsData
            }
        }
        case SELECT_FRIEND: {
            return {
                ...state, selectedFriend: action.selectedFriend
            }
        }
        case SET_NUMBER_OF_UNREAD_MESSAGES: {
            return {
                ...state, unreadMessages: action.unreadMessages
            }
        }
        default:
            return state;
    }
}

export default messages_reducer;