import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './SignupType.module.scss';
import SearchCode from '~/layouts/components/Modal/SearchCode';
import User from './User/User';
import Password from './Password/Password';
import ConfirmPassword from './ConfirmPassword/ConfirmPassword';

// import axios from 'axios';

// import { createAccount } from '~/utils/HandleApi';
import { registerUser } from '~/redux/apiRequest';

const cx = classNames.bind(styles);

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,20}$/;

function SignupType({ month, day, year, setSuccess }) {
    const userRef = useRef();
    // const errRef = useRef();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [changeSignupType, setChangeSignupType] = useState(false);

    const [validName, setValidName] = useState(false);

    const [validPwd, setValidPwd] = useState(false);

    const [validMatch, setValidMatch] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChangeSignupType = (e) => {
        e.preventDefault();
        setChangeSignupType(!changeSignupType);
    };

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidPwd(result);
        const match = password === confirmPwd;
        setValidMatch(match);
    }, [password, confirmPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, password, confirmPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg('Invalid Entry');
            alert(errMsg);
            return;
        }
        const newUser = {
            month,
            day,
            year,
            user,
            password,
        };
        try {
            registerUser(newUser, dispatch, navigate);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('container')}>
            {changeSignupType ? (
                <form>
                    <div className={cx('description')}>
                        Phone
                        <a
                            href="/signup/phone-or-email/email"
                            className={cx('change-link')}
                            onClick={handleChangeSignupType}
                        >
                            Sign up with email
                        </a>
                    </div>
                    <div className={cx('phone-container')}>
                        <div className={cx('code-container')}>
                            <SearchCode />
                        </div>
                        <input name="mobile" className={cx('phone-number')} placeholder="Phone number" />
                    </div>
                    <div className={cx('send-code')}>
                        <div className={cx('input-container')}>
                            <input name="code" className={cx('input-code')} placeholder="Enter 6-digit code" />
                        </div>
                        <button className={cx('code-btn', 'disabled-code-btn')}>Send code</button>
                    </div>
                    <button onClick={handleSubmit} type="submit" className={cx('signup-btn')}>
                        Signup
                    </button>
                </form>
            ) : (
                <form>
                    <div className={cx('description')}>
                        Email
                        <a
                            href="/signup/phone-or-email/phone"
                            className={cx('change-link')}
                            onClick={handleChangeSignupType}
                        >
                            Sign up with phone
                        </a>
                    </div>
                    <User user={user} setUser={setUser} userRef={userRef} validName={validName} />
                    <Password password={password} setPassword={setPassword} validPwd={validPwd} />
                    <ConfirmPassword
                        confirmPwd={confirmPwd}
                        setConfirmPwd={setConfirmPwd}
                        password={password}
                        validMatch={validMatch}
                    />
                    <div className={cx('condition')}>
                        <div className={cx('check-condition')}>
                            <input type="checkbox" className={cx('checkbox')} />
                        </div>
                        <p className={cx('text-condition')}>
                            Get trending content, newsletters, promotions, recommendations, and account updates sent to
                            your email
                        </p>
                    </div>
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className={cx('signup-btn', `${validName && validPwd && validMatch ? '' : 'disabled-btn'}`)}
                    >
                        Signup
                    </button>
                </form>
            )}
        </div>
    );
}

export default SignupType;
