import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCommentDots, faShare, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import AccountPreview from '~/components/SuggestedAccounts/AccountPreview';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { MusicIcon } from '~/components/Icons';
import { usePlayingOnScreen } from '~/hooks';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

function Video({ video }) {
    const preview = () => {
        // Don't render preview with the account has been followed
        if (video.user.is_followed) {
            return <></>;
        }

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

    useEffect(() => {
        if (isVisible) {
            if (!playing) {
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
                        <a href={`/@${video.user.nickname}`} className={cx('user-name')}>
                            <h3 className={cx('nickname')}>{video.user.nickname}</h3>
                            {video.user.tick && <FontAwesomeIcon className={cx('check')} icon={faCircleCheck} />}
                            <h4 className={cx('total-name')}>{`${video.user.first_name} ${video.user.last_name}`}</h4>
                        </a>
                    </div>
                    <Button outline className={cx('follow-btn')}>
                        Follow
                    </Button>
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
                            <video
                                ref={videoRef}
                                className={cx('video')}
                                controls
                                loop={true}
                                playsInline
                                poster={video.thumb_url}
                            >
                                <source src={video.file_url} type="video/mp4" />
                                Your browser does not support HTML video.
                            </video>
                        </div>
                        <div className={cx('action')}>
                            <button className={cx('action-container')}>
                                <span className={cx('action-btn')}>
                                    <FontAwesomeIcon className={cx('action-icon')} icon={faHeart}></FontAwesomeIcon>
                                </span>
                                <strong className="text-xs text-black/70 mb-2">{video.likes_count}</strong>
                            </button>
                            <button className={cx('action-container')}>
                                <span className={cx('action-btn')}>
                                    <FontAwesomeIcon
                                        className={cx('action-icon')}
                                        icon={faCommentDots}
                                    ></FontAwesomeIcon>
                                </span>
                                <strong className="text-xs text-black/70 mb-2">{video.comments_count}</strong>
                            </button>
                            <button className={cx('action-container')}>
                                <span className={cx('action-btn')}>
                                    <FontAwesomeIcon className={cx('action-icon')} icon={faShare}></FontAwesomeIcon>
                                </span>
                                <strong className="text-xs text-black/70">{video.shares_count}</strong>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Video;
