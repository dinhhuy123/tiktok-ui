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

function Modal() {
    return (
        <div className={cx('modal-container')}>
            <button className={cx('close-btn')}>
                <ModalXmarkIcon />
            </button>
            <div className={cx('modal-body')}>
                <Menu items={MODAL_ITEMS} />
            </div>
            <div className={cx('modal-footer')}>
                <p>Don't have an account?</p>
                <a href="/" className={cx('footer-link')}>
                    Sign up
                </a>
            </div>
        </div>
    );
}

export default Modal;
