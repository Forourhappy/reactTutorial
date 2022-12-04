import { createSlice } from '@reduxjs/toolkit';
import createRequestSaga from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';

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
	},
});

const checkSaga = createRequestSaga('user/check', authAPI.check);
export function* userSaga() {
	yield takeLatest('user/check', checkSaga);
}

export const { check, tempSetUser } = userSlice.actions;

export default userSlice.reducer;
