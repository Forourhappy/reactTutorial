import { createSlice } from '@reduxjs/toolkit';
import createRequestSaga from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const initialState = {
	title: '',
	body: '',
	tags: [],
};

const writeSlice = createSlice({
	name: 'write',
	initialState: initialState,
	reducers: {
		initialize: state => (state = initialState),
		changeField: (state, { payload: { key, value } }) => {
			state[key] = value;
		},
		writePost: (state, { payload: { title, body, tags } }) => {
			state.title = title;
			state.body = body;
			state.tags = tags;
			state.post = null;
			state.postError = null;
		},
		// 포스트 작성 성공
		writePostSuccess: (state, action) => {
			state.post = action.payload;
		},
		// 포스트 작성 실패
		writePostFailure: (state, action) => {
			state.postError = action.payload;
		},
	},
});

// 사가 생성
const writePostSaga = createRequestSaga('write/writePost', postsAPI.writePost);
export function* writeSaga() {
	yield takeLatest('write/writePost', writePostSaga);
}

export const { changeField, initialize, writePost } = writeSlice.actions;

export default writeSlice.reducer;
