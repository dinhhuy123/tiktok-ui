import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import Signup from './Signup';

const cx = classNames.bind(styles);

function SignupNormal({ title }) {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form className={cx('form-input')} onSubmit={handleSubmit}>
            <h4 className={cx('header-title')}>{title}</h4>
            <Signup />
            {/* <LoginWithPassword /> */}
            {/* disabled-btn */}
            <button type="submit" className={cx('login-btn')}>
                Log in
            </button>
        </form>
    );
}

export default SignupNormal;
