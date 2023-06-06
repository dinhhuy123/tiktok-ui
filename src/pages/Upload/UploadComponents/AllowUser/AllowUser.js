import classNames from 'classnames/bind';
import styles from './AllowUser.module.scss';
import { useState } from 'react';
import { CheckedBoxIcon } from '~/components/Icons';

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

function AllowUser() {
    const [checked, setChecked] = useState([]);

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
        <div className={cx('allowUsers')}>
            <div className={cx('title')}>
                <span>Allow users to</span>
            </div>
            <div className={cx('checkedBoxesContainer')}>
                {ALLOW_USERS.map((allowUser) => (
                    <div key={allowUser.id} className={cx('checkedBox')} onClick={() => handleCheckedBox(allowUser.id)}>
                        <div className={cx('checkedBoxCustom')}>
                            <input
                                checked={!checked.includes(allowUser.id)}
                                className={cx('visible')}
                                type="checkbox"
                                onChange={() => handleCheckedBox(allowUser.id)}
                            />
                            <div className={cx(!checked.includes(allowUser.id) ? 'custom' : 'unchecked')}>
                                {!checked.includes(allowUser.id) && <CheckedBoxIcon className={cx('checkedBoxIcon')} />}
                            </div>
                        </div>
                        <span>{allowUser.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllowUser;
