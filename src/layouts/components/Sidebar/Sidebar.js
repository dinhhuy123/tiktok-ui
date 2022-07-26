import classNames from 'classnames/bind';
import Menu, { MenuItem } from './Menu';
import styles from './Sidebar.module.scss';
import config from '~/config';
import {
    HomeActiveIcon,
    HomeIcon,
    LiveActiveIcon,
    LiveIcon,
    UserGroupActiveIcon,
    UserGroupIcon,
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import Discover from '~/components/Discover';
import Privacy from '~/components/Privacy';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Sidebar({ className }) {
    const currentUser = false;
    return (
        <aside className={cx('wrapper', className)}>
            {currentUser ? (
                <p>
                    <Menu>
                        <MenuItem
                            title="For you"
                            to={config.routes.home}
                            icon={<HomeIcon />}
                            activeIcon={<HomeActiveIcon />}
                        />
                        <MenuItem
                            title="Following"
                            to={config.routes.following}
                            icon={<UserGroupIcon />}
                            activeIcon={<UserGroupActiveIcon />}
                        />
                        <MenuItem
                            title="LIVE"
                            to={config.routes.live}
                            icon={<LiveIcon />}
                            activeIcon={<LiveActiveIcon />}
                        />
                    </Menu>
                    <SuggestedAccounts label="Suggest accounts" />
                    <SuggestedAccounts label="Following accounts" />
                    <Discover label="Discover" />
                    <Privacy />
                </p>
            ) : (
                <>
                    <Menu>
                        <MenuItem
                            title="For you"
                            to={config.routes.home}
                            icon={<HomeIcon />}
                            activeIcon={<HomeActiveIcon />}
                        />
                        <MenuItem
                            title="Following"
                            to={config.routes.following}
                            icon={<UserGroupIcon />}
                            activeIcon={<UserGroupActiveIcon />}
                        />
                        <MenuItem
                            title="LIVE"
                            to={config.routes.live}
                            icon={<LiveIcon />}
                            activeIcon={<LiveActiveIcon />}
                        />
                    </Menu>
                    <div className={cx('login-sidebar')}>
                        <span className={cx('title')}>Log in to follow creators, like videos, and view comments.</span>
                        <Button outline large className={cx('login-btn')}>
                            Login
                        </Button>
                    </div>
                    <SuggestedAccounts label="Suggest accounts" />
                    <Discover label="Discover" />
                    <Privacy />
                </>
            )}
        </aside>
    );
}

export default Sidebar;
