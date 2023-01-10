import { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import styles from './SignupType.module.scss';
import SearchCode from '~/layouts/components/Modal/SearchCode';
import { HidePasswordIcon, ShowPasswordIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function SignupType({ onClick, changeSignupType }) {
    const [codeState, setCodeState] = useState(false);
    const [passwordState, setPasswordState] = useState(false);

    const handleChangeStatePassword = () => {
        setPasswordState(!passwordState);
    };
    return (
        <div className={cx('container')}>
            {!changeSignupType ? (
                <>
                    <div className={cx('description')}>
                        Phone
                        <a href="/signup/phone-or-email/email" className={cx('change-link')} onClick={onClick}>
                            Sign up with email
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
                    <div className={cx('send-code')}>
                        <div className={cx('input-container')}>
                            <input name="code" className={cx('input-code')} placeholder="Enter 6-digit code" />
                        </div>
                        <button className={cx('code-btn', 'disabled-code-btn')}>Send code</button>
                    </div>
                </>
            ) : (
                <>
                    <div className={cx('description')}>
                        Email
                        <a href="/signup/phone-or-email/phone" className={cx('change-link')} onClick={onClick}>
                            Sign up with phone
                        </a>
                    </div>
                    <div className={cx('email-container')}>
                        <input name="email" className={cx('email-address')} placeholder="Email address" required />
                    </div>
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
                    <div className={cx('send-code')}>
                        <div className={cx('input-container')}>
                            <input name="code" className={cx('input-code')} placeholder="Enter 6-digit code" />
                        </div>
                        <button className={cx('code-btn', 'disabled-code-btn')}>Send code</button>
                    </div>
                    <div className={cx('condition')}>
                        <div className={cx('check-condition')}>
                            <input type="checkbox" className={cx('checkbox')} />
                        </div>
                        <p className={cx('text-condition')}>
                            Get trending content, newsletters, promotions, recommendations, and account updates sent to
                            your email
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}

export default SignupType;
