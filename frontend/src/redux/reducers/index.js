import { combineReducers } from "redux";
import {userLoginReducer,userRegisterReducer} from './userReducers';

const reducers = combineReducers({
	userPanelLogin: userLoginReducer,
  	userRegister: userRegisterReducer
});

export default reducers;
