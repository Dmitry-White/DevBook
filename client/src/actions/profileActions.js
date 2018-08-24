import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../utils/setAuthToken';
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, } from './types';

// Current Profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());

    axios.get('/api/profile')
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch(err => dispatch({
            type: GET_PROFILE,
            payload: {}
        }));
};

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
};