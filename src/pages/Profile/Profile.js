import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import styles from './Profile.module.scss';
import ProfileBody from './ProfileBody';
import ProfileHeader from './ProfileHeader';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);

function Profile() {
    const [userProfile, setUserProfile] = useState({});
    const { nickname } = useParams();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const accessToken = user?.accessToken;
    useEffect(() => {
        if (accessToken) {
            userService.getUserProfile({ nickname, accessToken }).then((res) => setUserProfile(res));
        }
    }, [accessToken, nickname]);
    return (
        <div className={cx('profile')}>
            <div className={cx('information')}>
                <ProfileHeader userProfile={userProfile} />
            </div>
            <ProfileBody />
        </div>
    );
}

export default Profile;
