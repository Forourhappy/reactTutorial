import { call, put } from 'redux-saga/effects';
import { finishLoading, startLoading } from '../modules/loading';

export default function createRequestSaga(type, request) {
	const success = `${type}Success`;
	const failure = `${type}Failure`;

	return function* (action) {
		yield put(startLoading(type));
		try {
			const response = yield call(request, action.payload);
			yield put({
				type: success,
				payload: response.data,
			});
		} catch (e) {
			yield put({
				type: failure,
				payload: e,
				error: true,
			});
		}
		yield put(finishLoading(type));
	};
}
