import classNames from 'classnames/bind';
import styles from './LoginWithCode.module.scss';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchCode from '~/layouts/components/Modal/SearchCode';
import { useState } from 'react';

const cx = classNames.bind(styles);

function LoginWithCode() {
    const [codeState, setCodeState] = useState(false);
    return (
        <>
            <div className={cx('description')}>
                Phone
                <a href="/" className={cx('change-link')}>
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
            <div className={cx('send-code')}>
                <div className={cx('input-container')}>
                    <input name="code" className={cx('input-code')} placeholder="Enter 6-digit code" />
                </div>
                <button className={cx('code-btn', 'disabled-code-btn')}>Send code</button>
            </div>
            <a href="/" className={cx('change-link')}>
                Log in with password
            </a>
        </>
    );
}

export default LoginWithCode;
