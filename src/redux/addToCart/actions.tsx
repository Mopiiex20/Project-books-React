import { BuyActions } from './types'

const prefix = "@@BUY";

export default function doBuyBook(bookId: number) {
    return {
        type: `${prefix}/${BuyActions.DO_BUY}`,
        bookId
    }
};
export function increment(incId: any, books1: any, counter: any) {
    return {
        type: "@@BUY/INCREMENT",
        payload: { incId, books1, counter }
    }
};
export function decrement(decId: any, books: any, counter: any) {
    return {
        type: "@@BUY/DECREMENT",
        payload: { decId, books, counter }

    }
};
export function clearCart() {
    return {
        type: "@@BUY/CLEAR_CART"
    }
};

