import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './VideoPreview.module.scss';
import {
    FullScreenBtn,
    ListReactionIcon,
    LiveIconInFrame,
    MusicIcon,
    PauseVideoIcon,
    PlayVideoIcon,
    SearchIconInFrame,
    VolumeBtn,
} from '~/components/Icons';
import Image from '~/components/Image';
const cx = classNames.bind(styles);

function VideoPreview({ changeBtn, setChangeBtn, selectedFile, userProfile, source }) {
    const videoPreviewRef = useRef();
    const [progress, setProgress] = useState(0);
    const [time, setTime] = useState('00:0' + 0);

    const handlePlayVideo = () => {
        console.log('play');
        setChangeBtn(true);
        videoPreviewRef.current.play();
    };

    const handlePauseVideo = () => {
        console.log('pause');
        setChangeBtn(false);
        videoPreviewRef.current.pause();
    };

    const handleProgress = () => {
        const duration = videoPreviewRef.current.duration;
        const currentTime = videoPreviewRef.current.currentTime;
        let sec = Math.floor(currentTime);
        if (sec < 10) {
            sec = '00:0' + sec;
        } else {
            sec = '00:' + sec;
        }
        if (sec >= 60) {
            let minutes = Math.floor(sec / 60);
            let seconds = sec - minutes * 60;
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            sec = '0' + minutes + ':' + seconds;
        }
        setTime(sec);
        const progress = (currentTime / duration) * 100;
        setProgress(progress);
        if (progress === 100) {
            setChangeBtn(false);
        }
    };

    return (
        <div className={cx('mobilePreview')}>
            <div className={cx('appFrame')}>
                <div className={cx('appTab')}></div>
            </div>
            <div className={cx('pageShow')}>
                <div className={cx('videoPlayer')}>
                    <div id="canvasContainer" className={cx('canvasContainer')}>
                        <video
                            onTimeUpdate={handleProgress}
                            src={source}
                            preload="auto"
                            className={cx('videoPreview')}
                            ref={videoPreviewRef}
                        />
                    </div>
                    <div className={cx('videoPlayerControl')}>
                        <div className={cx('controlContainer')}>
                            <div className={cx('controlOperation')}>
                                <div className={cx('playInfo')}>
                                    {changeBtn ? (
                                        <div className={cx('btnPause')} onClick={handlePauseVideo}>
                                            <PauseVideoIcon />
                                        </div>
                                    ) : (
                                        <div className={cx('btnPlay')} onClick={handlePlayVideo}>
                                            <PlayVideoIcon />
                                        </div>
                                    )}
                                    <div className={cx('playTime')}>
                                        {time} / {selectedFile.duration}
                                    </div>
                                </div>
                                <div className={cx('operationBtn')}>
                                    <div className={cx('volumeBtn')}>
                                        <VolumeBtn />
                                    </div>
                                    <div className={cx('fullScreenBtn')}>
                                        <FullScreenBtn />
                                    </div>
                                </div>
                            </div>
                            <div className={cx('progressBarContainer')}>
                                <div className={cx('progressBar')} style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('pageLayout')}>
                    <div className={cx('pageLayoutTitle')}>
                        <LiveIconInFrame className={cx('liveIcon')} />
                        <div className={cx('titleTab')}>
                            <div>Following</div>
                            <div>For you</div>
                        </div>
                        <SearchIconInFrame className={cx('searchIcon')} />
                    </div>
                    <div className={cx('pageLayoutOverlay')}>
                        <div className={cx('overlayContainer')}>
                            <div className={cx('overlaySidebar')}>
                                <div className={cx('avatarContainer')}>
                                    <Image className={cx('avatar')} src={userProfile.avatar} alt="Nguyen Van A" />
                                </div>
                                <div className={cx('listReaction')}>
                                    <ListReactionIcon className={cx('listReactionIcon')} />
                                </div>
                                <div className={cx('albumContainer')}>
                                    <div className={cx('album')}>
                                        <Image
                                            className={cx('albumAvatar', `${changeBtn ? 'play' : 'pause'}`)}
                                            src={userProfile.avatar}
                                            alt="Nguyen Van A"
                                        />
                                    </div>
                                    <div className={cx('musicSymbols')}>
                                        <div className={cx('musicSymbol1', `${changeBtn ? 'play' : 'pause'}`)}></div>
                                        <div className={cx('musicSymbol2', `${changeBtn ? 'play' : 'pause'}`)}></div>
                                        <div className={cx('musicSymbol3', `${changeBtn ? 'play' : 'pause'}`)}></div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('overlayMetadata')}>
                                <div className={cx('username')}>@ Huy Truong</div>
                                <div className={cx('caption')}>gfdafdasfdajfdyaghfgdhagfhdgahgfdhjasgf</div>
                                <div className={cx('sound')}>
                                    <div className={cx('soundIcon')}>
                                        <MusicIcon />
                                    </div>
                                    <div className={cx('soundContent')}>
                                        <span>13123213</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoPreview;
