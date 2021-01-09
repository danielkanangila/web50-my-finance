export const SET_AUTH_USER = "SET_AUTH_USER";
export const DELETE_AUTH_USER = "SET_AUTH_USER";

export const setAuth = (user) => ({ type: SET_AUTH_USER, payload: user });
export const deleteAuth = () => ({ type: DELETE_AUTH_USER });
