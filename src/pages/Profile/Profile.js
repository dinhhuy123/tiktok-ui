import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './Profile.module.scss';
import Button from '~/components/Button';
import ProfileMenu from './ProfileMenu/ProfileMenu';
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

function Profile() {
    return (
        <div className={cx('profile')}>
            <div className={cx('information')}>
                <div className={cx('header')}>
                    <img
                        className={cx('avatar')}
                        src="https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2022/11/truong-tinh-nghi-6-8341-2850.jpeg?fit=645%2C20000&quality=95&ssl=1"
                        alt=""
                    />
                    <div className={cx('title-container')}>
                        <p className={cx('nickname')}>
                            <strong>truongtinhnghi</strong>
                            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                        </p>
                        <p className={cx('name')}>Trương Tịnh Nghi</p>
                        <Button className={cx('follow-btn')} primary widen>
                            Follow
                        </Button>
                    </div>
                </div>

                <div className={cx('body')}>
                    <div className={cx('analytics')}>
                        <div className={cx('item')}>
                            <strong className={cx('value')}>8.2M</strong>
                            <span className={cx('label')}>Following</span>
                        </div>
                        <div className={cx('item')}>
                            <strong className={cx('value')}>8.2M</strong>
                            <span className={cx('label')}>Likes</span>
                        </div>
                        <div className={cx('item')}>
                            <strong className={cx('value')}>8.2M</strong>
                            <span className={cx('label')}>Likes</span>
                        </div>
                    </div>
                    <p>No bio yet.</p>
                </div>
            </div>
            <ProfileMenu shareItems={SHARE_ITEMS} moreItems={MORE_ITEMS} />
        </div>
    );
}

export default Profile;
