import classNames from 'classnames/bind';
import styles from './Discover.modules.scss';
import Button from '~/components/Button';
import { HashtagIcon, MusicIcon } from '../Icons';

const cx = classNames.bind(styles);

function Discover({ label }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            <div className={cx('discover-btn')}>
                <Button rounded className={cx('btn')} leftIcon={<HashtagIcon />}>
                    <p className={cx('title')}>suthatla</p>
                </Button>
                <Button rounded className={cx('btn')} leftIcon={<HashtagIcon />}>
                    <p className={cx('title')}>mackedoi</p>
                </Button>
                <Button rounded className={cx('btn')} leftIcon={<HashtagIcon />}>
                    <p className={cx('title')}>sansangthaydoi</p>
                </Button>
                <Button rounded className={cx('btn')} leftIcon={<MusicIcon />}>
                    <p className={cx('title')}>Yêu Đơn Phương Là Gì (MEE Remix) - Mee Media</p>
                </Button>
                <Button rounded className={cx('btn')} leftIcon={<MusicIcon />}>
                    <p className={cx('title')}>
                        Về Nghe Mẹ Ru - NSND Bach Tuyet & Hứa Kim Tuyền & 14 Casper & Hoàng Dũng
                    </p>
                </Button>
                <Button rounded className={cx('btn')} leftIcon={<MusicIcon />}>
                    <p className={cx('title')}>Thiên Thần Tình Yêu - RICKY STAR</p>
                </Button>
                <Button rounded className={cx('btn')} leftIcon={<HashtagIcon />}>
                    <p className={cx('title')}>7749hieuung</p>
                </Button>
                <Button rounded className={cx('btn')} leftIcon={<HashtagIcon />}>
                    <p className={cx('title')}>genzlife</p>
                </Button>
                <Button rounded className={cx('btn')} leftIcon={<MusicIcon />}>
                    <p className={cx('title')}>Tình Đã Đầy Một Tim - Huyền Tâm Môn</p>
                </Button>
                <Button rounded className={cx('btn')} leftIcon={<MusicIcon />}>
                    <p className={cx('title')}>Thằng Hầu (Thái Hoàng Remix) [Short Version] - Dunghoangpham</p>
                </Button>
            </div>
        </div>
    );
}

export default Discover;
