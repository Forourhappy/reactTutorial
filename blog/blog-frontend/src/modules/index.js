import { combineReducers } from "@reduxjs/toolkit";
import { all } from "redux-saga/effects";
import auth, { authSaga } from "./auth";
import loading from "./loading";


const rootReducer = {
	auth,
	loading
};

export function* rootSaga() {
	yield all([authSaga()])
}

export default rootReducer;
