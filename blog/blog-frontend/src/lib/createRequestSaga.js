import { call, put } from "redux-saga/effects"
import { finishLoading, startLoading } from "../modules/loading"

export default function createRequestSaga(type, request) {
  const success = `${type}Success`
  const failure = `${type}Failure`

  return function* (action) {
    yield put(startLoading())
    console.log('됨');
    try {
      const response = yield call(request, action.payload)
      console.log(action.payload);
      yield put({
        type: success,
        payload: response.data
      })
    } catch (e) {
      yield put({
        type: failure,
        payload: e,
        error: true
      })
    }
    yield put(finishLoading())
  }
}