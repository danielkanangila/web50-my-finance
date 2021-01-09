import { SET_AUTH_USER, DELETE_AUTH_USER } from "./../actions";
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
    default:
      throw new Error("Unknown reducer action.");
  }
};
