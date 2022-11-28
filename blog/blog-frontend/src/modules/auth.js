import { createReducer } from '@reduxjs/toolkit';

const SAMPLE_ACTION = 'auth/SAMPLE_ACTION';

const initialState = {};

const auth = createReducer(initialState, builder => {
	builder.addCase(SAMPLE_ACTION, (state, action) => state);
});

export default auth;
