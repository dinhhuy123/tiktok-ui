import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './ProfileHeader.module.scss';
import Button from '~/components/Button';
import {
    EmbedIcon,
    FacebookIcon,
    LinkIcon,
    TwitterIcon,
    WhatsAppIcon,
    LinkedInIcon,
    RedditIcon,
    TelegramIcon,
    EmailIcon,
    LineIcon,
    PinterestIcon,
    MessIcon,
    ReportIcon,
    BlockIcon,
} from '~/components/Icons';
import ProfileMenu from '~/pages/Profile/ProfileMenu';

const cx = classNames.bind(styles);

const SHARE_ITEMS = [
    {
        icon: <EmbedIcon />,
        title: 'Embed',
    },
    {
        icon: <FacebookIcon />,
        title: 'Share to Facebook',
    },
    {
        icon: <WhatsAppIcon />,
        title: 'Share to WhatsApp',
    },
    {
        icon: <TwitterIcon />,
        title: 'Share to Twitter',
    },
    {
        icon: <LinkIcon />,
        title: 'Copy Link',
    },
    {
        icon: <LinkedInIcon />,
        title: 'Share to LinkedIn',
    },
    {
        icon: <RedditIcon />,
        title: 'Share to Reddit',
    },
    {
        icon: <TelegramIcon />,
        title: 'Share to Telegram',
    },
    {
        icon: <EmailIcon />,
        title: 'Share to Email',
    },
    {
        icon: <LineIcon />,
        title: 'Share to Line',
    },
    {
        icon: <PinterestIcon />,
        title: 'Share to Pinterest',
    },
];

const MORE_ITEMS = [
    {
        icon: <MessIcon />,
        title: 'Send message',
        separate: true,
    },
    {
        icon: <ReportIcon />,
        title: 'Report',
        separate: true,
    },
    {
        icon: <BlockIcon />,
        title: 'Block',
    },
];

function ProfileHeader({ userProfile }) {
    return (
        <div className={cx('profile-header')}>
            <div>
                <div className={cx('header')}>
                    <img className={cx('avatar')} src={userProfile.avatar} alt="" />
                    <div className={cx('title-container')}>
                        <p className={cx('nickname')}>
                            <strong>{userProfile.nickname}</strong>
                            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                        </p>
                        <p className={cx('name')}>{userProfile.first_name + ' ' + userProfile.last_name}</p>
                        <Button className={cx('follow-btn')} primary widen>
                            Follow
                        </Button>
                    </div>
                </div>

                <div className={cx('body')}>
                    <div className={cx('analytics')}>
                        <div className={cx('item')}>
                            <strong className={cx('value')}>{userProfile.followings_count}</strong>
                            <span className={cx('label')}>Following</span>
                        </div>
                        <div className={cx('item')}>
                            <strong className={cx('value')}>{userProfile.followers_count}</strong>
                            <span className={cx('label')}>Followers</span>
                        </div>
                        <div className={cx('item')}>
                            <strong className={cx('value')}>{userProfile.likes_count}</strong>
                            <span className={cx('label')}>Likes</span>
                        </div>
                    </div>
                    {!!userProfile.bio ? <p>{userProfile.bio}</p> : <p>No bio yet.</p>}
                </div>
            </div>
            <ProfileMenu shareItems={SHARE_ITEMS} moreItems={MORE_ITEMS} />
        </div>
    );
}

export default ProfileHeader;
