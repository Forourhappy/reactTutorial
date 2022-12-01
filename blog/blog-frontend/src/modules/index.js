import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import loading from "./loading";


const rootReducer = combineReducers({
	auth,
	loading
});

export default rootReducer;
