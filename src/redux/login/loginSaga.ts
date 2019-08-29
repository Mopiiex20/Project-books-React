import { put, takeEvery, call } from "redux-saga/effects";
import req from '../../services/Request';
import { error } from "../common/reducer";
import * as jwt from "jwt-then";

export function* doLogin(): IterableIterator<any> {
    yield takeEvery(`@@LOGIN/DO_LOGIN`, function* (action: any) {
        try {
            const res = yield call(req, 'auth', 'POST', action.data);

            const decoded: any = yield call(jwt.verify, res.token, "secret");

            if (res.isLoggedIn) {
                yield put({
                    type: `@@LOGIN/LOGIN_SUCCESS`,
                    payload: {
                        data: decoded,
                        isAdmin: decoded.isAdmin,
                        token : res.token
                    }
                });
            } else {
                yield put({
                    type: `@@LOGIN/LOGIN_FAILED`,
                    payload: {
                        error: error
                    }
                });
                const errorInfo = "loginError"
                yield put({
                    type: `@@ERROR/ERROR_OCCURED`,
                    payload: {
                        data: errorInfo
                    }
                });
            }
        }
        catch (error) {
            const errorInfo = "loginError"
            yield put({
                type: `@@ERROR/ERROR_OCCURED`,
                payload: {
                    data: errorInfo
                }
            });
        }
    });
}