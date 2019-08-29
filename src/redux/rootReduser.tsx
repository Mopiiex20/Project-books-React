import { Reducer, combineReducers } from "redux";

import { LoginState } from "./login/types";
import { ErrorState } from "./common/types";
import { AdminState } from './admin/types';
import { BuyBookState } from "./addToCart/types";

import { loginReducer } from "./login/reducer";
import { errorReducer } from './common/reducer';
import { adminReducer } from "./admin/reduser";
import { cartReducer } from "./addToCart/reducer";

export interface RootState {
    cart : BuyBookState;
    login: LoginState;
    errorData: ErrorState;
    adminData: AdminState;
}

const rootReduser: Reducer<RootState> = combineReducers<RootState>({
    errorData: errorReducer,
    login: loginReducer,
    adminData: adminReducer,
    cart : cartReducer
})

export default rootReduser
