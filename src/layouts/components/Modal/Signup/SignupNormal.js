import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import SearchMonth from '~/layouts/components/Modal/SearchMonth';
import SearchDay from '~/layouts/components/Modal/SearchDay';
import SearchYear from '~/layouts/components/Modal/SearchYear';
import SignupType from './SignupType';

const cx = classNames.bind(styles);

function SignupNormal({ title }) {
    const [changeSignupType, setChangeSignupType] = useState(false);

    const handleChangeSignupType = (e) => {
        e.preventDefault();
        setChangeSignupType(!changeSignupType);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form className={cx('form-input')} onSubmit={handleSubmit}>
            <h4 className={cx('header-title')}>{title}</h4>
            <div>
                <div className={cx('description')}>When's your birthday?</div>
                <div className={cx('birthday')}>
                    <SearchMonth />
                    <SearchDay />
                    <SearchYear />
                </div>
                <p className={cx('privacy')}>Your birthday won't be shown publicly.</p>
                <SignupType onClick={handleChangeSignupType} changeSignupType={changeSignupType} />
            </div>
            <button type="submit" className={cx('login-btn', 'disabled-btn')}>
                Log in
            </button>
        </form>
    );
}

export default SignupNormal;
