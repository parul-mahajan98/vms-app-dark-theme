import axios from 'axios';

import {
    FETCH_VEHICLE_REQUEST,
    FETCH_VEHICLE_SUCCESS,
    FETCH_VEHICLE_FAILURE,
    ADD_VEHICLE_REQUEST,
    ADD_VEHICLE_SUCCESS,
    ADD_VEHICLE_FAILURE,
    UPDATE_VEHICLE_REQUEST,
    UPDATE_VEHICLE_SUCCESS,
    UPDATE_VEHICLE_FAILURE,
    DELETE_VEHICLE_REQUEST,
    DELETE_VEHICLE_SUCCESS,
    DELETE_VEHICLE_FAILURE
    
} from './vehicleTypes';
const fetchVehicleRequest = (loading) => {
    return {
        type: FETCH_VEHICLE_REQUEST,
        payload: loading
    };
};
const fetchVehicleSuccess = (data) => {
    return {
        type: FETCH_VEHICLE_SUCCESS,
        payload: data
    };
};
const fetchVehicleFailure = (error) => {
    return {
        type: FETCH_VEHICLE_FAILURE,
        payload: error
    };
};
const addVehicleRequest = () => {
    return {
        type: ADD_VEHICLE_REQUEST
    };
};
const addVehicleSuccess = (data) => {
    return {
        type: ADD_VEHICLE_SUCCESS,
        payload: data
    };
};
const addVehicleFailure = (error) => {
    return {
        type: ADD_VEHICLE_FAILURE,
        payload: error
    };
};
const updateVehicleRequest = () => {
    return {
        type: UPDATE_VEHICLE_REQUEST
    };
};
const updateVehicleSuccess = (data) => {
    return {
        type: UPDATE_VEHICLE_SUCCESS,
        payload: data
    };
};
const updateVehicleFailure = (error) => {
    return {
        type: UPDATE_VEHICLE_FAILURE,
        payload: error
    };
};
const deleteVehicleRequest = () => {
    return {
        type: DELETE_VEHICLE_REQUEST
    };
};
const deleteVehicleSuccess = (data) => {
    return {
        type: DELETE_VEHICLE_SUCCESS,
        payload: data
    };
};
const deleteVehicleFailure = (error) => {
    return {
        type: DELETE_VEHICLE_FAILURE,
        payload: error
    };
};

export const fetchVehicles = () => {
    let loading = true;
    return (dispatch) => {
        dispatch(fetchVehicleRequest(loading));
        axios.get("http://localhost:8080/api/v1/vehicles")
            .then(response => {
                dispatch(fetchVehicleSuccess(response.data));
            }).catch(error => {
                dispatch(fetchVehicleFailure(error.message));
            });
    };
};

export const addVehicle = (vehicle) => {
    return (dispatch) => {
        dispatch(addVehicleRequest());
        axios.post("http://localhost:8080/api/v1/vehicles", vehicle)
            .then(response => {
                dispatch(addVehicleSuccess(response.data));

            }).catch(error => {
                dispatch(addVehicleFailure(error.message));
            });
    };
};

export const updateVehicle = (id,vehicle) => {
    return (dispatch) => {
        dispatch(updateVehicleRequest());
        axios.put(`http://localhost:8080/api/v1/vehicles/${id}`, vehicle)
            .then(response => {
                dispatch(updateVehicleSuccess(response.data));

            }).catch(error => {
                dispatch(updateVehicleFailure(error.message));
            });
    };
};

export const deleteVehicle = (id) => {
    return (dispatch) => {
        dispatch(deleteVehicleRequest());
        axios.delete(`http://localhost:8080/api/v1/vehicles/${id}`)
            .then(response => {
                dispatch(deleteVehicleSuccess(response.data));

            }).catch(error => {
                dispatch(deleteVehicleFailure(error.message));
            });
    };
};

