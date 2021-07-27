import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST
} from './authTypes';



const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    };
};
const loginSuccess = (isLoggedIn) => {
    return {
        type: LOGIN_SUCCESS,
        payload: isLoggedIn
    };
};
const loginFailure = () => {
    return {
        type: LOGIN_FAILURE,
        payload: false
    };
};

const logoutRequest = () => {
    return {
        type: LOGOUT_REQUEST
    };
};

export const authenticateUser = (username, password) => {
    return (dispatch) => {
        dispatch(loginRequest());
        if (username === "test" && password === "test") {
            dispatch(loginSuccess(true));
        } else {
            dispatch(loginFailure());
        }
    };
};

export const logoutUser = () => {
    return (dispatch) => {
        dispatch(logoutRequest());
        dispatch(loginSuccess(false));
    };
};