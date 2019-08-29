import { put, takeEvery, call } from "redux-saga/effects";
import req from '../../services/Request'

export function* doAdmin(): IterableIterator<any> {
    yield takeEvery(`@@ADMIN/DO_ADMIN`, function* (action: any) {
        try {

            const usersData = yield call(req, 'users', 'GET');

            const booksData = yield call(req, 'books', 'GET');

            console.log(usersData.data);

            yield put({
                type: `@@ADMIN/ADMIN_SUCCESS`,
                payload: {
                    usersData: usersData.data,
                    booksData: booksData.data,
                }
            });
        }
        catch (error) {
            yield put({
                type: `@@ERROR/ERROR_OCCURED`,
                payload: {
                    error: error.message
                }
            });
        }
    });
}