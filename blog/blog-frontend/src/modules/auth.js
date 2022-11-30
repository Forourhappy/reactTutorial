import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';

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
	},
});

export const { changeField, initializeForm } = authSlice.actions;

export default authSlice.reducer;
