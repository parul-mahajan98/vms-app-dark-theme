import { combineReducers } from 'redux';

import userReducer from './user/userReducer';
import driverReducer from './driver/driverReducer';
import vehicleReducer from './vehicle/vehicleReducer';
import authReducer from './user/auth/authReducer';

const rootReducer = combineReducers({
    user: userReducer,
    vehicle: vehicleReducer,
    driver: driverReducer,
    auth: authReducer
});
export default rootReducer;