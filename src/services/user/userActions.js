import axios from 'axios';

import {
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    USER_SAVED_SUCCESS
} from './userTypes';

const fetchUserRequest = (loading) => {
    return {
        type: FETCH_USER_REQUEST,
        payload: loading
    };
};
const fetchUserSuccess = (data) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: data
    };
};
const fetchUserFailure = (error) => {
    return {
        type: FETCH_USER_FAILURE,
        payload: error
    };
};

export const fetchUsers = () => {
    let loading = true;
    return (dispatch) => {
        dispatch(fetchUserRequest(loading));
        axios.get("http://localhost:8080/api/v1/users")
            .then(response => {
                dispatch(fetchUserSuccess(response.data));
            }).catch(error => {
                dispatch(fetchUserFailure(error.message));
            });
    };
};

export const registerUser = (userObject) => {
    return (dispatch) => {
        dispatch(fetchUserRequest());
        axios
            .post("http://localhost:8080/api/v1/users", userObject)
            .then((response) => {
                dispatch({
                    type: USER_SAVED_SUCCESS,
                    payload: response.data.message,
                });
            })
            .catch((error) => {
                dispatch(fetchUserFailure(error.message));
            });
    };
};
