import { createSlice } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga from '../lib/createRequestSaga';

const initialState = {
	register: {
		username: '',
		password: '',
		passwordConfirm: '',
	},
	login: {
		username: '',
		password: '',
	},
	auth: null,
	authError: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		changeField: (state, { payload: { form, key, value } }) => {
			state[form][key] = value;
		},
		initializeForm: (state, { payload }) => {
			state[payload] = initialState[payload];
		},
		register: (state, { payload: { username, password } }) => {
			state.username = username;
			state.password = password;
		},
		registerSuccess: (state, action) => {
			state.authError = null;
			state.auth = action.payload;
		},
		registerFailure: (state, action) => {
			state.authError = action.payload;
		},
		login: (state, { payload: { username, password } }) => {
			state.username = username;
			state.password = password;
		},
		loginSuccess: (state, action) => {
			state.authError = null;
			state.auth = action.payload;
		},
		loginFailure: (state, action) => {
			state.authError = action.payload;
		},
	},
});

// 사가 생성
const registerSaga = createRequestSaga('auth/register', authAPI.register);
const loginSaga = createRequestSaga('auth/login', authAPI.login);
export function* authSaga() {
	yield takeLatest('auth/register', registerSaga);
	yield takeLatest('auth/login', loginSaga);
}

export const { changeField, initializeForm, register, login } =
	authSlice.actions;

export default authSlice.reducer;
