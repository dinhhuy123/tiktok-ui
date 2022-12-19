import classNames from 'classnames/bind';
import styles from './LoginWithPassword.module.scss';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HidePasswordIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function LoginWithPassword() {
    return (
        <>
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
                    <input name="code" className={cx('input-code')} placeholder="Password" />
                    <HidePasswordIcon className={cx('hide-icon')} />
                </div>
            </div>
            <div className={cx('change-type-input')}>
                <a href="/" className={cx('forgot-password', 'type-title')}>
                    Forgot password?
                </a>
                <span className={cx('divide')}></span>
                <a href="/" className={cx('code-type', 'type-title')}>
                    Log in with code
                </a>
            </div>
        </>
    );
}

export default LoginWithPassword;
