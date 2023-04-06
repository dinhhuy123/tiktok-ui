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
