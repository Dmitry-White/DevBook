import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then(() => history.push('/login'))
        .catch(err => dispatch(setErrors(err)));
};

// Login;
export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            // Save to LocalStorage
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);

            setAuthToken(token);

            // Decode token to get data
            const decoded = jwt_decode(token);

            dispatch(setCurrentUser(decoded));
        })
        .catch(err => dispatch(setErrors(err)));
};

const setErrors = err => ({
    type: GET_ERRORS,
    payload: err.response.data
});

export const setCurrentUser = decoded => ({
    type: SET_CURRENT_USER,
    payload: decoded
})