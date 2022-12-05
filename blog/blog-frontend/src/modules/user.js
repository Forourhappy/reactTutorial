import { createSlice } from '@reduxjs/toolkit';
import createRequestSaga from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import { call, takeLatest } from 'redux-saga/effects';

const initialState = {
	user: null,
	checkError: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		// 새로고침 이후 임시 로그인 처리
		tempSetUser: (state, { payload }) => {
			console.log('payload', payload);
			state.user = payload;
		},
		check: (state, action) => {},
		checkSuccess: (state, { payload }) => {
			state.user = payload;
			state.checkError = null;
		},
		checkFailure: (state, { payload }) => {
			state.user = null;
			state.checkError = payload;
		},
		logout: (state, action) => {
			state.user = null;
		},
	},
});

const checkSaga = createRequestSaga('user/check', authAPI.check);
function checkFailureSaga() {
	try {
		localStorage.removeItem('user');
	} catch (e) {
		console.log('localStorage is not working');
	}
}
function* logoutSaga() {
	try {
		yield call(authAPI.logout);
		localStorage.removeItem('user');
	} catch (e) {
		console.log(e);
	}
}

export function* userSaga() {
	yield takeLatest('user/check', checkSaga);
	yield takeLatest('user/checkFailure', checkFailureSaga);
	yield takeLatest('user/logout', logoutSaga);
}

export const { check, tempSetUser, logout } = userSlice.actions;

export default userSlice.reducer;
