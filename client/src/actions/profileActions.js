import axios from 'axios';

import {
    GET_PROFILE,
    SET_CURRENT_USER,
    PROFILE_LOADING,
    GET_ERRORS,
    CLEAR_CURRENT_PROFILE
} from './types';

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

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
    axios.post('/api/profile', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch(setErrors(err)));
};

// Delete User and Profile
export const deleteAccount = () => dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        axios.delete('/api/profile')
            .then(res => dispatch({
                type: SET_CURRENT_USER,
                payload: {}
            }))
            .catch(err => dispatch(setErrors(err)));
    }
};

// Add or edit experience
export const addExperience = (expData, history) => dispatch => {
    axios.post('/api/profile/experience', expData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch(setErrors(err)));
};

// Add or edit education
export const addEducation = (eduData, history) => dispatch => {
    axios.post('/api/profile/education', eduData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch(setErrors(err)));
};

const setErrors = err => ({
    type: GET_ERRORS,
    payload: err.response.data
});

export const clearCurrentProfile = () => dispatch => {
    dispatch({
        type: CLEAR_CURRENT_PROFILE
    });
};

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
};