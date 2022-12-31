import classNames from 'classnames/bind';
import styles from './SearchMonth.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

const MONTH_ITEMS = [
    {
        id: 1,
        item: 'January',
    },
    {
        id: 2,
        item: 'February',
    },
    {
        id: 3,
        item: 'March',
    },
    {
        id: 4,
        item: 'April',
    },
    {
        id: 5,
        item: 'May',
    },
    {
        id: 6,
        item: 'June',
    },
    {
        id: 7,
        item: 'July',
    },
    {
        id: 8,
        item: 'August',
    },
    {
        id: 9,
        item: 'September',
    },
    {
        id: 10,
        item: 'October',
    },
    {
        id: 11,
        item: 'November',
    },
    {
        id: 12,
        item: 'December',
    },
];

function SearchYear() {
    return (
        <div className={cx('search-month')}>
            <PopperWrapper className={cx('popper-wrapper')}>
                <div className={cx('month-list-container')}>
                    <ul className={cx('month-list')}>
                        {MONTH_ITEMS.map((items, index) => (
                            <li key={index}>{items.item}</li>
                        ))}
                    </ul>
                </div>
            </PopperWrapper>
        </div>
    );
}

export default SearchYear;
