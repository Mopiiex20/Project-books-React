import { put, takeEvery } from "redux-saga/effects";
import { delay } from "redux-saga/effects";

export function* onError(): IterableIterator<any> {
  yield takeEvery(`@@ERROR/ERROR_OCCURED`, function* (action: any) {
    try {
      yield put({
        type: `@@ERROR/ERROR_SHOW`,
      });

      yield (delay(2500));

      yield put({
        type: `@@ERROR/ERROR_HIDE`
      });

    } catch (error) {
      yield put({
        type: `@@ERROR/ERROR_SHOW`,
        payload: {
          error: error.message
        }
      });
      yield (delay(5000));
      yield put({
        type: `@@ERROR/ERROR_HIDE`
      });
    }
  });
}
