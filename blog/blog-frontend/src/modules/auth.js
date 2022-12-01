import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects'
import * as authAPI from '../lib/api/auth'

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
		login: (state, { payload: { username, password } }) => {
			state.username = username
			state.password = password
		}
	},
});

// 사가 생성
function* registerSaga() {
	try {
		yield call()
	}
}

export function* authSaga() {
	yield takeLatest('auth/register', authAPI)
}


export const { changeField, initializeForm } = authSlice.actions;

export default authSlice.reducer
