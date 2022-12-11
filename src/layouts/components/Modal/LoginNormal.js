import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function Login({ title }) {
    return (
        <div className={cx('form-input')}>
            <h4 className={cx('header-title')}>{title}</h4>
            <div className={cx('description')}>
                Phone
                <a href="/" className={cx('change-link')}>
                    Log in with email or username
                </a>
            </div>
            <div className={cx('phone-container')}>
                <div className={cx('zone-code')}>
                    <span className={cx('vn-code')}>VN +84</span>
                    <FontAwesomeIcon icon={faCaretDown} />
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
            <button className={cx('login-btn', 'disabled-btn')}>Login</button>
        </div>
    );
}

export default Login;
