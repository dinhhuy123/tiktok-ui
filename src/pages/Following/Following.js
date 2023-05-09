import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Following.module.scss';
import Video from '~/layouts/components/Video';
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;

function Following() {
    const [videos, setVideos] = useState([]);
    // const [page, setPage] = useState(INIT_PAGE);

    const currentUser = JSON.parse(localStorage.getItem('user'));
    const accessToken = currentUser && currentUser.meta.token ? currentUser.meta.token : '';

    useEffect(() => {
        userService
            .getVideos({ type: 'following', page: INIT_PAGE, accessToken: accessToken })
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setVideos(res.data);
                }
            })
            .catch((err) => console.log(err));
    }, [accessToken]);

    return (
        <>
            {videos.length > 0 ? (
                <div className={cx('followingPage')}>
                    {videos.map((video) => (
                        <Video key={video.id} video={video} isFollowing={true} />
                    ))}
                </div>
            ) : (
                <div className={cx('followingPage', 'noVideo')}>No video from your followers</div>
            )}
        </>
    );
}

export default Following;
