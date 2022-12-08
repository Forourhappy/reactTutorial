import { createSlice } from '@reduxjs/toolkit';
import createRequestSaga from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const initialState = {
	posts: null,
	error: null,
};

const postsSlice = createSlice({
	name: 'posts',
	initialState: initialState,
	reducers: {
		listPosts: () => {},
		listPostsSuccess: (state, { payload: posts, meta: response }) => {
			state.posts = posts;
			state.lastPage = parseInt(response.headers['last-page'], 10);
		},
		listPostsFailure: (state, action) => {
			state.error = action.payload;
		},
	},
});

const listPostsSaga = createRequestSaga('posts/listPosts', postsAPI.listPosts);
export function* postsSaga() {
	yield takeLatest('posts/listPosts', listPostsSaga);
}

export const { listPosts } = postsSlice.actions;

export default postsSlice.reducer;
