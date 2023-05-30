import { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Header from '~/layouts/components/Header';
import Modal from '~/layouts/components/Modal';
import Sidebar from '~/layouts/components/Sidebar';
import styles from './DefaultLayout.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button';
import { ToTopIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

export const ModalContext = createContext();

function DefaultLayout({ children }) {
    const [modal, setModal] = useState(false);
    const [hideItem, setHideItem] = useState(false);
    const [height, setHeight] = useState(0);
    const handleChangeHideItem = () => {
        setHideItem(!hideItem);
    };

    useEffect(() => {
        window.onscroll = () => {
            setHeight(document.documentElement.scrollTop);
        };
        if (height > 0) {
            document.getElementById('toTop').style.bottom = '12px';
        } else {
            document.getElementById('toTop').style.bottom = '-32px';
        }
    });

    return (
        <ModalContext.Provider value={setModal}>
            <div className={cx('wrapper')}>
                <Header onClick={() => setModal(true)} />
                {modal && (
                    <div className={cx('modal')} onClick={handleChangeHideItem}>
                        <PopperWrapper className={cx('modal-wrapper')}>
                            <Modal onClick={() => setModal(false)} />
                        </PopperWrapper>
                    </div>
                )}
                <div className={cx('container')}>
                    <Sidebar onClick={() => setModal(true)} className={cx('sidebar')} />
                    <div className={cx('content')}>{children}</div>
                </div>
                <div className={cx('getApp')} id="toTop">
                    <Button rounded className={cx('getAppBtn')}>
                        Get app
                    </Button>
                    <Button href="#" className={cx('toTop')}>
                        <ToTopIcon />
                    </Button>
                </div>
            </div>
        </ModalContext.Provider>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
