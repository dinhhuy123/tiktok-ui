import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { LockProfileBodyIcon } from '~/components/Icons';
import styles from './ProfileBody.module.scss';

const cx = classNames.bind(styles);

function ProfileBody() {
    const [state, setState] = useState(false);
    return (
        <div className={cx('profile-body')}>
            <div className={cx('label-item')}>
                <button onClick={() => setState(false)} className={cx('label-btn', state ? 'disabled' : 'show')}>
                    Videos
                </button>
                <button onClick={() => setState(true)} className={cx('label-btn', state ? 'show' : 'disabled')}>
                    <FontAwesomeIcon className={cx('lock-btn')} icon={faLock} />
                    Liked
                </button>
                <div className={cx('highlight-btn')}></div>
            </div>
            <div className={cx('video')}>
                <span className={cx('lock-label')}>
                    <LockProfileBodyIcon />
                </span>
                <p className={cx('text-bold')}>This user's liked videos are private</p>
                <p className={cx('text-normal')}>Videos liked by truongtinhnghi are currently hidden</p>
            </div>
        </div>
    );
}

export default ProfileBody;
