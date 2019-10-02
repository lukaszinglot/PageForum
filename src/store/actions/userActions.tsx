import jsonPlaceholder from "../../api/jsonPlaceholder";
import { FETCH_USER, ActionTypes } from "./actionTypes";
import { Types } from "./Types";
import { Dispatch } from "redux";

export function fetchUsers(data: Types[], ids: Types[]): ActionTypes {
  return {
    type: FETCH_USER,
    data,
    ids
  };
}

export const getUsers = () => (dispatch: Dispatch<ActionTypes>) => {
  jsonPlaceholder.get("/users").then(({ data }) => {
    const userData: {}[] = [];
    const ids = data.map(
      (user: { id: number }) => ((userData[user.id] = user), user.id)
    );
    dispatch(fetchUsers(userData, ids));
  });
};
