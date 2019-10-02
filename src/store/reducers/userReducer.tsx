import { FETCH_USER, ActionTypes } from "../actions/actionTypes";
import { Types } from "../actions/Types";
const initialState: Types = {
  data: [],
  ids: []
};

export const userReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        data: action.data,
        ids: action.ids
      };
    default:
      return state;
  }
};

export default userReducer;
