import PropTypes from 'prop-types';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import {
    AppleIcon,
    FacebookIcon,
    GoogleIcon,
    InstagramIcon,
    KaKaoTalkIcon,
    LineIcon,
    ModalXmarkIcon,
    QrCodeIcon,
    TwitterIcon,
    ViewProfileIcon,
} from '~/components/Icons';
import Menu from './Menu';

const cx = classNames.bind(styles);

const MODAL_ITEMS = [
    {
        icon: <QrCodeIcon />,
        title: 'User QR code',
        children: {
            type: 'QR',
            title: 'Log in with QR code',
            data: [],
        },
    },
    {
        icon: <ViewProfileIcon />,
        title: 'Use phone / email / username',
        children: {
            type: 'LOGIN',
            title: 'Log in',
            data: [],
        },
    },
    {
        icon: <FacebookIcon />,
        title: 'Continue with Facebook',
        to: '/facebook.com',
    },
    {
        icon: <GoogleIcon />,
        title: 'Continue with Google',
        to: '/gmail.com',
    },
    {
        icon: <TwitterIcon />,
        title: 'Continue with Twitter',
        to: '/twitter.com',
    },
    {
        icon: <LineIcon />,
        title: 'Continue with Line',
        to: '/line.com',
    },
    {
        icon: <KaKaoTalkIcon />,
        title: 'Continue with KaKaoTalk',
        to: '/kakaotalk.com',
    },
    {
        icon: <AppleIcon />,
        title: 'Continue with Apple',
        to: '/apple.com',
    },
    {
        icon: <InstagramIcon />,
        title: 'Continue with Instagram',
        to: '/instagram.com',
    },
];

const SIGNUP_ITEMS = [
    {
        icon: <ViewProfileIcon />,
        title: 'Use phone or email',
        children: {
            type: 'SIGNUP',
            title: 'Sign up',
            data: [],
        },
    },
    {
        icon: <FacebookIcon />,
        title: 'Continue with Facebook',
        to: '/facebook.com',
    },
    {
        icon: <GoogleIcon />,
        title: 'Continue with Google',
        to: '/gmail.com',
    },
    {
        icon: <TwitterIcon />,
        title: 'Continue with Twitter',
        to: '/twitter.com',
    },
    {
        icon: <LineIcon />,
        title: 'Continue with Line',
        to: '/line.com',
    },
    {
        icon: <KaKaoTalkIcon />,
        title: 'Continue with KaKaoTalk',
        to: '/kakaotalk.com',
    },
];

function Modal({ onClick, currentUser }) {
    const [changeType, setChangeType] = useState(false);
    const handledChange = (e) => {
        e.preventDefault();
        setChangeType(!changeType);
    };
    return (
        <div className={cx('modal-container')}>
            <button onClick={onClick} className={cx('close-btn')}>
                <ModalXmarkIcon />
            </button>
            <div className={cx(`${!changeType ? 'modal-body-login' : 'modal-body-signup'}`)}>
                <Menu items={MODAL_ITEMS} signup={SIGNUP_ITEMS} changeType={changeType} currentUser={currentUser} />
            </div>
            {changeType && (
                <div className={cx('agreeing')}>
                    <p className={cx('agreeing-content')}>
                        By continuing, you agree to TikTok’s
                        <a href="/"> Terms of Service </a>
                        and confirm that you have read TikTok’s
                        <a href="/"> Privacy Policy</a>
                    </p>
                </div>
            )}
            {changeType ? (
                <div className={cx('modal-footer')}>
                    <p>Already have an account?</p>
                    <a href="/login" className={cx('footer-link')} onClick={handledChange}>
                        Log in
                    </a>
                </div>
            ) : (
                <div className={cx('modal-footer')}>
                    <p>Don't have an account?</p>
                    <a href="/signup" className={cx('footer-link')} onClick={handledChange}>
                        Sign up
                    </a>
                </div>
            )}
        </div>
    );
}

Modal.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default Modal;
