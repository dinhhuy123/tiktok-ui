import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import styles from './DefaultLayout.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import { ModalXmarkIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar className={cx('sidebar')} />
                <div className={cx('content')}>{children}</div>
            </div>
            <div className={cx('modal')}>
                <PopperWrapper className={cx('modal-wrapper')}>
                    <div className={cx('modal-container')}>
                        <button className={cx('close-btn')}>
                            <ModalXmarkIcon />
                        </button>
                        <div className={cx('inner')}>
                            <h2 className={cx('title')}>Log in to TikTok</h2>
                            <Button
                                upload
                                modalIcon={<FontAwesomeIcon icon={faCircleXmark} />}
                                className={cx('register-btn')}
                            >
                                User QR code
                            </Button>
                            <Button
                                upload
                                modalIcon={<FontAwesomeIcon icon={faCircleXmark} />}
                                className={cx('register-btn')}
                            >
                                use phone/email/username
                            </Button>
                            <Button
                                upload
                                modalIcon={<FontAwesomeIcon icon={faCircleXmark} />}
                                className={cx('register-btn')}
                            >
                                Continue with Facebook
                            </Button>
                            <Button
                                upload
                                modalIcon={<FontAwesomeIcon icon={faCircleXmark} />}
                                className={cx('register-btn')}
                            >
                                Continue with Google
                            </Button>
                            <Button
                                upload
                                modalIcon={<FontAwesomeIcon icon={faCircleXmark} />}
                                className={cx('register-btn')}
                            >
                                Continue with Twitter
                            </Button>
                            <Button
                                upload
                                modalIcon={<FontAwesomeIcon icon={faCircleXmark} />}
                                className={cx('register-btn')}
                            >
                                Continue with Line
                            </Button>
                            <Button
                                upload
                                modalIcon={<FontAwesomeIcon icon={faCircleXmark} />}
                                className={cx('register-btn')}
                            >
                                Continue with KaKaoTalk
                            </Button>
                            <Button
                                upload
                                modalIcon={<FontAwesomeIcon icon={faCircleXmark} />}
                                className={cx('register-btn')}
                            >
                                Continue with Apple
                            </Button>
                            <Button
                                upload
                                modalIcon={<FontAwesomeIcon icon={faCircleXmark} />}
                                className={cx('register-btn')}
                            >
                                Continue with Instagram
                            </Button>
                        </div>
                        <div className={cx('modal-footer')}>
                            <p>Don't have an account?</p>
                            <a href="/" className={cx('footer-link')}>
                                Sign up
                            </a>
                        </div>
                    </div>
                </PopperWrapper>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
