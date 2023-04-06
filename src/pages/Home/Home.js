import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Video from '~/layouts/components/Video';
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;

function Home() {
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(INIT_PAGE);
    const [noMoreVideo, setNoMoreVideo] = useState(false);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        console.log(currentUser);
        // const accessToken = currentUser && currentUser.meta.token ? currentUser.meta.token : '';

        userService
            .getVideos({ type: 'for-you', page })
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setVideos(res.data);
                }
                if (res.data.length === 0 || page === res.meta.pagination.total) {
                    setNoMoreVideo(true);
                }
            })
            .catch((err) => console.log(err));
    }, [page]);

    return (
        <div className={cx('home-page')}>
            {videos.map((video) => (
                <Video key={video.id} video={video} />
            ))}
            {noMoreVideo && <p className={cx('no-more-video')}>No more video to load</p>}
        </div>
    );
}

export default Home;
