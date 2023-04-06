import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './LoginType.module.scss';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchCode from '~/layouts/components/Modal/SearchCode';
import { HidePasswordIcon, ShowPasswordIcon } from '~/components/Icons';

import { loginAccount } from '~/utils/HandleApi';

const cx = classNames.bind(styles);

function LoginWithCode({ onClick, changeLoginType, onForgot }) {
    const [codeState, setCodeState] = useState(false);
    const [passwordState, setPasswordState] = useState(false);
    const [codeToPassword, setCodeToPassword] = useState(false);
    const [accessToken, setAccessToken] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const userRef = useRef();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    const handleChangeStatePassword = () => {
        setPasswordState(!passwordState);
    };

    const handleChangeCodeToPassword = (e) => {
        e.preventDefault();
        setCodeToPassword(!codeToPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            loginAccount(username, password, setAccessToken);
            setUsername('');
            setPassword('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {changeLoginType ? (
                <>
                    <div className={cx('description')}>
                        Phone
                        <a href="/login/phone-or-email/email" className={cx('change-link')} onClick={onClick}>
                            Log in with email or username
                        </a>
                    </div>
                    <div className={cx('phone-container')}>
                        <div className={cx('code-container')}>
                            <div onClick={() => setCodeState(!codeState)} className={cx('zone-code')}>
                                <span className={cx('vn-code')}>VN +84</span>
                                <button className={cx('search-code-btn', codeState ? 'turn-around' : 'turn-back')}>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </button>
                            </div>
                            {codeState && <SearchCode />}
                        </div>
                        <input name="mobile" className={cx('phone-number')} placeholder="Phone number" />
                    </div>
                    {!codeToPassword ? (
                        <>
                            <div className={cx('send-code')}>
                                <div className={cx('input-container')}>
                                    <input name="code" className={cx('input-code')} placeholder="Enter 6-digit code" />
                                </div>
                                <button className={cx('code-btn', 'disabled-code-btn')}>Send code</button>
                            </div>
                            <a
                                href="/login/phone-or-email/phone-password"
                                onClick={handleChangeCodeToPassword}
                                className={cx('change-link')}
                            >
                                Log in with password
                            </a>
                        </>
                    ) : (
                        <>
                            <div className={cx('password-container')}>
                                <input
                                    name="password"
                                    type={passwordState ? 'text' : 'password'}
                                    className={cx('password')}
                                    placeholder="Password"
                                />
                                {passwordState ? (
                                    <button onClick={handleChangeStatePassword}>
                                        <HidePasswordIcon className={cx('hide-icon')} />
                                    </button>
                                ) : (
                                    <button onClick={handleChangeStatePassword}>
                                        <ShowPasswordIcon className={cx('show-icon')} />
                                    </button>
                                )}
                            </div>
                            <div className={cx('label')}>
                                <a href="/login/phone/forget-password" className={cx('change-link')} onClick={onForgot}>
                                    Forgot password?
                                </a>
                                <span className={cx('divide')}></span>
                                <a
                                    href="/login/phone-or-email/phone"
                                    onClick={handleChangeCodeToPassword}
                                    className={cx('change-link')}
                                >
                                    Log in with code
                                </a>
                            </div>
                        </>
                    )}
                </>
            ) : (
                <form>
                    <div className={cx('description')}>
                        Email or username
                        <a href="/login/phone-or-email/phone" className={cx('change-link')} onClick={onClick}>
                            Log in with phone
                        </a>
                    </div>
                    <div className={cx('email-container')}>
                        <input
                            ref={userRef}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            name="email"
                            className={cx('email-address')}
                            placeholder="Email or username"
                        />
                    </div>
                    <div className={cx('password-container')}>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            type={passwordState ? 'text' : 'password'}
                            className={cx('password')}
                            placeholder="Password"
                        />
                        {passwordState ? (
                            <button onClick={handleChangeStatePassword}>
                                <HidePasswordIcon className={cx('hide-icon')} />
                            </button>
                        ) : (
                            <button onClick={handleChangeStatePassword}>
                                <ShowPasswordIcon className={cx('show-icon')} />
                            </button>
                        )}
                    </div>
                    <a href="/" className={cx('change-link')}>
                        Forgot password?
                    </a>
                    <button onClick={handleSubmit} className={cx('login-btn')}>
                        Log in
                    </button>
                </form>
            )}
        </>
    );
}

export default LoginWithCode;
