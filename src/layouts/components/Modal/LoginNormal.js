import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
// import LoginWithPassword from './LoginWithPassword';
import LoginWithCode from './LoginWithCode';

const cx = classNames.bind(styles);

function Login({ title }) {
    return (
        <div className={cx('form-input')}>
            <h4 className={cx('header-title')}>{title}</h4>
            <LoginWithCode />
            {/* <LoginWithPassword /> */}
            <button className={cx('login-btn', 'disabled-btn')}>Log in</button>
        </div>
    );
}

Login.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Login;
