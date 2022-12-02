import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects'
import * as authAPI from '../lib/api/auth'
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
	authError: null
};

const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		changeField: (state, { payload: { form, key, value } }) => {
			state[form][key] = value;
		},
		initializeForm: (state, { payload: form }) => {
			state[form] = initialState[form];
		},
		register: (state, { payload: { username, password } }) => {
			state.username = username
			state.password = password
		},
		registerSuccess: (state, { payload: { auth } }) => {
			state.authError = null
			state.auth = auth
		},
		registerError: (state, { payload: { error } }) => {
			state.authError = error
		},
		login: (state, { payload: { username, password } }) => {
			state.username = username
			state.password = password
		},
		loginSuccess: (state, { payload: { auth } }) => {
			state.authError = null
			state.auth = auth
		},
		loginError: (state, { payload: { error } }) => {
			state.authError = error
		},
	},
});

// 사가 생성
const registerSaga = createRequestSaga('register', authAPI.register)
const loginSaga = createRequestSaga('login', authAPI.login)
export function* authSaga() {
	yield takeLatest('auth/register', registerSaga)
	yield takeLatest('auth/login', loginSaga)
}

export const { changeField, initializeForm, register, login } = authSlice.actions;

export default authSlice.reducer
