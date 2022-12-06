import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';

const rootReducer = {
	auth,
	loading,
	user,
	write,
};

export function* rootSaga() {
	yield all([authSaga(), userSaga(), writeSaga()]);
}

export default rootReducer;
