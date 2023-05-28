import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import styles from './Profile.module.scss';
import ProfileBody from './ProfileBody';
import ProfileHeader from './ProfileHeader';
import { useContext, useEffect, useState } from 'react';
import * as userService from '~/services/userService';
import * as authService from '~/services/authService';
import EditProfileModal from './EditProfileModal/EditProfileModal';
import { ModalContext } from '~/layouts/SidebarAndHeader';

const cx = classNames.bind(styles);

function Profile() {
    const setModalContext = useContext(ModalContext);

    const [userProfile, setUserProfile] = useState({});
    const [stateOfCurrentUser, setStateOfCurrentUser] = useState(false);
    const { nickname } = useParams();
    const [modal, setModal] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const [followed, setFollowed] = useState(userProfile.is_followed);
    const [videoList, setVideoList] = useState([]);
    useEffect(() => {
        if (nickname) {
            const currentUser = JSON.parse(localStorage.getItem('user'));
            const accessToken = currentUser && currentUser.meta.token ? currentUser.meta.token : '';
            setAccessToken(accessToken);
            if (nickname.slice(1, nickname.length) === currentUser?.data.nickname) {
                authService
                    .getCurrentUser({ accessToken })
                    .then((res) => {
                        setUserProfile(res);
                        setStateOfCurrentUser(true);
                        console.log('Getting uer with accessToken!');
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                userService
                    .getUserProfile({ nickname, accessToken })
                    .then((res) => {
                        setUserProfile(res);
                        setFollowed(res.is_followed);
                        setVideoList(res.videos);
                        setStateOfCurrentUser(false);
                        console.log('Getting uer without accessToken!');
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    }, [nickname]);

    const handlerFollow = () => {
        if (accessToken) {
            if (followed) {
                userService
                    .unFollowAnUser({ userId: userProfile.id, accessToken: accessToken })
                    .then((res) => {
                        console.log(res);
                        if (res.data) {
                            setFollowed(res.data.is_followed);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                userService
                    .followAnUser({ userId: userProfile.id, accessToken: accessToken })
                    .then((res) => {
                        console.log(res);
                        if (res.data) {
                            setFollowed(res.data.is_followed);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        } else {
            setModalContext(true);
        }
    };

    return (
        <div className={cx('profile')}>
            {modal && (
                <div className={cx('profileModal')}>
                    <div className={cx('modalWrapper')}>
                        <EditProfileModal setModal={setModal} userProfile={userProfile} accessToken={accessToken} />
                    </div>
                </div>
            )}
            <div className={cx('information')}>
                <ProfileHeader
                    userProfile={userProfile}
                    stateOfCurrentUser={stateOfCurrentUser}
                    setModal={setModal}
                    handlerFollow={handlerFollow}
                    followed={followed}
                />
            </div>
            <ProfileBody userProfile={userProfile} videoList={videoList} />
        </div>
    );
}

export default Profile;
