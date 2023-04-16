import axios from 'axios';

const baseUrl = 'http://localhost:5001';

const getAllAccounts = (setAccounts) => {
    axios
        .get(baseUrl)
        .then(({ data }) => {
            console.log('data --->', data);
            setAccounts(data);
        })
        .catch((err) => console.log(err));
};

const createAccount = async (month, day, year, user, password, confirmPwd) => {
    try {
        const response = await axios.post(
            `${baseUrl}/create`,
            JSON.stringify({ month, day, year, user, password, confirmPwd }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            },
        );
        console.log(response);
        console.log(JSON.stringify(response));
    } catch (error) {
        console.log(error);
    }
};

const loginAccount = async (user, password) => {
    try {
        const response = await axios.post(`${baseUrl}/login`, JSON.stringify({ user, password }), {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });
        // if (response.data.accessToken) {
        //     localStorage.setItem('user', JSON.stringify(response.data));
        // }
        console.log(response);
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
};

const refreshToken = async () => {
    try {
        const res = await axios.post(`${baseUrl}/refresh`, {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export { getAllAccounts, createAccount, loginAccount, refreshToken };
