import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import post, { postSaga } from './post';
import posts, { postsSaga } from './posts';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';

const rootReducer = {
	auth,
	loading,
	user,
	write,
	post,
	posts,
};

export function* rootSaga() {
	yield all([authSaga(), userSaga(), writeSaga(), postSaga(), postsSaga()]);
}

export default rootReducer;
