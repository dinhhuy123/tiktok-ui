import classNames from 'classnames/bind';
import Switch from 'react-ios-switch';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { VideoNameIcon } from '~/components/Icons';

import styles from './VideoSetting.module.scss';
import Button from '~/components/Button/Button';
import { useEffect, useState } from 'react';
import * as authService from '~/services/authService';
import UploadHeader from '../UploadHeader';
import VideoPreview from '../VideoPreview';
import Viewable from '../Viewable';
import VideoCover from '../VideoCover/VideoCover';
import AllowUser from '../AllowUser/AllowUser';

const cx = classNames.bind(styles);

function VideoSetting({ selectedFile, thumbArray, source }) {
    const [userProfile, setUserProfile] = useState({});
    const [limit, setLimit] = useState(false);
    const [copyrightSwitch, setCopyrightSwitch] = useState(false);
    const [caption, setCaption] = useState(selectedFile.fileName);
    const [changeBtn, setChangeBtn] = useState(false);
    const [viewable, setViewable] = useState('Public');

    const currentUser = JSON.parse(localStorage.getItem('user'));
    const accessToken = currentUser && currentUser.meta.token ? currentUser.meta.token : '';

    const handleViewable = (viewable) => {
        setViewable(viewable);
        setLimit(false);
    };

    const changeVideo = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        if (accessToken) {
            authService.getCurrentUser({ accessToken }).then((res) => {
                setUserProfile(res);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const postVideo = (e) => {
        e.preventDefault();
        authService.createNewVideo({
            description: caption,
            upload_file: selectedFile.file,
            thumbnail_time: '5',
            music: 'Ngau Hung - remix',
            viewable: viewable,
            allows: ['comment'],
            accessToken: accessToken,
        });
    };

    return (
        <>
            <UploadHeader selectedFile={selectedFile} thumbArray={thumbArray} />
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
                            <VideoPreview
                                changeBtn={changeBtn}
                                setChangeBtn={setChangeBtn}
                                selectedFile={selectedFile}
                                userProfile={userProfile}
                                source={source}
                            />
                            <div className={cx('changeVideo')}>
                                <div className={cx('file')}>
                                    <span>
                                        <VideoNameIcon className={cx('fileIcon')} />
                                    </span>
                                    <div className={cx('fileName')}>{selectedFile.fileName}</div>
                                </div>
                                <div className={cx('changeVideoBtn')} onClick={changeVideo}>
                                    Change Video
                                </div>
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
                            <VideoCover thumbArray={thumbArray} source={source} />
                            <Viewable
                                limit={limit}
                                setLimit={setLimit}
                                viewable={viewable}
                                handleViewable={handleViewable}
                            />
                            <AllowUser />
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
                                <Button primary className={cx('postBtn')} onClick={postVideo}>
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

export default VideoSetting;
