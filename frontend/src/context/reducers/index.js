import {
  SET_AUTH_USER,
  DELETE_AUTH_USER,
  SET_TRANSACTIONS,
  SET_ANALYTICS,
  SET_ACCOUNTS,
  SET_ERROR,
  SET_LOADING,
} from "./../actions";
export const reducer = (state, action) => {
  switch (action.type) {
    case SET_AUTH_USER:
      return {
        ...state,
        auth: action.payload,
      };
    case DELETE_AUTH_USER:
      return {
        ...state,
        auth: null,
      };
    case SET_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload,
      };
    case SET_ANALYTICS:
      return {
        ...state,
        analytics: action.payload,
      };
    case SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ERROR:
      if (action.payload)
        return {
          ...state,
          errors: [...state.errors, action.payload],
        };
      else
        return {
          ...state,
          errors: [],
        };
    default:
      throw new Error("Unknown reducer action.");
  }
};
