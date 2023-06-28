import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { Virtuoso } from 'react-virtuoso';
import styles from './Home.module.scss';
import Video from '~/layouts/components/Video';
import * as userService from '~/services/userService';
import { VideoModalContextShow } from '~/contexts/VideoModalContext';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;

function Home() {
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(INIT_PAGE);
    const [noMoreVideo, setNoMoreVideo] = useState(false);

    const videoArrayRef = useRef([]);

    const currentUser = JSON.parse(localStorage.getItem('user'));
    const accessToken = currentUser && currentUser.meta.token ? currentUser.meta.token : '';

    const { propsOfVideoModal, setPropsOfVideoModal, videoModalState } = useContext(VideoModalContextShow);
    const [isVideoModalShow, showVideoModal] = videoModalState;

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

    const handleShowVideoModal = (video, index) => {
        videoArrayRef.current[index].scrollVideo();
        const propsOfVideoModal = {
            userProfile: video.user,
            videoInfo: video,
            index,
        };
        setPropsOfVideoModal(propsOfVideoModal);
        showVideoModal();
    };

    useEffect(() => {
        if (isVideoModalShow) {
            propsOfVideoModal.handleNextVideo = handleNextVideo;
            propsOfVideoModal.handlePrevVideo = handlePrevVideo;

            setPropsOfVideoModal({ ...propsOfVideoModal });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVideoModalShow]);

    const handleNextVideo = (index) => {
        const currentVideoId = videoArrayRef.current.findIndex((inViewObj) => inViewObj.index === index);

        console.log(currentVideoId);
        if (currentVideoId >= videos.length - 1) {
            return;
        } else {
            const nextVideoId = currentVideoId + 1;
            const nextVideo = videoArrayRef.current[nextVideoId];
            nextVideo.scrollVideo();
            const newProps = {
                userProfile: nextVideo.data.user,
                videoInfo: nextVideo.data,
                index: nextVideoId,
            };
            setPropsOfVideoModal({ ...propsOfVideoModal, ...newProps });
        }
    };

    const handlePrevVideo = (index) => {
        const currentVideoId = videoArrayRef.current.findIndex((inViewObj) => inViewObj.index === index);

        if (currentVideoId <= 0) {
            return;
        } else {
            const prevVideoId = currentVideoId - 1;
            const prevVideo = videoArrayRef.current[prevVideoId];
            prevVideo.scrollVideo();
            const newProps = {
                userProfile: prevVideo.data.user,
                videoInfo: prevVideo.data,
                index: prevVideoId,
            };
            setPropsOfVideoModal({ ...propsOfVideoModal, ...newProps });
        }
    };

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
                itemContent={(index, video) => (
                    <Video
                        videoArray={videoArrayRef.current}
                        key={index}
                        video={video}
                        index={index}
                        handleShowVideoModal={handleShowVideoModal}
                    />
                )}
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
