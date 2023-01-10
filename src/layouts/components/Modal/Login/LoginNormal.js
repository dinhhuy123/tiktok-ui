import { useState } from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
// import LoginWithPassword from './LoginWithPassword';
import LoginType from './LoginType';

const cx = classNames.bind(styles);

function Login({ title }) {
    const [changeLoginType, setChangeLoginType] = useState(false);
    // const [phone, setPhone] = useState('');
    // const [code, setCode] = useState('');
    // const handledSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const resp = await axios.post(url, { phone, code });
    //         console.log(resp.data);
    //     } catch (err) {
    //         console.log(err.response);
    //     }
    // };
    const handledSubmit = (e) => {
        e.preventDefault();
    };

    const handleChangeLoginType = (e) => {
        e.preventDefault();
        setChangeLoginType(!changeLoginType);
    };
    return (
        <form className={cx('form-input')} onSubmit={handledSubmit}>
            <h4 className={cx('header-title')}>{title}</h4>
            {/* phone={phone} setPhone={setPhone} code={code} setCode={setCode} */}
            <LoginType onClick={handleChangeLoginType} changeLoginType={changeLoginType} />
            {/* <LoginWithPassword /> */}
            <button type="submit" className={cx('login-btn', 'disabled-btn')}>
                Log in
            </button>
        </form>
    );
}

Login.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Login;
