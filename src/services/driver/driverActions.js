import axios from 'axios';

import {
    FETCH_DRIVER_REQUEST,
    FETCH_DRIVER_SUCCESS,
    FETCH_DRIVER_FAILURE,
    ADD_DRIVER_REQUEST,
    ADD_DRIVER_SUCCESS,
    ADD_DRIVER_FAILURE,
    UPDATE_DRIVER_REQUEST,
    UPDATE_DRIVER_SUCCESS,
    UPDATE_DRIVER_FAILURE,
    DELETE_DRIVER_REQUEST,
    DELETE_DRIVER_SUCCESS,
    DELETE_DRIVER_FAILURE
    
} from './driverTypes';
const fetchDriverRequest = (loading) => {
    return {
        type: FETCH_DRIVER_REQUEST,
        payload: loading
    };
};
const fetchDriverSuccess = (data) => {
    return {
        type: FETCH_DRIVER_SUCCESS,
        payload: data
    };
};
const fetchDriverFailure = (error) => {
    return {
        type: FETCH_DRIVER_FAILURE,
        payload: error
    };
};
const addDriverRequest = () => {
    return {
        type: ADD_DRIVER_REQUEST,
        
    };
};
const addDriverSuccess = (data) => {
    return {
        type: ADD_DRIVER_SUCCESS,
        payload: data
    };
};
const addDriverFailure = (error) => {
    return {
        type: ADD_DRIVER_FAILURE,
        payload: error
    };
};
const updateDriverRequest = () => {
    return {
        type: UPDATE_DRIVER_REQUEST,
        
    };
};
const updateDriverSuccess = (data) => {
    return {
        type: UPDATE_DRIVER_SUCCESS,
        payload: data
    };
};
const updateDriverFailure = (error) => {
    return {
        type: UPDATE_DRIVER_FAILURE,
        payload: error
    };
};
const deleteDriverRequest = () => {
    return {
        type: DELETE_DRIVER_REQUEST,
       
    };
};
const deleteDriverSuccess = (data) => {
    return {
        type: DELETE_DRIVER_SUCCESS,
        payload: data
    };
};
const deleteDriverFailure = (error) => {
    return {
        type: DELETE_DRIVER_FAILURE,
        payload: error
    };
};

export const fetchDrivers = () => {
    let loading = true;
    return (dispatch) => {
        dispatch(fetchDriverRequest(loading));
        axios.get("http://localhost:8080/api/v1/drivers")
            .then(response => {
                dispatch(fetchDriverSuccess(response.data));
            }).catch(error => {
                dispatch(fetchDriverFailure(error.message));
            });
    };
};

export const addDriver = (driver) => {
    return (dispatch) => {
        dispatch(addDriverRequest());
        axios.post("http://localhost:8080/api/v1/drivers", driver)
            .then(response => {
                dispatch(addDriverSuccess(response.data));

            }).catch(error => {
                dispatch(addDriverFailure(error.message));
            });
    };
};

export const updateDriver = (id,driver) => {
    return (dispatch) => {
        dispatch(updateDriverRequest());
        axios.put(`http://localhost:8080/api/v1/drivers/${id}`, driver)
            .then(response => {
                dispatch(updateDriverSuccess(response.data));

            }).catch(error => {
                dispatch(updateDriverFailure(error.message));
            });
    };
};

export const deleteDriver = (id) => {
    return (dispatch) => {
        dispatch(deleteDriverRequest());
        axios.delete(`http://localhost:8080/api/v1/drivers/${id}`)
            .then(response => {
                dispatch(deleteDriverSuccess(response.data));

            }).catch(error => {
                dispatch(deleteDriverFailure(error.message));
            });
    };
};

