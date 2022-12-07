import { createSlice } from '@reduxjs/toolkit';
import createRequestSaga from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const initialState = {
	post: null,
	error: null,
};

const postSlice = createSlice({
	name: 'post',
	initialState: initialState,
	reducers: {
		readPost: () => {},
		readPostSuccess: (state, action) => {
			state.post = action.payload;
		},
		readPostFailure: (state, action) => {
			state.error = action.payload;
		},
		unloadPost: state => {
			state = initialState;
		},
	},
});

const readPostSaga = createRequestSaga('post/readPost', postsAPI.readPost);
export function* postSaga() {
	yield takeLatest('post/readPost', readPostSaga);
}

export const { readPost, unloadPost } = postSlice.actions;

export default postSlice.reducer;
