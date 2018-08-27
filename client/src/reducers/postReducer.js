import { GET_POST, GET_POSTS, POSTS_LOADING, ADD_POST, DELETE_POST } from '../actions/types';

const initialState = {
    post: {},
    posts: [],
    loading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case POSTS_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_POST:
            return {
                ...state,
                post: action.payload,
                loading: false
            }
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
        case ADD_POST:
            return {
                ...state,
                posts: action.payload
            }
        case DELETE_POST:
            return {
                ...state,
                posts: action.payload
            }
        default:
            return state;
    }
};