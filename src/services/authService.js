import * as httpRequest from '~/utils/httpRequest';

export const login = async (email, password) => {
    try {
        return await httpRequest.post('auth/login', {
            email,
            password,
        });
    } catch (error) {
        console.log(error);
    }
};

export const register = async (type, email, password) => {
    try {
        return await httpRequest.post('auth/register', {
            type,
            email,
            password,
        });
    } catch (error) {
        console.log(error);
    }
};

export const getCurrentUser = async ({ accessToken }) => {
    try {
        const res = await httpRequest.get('auth/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateCurrentUser = async ({ accessToken }) => {
    try {
        const res = await httpRequest.post('auth/me?_method=PATCH', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const createNewVideo = async ({
    description,
    upload_file,
    thumbnail_time,
    music,
    viewable,
    allows = [],
    accessToken,
}) => {
    try {
        const res = await httpRequest.post('videos', {
            description,
            upload_file,
            thumbnail_time,
            music,
            viewable,
            allows,
            header: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
