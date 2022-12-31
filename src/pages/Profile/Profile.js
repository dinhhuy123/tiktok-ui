import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import ProfileBody from './ProfileBody';
import ProfileHeader from './ProfileHeader';

const cx = classNames.bind(styles);

function Profile() {
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
