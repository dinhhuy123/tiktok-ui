// import axios from 'axios';
import * as httpRequest from '~/utils/httpRequest';

export const getSuggestedUsers = async ({ page, perPage, accessToken }) => {
    try {
        const res = await httpRequest.get(`users/suggested`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                page,
                per_page: perPage,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getFollowingUsers = async ({ page, accessToken }) => {
    try {
        const res = await httpRequest.get(`me/followings`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getUserProfile = async ({ nickname, accessToken }) => {
    try {
        const res = await httpRequest.get(`users/@${nickname}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getVideos = async ({ type, page, accessToken = '' }) => {
    try {
        return await httpRequest.get(`videos`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                type,
                page,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export const followAnUser = async ({ userId, accessToken }) => {
    try {
        return await httpRequest.post(`users/${userId}/follow`, [], {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                withCredentials: true,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export const unFollowAnUser = async ({ userId, accessToken }) => {
    try {
        return await httpRequest.post(`users/${userId}/unfollow`, [], {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                withCredentials: true,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export const likeVideo = async ({ userId, accessToken }) => {
    try {
        return await httpRequest.post(`users/${userId}/like`, [], {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export const unLikeVideo = async ({ userId, accessToken }) => {
    try {
        return await httpRequest.post(`users/${userId}/unlike`, [], {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        console.log(error);
    }
};
