import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const PER_PAGE = 5;

function Sidebar({ className, state, onClick, currentUser }) {
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    // const [followingUsers, setFollowingUsers] = useState([]);

    useEffect(() => {
        userService
            .getSuggestedUsers({ page: INIT_PAGE, per_page: PER_PAGE })
            .then((data) => {
                console.log(data);
                setSuggestedUsers(data);
            })
            .catch((error) => console.log(error));

        // userService
        //     .getFollowingUsers({ page: INIT_PAGE })
        //     .then((data) => {
        //         setFollowingUsers(data);
        //     })
        //     .catch((error) => console.log(error));
    }, []);
    return (
        <aside className={cx('wrapper', className, state ? 'narrow' : '')}>
            {true ? (
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
                    <SuggestedAccounts label="Suggest accounts" data={suggestedUsers} />
                    {/* <SuggestedAccounts label="Following accounts" data={followingUsers} /> */}
                    <Discover label="Discover" className={cx(state ? 'narrow-title' : '')} />
                    <Privacy />
                </>
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
                        <Button onClick={onClick} outline large className={cx('login-btn')}>
                            Login
                        </Button>
                    </div>
                    <SuggestedAccounts label="Suggest accounts" data={suggestedUsers} />
                    <Discover label="Discover" />
                    <Privacy />
                </>
            )}
        </aside>
    );
}

Sidebar.propTypes = {
    className: PropTypes.string,
    state: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Sidebar;
