import axios from 'axios';
import {
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed,
    logoutStart,
    logoutSuccess,
    logoutFailed,
} from './authSlice';
import { getUsersStart, getUsersSuccess, getUsersFailed } from './userSlice';

const baseUrl = 'http://localhost:5001';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${baseUrl}/login`, user, {
            withCredentials: true,
        });
        dispatch(loginSuccess(res.data));
        navigate('/');
    } catch (error) {
        dispatch(loginFailed());
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const res = await axios.post(`${baseUrl}/register`, user);
        dispatch(registerSuccess(res.data));
        navigate('/');
    } catch (error) {
        dispatch(registerFailed());
    }
};

export const logoutUser = async (dispatch, id, navigate, accessToken, axiosJWT) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post(`${baseUrl}/logout`, id, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(logoutSuccess());
        navigate('/');
    } catch (error) {
        dispatch(logoutFailed());
    }
};

export const refreshToken = async () => {
    try {
        const res = await axios.post(`${baseUrl}/refresh`, {
            withCredentials: true,
        });
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getUsersStart());
    try {
        const res = await axiosJWT.get(`${baseUrl}`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(getUsersSuccess(res.data));
    } catch (error) {
        dispatch(getUsersFailed());
    }
};
