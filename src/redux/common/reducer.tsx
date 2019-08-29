import { RootState } from "../../redux/rootReduser";
import { ErrorState } from "./types"

export const initialState: ErrorState = {
  error: "",
  errorInfo : ""
};

export function errorReducer(state: ErrorState = initialState, action: any) {
  
  switch (action.type) {
    case `@@ERROR/ERROR_OCCURED`: {
      const { data } = action.payload;
      return {
        ...state,
        errorInfo : data
      };
    }
    case `@@ERROR/ERROR_SHOW`: {
      return {
        ...state,
        error : "error"
      };
    }
    case `@@ERROR/ERROR_HIDE`: {
      return {
        ...state,
        error : ""
      };
    }
    default:
      return state;
  }
}
export const error = (state: RootState) => state.errorData;
