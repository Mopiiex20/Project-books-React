import { RootState } from "../rootReduser";


export const initialState: any = {
    data: []
};

export function adminReducer(state: any = initialState, action: any) {
    switch (action.type) {
        case "@@ADMIN/DO_ADMIN": {
            return {
                ...state
            };
        }
        case "@@ADMIN/ADMIN_SUCCESS": {
            const { usersData, booksData } = action.payload;
            return {
                usersData: usersData,
                booksData: booksData
            };
        }
        case `@@ADMIN/ADMIN_FAILED`: {
            return {
                ...state,
                errorText: "adminError"
            };
        }


        default:
            return state;
    }
}
export const adminData = (state: RootState) => state.adminData;