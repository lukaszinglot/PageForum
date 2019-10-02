import jsonPlaceholder from "../../api/jsonPlaceholder";
import {
  FETCH_POSTS,
  FETCH_COMMENTS,
  ADD_POST,
  ADD_COMMENT,
  DELETE_POST,
  ActionTypes
} from "./actionTypes";
import { Types, Posts } from "./Types";
import { Dispatch } from "redux";

export function fetchPosts(data: Types[]): ActionTypes {
  return {
    type: FETCH_POSTS,
    data
  };
}

export function fetchComments(data: Types[]): ActionTypes {
  return {
    type: FETCH_COMMENTS,
    data
  };
}

export const addPost = (data: Posts): ActionTypes => {
  return {
    type: ADD_POST,
    data
  };
};

export const addComment = (data: Posts): ActionTypes => {
  return {
    type: ADD_COMMENT,
    data
  };
};

export const deletePost = (data: Types): ActionTypes => ({
  type: DELETE_POST,
  data
});

export const getPosts = () => (dispatch: Dispatch<ActionTypes>) => {
  jsonPlaceholder
    .get("/posts")
    .then(({ data }) => {
      dispatch(fetchPosts(data));
    })
    .catch(err => {
      console.log(err);
    });
};

export const getComments = () => (dispatch: Dispatch<ActionTypes>) => {
  jsonPlaceholder
    .get("/posts/1/comments")
    .then(({ data }) => dispatch(fetchComments(data)))
    .catch(err => {
      console.log(err);
    });
};

export const addPostCreator = (
  userId: number,
  id: number,
  title: string,
  body: string
) => (dispatch: Dispatch<ActionTypes>) => {
  const newPost = {
    userId,
    id,
    title,
    body
  };
  dispatch(addPost(newPost));
};

export const addCommentCreator = (
  postId: number,
  id: number,
  name: string,
  email: string,
  body: string
) => (dispatch: Dispatch<ActionTypes>) => {
  const newComment = {
    postId,
    id,
    name,
    email,
    body
  };
  dispatch(addComment(newComment));
};

export const deletePostCreator = (data: Types) => (
  dispatch: Dispatch<ActionTypes>
) => {
  dispatch(deletePost(data));
};
