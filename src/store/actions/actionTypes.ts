import { Types, Posts } from "./Types";

export const FETCH_USER = "FETCH_USER";
export const FETCH_POSTS = "FETCH_POSTS";
export const FETCH_COMMENTS = "FETCH_COMMENTS";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const ADD_COMMENT = "ADD_COMMENT";

interface FetchUserAction {
  type: typeof FETCH_USER;
  data: Types[];
  ids: Types[];
}

interface FetchPostAction {
  type: typeof FETCH_POSTS;
  data: Types[];
}

interface FetchCommentsAction {
  type: typeof FETCH_COMMENTS;
  data: Types[];
}

export interface AddPostAction {
  type: typeof ADD_POST;
  data: Posts;
}
interface DeletePostAction {
  type: typeof DELETE_POST;
  data: Types;
}

interface AddCommentAction {
  type: typeof ADD_COMMENT;
  data: Posts;
}

export type ActionTypes =
  | FetchUserAction
  | FetchPostAction
  | FetchCommentsAction
  | AddPostAction
  | DeletePostAction
  | AddCommentAction;
