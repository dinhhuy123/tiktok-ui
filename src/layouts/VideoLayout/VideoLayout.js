import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { parseISO, formatDistanceToNow } from 'date-fns';

import styles from './VideoLayout.module.scss';
import * as userService from '~/services/userService';
import Image from '~/components/Image';
import { MusicIcon, MoreIcon } from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import VideoScreen from './VideoScreen';
import Interactive from './Interactive';
import CommentFooter from './CommentFooter';
import CommentBody from './CommentBody';
import Button from '~/components/Button/Button';
import { NotifyContextShow } from '~/contexts/NotifyContext';

const cx = classNames.bind(styles);

function VideoLayout() {
    const [videoInfo, setVideoInfo] = useState({});
    const [userProfile, setUserProfile] = useState({});
    const [comments, setComments] = useState([]);

    const [followed, setFollowed] = useState(userProfile.is_followed);

    const { nickname, id } = useParams();

    const showNotify = useContext(NotifyContextShow);

    const currentUser = JSON.parse(localStorage.getItem('user'));
    const accessToken = currentUser && currentUser.meta.token ? currentUser.meta.token : '';

    const isAuth = (data) => {
        return data === currentUser.data.nickname;
    };

    let indexOfVideo = useMemo(() => {
        if (Object.keys(userProfile).length !== 0 && Object.keys(videoInfo).length !== 0) {
            for (let i = 0; i < userProfile.videos.length; i++) {
                if (userProfile.videos[i].id === videoInfo.id) {
                    return i;
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userProfile, videoInfo]);

    const handleNextVideo = () => {
        if (indexOfVideo >= userProfile.videos.length - 1) {
            return;
        } else {
            indexOfVideo++;
            userService.getAVideo(userProfile.videos[indexOfVideo].id, accessToken).then((res) => setVideoInfo(res));
        }
    };

    const handlePrevVideo = () => {
        if (indexOfVideo <= 0) {
            return;
        } else {
            indexOfVideo--;
            userService.getAVideo(userProfile.videos[indexOfVideo].id, accessToken).then((res) => setVideoInfo(res));
        }
    };

    useEffect(() => {
        if (id) {
            userService.getAVideo(id, accessToken).then((res) => setVideoInfo(res));
        }
        if (nickname) {
            userService
                .getUserProfile({ nickname, accessToken })
                .then((res) => {
                    setUserProfile(res);
                    setFollowed(res.is_followed);
                    // setFollowed(res.is_followed);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, nickname]);

    const handleTime = (time) => {
        let timeAgo = '';
        if (time) {
            const date = parseISO(time);
            const timePeriod = formatDistanceToNow(date);
            timeAgo = `${timePeriod} ago`;
        }
        return timeAgo;
    };

    const handleFollowUser = (e) => {
        e.preventDefault();
        if (!currentUser || !accessToken) {
            showNotify('Please login!');
            return;
        }
        if (followed) {
            userService
                .unFollowAnUser({ userId: userProfile.id, accessToken: accessToken })
                .then((res) => {
                    console.log(res);
                    if (res.data) {
                        setFollowed(res.data.is_followed);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            userService
                .followAnUser({ userId: userProfile.id, accessToken: accessToken })
                .then((res) => {
                    console.log(res);
                    if (res.data) {
                        setFollowed(res.data.is_followed);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <div className={cx('videoLayout')}>
            <VideoScreen
                videoInfo={videoInfo}
                indexOfVideo={indexOfVideo}
                handleNextVideo={handleNextVideo}
                handlePrevVideo={handlePrevVideo}
            />
            <div className={cx('commentContainer')}>
                <div className={cx('commentHeader')}>
                    <div className={cx('userInfo')}>
                        <a href="/#" className={cx('linkUserInfo')}>
                            <Image className={cx('avatar')} src={userProfile.avatar}></Image>
                            <div className={cx('nameContainer')}>
                                <span className={cx('nickname')}>{userProfile.nickname}</span>
                                <span className={cx('name')}>
                                    {userProfile.first_name + ' ' + userProfile.last_name}
                                    <span> · </span>
                                    <span className={cx('time')}>{handleTime(videoInfo.created_at)}</span>
                                </span>
                            </div>
                        </a>
                        {isAuth(nickname.slice(1, nickname.length)) ? (
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
                        ) : (
                            <Button
                                outline
                                onClick={handleFollowUser}
                                className={cx(followed ? 'followingBtn' : 'followBtn')}
                            >
                                {followed ? 'Following' : 'Follow'}
                            </Button>
                        )}
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
                <CommentBody
                    isAuth={isAuth}
                    handleTime={handleTime}
                    commentState={[comments, setComments]}
                    videoId={id}
                />
                <CommentFooter setComments={setComments} videoId={id} showNotify={showNotify} />
            </div>
        </div>
    );
}

export default VideoLayout;
