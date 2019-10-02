import {
  FETCH_POSTS,
  FETCH_COMMENTS,
  ADD_POST,
  DELETE_POST,
  ADD_COMMENT,
  ActionTypes
} from "../actions/actionTypes";
import { Posts } from "../actions/Types";

interface Reducer {
  posts: Posts[];
  comments: Posts[];
}

const initialState: Reducer = {
  posts: [],
  comments: []
};

export default (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.data
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.data]
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.data)
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.data]
      };
    case FETCH_COMMENTS:
      return {
        ...state,
        comments: action.data
      };
    default:
      return state;
  }
};
