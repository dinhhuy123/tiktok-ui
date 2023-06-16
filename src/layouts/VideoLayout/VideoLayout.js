import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './VideoLayout.module.scss';
import * as userService from '~/services/userService';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function VideoLayout() {
    const [videoInfo, setVideoInfo] = useState({});
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            const currentUser = JSON.parse(localStorage.getItem('user'));
            const accessToken = currentUser && currentUser.meta.token ? currentUser.meta.token : '';
            userService.getAVideo(id, accessToken).then((res) => setVideoInfo(res));
        }
    }, [id]);

    return (
        <div className={cx('videoLayout')}>
            <div className={cx('videoContainer')}>
                <div className={cx('videoPlayer')}>
                    <p className={cx('videoBackground')} style={{ backgroundImage: `url(${videoInfo.thumb_url})` }}></p>
                </div>
            </div>
            <div className={cx('commentContainer')}></div>
        </div>
    );
}

export default VideoLayout;
