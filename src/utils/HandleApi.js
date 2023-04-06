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
        console.log(response.data);
        console.log(response.accessToken);
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
        console.log(response.data);
        console.log(response.data.accessToken);
        console.log(JSON.stringify(response.data));
    } catch (error) {
        console.log(error);
    }
};

export { getAllAccounts, createAccount, loginAccount };
