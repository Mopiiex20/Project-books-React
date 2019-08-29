import { put, takeEvery, call } from "redux-saga/effects";
import req from '../../services/Request'
import { Book } from './types'


export function* doBuyBook(): IterableIterator<any> {
    yield takeEvery(`@@BUY/DO_BUY`, function* (action: any) {
        try {
            let localBooks = JSON.parse(localStorage.getItem('state') as any).cart;
            let arr = Object.values(localBooks.books)

            const booksData = yield call(req, 'books', 'GET');
            const books = booksData.data;
            console.log(action.bookId);

            const book = books.find((book: Book) => action.bookId === book._id);
            book.quantity = 1;

            if (arr.length === 0) {
                arr.push(book);
                yield put({
                    type: `@@BUY/BUY_OK`,
                    payload: {
                        books: arr
                    }
                });
            } else {
                const data = arr.find((item: any) => item._id === book._id) as any;
                if (data) {
                    arr.forEach((element: any) => {
                        if (element._id === data._id) {
                            element.quantity++;
                        }
                    });
                    book.quantity++
                } else {
                    arr.push(book);
                    yield put({
                        type: `@@BUY/BUY_OK`,
                        payload: {
                            books: arr
                        }
                    });
                }
                yield put({
                    type: `@@BUY/BUY_OK`,
                    payload: {
                        books: arr
                    }
                });

            }





        }
        catch (error) {
            const errorInfo = "loginError"
            yield put({
                type: `@@ERROR/ERROR_OCCURED`,
                payload: {
                    error: errorInfo
                }
            });
        }
    });
}