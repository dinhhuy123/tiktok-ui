import Tippy from '@tippyjs/react/headless';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCommentDots, faShare, faCircleCheck, faBookmark } from '@fortawesome/free-solid-svg-icons';
import AccountPreview from '~/components/SuggestedAccounts/AccountPreview';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { MusicIcon } from '~/components/Icons';
import { usePlayingOnScreen } from '~/hooks';
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);

function Video({ video, isFollowing }) {
    const preview = () => {
        return (
            <div tabIndex="-1">
                <PopperWrapper>
                    <AccountPreview data={video.user} />
                </PopperWrapper>
            </div>
        );
    };

    const [playing, setPlaying] = useState(false);
    const videoRef = useRef(null);
    const options = { root: null, rootMargin: '0px', threshold: 0.7 };
    const isVisible = usePlayingOnScreen(options, videoRef);
    const [followed, setFollowed] = useState(video.user.is_followed);

    const currentUser = JSON.parse(localStorage.getItem('user'));
    const accessToken = currentUser && currentUser.meta.token ? currentUser.meta.token : '';

    useEffect(() => {
        if (isVisible) {
            if (!playing) {
                videoRef.current.currentTime = 0;
                videoRef.current.play();
                setPlaying(true);
            }
        } else {
            if (playing) {
                videoRef.current.pause();
                setPlaying(false);
            }
        }
    }, [isVisible, playing]);

    const handleFollowUser = (e) => {
        e.preventDefault();
        if (!currentUser || !accessToken) {
            alert('Please login!');
            return;
        }
        if (followed) {
            userService
                .unFollowAnUser({ userId: video.user.id, accessToken: accessToken })
                .then((res) => {
                    if (res.data) {
                        setFollowed(res.data.is_followed);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            userService
                .followAnUser({ userId: video.user.id, accessToken: accessToken })
                .then((res) => {
                    if (res.data) {
                        setFollowed(res.data.is_followed);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleLikeVideo = (e) => {
        e.preventDefault();
        userService.likeVideo({ userId: video.user.id, accessToken: accessToken }).then((res) => {
            console.log(res);
        });
    };

    return (
        <div className={cx('video-wrapper')}>
            <Tippy interactive delay={[200, 200]} offset={[-10, 2]} render={preview} placement="bottom-start">
                <a className={cx('avatar')} href="/">
                    <Image className={cx('image')} src={video.user.avatar} alt={video.user.nickname} />
                </a>
            </Tippy>
            <div className={cx('container')}>
                <div className={cx('relative')}>
                    <div className={cx('user-name-container')}>
                        <a href={`users/@${video.user.nickname}`} className={cx('user-name')}>
                            <h3 className={cx('nickname')}>{video.user.nickname}</h3>
                            {video.user.tick && <FontAwesomeIcon className={cx('check')} icon={faCircleCheck} />}
                            <h4 className={cx('total-name')}>{`${video.user.first_name} ${video.user.last_name}`}</h4>
                        </a>
                    </div>
                    {(isFollowing === undefined || isFollowing === false) && (
                        <Button
                            outline
                            className={cx(followed ? 'following-btn' : 'follow-btn')}
                            onClick={handleFollowUser}
                        >
                            {followed ? 'Following' : 'Follow'}
                        </Button>
                    )}
                    <div className={cx('text-container')}>
                        <span className={cx('description')}>{video.description}</span>
                        <h4 className={cx('music-name')}>
                            <a className={cx('music')} href="/">
                                <MusicIcon className={cx('music-icon')} /> nhạc nền {video.music && ` - ${video.music}`}
                            </a>
                        </h4>
                    </div>

                    <div className={cx('video-container')}>
                        <div className={cx('user-video')}>
                            <canvas width="56.25" height="100" className={cx('video-canvas')}></canvas>
                            <div className={cx('video')}>
                                <div className={cx('outside')}>
                                    <video
                                        ref={videoRef}
                                        className={cx('video-inside')}
                                        controls
                                        loop={true}
                                        playsInline
                                        poster={video.thumb_url}
                                    >
                                        <source src={video.file_url} type="video/mp4" />
                                        Your browser does not support HTML video.
                                    </video>
                                </div>
                            </div>
                        </div>
                        <div className={cx('action')}>
                            <button onClick={handleLikeVideo} className={cx('action-container')}>
                                <span className={cx('action-btn')}>
                                    <FontAwesomeIcon className={cx('action-icon')} icon={faHeart}></FontAwesomeIcon>
                                </span>
                                <strong className={cx('count')}>{video.likes_count}</strong>
                            </button>
                            <button className={cx('action-container')}>
                                <span className={cx('action-btn')}>
                                    <FontAwesomeIcon
                                        className={cx('action-icon')}
                                        icon={faCommentDots}
                                    ></FontAwesomeIcon>
                                </span>
                                <strong className={cx('count')}>{video.comments_count}</strong>
                            </button>
                            <button className={cx('action-container')}>
                                <span className={cx('action-btn')}>
                                    <FontAwesomeIcon className={cx('action-icon')} icon={faBookmark}></FontAwesomeIcon>
                                </span>
                                <strong className={cx('count')}>0</strong>
                            </button>
                            <button className={cx('action-container')}>
                                <span className={cx('action-btn')}>
                                    <FontAwesomeIcon className={cx('action-icon')} icon={faShare}></FontAwesomeIcon>
                                </span>
                                <strong className={cx('count')}>{video.shares_count}</strong>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Video;
