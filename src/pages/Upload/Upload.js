import { useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Switch from 'react-ios-switch';

import styles from './Upload.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import {
    CheckedBoxIcon,
    DecreaseIcon,
    EditVideoIcon,
    IncreaseIcon,
    SplitIcon,
    UploadVideoIcon,
    VideoNameIcon,
} from '~/components/Icons';
import Button from '~/components/Button';
import Footer from './Footer';

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

function Upload() {
    const [limit, setLimit] = useState(false);
    const [checked, setChecked] = useState([]);
    const [allowUsers, setAllowUsers] = useState(ALLOW_USERS);
    const [copyrightSwitch, setCopyrightSwitch] = useState(false);
    // const handleUploadFile = () => {
    //     document.getElementById('uploadFile').click();
    // };

    // const getVideoInfo = (e) => {
    //     console.log(e.target.files);
    // };

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

    return (
        <div className={cx('upload')}>
            <div className={cx('uploadHeader')}>
                <div className={cx('center')}>
                    {/* <PopperWrapper className={cx('uploadWrapper')}>
                        <div className={cx('uploader')}>
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
                    </PopperWrapper> */}
                    <PopperWrapper className={cx('noPadding')}>
                        <div className={cx('grid')}>
                            <div className={cx('editVideo')}>
                                <div className={cx('imageContainer')}>
                                    <div className={cx('imageNumber')}>
                                        <span>1</span>
                                    </div>
                                    <div className={cx('image')}>
                                        <div className={cx('card')}></div>
                                    </div>
                                    <div className={cx('videoImageDescContainer')}>
                                        <span className={cx('videoImageDescName')}>fdasfdafdsafdsaffdafadsfd</span>
                                        <div className={cx('videoImageDescTime')}>
                                            <span>00:00 - 00:17</span>
                                            <span>17s</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('editBtnContainer')}>
                                    <Button upload leftIcon={<EditVideoIcon />}>
                                        Edit video
                                    </Button>
                                </div>
                            </div>
                            <div className={cx('split')}>
                                <div className={cx('splitContainer')}>
                                    <span>Split into multiple parts to get more exposure</span>
                                    <div className={cx('handleSplit')}>
                                        <span>
                                            <DecreaseIcon />
                                        </span>
                                        <span>
                                            <input value="2" onChange={(e) => e.target.value} />
                                        </span>
                                        <span>
                                            <IncreaseIcon />
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('splitBtnContainer')}>
                                    <Button upload leftIcon={<SplitIcon />} className={cx('splitBtn')}>
                                        Split
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </PopperWrapper>
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
                                    </div>
                                    <div className={cx('changeVideo')}>
                                        <div className={cx('file')}>
                                            <span>
                                                <VideoNameIcon className={cx('fileIcon')} />
                                            </span>
                                            <div className={cx('fileName')}>fdasfdafdsafdsaffdafadsfd</div>
                                        </div>
                                        <div className={cx('changeVideoBtn')}>Change Video</div>
                                    </div>
                                </div>
                                <div className={cx('setting')}>
                                    <div className={cx('caption')}>
                                        <div className={cx('title')}>
                                            <span>Caption</span>
                                            <span className={cx('captionLength')}>32/2220</span>
                                        </div>
                                        <div className={cx('hashtagContainer')}>
                                            <div className={cx('hashtagName')}>
                                                <span>fdasfdafdsafdsaffdafadsfd</span>
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
                                        <div className={cx('imageList')}>
                                            <div></div>
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
                                                <button
                                                    className={cx('search-btn', limit ? 'turn-around' : 'turn-back')}
                                                >
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
                                            {allowUsers.map((allowUser) => (
                                                <div
                                                    key={allowUser.id}
                                                    className={cx('checkedBox')}
                                                    onClick={() => handleCheckedBox(allowUser.id)}
                                                >
                                                    <div className={cx('checkedBoxCustom')}>
                                                        <input
                                                            checked={checked.includes(allowUser.id)}
                                                            className={cx('visible')}
                                                            type="checkbox"
                                                            onChange={() => handleCheckedBox(allowUser.id)}
                                                        />
                                                        <div
                                                            className={cx(
                                                                checked.includes(allowUser.id) ? 'custom' : 'unchecked',
                                                            )}
                                                        >
                                                            {checked.includes(allowUser.id) && (
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
                                                We'll check your video for potential copyright infringements on used
                                                sounds. If infringements are found, you can edit the video before
                                                posting.
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
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Upload;
