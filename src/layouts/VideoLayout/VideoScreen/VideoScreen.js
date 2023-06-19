import classNames from 'classnames/bind';
import styles from './VideoScreen.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { MuteBtn, ReportIcon, VolumeBtn } from '~/components/Icons';

const cx = classNames.bind(styles);

function VideoScreen({ videoInfo }) {
    const [muted, setMuted] = useState(false);
    const [valueBar, setValueBar] = useState(0);
    // const [followed, setFollowed] = useState(userProfile.is_followed);
    const volumeBarRef = useRef();
    const volumeCircleRef = useRef();

    const handleVolume = (e) => {
        const value = +e.target.value;
        setValueBar(value);
        const scale = valueBar / 100;
        volumeBarRef.current.style.transform = `scaleY(${scale})`;
        volumeCircleRef.current.style.transform = `translateY(${-valueBar * 0.75}px)`;

        if (value === 0) {
            setMuted(true);
        } else {
            setMuted(false);
        }
    };

    const handleToggleMute = () => {
        setMuted(!muted);
    };

    useEffect(() => {
        if (muted) {
            volumeBarRef.current.style.transform = `scaleY(0)`;
            volumeCircleRef.current.style.transform = `translateY(0)`;
        } else {
            const scale = valueBar / 100;
            volumeBarRef.current.style.transform = `scaleY(${scale})`;
            volumeCircleRef.current.style.transform = `translateY(${-valueBar * 0.75}px)`;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [muted]);

    return (
        <div className={cx('videoContainer')}>
            <div className={cx('videoPlayer')}>
                <p className={cx('videoBackground')} style={{ backgroundImage: `url(${videoInfo.thumb_url})` }}></p>
                <div className={cx('videoSpace')}>
                    <img className={cx('videoImage')} src={videoInfo.thumb_url} alt={videoInfo.id} />
                    <video className={cx('video')} src={videoInfo.file_url}></video>
                </div>
                <button className={cx('closeBtn')}>
                    <FontAwesomeIcon icon={faClose} className={cx('closeIcon')} />
                </button>
                <div className={cx('reportBtn')}>
                    <span className={cx('reportIcon')}>
                        <ReportIcon />
                    </span>
                    Report
                </div>
                <FontAwesomeIcon icon={faPlay} className={cx('playIcon')} />
                <div className={cx('volumeContainer')}>
                    <div className={cx('volumeControl')}>
                        <div className={cx('volumeControlProgress')}></div>
                        <div className={cx('volumeControlCircle')} ref={volumeCircleRef}></div>
                        <div className={cx('volumeControlBar')} ref={volumeBarRef}></div>
                        <div className={cx('inputRange')}>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                className={cx('volumeRange')}
                                onChange={handleVolume}
                            ></input>
                        </div>
                    </div>
                    <button className={cx('volumeBtn')} onClick={handleToggleMute}>
                        {muted ? <MuteBtn className={cx('muteIcon')} /> : <VolumeBtn className={cx('volumeIon')} />}
                    </button>
                </div>
                <div className={cx('progressBarContainer')}>
                    <div className={cx('progressBarControl')}>
                        <div className={cx('progressBar')}>
                            <div className={cx('progress')}></div>
                        </div>
                    </div>
                    <div className={cx('timeProgress')}>00:00/00.40</div>
                </div>
            </div>
        </div>
    );
}

export default VideoScreen;
