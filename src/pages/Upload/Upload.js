import React, { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Upload.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { UploadVideoIcon } from '~/components/Icons';
import Button from '~/components/Button';
import Footer from './Footer';
import VideoSetting from './UploadComponents/VideoSetting';

const cx = classNames.bind(styles);

function Upload() {
    const [source, setSource] = useState();
    const [thumbArray, setThumbArray] = useState([]);
    const [selectedFile, setSelectedFile] = useState({
        file: null,
        fileName: null,
        duration: 0,
        size: 0,
    });
    const [changeUploadState, setChangeUploadState] = useState(true);
    const handleUploadFile = () => {
        document.getElementById('uploadFile').click();
    };

    const convertHMS = (value) => {
        const sec = parseInt(value, 10);
        let minutes = Math.floor(sec / 60);
        let seconds = sec - minutes * 60;
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return minutes + ':' + seconds;
    };

    const importFileAndPreview = (file, revoke) => {
        return new Promise((resolve, reject) => {
            window.URL = window.URL || window.webkitURL;
            let preview = window.URL.createObjectURL(file);
            // remove reference
            if (revoke) {
                window.URL.revokeObjectURL(preview);
            }
            setTimeout(() => {
                resolve(preview);
            }, 100);
        });
    };

    const generateVideoThumbnails = async (videoFile, numberOfThumbnails) => {
        let thumbnail = [];
        let fractions = [];
        return new Promise(async (resolve, reject) => {
            if (!videoFile.type?.includes('video')) reject('not a valid video file');
            await getVideoDuration(videoFile).then(async (duration) => {
                // divide the video timing into particular timestamps in respective to number of thumbnails
                // ex if time is 10 and numOfthumbnails is 4 then result will be -> 0, 2.5, 5, 7.5 ,10
                // we will use this timestamp to take snapshots
                for (let i = 0; i < duration; i += duration / numberOfThumbnails) {
                    fractions.push(Math.floor(i));
                }
                // the array of promises
                let promiseArray = fractions.map((time) => {
                    return getVideoThumbnail(videoFile, time);
                });
                await Promise.all(promiseArray)
                    .then((res) => {
                        res.forEach((res) => {
                            thumbnail.push(res);
                        });
                        resolve(thumbnail);
                    })
                    .catch((err) => {
                        console.error(err);
                    })
                    .finally((res) => {
                        console.log(res);
                        resolve(thumbnail);
                    });
            });
            reject('something went wrong');
        });
    };

    const getVideoThumbnail = (file, videoTimeInSeconds) => {
        return new Promise((resolve, reject) => {
            if (file.type.match('video')) {
                importFileAndPreview(file).then((urlOfFIle) => {
                    var video = document.createElement('video');
                    var timeupdate = function () {
                        if (snapImage()) {
                            video.removeEventListener('timeupdate', timeupdate);
                            video.pause();
                        }
                    };
                    video.addEventListener('loadeddata', function () {
                        if (snapImage()) {
                            video.removeEventListener('timeupdate', timeupdate);
                        }
                    });
                    var snapImage = function () {
                        var canvas = document.createElement('canvas');
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                        var image = canvas.toDataURL();
                        var success = image.length > 10000;
                        if (success) {
                            URL.revokeObjectURL(urlOfFIle);
                            resolve(image);
                        }
                        return success;
                    };
                    video.addEventListener('timeupdate', timeupdate);
                    video.preload = 'metadata';
                    video.src = urlOfFIle;
                    // Load video in Safari / IE11
                    video.muted = true;
                    video.playsInline = true;
                    video.currentTime = videoTimeInSeconds;
                    video.play();
                });
            } else {
                reject('file not valid');
            }
        });
    };

    const getVideoDuration = (videoFile) => {
        return new Promise((resolve, reject) => {
            if (videoFile) {
                if (videoFile.type.match('video')) {
                    importFileAndPreview(videoFile).then((url) => {
                        let video = document.createElement('video');
                        video.addEventListener('loadeddata', function () {
                            resolve(video.duration);
                        });
                        video.preload = 'metadata';
                        video.src = url;
                        // Load video in Safari / IE11
                        video.muted = true;
                        video.playsInline = true;
                        video.play();
                        //  window.URL.revokeObjectURL(url);
                    });
                }
            } else {
                reject(0);
            }
        });
    };

    const getVideoInfo = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setSource(url);
        }
        getVideoDuration(file)
            .then((duration) => {
                setChangeUploadState(false);
                setSelectedFile({
                    file,
                    fileName: file?.name,
                    duration: convertHMS(duration),
                    time: duration,
                    size: file?.size,
                });
            })
            .catch((error) => {
                console.log(error);
            });
        generateVideoThumbnails(file, 8).then((thumbnail) => {
            setThumbArray(thumbnail.slice(0, 8));
        });
    };

    return (
        <div className={cx('upload')}>
            <div className={cx('uploadHeader')}>
                <div className={cx('center')}>
                    {changeUploadState ? (
                        <PopperWrapper className={cx('uploadWrapper')}>
                            <div className={cx('uploader')} id="upload">
                                <input
                                    id="uploadFile"
                                    type="file"
                                    accept="video/*"
                                    className={cx('visible')}
                                    onChange={getVideoInfo}
                                ></input>
                                <div className={cx('uploadCard')} onClick={handleUploadFile}>
                                    <span>
                                        <UploadVideoIcon className={cx('uploadIcon')} />
                                    </span>
                                    <div className={cx('selectVideo')}>
                                        <span>Select video to upload</span>
                                    </div>
                                    <div className={cx('dragFile')}>
                                        <span>Or drag and drop a file</span>
                                    </div>
                                    <div className={cx('desc')}>
                                        <span>Long videos can be split into multiple parts to get more exposure</span>
                                    </div>
                                    <div className={cx('videoDesc')}>
                                        <div>
                                            <span>Mp4 or WebM</span>
                                        </div>
                                        <div>
                                            <span>720x1280 resolution or higher</span>
                                        </div>
                                        <div>
                                            <span>Up to 30 minutes</span>
                                        </div>
                                        <div>
                                            <span>Less than 2GB</span>
                                        </div>
                                    </div>
                                    <div className={cx('uploadFile')}>
                                        <Button primary className={cx('uploadFileBtn')}>
                                            Select file
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </PopperWrapper>
                    ) : (
                        <VideoSetting selectedFile={selectedFile} thumbArray={thumbArray} source={source} />
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Upload;
