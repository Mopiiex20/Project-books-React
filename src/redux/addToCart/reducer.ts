import { BuyBookState } from "./types";
import { RootState } from "../rootReduser";


export const initialState: BuyBookState = {
    books: [],
    quant: 0
};

export function cartReducer(state: BuyBookState = initialState, action: any) {
    switch (action.type) {
        case "@@BUY/DO_BUY": {
            return {
                ...state
            };
        }
        case "@@BUY/BUY_OK": {
            const { books } = action.payload;
            return {
                ...state,
                books: books
            };
        }
        case "@@BUY/CLEAR_CART": {
            return {
                books: initialState.books,
                quant: initialState.quant
            };
        }
        case "@@BUY/INCREMENT": {
            const { incId, books1, counter } = action.payload;
            console.log(incId);
            
            books1.map((book: any) => (
                book._id === incId ? book.quantity++ : null
            ))
            return {
                ...state,
                books: books1,
                quant: counter
            };
        }
        case "@@BUY/DECREMENT": {
            let { decId, books, counter } = action.payload;
            const check = books.find((book: any) => book._id === decId);
            if (check.quantity === 1) {
               let newB = books.filter((book: any) => book._id !== decId);
               books = newB;
            } else {
                books.map((book: any) => (
                    book._id === decId ?
                        (book.quantity--)
                        : null
                ))
            }
            return {
                ...state,
                books: books,
                quant: counter
            };
        }
        default:
            return state;
    }
}
export const cart = (state: RootState) => state.cart;