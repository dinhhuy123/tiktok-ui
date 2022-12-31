import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchMonth from '~/layouts/components/Modal/SearchMonth';
import SearchDay from '~/layouts/components/Modal/SearchDay';
import SearchYear from '~/layouts/components/Modal/SearchYear';
import SearchCode from '~/layouts/components/Modal/SearchCode';

const cx = classNames.bind(styles);

function Signup({ phone, setPhone, code, setCode }) {
    const [codeState, setCodeState] = useState(false);
    const [monthState, setMonthState] = useState(false);
    const [dayState, setDayState] = useState(false);
    const [yearState, setYearState] = useState(false);

    return (
        <>
            <div className={cx('description')}>When's your birthday?</div>
            <div className={cx('birthday')}>
                <div className={cx('month-container')}>
                    <div onClick={() => setMonthState(!monthState)} className={cx('mo-da-ye')}>
                        <span>Month</span>
                        <button className={cx('search-code-btn', monthState ? 'turn-around' : 'turn-back')}>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </button>
                    </div>
                    {monthState && <SearchMonth />}
                </div>
                <div className={cx('day-container')}>
                    <div onClick={() => setDayState(!dayState)} className={cx('mo-da-ye')}>
                        <span>Day</span>
                        <button className={cx('search-code-btn', dayState ? 'turn-around' : 'turn-back')}>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </button>
                    </div>
                    {dayState && <SearchDay />}
                </div>
                <div className={cx('year-container')}>
                    <div onClick={() => setYearState(!yearState)} className={cx('mo-da-ye')}>
                        <span>Year</span>
                        <button className={cx('search-code-btn', yearState ? 'turn-around' : 'turn-back')}>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </button>
                    </div>
                    {yearState && <SearchYear />}
                </div>
            </div>
            <p className={cx('privacy')}>Your birthday won't be shown publicly.</p>
            <div className={cx('description')}>
                Phone
                <a href="/" className={cx('change-link')}>
                    Log in with email or username
                </a>
            </div>
            <div className={cx('phone-container')}>
                <div className={cx('code-container')}>
                    <div onClick={() => setCodeState(!codeState)} className={cx('zone-code')}>
                        <span className={cx('vn-code')}>VN +84</span>
                        <button className={cx('search-code-btn', codeState ? 'turn-around' : 'turn-back')}>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </button>
                    </div>
                    {codeState && <SearchCode />}
                </div>
                <input
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    name="mobile"
                    className={cx('phone-number')}
                    placeholder="Phone number"
                />
            </div>
            <div className={cx('send-code')}>
                <div className={cx('input-container')}>
                    <input
                        onChange={(e) => setCode(e.target.value)}
                        value={code}
                        name="code"
                        className={cx('input-code')}
                        placeholder="Enter 6-digit code"
                    />
                </div>
                <button className={cx('code-btn', 'disabled-code-btn')}>Send code</button>
            </div>
            <a href="/" className={cx('change-link')}>
                Log in with password
            </a>
        </>
    );
}

export default Signup;
