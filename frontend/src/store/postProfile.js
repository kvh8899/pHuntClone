import { csrfFetch } from "./csrf";
import { toggle } from "./postshow";
const GETONEPOST = "post/getonepost";
const getOnePost = (data) => {
  return {
    type: GETONEPOST,
    payload: data,
  };
};
export const getSinglePost = (id) => async (dispatch) => {
  const res = await fetch(`/api/posts/${id}`);
  const data = await res.json();
  dispatch(getOnePost(data));
  return data;
};
export const Post = (data) => async (dispatch) => {
  const response = await csrfFetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const cPost = await response.json();
  dispatch(toggle(cPost.id));
  return cPost;
};

export const updatePost = (data, id) => async (dispatch) => {
  await csrfFetch(`/api/posts/${id}/edit`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  dispatch(toggle(id));
  return id;
};

//data should include userId and the content of the comment
export const postComment = (data, postId) => async (dispatch) => {
  await csrfFetch(`/api/posts/${postId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

//REDUCER
function postProfile(state = {}, action) {
  switch (action.type) {
    case GETONEPOST:
      return action.payload;
    default:
      return state;
  }
}
export default postProfile;
