import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './VideoLayout.module.scss';
import * as userService from '~/services/userService';
import Image from '~/components/Image';
import { MusicIcon, EmotionIcon, AtSignIcon, MoreIcon } from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import VideoScreen from './VideoScreen';
import Interactive from './Interactive';

const cx = classNames.bind(styles);

function VideoLayout() {
    const [videoInfo, setVideoInfo] = useState({});
    const [userProfile, setUserProfile] = useState({});

    const { nickname, id } = useParams();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const accessToken = currentUser && currentUser.meta.token ? currentUser.meta.token : '';
        if (id) {
            userService.getAVideo(id, accessToken).then((res) => setVideoInfo(res));
        }
        if (nickname) {
            userService
                .getUserProfile({ nickname, accessToken })
                .then((res) => {
                    setUserProfile(res);
                    // setFollowed(res.is_followed);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id, nickname]);

    return (
        <div className={cx('videoLayout')}>
            <VideoScreen videoInfo={videoInfo} />
            <div className={cx('commentContainer')}>
                <div className={cx('commentHeader')}>
                    <div className={cx('userInfo')}>
                        <a href="/#" className={cx('linkUserInfo')}>
                            <Image className={cx('avatar')} src={userProfile.avatar}></Image>
                            <div className={cx('nameContainer')}>
                                <span className={cx('nickname')}>{userProfile.nickname}</span>
                                <span className={cx('name')}>
                                    {userProfile.first_name + ' ' + userProfile.last_name}
                                </span>
                            </div>
                        </a>
                        <HeadlessTippy
                            // visible
                            interactive
                            delay={[0, 200]}
                            offset={[-80, 0]}
                            placement="bottom"
                            render={(attrs) => (
                                <div className={cx('deleteContainer')} tabIndex="-1" {...attrs}>
                                    <div className={cx('arrow')}></div>
                                    <PopperWrapper className={cx('noPadding')}>
                                        <ul className={cx('itemList')}>
                                            <li className={cx('title')}>Privacy Setting</li>
                                            <li className={cx('title')}>Delete</li>
                                        </ul>
                                    </PopperWrapper>
                                </div>
                            )}
                        >
                            <div className={cx('videoSetting')}>
                                <MoreIcon />
                            </div>
                        </HeadlessTippy>
                    </div>
                    <div className={cx('videoName')}>{videoInfo.description}</div>
                    <div className={cx('videoMusic')}>
                        <span className={cx('musicIcon')}>
                            <MusicIcon />
                        </span>
                        {videoInfo.music}
                    </div>
                    <div className={cx('contactToUser')}>
                        <Interactive videoInfo={videoInfo} />
                        <div className={cx('userVideoLink')}>
                            <p className={cx('videoLink')}>{window.location.href}</p>
                            <button className={cx('browserCopy')}>Copy Link</button>
                        </div>
                    </div>
                </div>
                <div className={cx('commentBody')}>
                    <div className={cx('bodyContainer')}>
                        <div className={cx('content')}>Be the first to comment!</div>
                    </div>
                </div>
                <div className={cx('commentFooter')}>
                    <div className={cx('footerContainer')}>
                        <div className={cx('textContainer')}>
                            <div className={cx('text')}>
                                <div className={cx('textCenter')}>
                                    <textarea placeholder="Add comment" className={cx('textStyle')}></textarea>
                                </div>
                                <div className={cx('atSignIcon')}>
                                    <AtSignIcon />
                                </div>
                                <div className={cx('emotionIcon')}>
                                    <EmotionIcon />
                                </div>
                            </div>
                        </div>
                        <div className={cx('postBtn')}>Post</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoLayout;
