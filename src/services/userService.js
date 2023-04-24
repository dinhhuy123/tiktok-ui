// import axios from 'axios';
import * as httpRequest from '~/utils/httpRequest';

export const getSuggestedUsers = async (page, perPage) => {
    try {
        const res = await httpRequest.get(`users/suggested`, {
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

export const getFollowingUsers = async (page) => {
    try {
        const res = await httpRequest.get(`me/followings`, {
            headers: {
                Authorization: `Bearer ${process.env.REACT_AUTH_TOKEN}`,
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
