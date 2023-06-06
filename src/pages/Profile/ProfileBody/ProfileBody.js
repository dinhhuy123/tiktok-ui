import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import React, { useRef, useState } from 'react';
import { LockProfileBodyIcon } from '~/components/Icons';
import styles from './ProfileBody.module.scss';

const cx = classNames.bind(styles);

function ProfileBody({ userProfile, videoList, stateOfCurrentUser }) {
    console.log(userProfile);
    const [state, setState] = useState(false);

    const videoRef = useRef([]);

    const playVideo = (index) => {
        videoRef.current[index].play();
    };

    const pauseVideo = (index) => {
        videoRef.current[index].pause();
        videoRef.current[index].currentTime = 0;
    };

    return (
        <div className={cx('profileBody')}>
            <div className={cx('labelItem')}>
                <button onClick={() => setState(false)} className={cx('labelBtn', state ? 'disabled' : 'show')}>
                    Videos
                </button>
                <button onClick={() => setState(true)} className={cx('labelBtn', state ? 'show' : 'disabled')}>
                    <FontAwesomeIcon className={cx('lockBtn')} icon={faLock} />
                    Liked
                </button>
                <div className={cx('highlightBtn')}></div>
            </div>
            {stateOfCurrentUser && !(videoList.length > 0) ? (
                <div className={cx('noVideo')}>
                    <span className={cx('lockLabel')}>
                        <LockProfileBodyIcon />
                    </span>
                    <p className={cx('textBold')}>This user's liked videos are private</p>
                    <p className={cx('textNormal')}>Videos liked by {userProfile.nickname} are currently hidden</p>
                </div>
            ) : (
                <div className={cx('videoContainer')}>
                    <div className={cx('divVideo')}>
                        {videoList.map((video, index) => (
                            <div className={cx('divItemContainer')} key={index}>
                                <div className={cx('userPostItem')}>
                                    <div className={cx('paddingTop')}>
                                        <div className={cx('divWrapper')}>
                                            <a
                                                className={cx('linkVideo')}
                                                href={`/users/@${video.user.nickname}/video/${video.id}`}
                                                id="linkVideo"
                                                onMouseOver={() => playVideo(index)}
                                                onMouseLeave={() => pauseVideo(index)}
                                            >
                                                <div className={cx('divPlayerContainer')}>
                                                    <div className={cx('divContainer')}>
                                                        <img
                                                            src={video.thumb_url}
                                                            alt={video.description}
                                                            className={cx('divImage')}
                                                        />
                                                        <div className={cx('divPlayerWrapper')}>
                                                            <div className={cx('videoPlayer')}>
                                                                <video
                                                                    ref={(ref) => (videoRef.current[index] = ref)}
                                                                    src={video.file_url}
                                                                    className={cx('video')}
                                                                    preload="auto"
                                                                    playsInline={true}
                                                                    muted="muted"
                                                                    crossOrigin="anonymous"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={cx('divFooter')}></div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('userPostItemDesc')}>
                                    <a href="/" className={cx('title')}>
                                        {video.description}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileBody;
