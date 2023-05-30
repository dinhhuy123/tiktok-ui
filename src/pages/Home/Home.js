import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Virtuoso } from 'react-virtuoso';
import styles from './Home.module.scss';
import Video from '~/layouts/components/Video';
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;

function Home() {
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(INIT_PAGE);
    const [noMoreVideo, setNoMoreVideo] = useState(false);

    const currentUser = JSON.parse(localStorage.getItem('user'));
    const accessToken = currentUser && currentUser.meta.token ? currentUser.meta.token : '';

    const loadMoreVideos = useCallback(() => {
        return setTimeout(() => {
            userService
                .getVideos({ type: 'for-you', page, accessToken: accessToken })
                .then((res) => {
                    if (Array.isArray(res.data)) {
                        setVideos((prev) => [...prev, ...res.data]);
                        setPage((prev) => prev + 1);
                    }
                    if (res.data.length === 0 || page === res.meta.pagination.total) {
                        setNoMoreVideo(true);
                    }
                })
                .catch((err) => console.log(err));
        }, 300);
    }, [page, accessToken]);

    useEffect(() => {
        const timeForLoading = loadMoreVideos();
        return () => clearTimeout(timeForLoading);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('home-page')}>
            <Virtuoso
                data={videos}
                useWindowScroll
                endReached={() => {
                    if (!noMoreVideo) {
                        loadMoreVideos();
                    }
                }}
                itemContent={(index, video) => <Video key={index} video={video} />}
                components={{
                    Footer: () => {
                        return (
                            <div className={cx('footer')}>
                                {noMoreVideo && <p className={cx('no-more-video')}>No more video to load</p>}
                            </div>
                        );
                    },
                }}
            />
        </div>
    );
}

export default Home;
