import {
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    USER_SAVED_SUCCESS
} from './userTypes';

const initialState = {
    loading: false,
    users: [],
    error: ''
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_USER_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            };
        case FETCH_USER_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            };
        case USER_SAVED_SUCCESS:
            return {
                message: action.payload,
                error: "",
            };
        default:
            return state;
    }
};

export default userReducer;