import { LoginState } from "./types";
import { RootState } from "../rootReduser";
import req from "../../services/Request";



export const initialState: LoginState = {
    isLoggedIn: false,
    user: "",
    errorText: "",
    isAdmin: false,
    loading: false,
    token: '',
    avatar: '',
    firstName: ""
};

export function loginReducer(state: LoginState = initialState, action: any) {
    switch (action.type) {
        case "@@LOGIN/DO_LOGIN": {
            return {
                ...state,
                loading: true,
            };
        }
        case "@@LOGIN/LOGIN_SUCCESS": {
            const { data, isAdmin, token } = action.payload;
            return {
                ...state,
                user: data,
                avatar: data.avatar,
                firstName: data.firstName,
                token: token,
                isAdmin: isAdmin,
                loading: false,
                isLoggedIn: true,
            };
        }
        case `@@LOGIN/LOGIN_FAILED`: {
            const { data } = action.payload;
            return {
                ...state,
                data,
                loading: false,
                isLoggedIn: false,
                errorText: "auth error"
            };
        }
        case `@@LOGIN/CHANGE_AVATAR`: {
            const { user } = action;
            req(`users/${user._id}`, "PUT", user);
            return {
                ...state,
                avatar: user.avatar,
                user: user
            };
        }
        case `@@LOGIN/CHANGE_NAME`: {
            const { user } = action;
            req(`users/${user._id}`, "PUT", user);
            return {
                ...state,
                user: user,
                firstName: user.firstName
            };
        }
        case `@@LOGIN/LOGOUT`: {
            return {
                isLoggedIn: false,
                user: "",
                errorText: "",
                isAdmin: false,
                loading: false,
                token: '',
                avatar: '',
                firstName: ""
            };
        }
        default:
            return state;
    }
}
export const login = (state: RootState) => state.login;