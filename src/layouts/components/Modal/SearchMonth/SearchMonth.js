import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchMonth.module.scss';
import { faCaretDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    const [monthState, setMonthState] = useState(false);
    const [month, setMonth] = useState('Month');
    const [active, setActive] = useState(false);

    const handleMonth = (months) => {
        setMonth(months.item);
        setActive(true);
    };
    return (
        <div className={cx('month-container')}>
            <div onClick={() => setMonthState(!monthState)} className={cx('mo-da-ye')}>
                <span className={cx(active ? 'active' : '')}>{month}</span>
                <button className={cx('search-code-btn', monthState ? 'turn-around' : 'turn-back')}>
                    <FontAwesomeIcon icon={faCaretDown} />
                </button>
            </div>
            {monthState && (
                <div className={cx('search-month')}>
                    <PopperWrapper className={cx('popper-wrapper')}>
                        <div className={cx('month-list-container')}>
                            <ul className={cx('month-list')}>
                                {MONTH_ITEMS.map((items, index) => (
                                    <li key={index} onClick={() => handleMonth(items)}>
                                        {items.item}
                                        {month === items.item && (
                                            <FontAwesomeIcon icon={faCheck} className={cx('check-icon')} />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </PopperWrapper>
                </div>
            )}
        </div>
    );
}

export default SearchYear;
