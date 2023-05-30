import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Switch from 'react-ios-switch';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import {
    CheckedBoxIcon,
    FullScreenBtn,
    ListReactionIcon,
    LiveIconInFrame,
    MusicIcon,
    PauseVideoIcon,
    PlayVideoIcon,
    SearchIconInFrame,
    VideoNameIcon,
    VolumeBtn,
} from '~/components/Icons';

import styles from './UploadSetting.module.scss';
import Button from '~/components/Button/Button';
import { useEffect, useRef, useState } from 'react';
import UploadSettingHeader from './UploadSettingHeader';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

const ALLOW_USERS = [
    {
        id: 1,
        title: 'Comment',
    },
    {
        id: 2,
        title: 'Duet',
    },
    {
        id: 3,
        title: 'Stich',
    },
];

function UploadSetting({ selectedFile, thumbArray, source }) {
    const className = cx('myCanvas');
    const [limit, setLimit] = useState(false);
    const [checked, setChecked] = useState([]);
    const [copyrightSwitch, setCopyrightSwitch] = useState(false);
    const [caption, setCaption] = useState(selectedFile.fileName);
    const [changeBtn, setChangeBtn] = useState(false);
    const [progress, setProgress] = useState(0);
    const [time, setTime] = useState('00:0' + 0);

    const videoRef = useRef();

    const handleCheckedBox = (id) => {
        setChecked((prev) => {
            const isChecked = checked.includes(id);
            if (isChecked) {
                return checked.filter((item) => item !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const handleProgress = () => {
        const duration = videoRef.current.duration;
        const currentTime = videoRef.current.currentTime;
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

    const handlePlayVideo = () => {
        console.log('play');
        setChangeBtn(true);
        videoRef.current.play();
    };

    const handlePauseVideo = () => {
        console.log('pause');
        setChangeBtn(false);
        videoRef.current.pause();
    };

    const createVideo = () => {
        var canvas = document.createElement('canvas');
        var videoChosen = document.getElementById('videoChosen');
        canvas.width = 450;
        canvas.height = 798;
        canvas.className = className;
        var canvasDraw = canvas.getContext('2d');
        canvasDraw.fillStyle = '#000';
        document.getElementById('canvasContainer').appendChild(canvas);
        let i;
        const draw = () => {
            i = window.requestAnimationFrame(draw);
            canvasDraw.drawImage(videoChosen, 0, canvas.height / 6, canvas.width, 550);
        };
        videoChosen.addEventListener(
            'loadeddata',
            () => {
                draw();
            },
            false,
        );
        videoChosen.addEventListener(
            'play',
            () => {
                draw();
            },
            false,
        );
        videoChosen.addEventListener(
            'pause',
            () => {
                window.cancelAnimationFrame(i);
                i = undefined;
            },
            false,
        );
        videoChosen.addEventListener(
            'ended',
            function () {
                window.cancelAnimationFrame(i);
                i = undefined;
            },
            false,
        );
    };

    useEffect(() => {
        createVideo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <UploadSettingHeader selectedFile={selectedFile} thumbArray={thumbArray} />
            <PopperWrapper className={cx('noPadding')}>
                <div className={cx('uploadVideoContainer')}>
                    <div className={cx('postTitle')}>
                        <span>Upload Video</span>
                        <div className={cx('subTitle')}>
                            <span>Post a video to your account</span>
                        </div>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('preview')}>
                            <div className={cx('mobilePreview')}>
                                <div className={cx('appFrame')}>
                                    <div className={cx('appTab')}></div>
                                </div>
                                <div className={cx('pageShow')}>
                                    <div className={cx('videoPlayer')}>
                                        <div id="canvasContainer" className={cx('canvasContainer')}></div>
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
                                                    <div
                                                        className={cx('progressBar')}
                                                        style={{ width: `${progress}%` }}
                                                    ></div>
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
                                                        <Image
                                                            className={cx('avatar')}
                                                            src="https://pdp.edu.vn/wp-content/uploads/2021/01/hinh-anh-girl-xinh-toc-ngan-de-thuong.jpg"
                                                            alt="Nguyen Van A"
                                                        />
                                                    </div>
                                                    <div className={cx('listReaction')}>
                                                        <ListReactionIcon className={cx('listReactionIcon')} />
                                                    </div>
                                                    <div className={cx('albumContainer')}>
                                                        <div className={cx('album')}>
                                                            <Image
                                                                className={cx(
                                                                    'albumAvatar',
                                                                    `${changeBtn ? 'play' : 'pause'}`,
                                                                )}
                                                                src="https://pdp.edu.vn/wp-content/uploads/2021/01/hinh-anh-girl-xinh-toc-ngan-de-thuong.jpg"
                                                                alt="Nguyen Van A"
                                                            />
                                                        </div>
                                                        <div className={cx('musicSymbols')}>
                                                            <div
                                                                className={cx(
                                                                    'musicSymbol1',
                                                                    `${changeBtn ? 'play' : 'pause'}`,
                                                                )}
                                                            ></div>
                                                            <div
                                                                className={cx(
                                                                    'musicSymbol2',
                                                                    `${changeBtn ? 'play' : 'pause'}`,
                                                                )}
                                                            ></div>
                                                            <div
                                                                className={cx(
                                                                    'musicSymbol3',
                                                                    `${changeBtn ? 'play' : 'pause'}`,
                                                                )}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={cx('overlayMetadata')}>
                                                    <div className={cx('username')}>@ Huy Truong</div>
                                                    <div className={cx('caption')}>
                                                        gfdafdasfdajfdyaghfgdhagfhdgahgfdhjasgf
                                                    </div>
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
                            <div className={cx('changeVideo')}>
                                <div className={cx('file')}>
                                    <span>
                                        <VideoNameIcon className={cx('fileIcon')} />
                                    </span>
                                    <div className={cx('fileName')}>{selectedFile.fileName}</div>
                                </div>
                                <div className={cx('changeVideoBtn')}>Change Video</div>
                            </div>
                        </div>
                        <div className={cx('setting')}>
                            <div className={cx('caption')}>
                                <div className={cx('title')}>
                                    <span>Caption</span>
                                    <span className={cx('captionLength')}>{`${caption.length}/2220`}</span>
                                </div>
                                <div className={cx('hashtagContainer')}>
                                    <div className={cx('hashtagName')}>
                                        <input value={caption} onChange={(e) => setCaption(e.target.value)} />
                                    </div>
                                    <div className={cx('hashtagIcon')}>
                                        <span>@</span>
                                        <span>#</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('cover')}>
                                <div className={cx('title')}>
                                    <span>Cover</span>
                                </div>
                                <div className={cx('imagesList')}>
                                    <div id="images" className={cx('images')}>
                                        {thumbArray.map((src, id) => (
                                            <img
                                                draggable="false"
                                                className={cx('imgGenerate')}
                                                key={id}
                                                src={src}
                                                alt="noImage"
                                            />
                                        ))}
                                    </div>
                                    <div className={cx('videos')} id="videos">
                                        <div className={cx('chosen')}>
                                            {/* <video src={source} id="videoChosen" controls={true} /> */}
                                            <video
                                                onTimeUpdate={handleProgress}
                                                id="videoChosen"
                                                src={source}
                                                className={cx('videoChosen')}
                                                preload="auto"
                                                playsInline={true}
                                                crossOrigin="anonymous"
                                                draggable="false"
                                                ref={videoRef}
                                            ></video>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('whoCanWatch')}>
                                <div className={cx('title')}>
                                    <span>Who can watch this video</span>
                                </div>
                                <Tippy
                                    interactive
                                    offset={[0, -180]}
                                    visible={limit}
                                    render={(attrs) => (
                                        <div tabIndex="-1" {...attrs}>
                                            <div className={cx('itemsContainer')}>
                                                <PopperWrapper className={cx('noPadding')}>
                                                    <div className={cx('items')}>
                                                        <ul>
                                                            <li>Public</li>
                                                            <li>Friends</li>
                                                            <li>Private</li>
                                                        </ul>
                                                    </div>
                                                </PopperWrapper>
                                            </div>
                                        </div>
                                    )}
                                >
                                    <div className={cx('choiceContainer')} onClick={() => setLimit(!limit)}>
                                        <div className={cx('choices')}>
                                            <span>Public</span>
                                        </div>
                                        <button className={cx('search-btn', limit ? 'turn-around' : 'turn-back')}>
                                            <FontAwesomeIcon icon={faCaretDown} />
                                        </button>
                                    </div>
                                </Tippy>
                            </div>
                            <div className={cx('allowUsers')}>
                                <div className={cx('title')}>
                                    <span>Allow users to</span>
                                </div>
                                <div className={cx('checkedBoxesContainer')}>
                                    {ALLOW_USERS.map((allowUser) => (
                                        <div
                                            key={allowUser.id}
                                            className={cx('checkedBox')}
                                            onClick={() => handleCheckedBox(allowUser.id)}
                                        >
                                            <div className={cx('checkedBoxCustom')}>
                                                <input
                                                    checked={!checked.includes(allowUser.id)}
                                                    className={cx('visible')}
                                                    type="checkbox"
                                                    onChange={() => handleCheckedBox(allowUser.id)}
                                                />
                                                <div
                                                    className={cx(
                                                        !checked.includes(allowUser.id) ? 'custom' : 'unchecked',
                                                    )}
                                                >
                                                    {!checked.includes(allowUser.id) && (
                                                        <CheckedBoxIcon className={cx('checkedBoxIcon')} />
                                                    )}
                                                </div>
                                            </div>
                                            <span>{allowUser.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={cx('copyright')}>
                                <div className={cx('title', 'switch')}>
                                    <span>Run a copyright check</span>
                                    <Switch
                                        checked={copyrightSwitch}
                                        style={{ transform: 'scale(0.8)' }}
                                        onChange={setCopyrightSwitch}
                                    />
                                </div>
                                <div className={cx('copyrightDesc')}>
                                    <span>
                                        We'll check your video for potential copyright infringements on used sounds. If
                                        infringements are found, you can edit the video before posting.
                                        <a href="/"> Learn more</a>
                                    </span>
                                </div>
                            </div>
                            <div className={cx('btn-row')}>
                                <Button upload className={cx('discardBn')}>
                                    Discard
                                </Button>
                                <Button primary className={cx('postBtn')}>
                                    Post
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </PopperWrapper>
        </>
    );
}

export default UploadSetting;
