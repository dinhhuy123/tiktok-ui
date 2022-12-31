import classNames from 'classnames/bind';
import styles from './SearchYear.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

const DAY_ITEMS = [
    {
        item: 2023,
    },
    {
        item: 2022,
    },
    {
        item: 2021,
    },
    {
        item: 2020,
    },
    {
        item: 2019,
    },
    {
        item: 2018,
    },
    {
        item: 2017,
    },
    {
        item: 2016,
    },
    {
        item: 2015,
    },
    {
        item: 2014,
    },
    {
        item: 2013,
    },
    {
        item: 2012,
    },
    {
        item: 2011,
    },
    {
        item: 2010,
    },
    {
        item: 2009,
    },
    {
        item: 2008,
    },
    {
        item: 2007,
    },
    {
        item: 2006,
    },
    {
        item: 2005,
    },
    {
        item: 2004,
    },
    {
        item: 2003,
    },
    {
        item: 2002,
    },
    {
        item: 2001,
    },
    {
        item: 2000,
    },
    {
        item: 1999,
    },
    {
        item: 1998,
    },
    {
        item: 1997,
    },
    {
        item: 1996,
    },
    {
        item: 1995,
    },
    {
        item: 1994,
    },
    {
        item: 1993,
    },
    {
        item: 1992,
    },
    {
        item: 1991,
    },
    {
        item: 1990,
    },
    {
        item: 1989,
    },
    {
        item: 1988,
    },
    {
        item: 1987,
    },
    {
        item: 1986,
    },
    {
        item: 1985,
    },
    {
        item: 1984,
    },
    {
        item: 1983,
    },
    {
        item: 1982,
    },
    {
        item: 1981,
    },
    {
        item: 1980,
    },
    {
        item: 1979,
    },
    {
        item: 1978,
    },
    {
        item: 1977,
    },
];

function SearchYear() {
    return (
        <div className={cx('search-year')}>
            <PopperWrapper className={cx('popper-wrapper')}>
                <div className={cx('year-list-container')}>
                    <ul className={cx('year-list')}>
                        {DAY_ITEMS.map((items, index) => (
                            <li key={index}>{items.item}</li>
                        ))}
                    </ul>
                </div>
            </PopperWrapper>
        </div>
    );
}

export default SearchYear;
