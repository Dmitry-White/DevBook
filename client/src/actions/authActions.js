import axios from 'axios';

import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS } from './types';

const errObj = err => ({
    type: GET_ERRORS,
    payload: err.response.data
})

// Register
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then(() => history.push('/login'))
        .catch(err => dispatch(errObj(err)));
};

// Login
export const loginUser = (userData, history) => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            // Save to LocalStorage
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);

            history.push('/dashboard');
        })
        .catch(err => dispatch(errObj(err)));
};