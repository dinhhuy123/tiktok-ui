import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './SuggestedAccounts.module.scss';
import AccountPreview from './AccountPreview/AccountPreview';

const cx = classNames.bind(styles);

function AccountItem({ to }) {
    return (
        <div>
            <Tippy
                interactive
                appendTo={() => document.body}
                delay={[800, 0]}
                placement="bottom"
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <AccountPreview />
                        </PopperWrapper>
                    </div>
                )}
            >
                <NavLink to={to} className={cx('account-item')}>
                    <img
                        className={cx('avatar')}
                        src="https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2022/11/truong-tinh-nghi-6-8341-2850.jpeg?fit=645%2C20000&quality=95&ssl=1"
                        alt=""
                    />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>truongtinhnghi</strong>
                            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                        </p>
                        <p className={cx('name')}>Trương Tịnh Nghi</p>
                    </div>
                </NavLink>
            </Tippy>
        </div>
    );
}

export default AccountItem;
