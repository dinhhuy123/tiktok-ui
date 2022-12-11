import PropTypes from 'prop-types';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Modal.module.scss';
import ModalItem from './ModalItem';
import LoginNormal from './LoginNormal';
import LoginQRCode from './LoginQRCode';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ items = [], onChange = defaultFn }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <ModalItem
                    data={item}
                    key={index}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    const changeLoginType = () => {
        switch (current.type) {
            case 'QR':
                return <LoginQRCode title={current.title} />;
            case 'LOGIN':
                return <LoginNormal title={current.title} />;
            default:
                throw new Error('error!');
        }
    };
    return (
        <div className={cx('inner')}>
            {history.length > 1 && (
                <>
                    <header className={cx('header')}>
                        <button
                            className={cx('back-btn')}
                            onClick={() => {
                                setHistory((prev) => prev.slice(0, prev.length - 1));
                            }}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                    </header>
                    {changeLoginType()}
                </>
            )}
            {history.length <= 1 && <h2 className={cx('title')}>Log in to TikTok</h2>}
            {renderItems()}
        </div>
    );
}

Menu.propTypes = {
    items: PropTypes.array,
    onChange: PropTypes.func,
};

export default Menu;
