import axios from 'axios';

import {
    GET_ERRORS,
    POSTS_LOADING,
    GET_POST,
    GET_POSTS,
    ADD_POST,
    DELETE_POST
} from './types';

// Add Post
export const addPost = postData => dispatch => {
    axios.post('/api/posts', postData)
        .then(res => dispatch({
            type: ADD_POST,
            payload: res.data
        }))
        .catch(err => dispatch(setErrors(err)));
};

// Get all posts
export const getPosts = () => dispatch => {
    dispatch(setPostsLoading());

    axios.get('/api/posts')
        .then(res => dispatch(getAllPosts(res)))
        .catch(err => dispatch(getAllPosts({ data: null })));
};

// Post by Id
export const getCurrentPost = postId => dispatch => {
    dispatch(setPostsLoading());

    axios.get(`/api/posts/${postId}`)
        .then(res => dispatch(getPost(res)))
        .catch(err => dispatch(getPost({ data: {} })));
};

// Delete Post
export const deletePost = postId => dispatch => {
    axios.delete(`/api/posts/${postId}`)
        .then(res => dispatch({
            type: DELETE_POST,
            payload: res.data
        }))
        .catch(err => dispatch(setErrors(err)));
};

// Like a  Post
export const likePost = postId => dispatch => {
    axios.post(`/api/posts/like/${postId}`)
        .then(res => dispatch(getAllPosts(res)))
        .catch(err => dispatch(setErrors(err)));
};

// Unlike a  Post
export const unlikePost = postId => dispatch => {
    axios.post(`/api/posts/unlike/${postId}`)
        .then(res => dispatch(getAllPosts(res)))
        .catch(err => dispatch(setErrors(err)));
};

// Comment a  Post
export const commentPost = postId => dispatch => {
    axios.post(`/api/posts/comment/${postId}`)
        .then(res => dispatch(getPost(res)))
        .catch(err => dispatch(setErrors(err)));
};

// Uncomment a  Post
export const uncommentPost = (postId, commentId) => dispatch => {
    axios.delete(`/api/posts/comment/${postId}/${commentId}`)
        .then(res => dispatch(getPost(res)))
        .catch(err => dispatch(setErrors(err)));
};

const setErrors = err => ({
    type: GET_ERRORS,
    payload: err.response.data
});

const getPost = res => ({
    type: GET_POST,
    payload: res.data
});

const getAllPosts = res => ({
    type: GET_POSTS,
    payload: res.data
});


export const setPostsLoading = () => {
    return {
        type: POSTS_LOADING
    }
};