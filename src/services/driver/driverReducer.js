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

const initialState = {
    loading: false,
    drivers: [],
    error: ''
};

const driverReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DRIVER_REQUEST:
            case ADD_DRIVER_REQUEST:
                case UPDATE_DRIVER_REQUEST:
                    case DELETE_DRIVER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_DRIVER_SUCCESS:
            return {
                loading: false,
                drivers: action.payload
            };
        case FETCH_DRIVER_FAILURE:
            case ADD_DRIVER_FAILURE:
                case UPDATE_DRIVER_FAILURE:
                    case DELETE_DRIVER_FAILURE:
            return {
                loading: false,
                error: action.payload
            };
        case ADD_DRIVER_SUCCESS:
            return {
                loading: false,
                drivers: [...state.drivers, action.payload]
            };
        case UPDATE_DRIVER_SUCCESS:
            const updatedDrivers = state.drivers.filter(driver => driver.id !== action.payload.id);
            return {
                loading: false,
                drivers: [...updatedDrivers, action.payload]
            };
        case DELETE_DRIVER_SUCCESS:
                const filteredDrivers = state.drivers.filter(driver => driver.id !== action.payload.id);
                return {
                    loading: false,
                    drivers: filteredDrivers
                };    
        default:
            return state;
    }
};
export default driverReducer;