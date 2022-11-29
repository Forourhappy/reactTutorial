import { createReducer, createSlice } from '@reduxjs/toolkit';

const initialState = {
	register: {
		username: '',
		password: '',
		passwordConfirm: ''
	},
	login: {
		username: '',
		password: ''
	}
};

const auth = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		CHANGE_FIELD: (state, { payload: { form, key, value } }) => {
			state[form][key] = value
		},
		INITIALIZE_FORM: (state, { payload: form }) => {
			state[form] = initialState[form]
		}
	}
})
export const changeField = auth.actions.CHANGE_FIELD
export const initializeForm = auth.actions.INITIALIZE_FORM

export default auth;
