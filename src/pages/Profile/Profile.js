import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import styles from './Profile.module.scss';
import ProfileBody from './ProfileBody';
import ProfileHeader from './ProfileHeader';
import { useEffect, useState } from 'react';
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);

function Profile() {
    // const [userProfile, setUserProfile] = useState({});
    // const { nickname } = useParams();
    // console.log(nickname);
    // useEffect(() => {
    //     if (nickname) {
    //         const currentUser = JSON.parse(localStorage.getItem('user'));
    //         const accessToken = currentUser && currentUser.meta.token ? currentUser.meta.token : '';
    //         userService
    //             .getUserProfile({ nickname, accessToken })
    //             .then((res) => {
    //                 setUserProfile(res);
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     }
    // }, [nickname]);
    return (
        <div className={cx('profile')}>
            <h1>This is profile user</h1>
            {/* <div className={cx('information')}>
                <ProfileHeader userProfile={userProfile} />
            </div>
            <ProfileBody /> */}
        </div>
    );
}

export default Profile;
