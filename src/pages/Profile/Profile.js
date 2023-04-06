import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import styles from './Profile.module.scss';
import ProfileBody from './ProfileBody';
import ProfileHeader from './ProfileHeader';

const cx = classNames.bind(styles);

function Profile() {
    const { nickname } = useParams();
    if (nickname) {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const accessToken = currentUser && currentUser.meta.token ? currentUser.meta.token : '';
        console.log(accessToken);
    }
    return (
        <div className={cx('profile')}>
            <div className={cx('information')}>
                <ProfileHeader />
            </div>
            <ProfileBody />
        </div>
    );
}

export default Profile;
